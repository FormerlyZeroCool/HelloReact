import React, { useState } from "react";
import FilterButton from "./components/FilterButton";
import Form from "./components/Form";
import Todo from "./components/Todo";
let id_index = 100;
function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const addTask = (name) =>
  {
    const new_id = `todo-${id_index++}`;
    console.log(new_id)
    const newTask = { id: new_id, name, completed: false };
    setTasks([...tasks, newTask]);
  }
  const find_task = (id) => {
    const tasks_with_id = tasks.filter((el) => el.id === id);
    if(tasks_with_id.length === 1)
    {
      return tasks_with_id[0];
    }
    else if(tasks_with_id.length === 0)
      throw `Exception no to do list items with the ID ${id}`
    else 
      throw "Exception Multiple to do list items with the same ID"
  }
  const toggleTaskCompleted = (id) => {
    const task = find_task(id);
    task.completed = !task.completed;
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
    />);
  
  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask}/>
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
