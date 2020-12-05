# SER531Project

<h3>PythonScripts</h3>

* <h4>ScriptToCombineMultipleFiles</h4>
   You can use this script to recursively combine multiple files inside a folder. Use this script to combine all the papers as LDA takes single file as input. Just change            root_dir to your local structure to run this file
   
* <h4>TrainModelFromData</h4>
   This code was used to train our model from combined data. Just change the filename in line 13 to your data file and run this code.
   
* <h4>DocumentModelEvaluator</h4>
   The code will recursively pass all the files inside the folder(mentioned in line 24) to trained model which will output all the keywords in each topic and probability match     score of each document with every topic.
