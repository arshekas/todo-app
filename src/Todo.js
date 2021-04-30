import {  Button, List, ListItem, ListItemText, makeStyles, Modal } from '@material-ui/core';
import db from './firebase';
import React, { useState } from 'react';
import './Todo.css';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';


const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      height:50,  
      width: 285,
      top:'40%',
      marginTop:'-200',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(3, 10, 3, 10),
    },
  }));

function Todo(props) {

    const classes = useStyles();

    const[open, setOpen] = useState(false);

    const[input, setInput] = useState();

    const updateTodo = () =>
    {
        //update the todo with the new input text
        db.collection('todos').doc(props.todo.id).set({
            todo: input
        }, {merge: true});
        setOpen(false);
    }
    return (
        <>
        <Modal 
            open={open}
            onClose={e=> setOpen(false)}
        >
            <div style={{display: 'flex', justifyContent:'center', alignItems: 'center'}} className={classes.paper}>
                <input  style={{height: '30px'}} placeholder={props.todo.todo} value={input} onChange={event => setInput(event.target.value)}/>
                <Button style={{marginLeft: '5px'}} variant="contained" color="primary" onClick={updateTodo}>Edit</Button>
            </div>
        </Modal>
        <List className="todo__list">
        <ListItem>
                <ListItemText className="todo_text" primary={props.todo.todo} />
            </ListItem>
            <EditIcon className="edit-icon" onClick={e => setOpen(true) }>Edit me</EditIcon>
            <DeleteForeverIcon className="delete-icon" onClick={event => db.collection('todos').doc(props.todo.id).delete()} /> 
        </List>
        </>
    )
}

export default Todo;