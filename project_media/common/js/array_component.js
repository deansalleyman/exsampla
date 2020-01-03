import React from 'react';

const numbers = [1, 2, 3, 4, 5];
const todos = [
  {id:1, text:'First', completed: false},
  {id:2, text:'Second', completed: false},
  {id:3, text:'Third', completed: false}
]
const listItems = todos.map((todo) =>
<li key={todo.id.toString()}
>{todo.text}</li>
);


class ArrayComponent extends React.Component {
  constructor(props){
      super(props);

this.state ={numbers: [1, 2, 3, 4, 5],todos: [
  {id:1, text:'First', completed: false},
  {id:2, text:'Second', completed: false},
  {id:3, text:'Third', completed: false}
]};
  }




  render() {

    return(
      <div>
<ul>{listItems}</ul>
      </div>
    );
  }

}

export default ArrayComponent;