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
import APIService from '../../APIService';


export const TodoLists = ({ style }) => {
  const [todoLists, setTodoLists] = useState({})
  const [activeList, setActiveList] = useState()

  useEffect(async () => {
    await APIService.getLists()
      .then((res) => {
        console.log(res);
        setTodoLists(res.data);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          console.log("404 Not found");
        }
        if (error.response.status === 500) {
          console.log("500 Server error");
        }
      })
  }, []);


  const updateAPI = async (id, todos) => {
    await APIService.updateLists(id, todos)
      .then((res) => {
        console.log(res);
        setTodoLists(res.data);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          console.log("404 Not found");
        }
        if (error.response.status === 500) {
          console.log("500 Server error");
        }
      })
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
            updateAPI(id, todos);
          }}
        />
      )}
    </Fragment>
  )
}
