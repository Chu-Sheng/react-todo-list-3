import React, { Component } from 'react'
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

import 'bootstrap/dist/css/bootstrap.min.css';
import {v4 as uuidv4} from 'uuid';

 class App extends Component {
  state={
    items:[],
    id:uuidv4(),
    item:'',
    editItem: false
  }
  handleChange = (e) => {
    this.setState({
      item:e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      id: this.state.id,
      title: this.state.item
    }
    // console.log('1 todolist newItem: ', newItem);
    // console.log('1 todolist state: ', this.state);
    if (this.state.editItem === false) {
      const updatedItems = [...this.state.items, newItem]
      this.setState({
        items: updatedItems,
        item: '',
        id: uuidv4(),
        editItem:false
      })
    } else {
      const updatedItems = this.state.items.map(unitItem => {
        if (unitItem.id === this.state.id) {
          unitItem.title = this.state.item
        }
        return unitItem
      }) 
      this.setState({
        items: updatedItems,
        item: '',
        editItem: false
      })
    }
  }
  clearList = () => {
    this.setState({
      items:[]
    })
  }
  handleDelete = (id) => {
    const filteredItems = this.state.items.filter(item => item.id !== id);
    this.setState({
      items: filteredItems
    })
  }
  handleEdit = (id) => {
    // console.log(id);
    // const filteredItems = this.state.items.filter(item => item.id !== id);
    const selectedItem = this.state.items.find(item => item.id === id);

    this.setState({
      // items: filteredItems,
      item: selectedItem.title,
      editItem: true,
      id: id
    })

  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-10 mx-auto col-md-8 mt-4"></div>
          <h3 className="text-capitalize text-center">todo input</h3>
          <TodoInput 
            item={this.state.item} 
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit} 
            editItem={this.state.editItem} 
          />
          <TodoList 
            items={this.state.items} 
            clearList={this.clearList} 
            handleDelete={this.handleDelete} 
            handleEdit={this.handleEdit}
          />
        </div>
      </div>
    )
  }
}
export default App
