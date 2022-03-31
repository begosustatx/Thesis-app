from html.parser import HTMLParser
from html.entities import name2codepoint
import codecs
#from text_processor import sentence_processor, word_processor
from new_TP import word_intonation_process, init, sentence_sentiment_process, word_sentiment_process


class MyHTMLParser(HTMLParser):

    def __init__(self, type, option):
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
