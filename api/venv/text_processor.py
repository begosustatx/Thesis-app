import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import pronouncing
from hyphen import Hyphenator
import string


def init(option, part_of):
    global intonation_words
    intonation_words = []
    global nltk_tag
    nltk_tag = part_of
    global opt
    opt = option


# gives a value of an effect for a specif sentiment analysis (neg or pos)
def classify_words(word):
    sid = SentimentIntensityAnalyzer()
    emotion = sid.polarity_scores(word)
    if (emotion['compound']) == 0.0:
        return 2
    elif emotion['compound'] > 0:
        return 3
    elif emotion['compound'] < 0.0:
        return 4
    else:
        return -1


'''
NN	noun, singular (cat, tree)
NNS	noun plural (desks)
NNP	proper noun, singular (sarah)
NNPS	proper noun, plural (indians or americans)

VB	verb (ask)
VBG	verb gerund (judging)
VBD	verb past tense (pleaded)
VBN	verb past participle (reunified)
VBP	verb, present tense not 3rd person singular(wrap)
VBZ	verb, present tense with 3rd person singular (bases)
'''


# checks if the tag of the given word is one of the selected ones, returns true if yes
def check_tag(tag):
    if 'verb' in nltk_tag and (tag == 'VB' or tag == 'VBG' or tag == 'VBD' or tag == 'VBN' or tag == 'VBP' or tag == 'VBZ'):
        return 'verb'
    elif 'noun' in nltk_tag and (tag == 'NN' or tag == 'NNS' or tag == 'NNO' or tag == 'NNPS'):
        return 'noun'
    elif 'adjective' in nltk_tag and (tag == 'JJ' or tag == 'JJR' or tag == 'JJS'):
        return 'adjective'
    else:
        return ''


# checks if the word is puctuation or an apostrophe, return true if yes
def punct_or_apos(word):
    return ((word in string.punctuation) or (word.find("'") > 0))


def tag_process(data):
    h = Hyphenator('en_US')
    # divide the data inside a tag on an array with words
    nltk_array = nltk.word_tokenize(data)
    # get the nltk tag for each of the words
    tuple_array = nltk.pos_tag(nltk_array)
    new_data = []
    for i in range(len(tuple_array)):
        # if the next word is puntcuation or an apostrophe we skip it
        if not (punct_or_apos(tuple_array[i][0])):
            # we add an spac after the word
            word = tuple_array[i][0] + ' '
            if(i+1 < len(tuple_array)):
                if punct_or_apos(tuple_array[i+1][0]):
                    word = tuple_array[i][0] + tuple_array[i+1][0] + ' '
            tag = check_tag(tuple_array[i][1])
            if tag != '':
                num = 0
                if opt == 'intonation':
                    tag = opt
                    if len(h.syllables(tuple_array[i][0])) >= 2:
                        intonation_words.append(tuple_array[i][0])
                else:
                    num = classify_words(tuple_array[i][0])
                word = '<span class={} id={}> {} </span> '.format(
                    tag, num, word)
            new_data.append(word)
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
