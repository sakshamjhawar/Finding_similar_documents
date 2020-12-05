import React from 'react';

class ContentDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            data :props.resultData
        };
    }

    render() {
        return (
            <div className="row">
                <div className="column">
                    {this.state.data.bindings.map(each => {
    return <p key={each.PaperTitle.value}>{each.PaperTitle.value}</p>
                    })}
                </div>
                {/* <div className="column">
                    <h2>Column 2</h2>
                    <p>Some text..</p>
                </div> */}
            </div>
        );
    }
}
export default ContentDisplay;