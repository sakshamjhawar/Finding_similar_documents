import React from "react";

class ContentDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.resultData,
    };
  }

  customResult(array) {
    let i = array.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array.slice(0, 9);
  }

  render() {
    const resultData = this.customResult(this.state.data.bindings);
    return (
      <div className="row">
        <div className="column">
          {resultData.map((each) => {
            return <p key={each.PaperTitle.value}>{each.PaperTitle.value}</p>;
          })}
        </div>
       
      </div>
    );
  }
}
export default ContentDisplay;
