import React from "react";
import {extend} from "mathjs/lib/esm/utils/object";

export class ClearBtn extends React.Component {
    constructor(propse) {
        super(propse);
    }
    render() {
        return (
            <div className="clear-btn" onClick={this.props.handleClear}>
                {this.props.children}
            </div>
        );
    }
};