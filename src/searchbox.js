import React from "react";
import axios from "axios";
import "./searchbox.scss";
import myText from "./sample.txt";
import ContentDisplay from "./displayData";
import qs from "qs";

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    //readingFile();
    this.state = {
      value: "",
      tokens: "",
      result: "",
      topicNum: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  matchTopic = () =>
    this.state.tokens.filter(
      (s) =>
        (
          this.state.value.split(" ")[0] || this.state.value.split(" ")[1]
        ).includes(s.id) ||
        s.id.includes(
          this.state.value.split(" ")[0] || this.state.value.split(" ")[1]
        )
    );

  handleClick = (event) => {
    event.preventDefault();
    this.setState({ 
      result: "",
      topicNum: ""
   });
    fetch(myText)
      .then((r) => r.text())
      .then((text) => {
        var splitStn = text.split("\n");
        splitStn.forEach((row) => {
          var splitStr = row.split(",");
          var word = splitStr[0];
          var val = splitStr[1];
          this.setState({
            tokens: [
              ...this.state.tokens,
              { id: word.trim().replace(/^"|"$/g, ""), value: val },
            ],
          });
        });
      })
      .then(() => {
        this.handleSubmit(event);
      });
  };

  handleSubmit = (event) => {
    //alert(event.target.childNodes[1].value);
    this.setState({
      value: event.target.childNodes[1].value,
    });
    var topicObject = this.matchTopic(); //Get from tokens
    var topicNumber = ""
    if(topicObject[0]) {
      topicNumber = topicObject[0].value;
    }
    else {
      topicNumber = "";
    }
    this.setState({
      topicNum : topicNumber
    });
    if (topicNumber === "0") {
      axios({
        method: "POST",
        url:
          "http://ec2-35-162-161-210.us-west-2.compute.amazonaws.com:3030/sampleDatasetRDF/",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          query:
            'PREFIX type: <http://info.deepcarbon.net/schema/type#> PREFIX owl: <http://www.w3.org/2002/07/owl#> PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> SELECT ?PaperTitle ?PaperAuthor ?PaperPages WHERE { ?s a <http://www.semanticweb.org/sarang/ontologies/2020/10/untitled-ontology-11#Document>;             <http://www.semanticweb.org/sarang/ontologies/2020/10/untitled-ontology-11#Topic_match_1> ?matchPercent; <http://www.semanticweb.org/sarang/ontologies/2020/10/untitled-ontology-11#has_title> ?PaperTitle;  <http://www.semanticweb.org/sarang/ontologies/2020/10/untitled-ontology-11#has_author> ?PaperAuthor; <http://www.semanticweb.org/sarang/ontologies/2020/10/untitled-ontology-11#has_pages> ?PaperPages. FILTER(xsd:float(?matchPercent) >= "0.6"^^xsd:float)  }',
        }),
      }).then((res) => {
        this.setState({ result: res.data.results });
      });
    } else if (topicNumber === "1") {
      axios({
        method: "POST",
        url:
          "http://ec2-35-162-161-210.us-west-2.compute.amazonaws.com:3030/sampleDatasetRDF/",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          query:
            'PREFIX type: <http://info.deepcarbon.net/schema/type#> PREFIX owl: <http://www.w3.org/2002/07/owl#> PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> SELECT ?PaperTitle ?PaperAuthor ?PaperPages WHERE { ?s a <http://www.semanticweb.org/sarang/ontologies/2020/10/untitled-ontology-11#Document>;             <http://www.semanticweb.org/sarang/ontologies/2020/10/untitled-ontology-11#Topic_match_2> ?matchPercent; <http://www.semanticweb.org/sarang/ontologies/2020/10/untitled-ontology-11#has_title> ?PaperTitle;  <http://www.semanticweb.org/sarang/ontologies/2020/10/untitled-ontology-11#has_author> ?PaperAuthor; <http://www.semanticweb.org/sarang/ontologies/2020/10/untitled-ontology-11#has_pages> ?PaperPages. FILTER(xsd:float(?matchPercent) >= "0.6"^^xsd:float)  }',
        }),
      }).then((res) => {
        this.setState({ result: res.data.results });
      });
    } else if (topicNumber === "2") {
      axios({
        method: "POST",
        url:
          "http://ec2-35-162-161-210.us-west-2.compute.amazonaws.com:3030/sampleDatasetRDF/",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          query:
            'PREFIX type: <http://info.deepcarbon.net/schema/type#> PREFIX owl: <http://www.w3.org/2002/07/owl#> PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> SELECT ?PaperTitle ?PaperAuthor ?PaperPages WHERE { ?s a <http://www.semanticweb.org/sarang/ontologies/2020/10/untitled-ontology-11#Document>;             <http://www.semanticweb.org/sarang/ontologies/2020/10/untitled-ontology-11#Topic_match_3> ?matchPercent; <http://www.semanticweb.org/sarang/ontologies/2020/10/untitled-ontology-11#has_title> ?PaperTitle;  <http://www.semanticweb.org/sarang/ontologies/2020/10/untitled-ontology-11#has_author> ?PaperAuthor; <http://www.semanticweb.org/sarang/ontologies/2020/10/untitled-ontology-11#has_pages> ?PaperPages. FILTER(xsd:float(?matchPercent) >= "0.6"^^xsd:float)  }',
        }),
      }).then((res) => {
        this.setState({ result: res.data.results });
      });
    }
  };

  render() {
    return (
      <div>
        <div className="mainFrame">
          <form onSubmit={this.handleClick} role="search">
            <label htmlFor="search">Search Topic</label>
            <input
              id="search"
              type="search"
              placeholder="Search Topic..."
              autoFocus
              required
            />
            <button type="submit">Go</button>
          </form>
        </div>
        <div className="row">
          <div className="column">
            <div>
              { this.state.result && this.state.topicNum  ? (
                <div>
                  <h1>Search result:</h1>
                  <ContentDisplay resultData={this.state.result} />
                </div>
              ) :
                <div><h2>Sorry, no relevant documents found!</h2></div>
              }
            </div>
          </div>
          <div className="column">
            {this.state.result && this.state.topicNum ? (
              <div>
                <h2>Info Box:</h2><br/>
                <p>Main Topic Matched: {this.state.topicNum === "0" ? 'Cyber Security' : this.state.topicNum === "1" ? 'Machine Learning' : 'Web Semantics'}</p>
                <p>Total Matched Documents : {this.state.result.bindings.length}</p>
              </div>
              ) : (
              <div></div>
              )}

            
          </div>
        </div>
      </div>
    );
  }
}
export default NameForm;
