import React from 'react';
import './searchbox.scss';

class NameForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      alert('Topic searched: ' + this.state.value);
      event.preventDefault();
    }
  
    render() {
      return (
        <div className="mainFrame">
            <form onsubmit="event.preventDefault();" role="search">
                <label for="search">Search Topic</label>
                <input id="search" type="search" placeholder="Search Topic..." autofocus required />
                <button type="submit">Go</button>    
            </form>
        </div>
        

      );
    }
  }
  export default NameForm;