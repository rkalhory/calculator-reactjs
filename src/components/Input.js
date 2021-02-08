import React from "react";

class Input extends React.Component{
    constructor(propse) {
        super(propse);
    }

    render() {
        return (
            <div className='input'>
                {this.props.input}
            </div>
        );
    }
}

export default Input