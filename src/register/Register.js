import React, {Component} from "react";
import axios from "axios";
import {ip,port} from "../setIP/setting";

export default class Register extends Component{
    constructor() {
        super();
        this.state = {
            list:[],
            idkey:"",
            full_name:"",
            sex:"",
            d_sex:[],
            divisions:"",
            d_divisions:[],
            boxer_fee:"",
            win:"",
            loses:""
        }
        this.handleChang = this.handleChang.bind(this);
        this.handleClicked = this.handleClicked.bind(this);
    }
    handleChang = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }
    handleClicked(){
        let url = `https://localhost:3000/data`;
        let data = {
            idkey:this.state.idkey,
            full_name:this.state.full_name,
            sex:this.state.sex,
            divisions:this.state.divisions,
            boxer_fee:this.state.boxer_fee,
            wins:this.state.wins,
            loses:this.state.loses
        }
        axios.post(url,data)
        this.setState({
            idkey:"",
            idkey:"",
            full_name:"",
            sex:"",
            divisions:"",
            boxer_fee:"",
            win:"",
            loses:""
        });
    }

    componentDidMount() {
        //console.log("before get data");
        this.getDatadivi();
        this.getDataSex();
        //console.log("after get data");
    }
    getDatadivi = () => {
        console.log("before fetch data");
        fetch('/dpdivisions')
            .then(res => res.json())
            .then(list => this.setState({ d_divisions:list }))
        console.log("after fetch data");
    }
    getDataSex = () => {
        console.log("before fetch data");
        fetch('/dpsex')
            .then(res => res.json())
            .then(list => this.setState({ d_sex:list }))
        console.log("after fetch data");
    }


    render() {
        return(
            <div>
                <div className="App">
                <h2 className="my-4">🏃🏽 Register 📝<br/></h2>
                    <hr/>
                </div>
                <form className="container">
                    <div className="form-group">
                        <label className="text-dark" >ID</label>
                        <input type="text" className="form-control" id="idkey" onChange={this.handleChang} value={this.state.idkey}/>
                    </div>
                    <div className="form-group">
                        <label className="text-dark"  >Full Name</label>
                        <input type="text" className="form-control" id="full_name" onChange={this.handleChang} value={this.state.full_name}/>
                    </div>
                    <div className="form-group">
                        <label className="text-dark"  >SEX</label>
                        <select  className="form-control" id="sex" onChange={this.handleChang} value={this.state.sex} required>
                                <option>SELECT Divisions</option>
                                {this.state.d_sex.map(fighter =>{
                                    return <option>{fighter.dpsex}</option>
                                })}
                            </select>
                    </div>
                    <div className="form-group">
                        <label className="text-dark"  >Divisions</label>
                        <select className="form-control" id="divisions" onChange={this.handleChang} value={this.state.divisions} required>
                                <option>SELECT Divisions</option>
                                {this.state.d_divisions.map(fighter =>{
                                    return <option>{fighter.dpdivi}</option>
                                })}
                            </select>
                    </div>
                    <div className="form-group">
                        <label className="text-dark"  >Boxer's_Fee($)</label>
                        <input type="text" className="form-control" id="boxer_fee" onChange={this.handleChang} value={this.state.boxer_fee}/>
                    </div>
                    <div className="form-group">
                        <label className="text-dark"  >WINS</label>
                        <input type="text" className="form-control" id="wins" onChange={this.handleChang} value={this.state.wins}/>
                    </div>
                    <div className="form-group">
                        <label className="text-dark"  >LOSES</label>
                        <input type="text" className="form-control" id="loses" onChange={this.handleChang} value={this.state.loses}/>
                    </div>
                    <a href="/Showdata">
                    <button type="button" className="button button-dark button-text" onClick={this.handleClicked}>Submit</button>
                    </a>
                </form>
            </div>
        );
    }
}

