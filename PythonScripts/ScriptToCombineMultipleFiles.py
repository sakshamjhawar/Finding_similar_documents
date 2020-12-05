# -*- coding: utf-8 -*-
"""
Created on Thu Dec  3 01:18:55 2020

@author: smit
"""

#import csv
#import pandas as pd

#df = pd.read_csv('DataSet400.csv')
#f = open("data.txt", "w")

#for x in df['paper_text']: 
#    f.write(str(x))
#    f.write('\n\n\n\n')

#f.close()

import glob
import os
import unicodedata
import sys

root_dir = 'E:\SoftwareEng1stsemBooks\SER 531\project\papers'
output = open("data.txt", "w", encoding="utf8", errors='ignore')
# root_dir needs a trailing slash (i.e. /root/dir/)
for filename in glob.iglob(root_dir + '**/**', recursive=True):
    if os.path.isfile(filename):
        if '.txt' in filename:
            f = open(filename, "r", encoding="utf8", errors='ignore')
            #data = unicode(f.read(), errors='replace')
            output.write(f.read())
            output.write('\n\n\n')
            f.close()
            
output.close()

