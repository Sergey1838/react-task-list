import React, { Component } from 'react';
import TaskForm from './TaskForm.js';
import Task from './Task.js';
import Timetable from './Timetable.js';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.addTask = this.addTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.state = {
      taskList: [],
    };
  }

  addTask(task){
    this.setState({
      taskList: this.state.taskList.concat(task),
    });
  }

  deleteTask(name){
    for(let i = 0; i < this.state.taskList.length; i++){
      if(this.state.taskList[i].title === name){
      this.state.taskList.splice(i,1);
        i--;
      }
    }
    this.setState({
        taskList: this.state.taskList
    });
  }


  render() {
    let taskList = this.state.taskList.map(task => {
      return <Task key={`${task.title}${Math.random()*task.start}${Math.random()*task.duration}`} 
        title={task.title}  start={task.start} duration={task.duration} width={task.width} left={task.left}/>
    }
  );
    return (
      <div>
        <Timetable/>
        <TaskForm handleAdd={this.addTask} handleDelete={this.deleteTask}
          taskList={this.state.taskList}/>
        {taskList}
      </div>
    );
  }
}

export default App;
