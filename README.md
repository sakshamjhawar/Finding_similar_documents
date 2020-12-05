# SER531Project

<h3>PythonScripts</h3>

- <h4>ScriptToCombineMultipleFiles</h4>
   You can use this script to recursively combine multiple files inside a folder. Use this script to combine all the papers as LDA takes single file as input. Just change            root_dir to your local structure to run this file

- <h4>TrainModelFromData</h4>
   This code was used to train our model from combined data. Just change the filename in line 13 to your data file and run this code.

- <h4>DocumentModelEvaluator</h4>
   The code will recursively pass all the files inside the folder(mentioned in line 24) to trained model which will output all the keywords in each topic and probability match     score of each document with every topic.

<h3>AWS setup and Fuseki server</h3>

- <h4>EC2 Instance</h4>
   We have create EC2 instance (http://ec2-35-162-161-210.us-west-2.compute.amazonaws.com/) on Amazon AWS, this is a micro-2 instance. We have Java and Ruby installed on this machine.

- <h4>Fuseki Server</h4>
   We have installed fuseki server on above EC2 instance, it is running on port 3030 as a java service. We have also loaded dataset with name sampleDataSet to this machine. It can be accessed on http://ec2-35-162-161-210.us-west-2.compute.amazonaws.com:3030/.

- <h4>S3 Bucket</h4>
   We have created S3 bucket with name ser531team12 in us-west-2 region. This is used to host a static single page web page as a public website. You can access it using http://ser531team12.s3-website-us-west-2.amazonaws.com/.

<h3>How to run web application locally</h3>

1.  Clone this repository
2.  Navigate inside cloned repository
3.  run `npm install` - make sure to have node and npm installed on your system
4.  run 'npm start' - this will start the application locally on port 3000.
    Note: To run this application we must have EC2 and Fuseki server running, as we are using free tier we have to shutdown out instance after few days. However, we can run Fuseki locally and make change in code to call local Fuseki server instead on EC2 endpoint.
