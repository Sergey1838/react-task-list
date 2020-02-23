import React, { Component } from 'react';
import './Task.css';

class Task extends Component{
    constructor(props){
        super(props);
        this.validate = this.validate.bind(this);
        this.title = props.title;
        this.altered = false;
        this.style = {
            top: props.start,
            height: props.duration,
            left: props.left + 45,
            width: props.width
        };
        if(props.width === undefined){
            this.style.width = 198;
        }
        if(props.left === undefined){
            this.style.left = 45;
        }
    }

    validate(){
        if(isNaN(this.props.start) || (this.props.duration >= 1440 - this.props.start)){
            return false;
        }
        else {
            return true;
        }
    }

    render(){
        if(this.validate()){
            return (
                <div className="task" style={this.style}>
                    {this.title}
                </div>
            );
        }
        else {
            return null;
        }
    }
}

export default Task;