import React, {Component, useReducer} from "react";
import axios from "axios";
import Modal from 'react-awesome-modal';
import './Showdata.css';
//import '../../server/app';
import {ip,port} from "../setIP/setting";

export default class Showdata extends Component{
    constructor() {
        super();
        this.state ={
            list:[],
            idkey:"",
            full_name:"",
            sex:"",
            divisions:"",
            boxer_fee:"",
            wins:"",
            loses:"",
            
        }
        this.handleChang = this.handleChang.bind(this);
        this.handleClicked = this.handleClicked.bind(this);
        //console.log("hello show data");
    }
    componentDidMount() {
        //console.log("before get data");
        this.getData();
        //console.log("after get data");
    }
    getData = () => {
        console.log("before fetch data");
        fetch('/data')
            .then(res => res.json())
            .then(list => this.setState({ list }))
        console.log("after fetch data");
    }

    onDelete=(user)=>{
        let url = `https://localhost:3000/delete`;
        let data = {
            idkey:user.id
        }
        axios.put(url,data)
        setTimeout(()=>{this.componentDidMount()},1)
    }

    openModal() {
        this.setState({
            visible : true
        });

    }
    closeModal() {
        this.setState({
            visible : false
        });
    }
    call=(user)=>{
        this.openModal();
        this.setState({
            idkey:user.id,
            full_name:user.full_name,
            sex:user.sex,
            divisions:user.divisions,
            boxer_fee:user.boxer_fee,
            wins:user.wins,
            loses:user.loses
        })
    }
    handleChang = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
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
        axios.put(url,data)
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
        axios.put(url,data)
        this.setState({
            idkey:"",
            full_name:"",
            sex:"",
            divisions:"",
            boxer_fee:"",
            wins:"",
            loses:"",
        });
	this.closeModal();
        setTimeout(()=>{this.componentDidMount()},1)
    }
    render() {
        let {list} = this.state;

        return (
            <div className="App">
                <h2 className="my-4">🥊 ข้อมูลนักมวยทั้งหมดที่มี 🥊<br/></h2>
                <hr/>
                <div className="container p-3 my-3 bg-dark text-white">
                    <table className="table table-dark">
                        <thead>
                            <tr>
                            <th>ID</th>
                            <th>Full Name</th>
                            <th>SEX</th>
                            <th>Divisions</th>
                            <th>Boxer's_fee($)</th>
                            <th>WINS</th>
                            <th>LOSES</th>
                            </tr>
                        </thead>
                        <tbody>
                                {list.map((user) =>{
                                    return(
                                        <tr>
                                            <td>{user.id}</td>
                                            <td>{user.full_name}</td>
                                            <td>{user.sex}</td>
                                            <td>{user.divisions}</td>
                                            <td>{user.boxer_fee}</td>
                                            <td>{user.wins}</td>
                                            <td>{user.loses}</td>
                                            <td><button type="button" class="btn btn-warning" onClick={()=>this.call(user)}>Edit</button></td>
                                            <td><button type="button" class="btn btn-danger"  onClick={()=>this.onDelete(user)}>Delete</button></td>
                                            <div className="box">
                                                <Modal visible={this.state.visible}
                                                       width="1200"
                                                       height="750"
                                                       effect="fadeInUp"
                                                       onClickAway={() => this.closeModal()}
                                                >
                                                    <form className="container" id='form'>
                                                        <div className="form-group">
                                                            <h3><label htmlFor="id">ID: {this.state.idkey}<br/></label></h3>
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Full Name:</label>
                                                            <input type="text" className="form-control" id="full_name" onChange={this.handleChang} value={this.state.full_name}/>
                                                        </div>
                                                        <div className="form-group">
                                                            <label>SEX:</label>
                                                            <input type="text" className="form-control" id="sex" onChange={this.handleChang} value={this.state.sex}/>
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Divisions:</label>
                                                            <input type="text" className="form-control" id="divisions" onChange={this.handleChang} value={this.state.divisions}/>
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Boxer's_fee($):</label>
                                                            <input type="text" className="form-control" id="boxer_fee" onChange={this.handleChang} value={this.state.boxer_fee}/>
                                                        </div>
                                                        <div className="form-group">
                                                            <label>WINS:</label>
                                                            <input type="text" className="form-control" id="wins" onChange={this.handleChang} value={this.state.wins}/>
                                                        </div>
                                                        <div className="form-group">
                                                            <label>LOSES:</label>
                                                            <input type="text" className="form-control" id="loses" onChange={this.handleChang} value={this.state.loses}/>
                                                        </div>
                                                        <button type="button" className="btn btn-primary" onClick={this.handleClicked}>Submit</button>
                                                    </form>
                                                </Modal>
                                            </div>
                                        </tr>
                                    )})}
                        </tbody>
                    </table>
                </div><br/>
            </div>
        );
    }
}
