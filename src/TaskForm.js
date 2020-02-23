import React,{ Component } from 'react';
import './TaskForm.css';

class TaskForm extends Component{

    constructor(props){
      super(props);
      this.addTask = this.addTask.bind(this);
      this.deleteTask = this.deleteTask.bind(this);
      this.creatingStartPropertyFromForm = this.creatingStartPropertyFromForm.bind(this);
      this.creatTaskFromForm = this.creatTaskFromForm.bind(this);
    }
  
    creatingStartPropertyFromForm(){
      let amountOfHours;
      let splittedHoursAndMinutes = this.refs.start.value.split(':');
  
      for(let i = 0; i < this.props.hoursArray.length; i++){
        if(splittedHoursAndMinutes[0] === this.props.hoursArray[i]){
          amountOfHours = i;
        }
      }
      let amountInMinutes = (amountOfHours * 60) + Number.parseInt(splittedHoursAndMinutes[1],10);
      return amountInMinutes;
    }

    creatTaskFromForm(){
        let task ={};
        task.title = this.refs.title.value;
        task.start = this.creatingStartPropertyFromForm();
        task.duration = +this.refs.duration.value;
        return task;
    }
    
    addTask(event){
        event.preventDefault();
        let task = this.creatTaskFromForm();
        this.refs.title.value = '';
        this.refs.start.value = '';
        this.refs.duration.value = '';
        this.props.handleAdd(task);
    }
  
    deleteTask(event){
      event.preventDefault();
      this.props.handleDelete(this.refs.remove.value);
      this.refs.remove.value = '';
    }
  
    render(){
      return(
        <form>
          <p>form for creating task</p>
          <input type="text" placeholder="Task title" ref="title"/>
          <input type="text" placeholder="Start time (09:00)" ref="start"/>
          <input type="text" placeholder="Duration (min)" ref="duration"/>
          <button onClick={this.addTask}>Add</button>
          <br/>
          <br/>
          <p>form for deleting task(s)</p>
          <input type="text" placeholder="Task(s) title" ref="remove"/>
          <button onClick={this.deleteTask}>Delete</button>
        </form>
        );
    }
  }

export default TaskForm;