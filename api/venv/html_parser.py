from html.parser import HTMLParser
from html.entities import name2codepoint
import codecs
from text_processor import sentence_processor, word_processor
from new_TP import word_process


class MyHTMLParser(HTMLParser):

    def __init__(self):
        self.tag_data = []
        self.string = ''
        super(MyHTMLParser, self).__init__(convert_charrefs=True)

    def handle_starttag(self, tag, attrs):
        self.string = self.string + ' <'+tag+'> '

    def handle_data(self, data):
        data = word_process(data)
        self.string = self.string + data

    def handle_endtag(self, tag):
        self.string = self.string + ' </'+tag+'> '


def open_file(file):
    f = codecs.open(
        file, 'r')
    text = f.read()
    parser = MyHTMLParser()
    parser.feed(text)
    object = parser.string
    print("here", parser.string)
    return(parser.string)


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
