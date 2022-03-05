import React, {Component, useReducer} from "react";
import axios from "axios";
import Modal from 'react-awesome-modal';
import './Showdata.css';
//import '../../server/app';
import {ip,port} from "../setIP/setting";

export default class Showdivi extends Component{
    constructor() {
        super();
        this.state ={
            list:[],
            idkey:"",
            full_name:"",
            sex:"",
            divisions:"",
            boxer_fee:"",
            win:"",
            loses:""
        }
      
    }
    componentDidMount() {
        //console.log("before get data");
        this.getData();
        //console.log("after get data");
    }
    getData = () => {
        console.log("before fetch data");
        fetch('/divisions')
            .then(res => res.json())
            .then(list => this.setState({ list }))
        console.log("after fetch data");
    }

    
    render() {
        let {list} = this.state;
        return (
            <div className="App">
                <h2 className="my-4">⚖️  ข้อมูลรุ่นน้ำหนักนักมวย  ⚖️<br/></h2>
                <hr/>
                <div className="container p-3 my-3 bg-dark text-white">
                    <table className="table table-dark">
                        <thead>
                            <tr>
                            <th>Divisions</th>
                            <th>TOTAL</th>
                            </tr>
                        </thead>
                        <tbody>
                                {list.map((fighter) =>{
                                    return(
                                        <tr>
                                            <td>{fighter.divi}</td>
                                            <td>{fighter.total}</td>
                                        </tr>
                                    )})}
                        </tbody>
                    </table>
                </div><br/>
            </div>
        );
    }
}
