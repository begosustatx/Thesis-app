from html.parser import HTMLParser
from html.entities import name2codepoint
import codecs
#from text_processor import sentence_processor, word_processor
from new_TP import word_intonation_process, init, sentence_sentiment_process, word_sentiment_process


class MyHTMLParser(HTMLParser):

    def __init__(self, type, option):
        print(type, option)
        self.type = type
        self.option = option
        self.tag_data = []
        self.string = ''
        super(MyHTMLParser, self).__init__(convert_charrefs=True)

    def handle_starttag(self, tag, attrs):
        self.string = self.string + ' <'+tag+'> '

    def handle_data(self, data):
        if self.type == 'sentence':
            data = sentence_sentiment_process(data)
        else:
            if self.option == 'intonation':
                data = word_intonation_process(data)
            elif self.option == 'part_speech':
                data = word_sentiment_process(data)
        self.string = self.string + data

    def handle_endtag(self, tag):
        self.string = self.string + ' </'+tag+'> '


def open_file(file, type, option):
    f = codecs.open(
        file, 'r')
    text = f.read()
    init()
    parser = MyHTMLParser(type, option)
    parser.feed(text)
    return(parser.string)


'''
def process_file(object_array, word_level):
    final_object = []
    i = 0
    for (type, data) in object_array:
        if word_level:
            (word_array, indexes, effects) = word_processor(data)
            final_object.append(
                {"type": type, "words": word_array, 'indexes': indexes, 'effects': effects})
            i = i+1
        else:
            (sentence_array, effects) = sentence_processor(data)
            final_object.append(
                {"type": type, "sentences": sentence_array, 'effects': effects})
    return {"html_object": final_object}
'''
