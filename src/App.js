import './style.css';
import React from "react";
import ButtonRow from "./components/ButtonRow";
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
                if (!(last==="."||last==="/"||last==="*"||last==="-"||last==="+")) {
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
                        <ButtonRow data={[
                            {name:'AC',operator:this.handleAC},
                            {name:'CE',operator:this.handleCE},
                            {name:'%',operator:this.addInput},
                            {name:'/',operator:this.addInput}
                        ]}/>
                    </div>
                    <div className='row'>
                        <ButtonRow data={[
                            {name:'7',operator:this.addInput},
                            {name:'8',operator:this.addInput},
                            {name:'9',operator:this.addInput},
                            {name:'*',operator:this.addInput}
                        ]}/>
                    </div>
                    <div className='row'>
                        <ButtonRow data={[
                            {name:'6',operator:this.addInput},
                            {name:'5',operator:this.addInput},
                            {name:'4',operator:this.addInput},
                            {name:'-',operator:this.addInput}
                        ]}/>
                    </div>
                    <div className='row'>
                        <ButtonRow data={[
                            {name:'3',operator:this.addInput},
                            {name:'2',operator:this.addInput},
                            {name:'1',operator:this.addInput},
                            {name:'+',operator:this.addInput}
                        ]}/>
                    </div>
                    <div className='row'>
                        <ButtonRow data={[
                            {name:'.',operator:this.addInput},
                            {name:'0',operator:this.addInput},
                            {name:'=',operator:this.addInput}
                            ]}/>
                    </div>
                </div>
            </div>
        );
    }

}

export default App;
