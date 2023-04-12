import React, { useState } from "react";
import FilterButton from "./components/FilterButton";
import Form from "./components/Form";
import Todo from "./components/Todo";
let id_index = 100;

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState('All');
  const addTask = (name) =>
  {
    const new_id = `todo-${id_index++}`;
    const newTask = { id: new_id, name, completed: false };
    setTasks([...tasks, newTask]);
  }
  const toggleTaskCompleted = (id) => {
    setTasks(tasks.map(el => {
      if(el.id === id)
        return {...el, completed:!el.completed};
      return el;
    }));
  }
  const editTask = (id, newName) => {
    setTasks(tasks.map(el => {
      if(el.id === id)
        return {...el, name:newName};
      return el;
    }));
  }
  const deleteTask = (id) => {
    setTasks(tasks.filter((el) => el.id !== id))
  }
  const list_heading = `${tasks.length} ${tasks.length !== 1 ? 'tasks' : 'task'} remaining`;
  const listItems = tasks.map(el => <Todo 
      name={el.name} 
      completed={el.completed} 
      key={el.id} 
      id={el.id} 
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />);
  
  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        <FilterButton name="all"/>
        <FilterButton name="active"/>
        <FilterButton name="completed"/>
      </div>
      <h2 id="list-heading">{list_heading}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {listItems}
      </ul>
    </div>
  );
}

export default App;
