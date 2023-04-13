import React, { useState, useEffect, useRef } from "react";
import FilterButton from "./components/FilterButton";
import Form from "./components/Form";
import Todo from "./components/Todo";
let id_index = 100;
const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed
};
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState('All');
  const listHeadingRef = useRef(null);
  const prevTaskLength = usePrevious(tasks.length);

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton 
      key={name} 
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));
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
  const listItems = tasks.filter(FILTER_MAP[filter]).map(el => <Todo 
      name={el.name} 
      completed={el.completed} 
      key={el.id} 
      id={el.id} 
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />);
    useEffect(() => {
      if (tasks.length - prevTaskLength === -1) {
        listHeadingRef.current.focus();
      }
    }, [tasks.length, prevTaskLength]);
  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>{list_heading}</h2>
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
