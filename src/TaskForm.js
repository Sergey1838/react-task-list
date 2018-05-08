import React, { Component } from 'react';
import './TaskForm.css';


class TaskForm extends Component{

    constructor(props){
      super(props);
      this.creationFormValidation = this.creationFormValidation.bind(this);
      this.creatingTaskFromData = this.creatingTaskFromData.bind(this);
      this.addTask = this.addTask.bind(this);
      this.deleteTask = this.deleteTask.bind(this);
      this.creatingStartPropertyFromForm = this.creatingStartPropertyFromForm.bind(this);
      this.findTasksThatCrossNewOne = this.findTasksThatCrossNewOne.bind(this);
      this.changeCrossingAndNewTask = this.changeCrossingAndNewTask.bind(this);
      this.findTasksThatCross = this.findTasksThatCross.bind(this);
      this.changeCrossingTasks = this.changeCrossingTasks.bind(this);
      this.sendRequest = this.sendRequest.bind(this);
      this.titleValidation = this.titleValidation.bind(this);
      this.timeValidation = this.timeValidation.bind(this);
      this.durationValidation = this.durationValidation.bind(this);
      this.hoursArray = ['8','9','10','11','12','1','2','3','4'];
    }
  
    titleValidation(){
      return /\w+/.test(this.refs.title.value);
    }
  
    timeValidation(){
      return ((/[8-9]:[0-5][0-9]/.test(this.refs.start.value)
          || (/1[0-2]:[0-5][0-9]/.test(this.refs.start.value)
          || (/[1-5]:[0-5][0-9]/.test(this.refs.start.value)))));
    }
  
    durationValidation(){
      return (/\d+/.test(this.refs.duration.value));
    }
  
    creationFormValidation(){
      return (this.titleValidation() && this.timeValidation() && this.durationValidation());
    }
  
  
    creatingStartPropertyFromForm(){
      let amountOfHours;
      let splittedHoursAndMinutes = this.refs.start.value.split(':');
  
      for(let i = 0; i < this.hoursArray.length; i++){
        if(splittedHoursAndMinutes[0] === this.hoursArray[i]){
          amountOfHours = i;
        }
      }
      let amountInMinutes = (amountOfHours * 60) + Number.parseInt(splittedHoursAndMinutes[1],10);
      return amountInMinutes;
    }
  
    creatingTaskFromData(config){
     let start = this.creatingStartPropertyFromForm();
     if(Number.parseInt(this.refs.duration.value,10) > 540 - start){
       return;
     }
      return {
        title: this.refs.title.value,
        start,
        duration: Number.parseInt(this.refs.duration.value,10),
        width: config.width,
        left: config.leftForNext
      };
    }
  
    findTasksThatCrossNewOne(){
      let newTaskStart = this.creatingStartPropertyFromForm();
      let newTaskEnd = newTaskStart + Number.parseInt(this.refs.duration.value,10);
      let comparingTaskStart;
      let comparingTaskEnd;
      let crossinngTasks = {};
      
      for(let i = 0; i < this.props.taskList.length; i++){
        comparingTaskStart = this.props.taskList[i].start;
        comparingTaskEnd = comparingTaskStart + this.props.taskList[i].duration;
        if(!((comparingTaskStart > newTaskEnd) || (comparingTaskEnd < newTaskStart))){
          if(!crossinngTasks.hasOwnProperty(this.props.taskList[i].left + '')){
            crossinngTasks[this.props.taskList[i].left + ''] = [];
          }
          crossinngTasks[this.props.taskList[i].left + ''].push(i);
        }
      }
      return crossinngTasks;
    }
  
    changeCrossingAndNewTask(objectOfTasks){
      if((Object.keys(objectOfTasks).length > 0) && (objectOfTasks.hasOwnProperty('45'))){
        let amount = Object.keys(objectOfTasks).length + 1;
        const MAX_WIDTH = 200;
        let width = Math.floor((MAX_WIDTH - amount*2)/amount);
        const FIRST_TASK_LEFT = 45;
        let leftForNext= FIRST_TASK_LEFT;
        for (let arr in objectOfTasks) {
          if(objectOfTasks[arr].length > 0){
            for(let i = 0; i < objectOfTasks[arr].length; i++){
              this.props.taskList[objectOfTasks[arr][i]].width = width;
              this.props.taskList[objectOfTasks[arr][i]].left = leftForNext;
            }
            leftForNext += width + 2;
          }
        }
        return {width,leftForNext};
      }
      else{
        let array = Object.keys(objectOfTasks).map(function(element){
          return +element;
        })
        let minimum = Number.MAX_SAFE_INTEGER;
        for (let index = 0; index < array.length; index++) {
          if(array[index] < minimum){
            minimum = array[index];
          }
        }
        if(Object.keys(objectOfTasks).length > 0){
          return{width: minimum - 2 -45, leftForNext: 45};
        }
        return{width: 198, leftForNext: 45};
      }
    }
  
    findTasksThatCross(){
      let firstTaskStart;
      let firstTaskEnd;
      let comparingTaskStart;
      let comparingTaskEnd;
      let indexesOfCrossingTasks = [];
      
      for(let i = 0; i < this.props.taskList.length; i++){
        let array = [];
        firstTaskStart = this.props.taskList[i].start;
        firstTaskEnd = this.props.taskList[i].duration + firstTaskStart;
        for(let j = i; j < this.props.taskList.length; j++){
          comparingTaskStart = this.props.taskList[j].start;
          comparingTaskEnd = this.props.taskList[j].duration + comparingTaskStart;
          
          if((!((comparingTaskStart > firstTaskEnd) || (comparingTaskEnd < firstTaskStart))) && (i !== j)){
            array.push(i);
            array.push(j);
          } 
        }
        if(array.length > 0){
          indexesOfCrossingTasks.push(array);
          array =[];
        }
      }
      return indexesOfCrossingTasks;
    }
  
    changeCrossingTasks(arrayOfIndexes){
      if(arrayOfIndexes.length > 0){
        for(let i = 0; i < arrayOfIndexes.length; i++){
          let amount = arrayOfIndexes[i].length;
          const MAX_WIDTH = 200;
          let width = Math.floor((MAX_WIDTH - amount*2)/amount);
          const FIRST_TASK_LEFT = 45;
          let leftForNext = FIRST_TASK_LEFT;
          for(let j = 0; j < arrayOfIndexes[i].length; j++){
            this.props.taskList[arrayOfIndexes[i][j]].width = width;
            this.props.taskList[arrayOfIndexes[i][j]].left = leftForNext;
            leftForNext += width + 2;
          }
        }
      }
      else{
        for(let i = 0; i < this.props.taskList.length; i++){
          this.props.taskList[i].width = 198;
          this.props.taskList[i].left = 45;
        }
      } 
    }
  
    
    addTask(event){
      event.preventDefault();
      if(this.creationFormValidation()){
        let objectOfindexes = this.findTasksThatCrossNewOne();
        let config = this.changeCrossingAndNewTask(objectOfindexes);
        let task = this.creatingTaskFromData(config);
        if(task !== undefined){
          this.props.handleAdd(task);
        }
        this.refs.title.value = '';
        this.refs.start.value = '';
        this.refs.duration.value = '';
       }
    } 
  
    deleteTask(event){
      event.preventDefault();
      this.props.handleDelete(this.refs.remove.value);
      let array = this.findTasksThatCross();
      this.changeCrossingTasks(array);
  
      this.refs.remove.value = '';
    }
  
    sendRequest(event){
      event.preventDefault();
      let tmp;
      let arrayForRequest =[];
  
      for(let i = 0; i < this.props.taskList.length; i++){
        tmp = {};
        tmp['start'] = this.props.taskList[i].start;
        tmp['duration'] = this.props.taskList[i].duration;
        tmp['title'] = this.props.taskList[i].title;
        arrayForRequest.push(tmp);
      }
  
      let data = JSON.stringify(arrayForRequest);
      
      let request = new XMLHttpRequest();
      request.open('POST','http://localhost:3000/',true);
      request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      request.send(data);
  
      console.log('If i had a server, i would send this:' + data);
    }
  
    render(){
      return(
        <form>
          <br/>
          <p>form for creating task</p>
          <input type="text" placeholder="Task title" ref="title"/>
          <input type="text" placeholder="Start time (9:00)" ref="start"/>
          <input type="text" placeholder="Duration (min)" ref="duration"/>
          <button onClick={this.addTask}>Add</button>
          <br/>
          <br/>
          <p>form for deleting task(s)</p>
          <input type="text" placeholder="Task(s) title" ref="remove"/>
          <button onClick={this.deleteTask}>Delete</button>
          <br/>
          <br/>
          <span>Send your tasks </span>
          <button onClick={this.sendRequest}>Send</button>
        </form>
        );
      
    }
  }

  export default TaskForm;