import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer

import nltk
nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')
nltk.download('vader_lexicon')
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


def word_process(data):
    word_array = nltk.word_tokenize(data)
    tuple_array = nltk.pos_tag(word_array)
    new_data = []
    for i in range(len(tuple_array)):
        word = tuple_array[i][0] + ' '
        if tuple_array[i][1] == 'JJ':
            num = classify_words(tuple_array[i][0])
            if num != 0:
                word = '<span class="adj" id={}> {} </span> '.format(num, word)
        new_data.append(word)
    return ("".join(new_data))


def sentence_process(data):
    #word_array = nltk.word_tokenize(data)
    word_array = nltk.sent_tokenize(data)
    tuple_array = nltk.pos_tag(word_array)
    new_data = []
    for i in range(len(tuple_array)):
        word = tuple_array[i][0] + ' '
        if tuple_array[i][1] == 'JJ':
            num = classify_words(tuple_array[i][0])
            if num != 0:
                word = '<span class="adj" id={}> {} </span> '.format(num, word)
        new_data.append(word)
    return ("".join(new_data))
