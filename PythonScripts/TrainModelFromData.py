# -*- coding: utf-8 -*-
"""
Created on Tue Nov 10 20:17:14 2020

@author: smit
"""
import datetime
from nltk.tokenize import RegexpTokenizer
from stop_words import get_stop_words
from nltk.stem.porter import PorterStemmer
import gensim
from gensim import corpora,models
with open('data.txt', "r", encoding="utf8", errors='ignore') as f:
    content = f.readlines()
print("after readlines")
# you may also want to remove whitespace characters like `\n` at the end of each line
content = [x.strip() for x in content];
print("after removing white spaces")
tokenizer = RegexpTokenizer(r'\w+') #regular expression
for i in range(0,content.__len__()):
    content[i]=tokenizer.tokenize(content[i]);
print("before stop words")
#stop words removing    
en_stop = get_stop_words('en')
en_stop.append('cmu');en_stop.append('edu');en_stop.append('soumya');en_stop.append('edwin');
en_stop.append('columbia');en_stop.append('princeton');en_stop.append('mellon');en_stop.append('carnegie');
en_stop.append('ieee');en_stop.append('crosstalk');en_stop.append('india');en_stop.append('www');
en_stop.append('can');en_stop.append('use');

for i in range(0,content.__len__()):
    size=content[i].__len__();
    j=0;
    while j<size:
        if((content[i][j].lower() in en_stop) or (content[i][j].__len__()==1 or content[i][j].__len__()==2)):
            temp=content[i][j];
            content[i].remove(temp);
            size=size-1;
            j=j-1;
        j=j+1;
print("before stemming")
#stemming
p_stemmer = PorterStemmer()
for i in range(0,content.__len__()):
    for j in range(0,content[i].__len__()):
        content[i][j]=p_stemmer.stem(content[i][j]);


print("done")
#document term matrix
texts=content;
dictionary = corpora.Dictionary(texts);#assigning unique id to each word and also count its frequency
corpus = [dictionary.doc2bow(text) for text in texts] #create matrix(u,v) u= unique id and v = frequency
ldamodel = models.ldamodel.LdaModel(corpus=corpus, id2word=dictionary, num_topics=3, passes=20, chunksize = 10000)
#ldamodel = gensim.models.ldamodel.LdaModel(corpus, num_topics=3, id2word = dictionary, passes=25)
#trained model
#print(ldamodel.print_topics(num_topics=2, num_words=50))
ldamodel.save('lda.model')
model =  models.LdaModel.load('lda.model')
#print(model.show_topics());
print(model.print_topics(num_topics=3, num_words=70))
now = datetime.datetime.now();
print(str(now));
#model.show_topics(3)
