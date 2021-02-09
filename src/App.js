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
    addInput = (val) =>{
        if (val === "."||val==="/"||val==="*"||val==="-"||val==="+"){
            if (val === "."){
                !(this.state.point) &&
                this.setState((s)=>({point:true}),()=>{this.setState({input: this.state.input + val})})
            }else {
                const str = string(this.state.input);
                const last=str.substring(str.length - 1)
                if (!(last==="/"||last==="*"||last==="-"||last==="+")) {
                    this.setState((s) => ({point: false}), () => {
                        this.setState({input: this.state.input + val})
                    })
                }
            }
        }
        else{
            this.setState({input: this.state.input + val})
        }
    }

    handleEqual = () => {
        const str = string(this.state.input);
        const last=str.substring(str.length - 1)
        let g=""
        if (last === "."||last==="/"||last==="*"||last==="-"||last==="+"){
           last==="." ? g=str+"0": g=str.substring(0, str.length - 1)
           this.setState({input:g},()=>{
               this.setState(()=>({ input: math.evaluate(this.state.input) }),
                   ()=>{this.setState(()=>({point:false}))})
               if(string(this.state.input).includes(".")){this.setState(()=>({point:true}))}
           })
        }else{
            this.setState(()=>({ input: math.evaluate(this.state.input) }),
                ()=>{this.setState(()=>({point:false}))})
            if(string(this.state.input).includes(".")){this.setState(()=>({point:true}))}
        }
    };

    getKey = (e) => {
        if (((!isNaN( e.key)) ||  e.key === "."||  e.key === "Enter" ||e.key === "Backspace" ||e.key === "Delete" ||  e.key === "="||  e.key === "+"||  e.key === "-"||  e.key === "*"||  e.key === "/")){
            switch(e.key) {
                case 'Enter':
                    this.handleEqual()
                    break;
                case 'Backspace':
                    this.handleCE()
                    break;
                case 'Delete':
                    this.handleAC()
                    break;
                default:
                    this.addInput(e.key)
            }
        }
    };

    handleAC = () =>{
        this.setState(()=>({input:""}))
        this.setState(()=>({point:false}))
    }
    handleCE = () =>{
        const str = string(this.state.input);
        const last=str.substring(str.length - 1)
        const g=str.substring(0, str.length - 1)
        this.setState({input:g})
        if (last==="."){
            this.setState(()=>({point:false}))
        }
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
                        <Button handleClick={this.handleAC}>AC</Button>
                        <Button handleClick={this.handleCE}>CE</Button>
                        <Button handleClick={this.addInput}>%</Button>
                        <Button handleClick={this.addInput}>/</Button>
                    </div>
                    <div className='row'>
                        <Button handleClick={this.addInput}>7</Button>
                        <Button handleClick={this.addInput}>8</Button>
                        <Button handleClick={this.addInput}>9</Button>
                        <Button handleClick={this.addInput}>*</Button>
                    </div>
                    <div className='row'>
                        <Button handleClick={this.addInput}>6</Button>
                        <Button handleClick={this.addInput}>5</Button>
                        <Button handleClick={this.addInput}>4</Button>
                        <Button handleClick={this.addInput}>-</Button>
                    </div>
                    <div className='row'>
                        <Button handleClick={this.addInput}>3</Button>
                        <Button handleClick={this.addInput}>2</Button>
                        <Button handleClick={this.addInput}>1</Button>
                        <Button handleClick={this.addInput}>+</Button>
                    </div>
                    <div className='row'>
                        <Button handleClick={this.addInput}>.</Button>
                        <Button handleClick={this.addInput}>0</Button>
                        <Button handleClick={() => this.handleEqual()}>=</Button>
                    </div>
                </div>
            </div>
        );
    }

}

export default App;
