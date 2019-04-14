import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { parse } from 'url';
import '../node_modules/bulma/css/bulma.css'



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
       markDone={this.props.markDone} />
     );
    }))

    return(
    
      <ul className='menu-list'>
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

       
        <div className={"columns"}> 
          <div className="column"> {this.props.item.value}</div>
        
          <div className="column">
           
          <button className="button is-success" onClick={this.onClickDone}>
          <span>{todoClass}</span>
          </button>
          </div>


          <div className="column">
          <button type="button" className="button is-danger" onClick={this.onClickClose}><span>&times;</span></button>

          </div>
          
          
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
        <input type="text" ref="itemName" className="input is-info" placeholder="Add new task"></input>
        <button className="button is-info">Add</button>
      </form>
    );
  };
}


class ToDoHeader extends Component{
  render(){
    return(
      <h1>Hello User from ToDo List!</h1>
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
<div className="columns is-centered" >

<div class="card column is-half  .is-multiline">


  <header class="card-header columns is-centered">
    <p class="card-header-title column is-half .is-multiline">
    <ToDoHeader/>
    </p>
  </header>
  
  <div class="card-content">
  <TodoList items={this.props.initItems} removeItem={this.removeItem} markDone={this.markDone}/>
     
  </div >
  <footer class="card-footer columns is-centered">
  <div class="column is-half .is-multiline">
  <ToDoForm addItem={this.addItem}/>
  </div>
  
  </footer>
  </div>
      
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
