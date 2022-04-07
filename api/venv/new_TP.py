from ast import literal_eval
import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import pronouncing
from hyphen import Hyphenator
import string


def init(lev, tag):
    global intonation_words
    intonation_words = []
    'VERB / ADVERB / PRONOUN / NOUN / adjective '
    global nltk_tag
    nltk_tag = tag
    global level
    level = lev

import nltk
nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')
nltk.download('vader_lexicon')
def classify_words(word):
    # TODO: DECIDE PATTERNS
    if(nltk_tag == 'adjective'):
        sid = SentimentIntensityAnalyzer()
        emotion = sid.polarity_scores(word)
        if (emotion['compound']) != 0.0:
            if emotion['compound'] > 0.0 and emotion['compound'] < 0.2:
                return 3
            elif emotion['compound'] >= 0.2 and emotion['compound'] < 0.4:
                return 2
            elif emotion['compound'] >= 0.4 and emotion['compound'] < 0.6:
                return 1
            elif emotion['compound'] >= -0.2 and emotion['compound'] < 0.0:
                return 4
            elif emotion['compound'] >= -0.4 and emotion['compound'] < -0.2:
                return 5
            elif emotion['compound'] >= -0.6 and emotion['compound'] < -0.4:
                return 6
        else:
            return -1
    else:
        return 0


'''
NN	noun, singular (cat, tree)
NNS	noun plural (desks)
NNP	proper noun, singular (sarah)
NNPS	proper noun, plural (indians or americans)

PRP	personal pronoun (hers, herself, him, himself)
PRP$	possessive pronoun (her, his, mine, my, our )

RB	adverb (occasionally, swiftly)
RBR	adverb, comparative (greater)
RBS	adverb, superlative (biggest)

VB	verb (ask)
VBG	verb gerund (judging)
VBD	verb past tense (pleaded)
VBN	verb past participle (reunified)
VBP	verb, present tense not 3rd person singular(wrap)
VBZ	verb, present tense with 3rd person singular (bases)
'''


def check_tag(tag):
    if nltk_tag == 'verb':
        return (tag == 'VB' or tag == 'VBG' or tag == 'VBD' or tag == 'VBN' or tag == 'VBP' or tag == 'VBZ')
    elif nltk_tag == 'adverb':
        return (tag == 'RB' or tag == 'RBR' or tag == 'RBS')
    elif nltk_tag == 'pronoun':
        return (tag == 'PRP' or tag == 'PRP$')
    elif nltk_tag == 'noun':
        return (tag == 'NN' or tag == 'NNS' or tag == 'NNO' or tag == 'NNPS')
    elif nltk_tag == 'adjective':
        return (tag == 'JJ' or tag == 'JJR' or tag == 'JJS')
    else:
        return False


'''
def tag_process(data):
    if(level == 'sentence'):
        nltk_array = nltk.sent_tokenize(data)
    else:
        nltk_array = nltk.word_tokenize(data)
    tuple_array = nltk.pos_tag(nltk_array)
    new_data = []
    length = len(tuple_array)
    for i in range(length):
        word = tuple_array[i][0] + ' '
        if check_tag(tuple_array[i][1]):
            num = classify_words(tuple_array[i][0])
            if num != -1:
                word = '<span class={} id={}> {} </span> '.format(
                    nltk_tag, num, word)
        new_data.append(word)
    return ("".join(new_data))
'''


def punct_or_apos(word):
    return ((word in string.punctuation) or (word.find("'") > 0))


def tag_process(data):
    if(level == 'sentence'):
        nltk_array = nltk.sent_tokenize(data)
    else:
        nltk_array = nltk.word_tokenize(data)
    tuple_array = nltk.pos_tag(nltk_array)
    new_data = []
    for i in range(len(tuple_array)):
        if not (punct_or_apos(tuple_array[i][0])):
            word = tuple_array[i][0] + ' '
            if(i+1 < len(tuple_array)):
                if punct_or_apos(tuple_array[i+1][0]):
                    word = tuple_array[i][0] + tuple_array[i+1][0] + ' '
            if check_tag(tuple_array[i][1]):
                num = classify_words(tuple_array[i][0])
                if num != -1:
                    word = '<span class={} id={}> {} </span> '.format(
                        nltk_tag, num, word)
            new_data.append(word)
    return ("".join(new_data))


def word_intonation_process(data):
    h = Hyphenator('en_US')
    word_array = nltk.word_tokenize(data)
    new_data = []
    for word in word_array:
        word_with_space = word + ' '
        if len(h.syllables(word)) >= 2:
            intonation_words.append(word)
            word_with_space = '<span class="intonation"> {} </span> '.format(
                word_with_space)
        new_data.append(word_with_space)
    return ("".join(new_data))


def get_intonation():
    h = Hyphenator('en_US')
    intonation_words_unique = list(dict.fromkeys(intonation_words))
    intonation_words_dict = []
    for word in intonation_words_unique:
        phones_list = pronouncing.phones_for_word(word)
        num = (pronouncing.stresses(phones_list[0]))
        intonations = [int(x) for x in str(num)]
        pos = intonations.index(max(intonations))
        intonation_words_dict.append(
            {"word": word.lower(), "array": h.syllables(word), "index": pos})
    return(intonation_words_dict)
