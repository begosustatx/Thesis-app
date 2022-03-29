import pronouncing
from hyphen import Hyphenator
h = Hyphenator('en_US')
word = " harder "
phones_list = pronouncing.phones_for_word(word)
num = (pronouncing.stresses(phones_list[0]))
res = [int(x) for x in str(num)]
print(res)
print(h.syllables(word))
