import React, { useEffect, useState, useContext } from 'react';
import useForm from '../../hooks/form.js';
import useStickyState from '../../hooks/storage.js';
import { Button, Switch } from '@blueprintjs/core';

import { v4 as uuid } from 'uuid';
import { SettingsContext } from '../../context/Settings.js';

const ToDo = () => {
  
  const settings = useContext(SettingsContext);

  const [list, setList] = useStickyState([]);
  const [incomplete, setIncomplete] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(settings.itemNumber);
  const { handleChange, handleSubmit } = useForm(addItem);


  function addItem(item) {
    console.log(item);
    item.id = uuid();
    item.complete = false;
    setList([...list, item]);
  }

  function deleteItem(id) {
    const items = list.filter( item => item.id !== id );
    setList(items);
  }

  function toggleComplete(id) {

    const items = list.map( item => {
      if ( item.id == id ) {
        item.complete = ! item.complete;
      }
      return item;
    });

    setList(items);

  }

  function setStorage() {

  }

  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
  }, [list]);


  function pagination() {

    //settings.itemNumber is the size of the slice
    let result = list.slice(startIndex, endIndex);

    return result;
  }


  function next() {
    setStartIndex(startIndex + settings.itemNumber);
    setEndIndex(endIndex + settings.itemNumber);
  }

  function previous() {
    setStartIndex(startIndex - settings.itemNumber);
    setEndIndex(endIndex - settings.itemNumber);
  }

  return (
    <>
      <header>
        <h1>To Do List: {incomplete} items pending</h1>
      </header>

      <form onSubmit={handleSubmit}>

        <h2>Add To Do Item</h2>

        <label>
          <span>To Do Item</span>
          <input onChange={handleChange} name="text" type="text" placeholder="Item Details" />
        </label>

        <label>
          <span>Assigned To</span>
          <input onChange={handleChange} name="assignee" type="text" placeholder="Assignee Name" />
        </label>

        <label>
          <span>Difficulty</span>
          <input onChange={handleChange} defaultValue={3} type="range" min={1} max={5} name="difficulty" />
        </label>

        <label>
          <Button type="submit">Add Item</Button>
        </label>

        <label>
          <Switch>Show Completed Tasks</Switch>
        </label>
      </form>


      {pagination().map(item => (
        <div key={item.id}>
          <p>{item.text}</p>
          <p><small>Assigned to: {item.assignee}</small></p>
          <p><small>Difficulty: {item.difficulty}</small></p>
          <Button onClick={() => toggleComplete(item.id)}>Complete: {item.complete.toString()} </Button>
          <hr />
        </div>
      ))}

      <Button onClick={previous}>Previous</Button>
      <Button onClick={next}>Next</Button>
    </>
  );
};


export default ToDo;