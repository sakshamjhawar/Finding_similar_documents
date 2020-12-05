# -*- coding: utf-8 -*-
"""
Created on Tue Nov 10 21:31:11 2020

@author: smit
"""

from nltk.tokenize import RegexpTokenizer
from stop_words import get_stop_words
from nltk.stem.porter import PorterStemmer
import datetime
import gensim
from gensim.corpora import Dictionary
from gensim import corpora,models
import glob
import os
import pandas as pd

model =  models.LdaModel.load('lda.model')
dictionary= Dictionary.load('lda.model.id2word')
"""dct = Dictionary(["black panther is here".split(), "ema má máma".split()])
ss=dct.doc2bow(["black","koregggga","black"])"""

root_dir = 'E:\SoftwareEng1stsemBooks\SER 531\project\papers'
model =  models.LdaModel.load('lda.model')
#print(model.show_topics());


print(type(model.print_topics(num_topics=3, num_words=70)))
data = model.print_topics(num_topics=3, num_words=100)
f = open('wordTopicMapping.txt', "w")

for i in range(0,len(data)):
    index = data[i][0]
    stringOfData = data[i][1]
    arrayOfData = stringOfData.split('+')
    for j in range(0,len(arrayOfData)):
        singleString = arrayOfData[j]
        arrayOfString = singleString.split('*')
        print(arrayOfString[1])
        f.write(arrayOfString[1]+','+str(index)+'\n')


csvDict = []

for filename in glob.iglob(root_dir + '**/**', recursive=True):
    if os.path.isfile(filename):
        if '.txt' in filename:
            arr = []
            arr.append(filename)
            print(filename)
            f = open(filename, "r", encoding="utf8", errors='ignore')
            vec = dictionary.doc2bow(f.read().split())
            doc_lda =model[vec]
            #doc_lda = sorted(doc_lda,key=lambda l:l[1], reverse=True)
            #print(type(doc_lda))
            print(doc_lda)
            for i in range(0,len(doc_lda)):
                arr.append(doc_lda[i][1])
            csvDict.append(arr)
            print("---------------------------")
            f.close()
            
df = pd.DataFrame(csvDict, columns = ['FileName', 'Topic1', 'Topic2', 'Topic3']) 
df.to_csv('data.csv')
        
#data="With the increasing popularity of Web Services and Service-Oriented Architecture, we need infrastructure to discover and compose Web services. In this paper, we present a generalized semantics-based technique for automatic service composition that combines the rigor of process-oriented composition with the descriptiveness of semantics. Our generalized approach presented in this paper introduces the use of a conditional directed acyclic graph where complex interactions, containing control flow, information flow, and pre-/post-conditions are effectively represented. Composition solution obtained is represented semantically as OWL-S documents. Web service composition will gain wider acceptance only when users know that the solutions obtained are comprised of trustworthy services. We present a framework that not only uses functional and non-functional attributes provided by the Web service description document but also filters and ranks solutions based on their trust rating that is computed using Centrality Measure of Social Networks. Our contributions are applied for automatic workflow generation in context of the currently important bioinformatics domain. We evaluate our engine for automatic workflow generation of a phylogenetic inference task. We also evaluate our engine for automated discovery and composition on repositories of different sizes and present the results."
#vec = dictionary.doc2bow(output.read().split())
#doc_lda =model[vec]
"""for i in range(0,doc_lda.__len__()):
    if(doc_lda[i][0]==24):
        if(doc_lda[i][1]<0.9):
            print("yes")
    else:
        print("no");"""
#print(doc_lda)
