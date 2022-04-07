from html.parser import HTMLParser
from html.entities import name2codepoint
import codecs
#from text_processor import sentence_processor, word_processor
from new_TP import word_intonation_process, init, tag_process


class MyHTMLParser(HTMLParser):

    def __init__(self, level, option):
        self.option = option
        self.tag_data = []
        self.string = ''
        self.level = level
        super(MyHTMLParser, self).__init__(convert_charrefs=True)

    def handle_starttag(self, tag, attrs):
        self.string = self.string + ' <'+tag+'> '

    def handle_data(self, data):
        if self.option == 'intonation':
            data = word_intonation_process(data)
        elif self.level != 'style':
            data = tag_process(data)
        self.string = self.string + data

    def handle_endtag(self, tag):
        self.string = self.string + ' </'+tag+'> '


def open_file(file, level, option, tag):
    f = codecs.open(
        file, 'r')
    text = f.read()
    init(level, tag)
    parser = MyHTMLParser(level, option)
    parser.feed(text)
    return(parser.string)
