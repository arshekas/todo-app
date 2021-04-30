import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './App.css';
import Todo from './Todo';
import db from './firebase';
import firebase from 'firebase';

function App() {
  //basically state is for short term memory
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  //when the app loads, we need to listen the database and fetch new todos
  useEffect(() => {
    //this code here fires when the app.js load 
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({ id: doc.id, todo: doc.data().todo})))
    })
  }, []);

  const addTodo = (event) =>
  {
    //this will fire off when we click the button
    event.preventDefault(); //prevent page to get refresh
    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setTodos([...todos, input]);
    setInput('');     //clear up the input after clicking add todo button
  }
  return (
    <div className="App">
      <h1 className="header">Todo App</h1>
      <form>
        <FormControl >
            <InputLabel>✍Write a Todo</InputLabel>
            <Input value={input} onChange={event => setInput(event.target.value)} />
        </FormControl>
        <Button className="add-todo" disabled = {!input} type="submit" onClick={addTodo} variant="contained" color="primary">
          Add Todo
        </Button>
      </form>
   

      <div className="todos">
      <ul>
        {todos.map(todo => (
          <Todo todo={todo} />
        ))}
      </ul>
      </div>

    </div>
  );
}

export default App;
