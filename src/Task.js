import React, { Component } from 'react';
import './Task.css';

class Task extends Component{

    constructor(props){
      super(props);
      this.title = props.title;
      this.styles = {
        top: props.start,
        height: props.duration,
        width: props.width,
        left: props.left,
      };
    }
    
    render(){
      if((this.styles.top >= 0) && (this.styles.top < 540) && (this.styles.height <= 540 - this.styles.top)){
        return(
          <div className="task" style={this.styles}>
            {this.title}
          </div>
        );
      } else{
        return null;
      }
    }
  }

  export default Task;