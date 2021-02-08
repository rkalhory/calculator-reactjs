import './style.css';
import React from "react";
import Button from "./components/Button";
import Input from "./components/Input";
import * as math from 'mathjs'
import {string} from "mathjs";

class App extends React.Component {
    constructor(propse) {
        super(propse);
        this.state = {
            input:"",
            point:false
        }
    }
    checkchar = (val) =>{
        if (val === "."||val==="/"||val==="*"||val==="-"||val==="+"){
            if (val === "."){
                !(this.state.point) &&
                this.setState((s)=>({point:true}),()=>{this.setState({input: this.state.input + val})})
            }else {
                this.setState((s)=>({point: false}),()=>{this.setState({input: this.state.input + val})})
            }
        }
        else{
            this.setState({input: this.state.input + val})
        }
    }

    handleEqual = () => {
        const str = this.state.input;
        // console.log(this.state.input+"       "+str.substring(str.length - 1)+"     "+str.substring(0, str.length - 1));
        const last=str.substring(str.length - 1)
        if (last === "."||last==="/"||last==="*"||last==="-"||last==="+"){
            let g=str.substring(0, str.length - 1)
           this.setState({input:g},()=>{
               this.setState(()=>({ input: math.evaluate(this.state.input) }))
               if(string(this.state.input).includes(".")){this.setState(()=>({point:true}))}
           })
        }else{
            this.setState(()=>({ input: math.evaluate(this.state.input) }))
            if(string(this.state.input).includes(".")){this.setState(()=>({point:true}))}
        }
    };

    getKey = (e) => {
        if (((!isNaN( e.key)) ||  e.key === "."||  e.key === "Enter" ||  e.key === "="||  e.key === "+"||  e.key === "-"||  e.key === "*"||  e.key === "/")){
            e.key==='Enter' ? this.handleEqual() : this.checkchar(e.key)
        }
    };

    handleClear = () =>{
        this.setState(()=>({input:""}))
        this.setState(()=>({point:false}))
    }

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
                        <Button handleClick={this.handleClear}>AC</Button>
                        <Button handleClick={this.handleClear}>CE</Button>
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
                </div>
            </div>
        );
    }

}

export default App;
