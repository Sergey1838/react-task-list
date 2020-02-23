import React, { Component } from 'react';
import Timetable from './Timetable.js';
import Task from './Task.js';
import TaskForm from './TaskForm.js';
import './App.css';


class App extends Component {

  constructor(props){
    super(props);
    this.hoursArray = ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'];
    this.addTask = this.addTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.changeTasksParameters = this.changeTasksParameters.bind(this);
    this.state = {
      taskList: [],
    };
  }

  addTask(task){
    let newTaskList = this.changeTasksParameters(this.state.taskList.concat(task));
    this.setState({
      taskList: newTaskList
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

  changeTasksParameters(taskList){
    let crossingTasks = [];
    let singleTasks = [];
    for(let i = 0; i < taskList.length; i++){
      let array = [];
      let firstTaskStart = taskList[i].start;
      let firstTaskEnd = firstTaskStart + taskList[i].duration;
      array.push(taskList[i]);
      for(let j = i; j < taskList.length; j++){
        let secondtTaskStart = taskList[j].start;
        let secondTaskEnd = secondtTaskStart + taskList[j].duration;
        if((!((secondtTaskStart > firstTaskEnd) || (secondTaskEnd < firstTaskStart))) && (i !== j)){
          array.push(taskList[j]);
        } 
      }
      if(array.length === 1){
        array.pop(taskList[i]);
        singleTasks.push(taskList[i]);
      }
      else{
        crossingTasks.push(array);  
      }
    }
    return taskList;
  }


  render() {
    let key = 0;
    let taskList = this.state.taskList.map(task => {
      let t = <Task key={`${task.title}${key}`} 
      title={task.title}  start={task.start} duration={task.duration} width={task.width} left={task.left}/>
      key++;
      return t;
    }
  );
    return (
      <div>
        <Timetable/>
        <TaskForm handleAdd={this.addTask} handleDelete={this.deleteTask}
          taskList={this.state.taskList} hoursArray={this.hoursArray}/>
        {taskList}
      </div>
    );
  }
}

export default App;