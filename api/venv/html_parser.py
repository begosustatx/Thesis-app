from html.parser import HTMLParser
import codecs
#from text_processor import sentence_processor, word_processor
from text_processor import init, tag_process2


class MyHTMLParser(HTMLParser):

    def __init__(self, option):
        self.option = option
        self.tag_data = []
        self.string = ''
        print("__init__::", option)
        super(MyHTMLParser, self).__init__(convert_charrefs=True)

    def handle_starttag(self, tag, attrs):
        self.string = self.string + ' <'+tag+'> '

    def handle_data(self, data):

        data = tag_process2(data)
        self.string = self.string + data

    def handle_endtag(self, tag):
        self.string = self.string + ' </'+tag+'> '


def open_file(file, option, part_of):
    f = codecs.open(
        file, 'r')
    text = f.read()
    # If both lists are empty means the style has been chosen, and no processing is needed
    if len(option) == 0 and len(part_of) == 0:
        return text
    init(option[0], part_of)
    parser = MyHTMLParser(option[0])
    parser.feed(text)
    return(parser.string)
