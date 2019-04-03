import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { parse } from 'url';


let Todoitems=[];
Todoitems.push({index:1,value:"To do home task from Math",done:false});
Todoitems.push({index:2,value:"Learn Docker",done:false});
Todoitems.push({index:3,value:"Go to shop",done:false});
Todoitems.push({index:4,value:"Become older",done:true});

class TodoList extends Component{
  render(){
    var ToDoItems=this.props.items.map(((item,index)=>{
     return (
       <TodoListItem key={index} item={item} index={index} 
       removeItem={  this.props.removeItem} 
       removeDone={this.props.markDone} />
     );
    }))

    return(
      <ul className='list-group'>
      {ToDoItems}
      </ul>
    );
    
  };
}

class TodoListItem extends Component{
  constructor (props){
    super();
    this.onClickClose=this.onClickClose.bind(this);
    this.onClickDone=this.onClickDone.bind(this);
  }

  onClickClose(){
   var index=parseInt(this.props.index);
   this.props.removeItem(index);
  }

  onClickDone(){
    let index=parseInt(this.props.index);
    this.props.markDone(index);
  }

  render(){
    let todoClass=this.props.item.done?"done":"undone";
    return(
      <li>
        <div className={todoClass}> 
         <span className="glyphicon glyphicon-ok icon" area-hidden="true"
         onClick={this.onClickDone}> 
         </span>
         {this.props.item.value}
         <button type="button" className="close" onClick={this.onClickClose}>&times;</button>
        </div>
      </li>
    );
  };
}

class ToDoForm extends Component{
  constructor(props){
    super(props);
    this.onSubmit=this.onSubmit.bind(this);
  }

  onSubmit(event) {
  event.preventDefault();
  let newItemValue=this.refs.itemName.value;

  if(newItemValue){
    this.props.addItem({newItemValue});
    this.refs.form.reset();
  }
  }

  
  render(){
    return(
      <form ref="form" onSubmit={this.onSubmit} className="form-inline">
        <input type="text" ref="itemName" className="form-control" placeholder="Add new task"></input>
        <button className="btn btn-default">Add</button>
      </form>
    );
  };
}


class ToDoHeader extends Component{
  render(){
    return(
      <h1>Hello Vasyan from ToDo List</h1>
    );
  };
}

class ToDoApp extends Component{
  constructor (props){
    super(props);
    this.addItem=this.addItem.bind(this);
    this.removeItem=this.removeItem.bind(this);
    this.markDone=this.markDone.bind(this);
    this.state={Todoitems:Todoitems};

  }

  addItem(todoItem){
    Todoitems.unshift({
      index:Todoitems.length+1,
      value:todoItem.newItemValue,
      done:false
    });
    this.setState({Todoitems:Todoitems});

  }

  removeItem(itemIndex){
    Todoitems.splice(itemIndex,1);
    this.setState({Todoitems:Todoitems});
  }


  markDone(itemIndex){
    let task=Todoitems[itemIndex];
    Todoitems.splice(itemIndex,1);
    task.done=!task.done;
    task.done?Todoitems.push(task):Todoitems.unshift(task)
    this.setState({Todoitems:Todoitems});

  }

  render(){
    return(
      <div>
       <ToDoHeader/>
       <TodoList items={this.props.initItems} removeItem={this.removeItem} markDone={this.markDone}/>
       <ToDoForm addItem={this.addItem}/>
       </div>
    );
    
  }
}
class App extends Component {
  render() {
    return (
      <div className="App">
       <ToDoApp initItems={Todoitems}></ToDoApp>
      </div>
    );
  }
}

export default App;
