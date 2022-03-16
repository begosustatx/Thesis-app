from html.parser import HTMLParser
from html.entities import name2codepoint
import codecs
from text_processor import sentence_processor, word_processor


class MyHTMLParser(HTMLParser):

    def __init__(self):
        self.tag_data = []
        super(MyHTMLParser, self).__init__(convert_charrefs=True)

    def handle_starttag(self, tag, attrs):
        if tag != 'head' and tag != 'html' and tag != 'body':
            self.tag_data.append(tag)

    def handle_data(self, data):
        if data != '\n' and data != '\n  ':
            tag = self.tag_data.pop(len(self.tag_data)-1)
            self.tag_data.append((tag, data))


def open_file(file):
    f = codecs.open(
        file, 'r')
    text = f.read()
    parser = MyHTMLParser()
    parser.feed(text)
    object = parser.tag_data
    return(object)


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
