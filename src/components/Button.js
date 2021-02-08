import React from 'react'

class Button extends React.Component{
    constructor(propse) {
        super(propse);
    }

     isdelet = (v) =>{return ( v === "AC" || v === "CE");}
     isplus = (v) =>{return ( v === "+");}
        render() {
            return (
                <div className={`button-wrapper ${ this.isdelet(this.props.children) ? "colorbutton" : ""}  ${ this.isplus(this.props.children) ? "tall" : ""}`} onClick={() => this.props.handleClick(this.props.children)}>
                    {this.props.children}
                </div>
            );
        }
}

export default Button