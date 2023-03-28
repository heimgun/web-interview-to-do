import React, { Fragment, useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
} from '@mui/material'
import ReceiptIcon from '@mui/icons-material/Receipt'
import DoneIcon from '@mui/icons-material/Done';
import { TodoListForm } from './TodoListForm'


// // Simulate network
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const fetchTodoLists = () => {
  return sleep(1000).then(() =>
    Promise.resolve({
      '0000000001': {
        id: '0000000001',
        title: 'First List',
        todos: [{
          name: 'First todo of first list!',
          status: false
        }],
      },
      '0000000002': {
        id: '0000000002',
        title: 'Second List',
        todos: [{
          name: 'First todo of first list!',
          status: false
        }],
      },
    })
  )
}

export const TodoLists = ({ style }) => {
  const [todoLists, setTodoLists] = useState({})
  const [activeList, setActiveList] = useState()

  useEffect(() => {
    //kolla så localstorage finns
    var getList = localStorage.getItem("todoLists");
    console.log(getList, 'init');
    if (getList) {
      getList = JSON.parse(getList);
      if (getList['0000000001']?.todos.length > 1 || getList['0000000001']?.todos.length > 1) {
        console.log('added get list');
        setTodoLists(getList);
      }
    }
    else {
      fetchTodoLists().then(setTodoLists);
      console.log('added origin list');
    }
  }, []);

  useEffect(() => {
    updateStorage(todoLists);
    console.log(localStorage.getItem("todoLists"));
  }, [todoLists])

  useEffect(() => {
    console.log(activeList);
  }, [activeList])

  const updateStorage = (items) => {
    if (Object.keys(items).length) {
      localStorage.setItem("todoLists", JSON.stringify(items));
      console.log('changed storage');
    }
  }

  if (!Object.keys(todoLists).length) return null
  return (
    <Fragment>
      <Card style={style}>
        <CardContent>
          <Typography component='h2'>My Todo Lists</Typography>
          <List>
            {Object.keys(todoLists).map((key) => (
              <ListItemButton key={key} onClick={() => setActiveList(key)}>
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary={todoLists[key].title} />
                {todoLists[key].todos.every((todo) => todo.status) ?
                  <ListItemButton>
                    <DoneIcon />
                  </ListItemButton> : ''
                }
              </ListItemButton>
            ))}
          </List>
        </CardContent>
      </Card>
      {todoLists[activeList] && (
        <TodoListForm
          key={activeList} // use key to make React recreate component to reset internal state
          todoList={todoLists[activeList]}
          saveTodoList={(id, { todos }) => {
            const listToUpdate = todoLists[id]
            setTodoLists({
              ...todoLists,
              [id]: { ...listToUpdate, todos },
            })
          }}
        />
      )}
    </Fragment>
  )
}
