import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import pronouncing
from hyphen import Hyphenator


def classify_words(word):
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
        return 0


# SENTIMENT ANALYSIS ON WORD LEVEL
def word_sentiment_process(data):
    word_array = nltk.word_tokenize(data)
    tuple_array = nltk.pos_tag(word_array)
    new_data = []
    for i in range(len(tuple_array)):
        word = tuple_array[i][0] + ' '
        if tuple_array[i][1] == 'JJ':
            num = classify_words(tuple_array[i][0])
            if num != 0:
                word = '<span class="adj" id={}> {} </span> '.format(
                    num, word)
        new_data.append(word)
    return ("".join(new_data))


def sentence_sentiment_process(data):
    word_array = nltk.sent_tokenize(data)
    tuple_array = nltk.pos_tag(word_array)
    new_data = []
    for i in range(len(tuple_array)):
        word = tuple_array[i][0] + ' '
        if tuple_array[i][1] == 'JJ':
            num = classify_words(tuple_array[i][0])
            if num != 0:
                # TODO: DECIDE THE RIGHT PATTERS
                word = '<span class="adj" id={}> {} </span> '.format(3, word)
        new_data.append(word)
    return ("".join(new_data))


def init():
    global intonation_words
    intonation_words = []


# INTONATION ANALYSIS ON WORD LEVEL
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
