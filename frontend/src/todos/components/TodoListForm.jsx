import React, { useState } from 'react'
import { TextField, Card, CardContent, CardActions, Button, Typography, Checkbox } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'


export const TodoListForm = ({ todoList, saveTodoList }) => {
  const [todos, setTodos] = useState(todoList.todos);

  const handleNameChange = (index, event) => {
    event.preventDefault();
    const newData = [...todos];
    newData[index].name = event.target.value;
    setTodos(newData);
  }

  const handleCheckChange = (index, event) => {
    event.preventDefault();
    const newData = [...todos];
    newData[index].status = !newData[index].status;
    setTodos(newData);
  }

  const handleSubmit = () => {
    saveTodoList(todoList.id, { todos });
  }

  return (
    <Card sx={{ margin: '0 1rem' }}>
      <CardContent>
        <Typography component='h2'>{todoList.title}</Typography>
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
        >
          {todos.map((items, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ margin: '8px' }} variant='h6'>
                {index + 1}
              </Typography>
              <TextField
                sx={{ flexGrow: 1, marginTop: '1rem' }}
                label='What to do?'
                value={items.name}
                onChange={(e) => {
                  handleNameChange(index, e);
                }}
              />
              <Checkbox
                value={items.status}
                checked={items.status}
                onChange={(e) => {
                  handleCheckChange(index, e);
                }} />
              <Button
                sx={{ margin: '8px' }}
                size='small'
                color='secondary'
                onClick={() => {
                  setTodos([
                    // immutable delete
                    ...todos.slice(0, index),
                    ...todos.slice(index + 1),
                  ])
                }}
              >
                <DeleteIcon />
              </Button>
            </div>
          ))}
          <CardActions>
            <Button
              type='button'
              color='primary'
              onClick={() => {
                const newItem = { name: '', status: false };
                setTodos([...todos, newItem]);
              }}
            >
              Add Todo <AddIcon />
            </Button>
            <Button type='submit' variant='contained' color='primary'>
              Save
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  )
}
