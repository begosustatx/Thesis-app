'''
TODO: FILE NOT IN USE

from nrclex import NRCLex
from bs4 import BeautifulSoup
from playsound import playsound
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import nltk
nltk.download('vader_lexicon')
nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')




# creates an array of sentences separated by punctution


def create_sentence_array(text):
    array = sent_tokenize(text)
    for sentence in array:
        # Check if the sentence contains any other punctuation characters
        if(sentence.find('(') != -1):
            array = add_sentence(sentence, array, '(')
        if(sentence.find(':') != -1):
            array = add_sentence(sentence, array, ':')
        if(sentence.find(';') != -1):
            array = add_sentence(sentence, array, ';')
    return(array)

# splits  the sentence on different punctuation characters not handled by nltk to be added to the array


def get_rest_char(s, char):
    result = []
    if(char == '('):
        if(s[s.find(')')+1:len(s)] != ''):
            result.append(s[s.find(')')+1:len(s)])
        result.append(s[s.find('('):s.find(')')+1])
        if(s[0:s.find('(')] != ''):
            result.append(s[0:s.find('(')])
    else:
        result.append(s[s.find(char)+1:len(s)])
        result.append(s[0:s.find(char)+1])
    return(result)

# adds the new separated sentences into the original array


def add_sentence(sentence, array, char):
    new = get_rest_char(sentence, char)
    index = array.index(sentence)
    array.pop(index)
    i = index
    for s in new:
        array.insert(i, s)
    return array


# maps each sentence to a numerical puntuation value
def map_intonation(array):
    sentence_map = []
    for sentence in array:
        punctuation = set_punctuation(sentence)
        sentence_map.append(punctuation)
    return(sentence_map)


# gives a numerical value to each puntuation character
def set_punctuation(sentence):
    punctuation = (sentence[len(sentence)-1])
    number_value = 0
    if punctuation == '!':
        number_value = 2
    elif punctuation == '?':
        number_value = 3
    elif (punctuation == '.' and (sentence[len(sentence)-2]) == '.' and (sentence[len(sentence)-3]) == '.'):
        punctuation = '...'
        number_value = 4
    elif punctuation == ')':
        number_value = 5
    elif punctuation == ':':
        number_value = 6
    elif punctuation == ';':
        number_value = 7
    elif punctuation == '.':
        number_value = 1
    return(number_value)
    """

def extract_sentences(array):
    for i in range(len(array)):
        sentence_array = create_sentence_array(array[i])
        array.pop(i)
        sentence_array = sentence_array[::-1]
        for sentence in sentence_array:
            array.insert(i, sentence)
    return array
    """


def extract_sentences(sentence):
    sentence_array = create_sentence_array(sentence)
    return sentence_array


def create_word_array(text):
    res = []
    array = nltk.word_tokenize(text)
    for a in array:
        res.append(a)
    return(res)

    """

def create_word_array(text):
    res = []
    for sent in text:
        array = nltk.word_tokenize(sent)
        for a in array:
            res.append(a)
    return(res)
    """

# words with a newutral classification are dismissed


def classify_words(word):
    sid = SentimentIntensityAnalyzer()
    emotion = sid.polarity_scores(word)
    result = 0
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

# Filter adjetives from all the words appering from the text


def get_adjectives(array):
    effects = []
    indexes = []
    tuple_array = nltk.pos_tag(array)
    for i in range(len(tuple_array)):
        if tuple_array[i][1] == 'JJ':
            num = classify_words(tuple_array[i][0])
            if num != 0:
                effects.append(num)
                indexes.append(i)
    return (indexes, effects)


def word_processor(file_path):
    # strips = open_file(file_path)
    word_array = create_word_array(file_path)
    (indexes, effects) = get_adjectives(word_array)
    return (word_array, indexes, effects)


def sentence_processor(file_path):
    # strips = open_file(file_path)
    # sentence_array = extract_sentences(strips)
    sentence_array = extract_sentences(file_path)
    effects = map_intonation(sentence_array)
    return ((sentence_array, effects))
    # return ({"sentences": sentence_array, 'effects': effects})
'''
