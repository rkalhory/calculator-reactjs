import './style.css';
import React from "react";
import Button from "./components/Button";
import Input from "./components/Input";
import * as math from 'mathjs'
import {ClearBtn} from "./components/ClearBtn";

class App extends React.Component {
    constructor(propse) {
        super(propse);
        this.state = {
            input:"",
            point:false
        }
    }
    checkchar = (val) =>{
        console.log('checkchar')
        if (val === "."||val==="/"||val==="*"||val==="-"||val==="+"||val==="Enter"){
            console.log('if')
            if (val === "."){
                this.setState((s)=>({point:true}))
            }else {
                this.setState((s)=>({point: false}))
            }
            console.log(this.state.point)
            this.addinput(val)
        }else{
            console.log('else')
            this.addinput(val)
        }

    }
    addinput = (val) =>{
        console.log('addinput')
        if (!(val==="."&& this.state.point)){
            console.log('addinput if')
            this.setState({input: this.state.input + val})
        }
    }

    handleEqual = () => {
        this.setState({ input: math.evaluate(this.state.input) });
    };


    getKey = (e) => {
        if (((!isNaN( e.key)) ||  e.key === "."||  e.key === "Enter" ||  e.key === "="||  e.key === "+"||  e.key === "-"||  e.key === "*"||  e.key === "/")){
            e.key==='Enter' ? this.handleEqual() : this.checkchar(e.key)
        }

    };

    componentDidMount(){
        document.addEventListener("keydown", this.getKey);
    }
    componentWillUnmount() {
        document.removeEventListener("keydown", this.getKey);
    }

    render(){
        return (
            <div className="app">
                <div className="calc-wrapper">
                    <p id='title'>my calculator</p>
                    <Input input={this.state.input}/>
                    <div className='row'>
                        <Button handleClick={this.checkchar}>AC</Button>
                        <Button handleClick={this.checkchar}>CE</Button>
                        <Button handleClick={this.checkchar}>%</Button>
                        <Button handleClick={this.checkchar}>/</Button>
                    </div>
                    <div className='row'>
                        <Button handleClick={this.checkchar}>7</Button>
                        <Button handleClick={this.checkchar}>8</Button>
                        <Button handleClick={this.checkchar}>9</Button>
                        <Button handleClick={this.checkchar}>*</Button>
                    </div>
                    <div className='row'>
                        <Button handleClick={this.checkchar}>6</Button>
                        <Button handleClick={this.checkchar}>5</Button>
                        <Button handleClick={this.checkchar}>4</Button>
                        <Button handleClick={this.checkchar}>-</Button>
                    </div>
                    <div className='row'>
                        <Button handleClick={this.checkchar}>3</Button>
                        <Button handleClick={this.checkchar}>2</Button>
                        <Button handleClick={this.checkchar}>1</Button>
                        <Button handleClick={this.checkchar}>+</Button>
                    </div>
                    <div className='row'>
                        <Button handleClick={this.checkchar}>.</Button>
                        <Button handleClick={this.checkchar}>0</Button>
                        <Button handleClick={() => this.handleEqual()}>=</Button>
                    </div>
                    {/*<div className="row">*/}
                    {/*    <ClearBtn handleClear={() => this.setState({ input: "" })}>*/}
                    {/*        Clear*/}
                    {/*    </ClearBtn>*/}
                    {/*</div>*/}
                </div>
            </div>
        );
    }

}

export default App;
