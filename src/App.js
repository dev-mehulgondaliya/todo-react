import { useEffect, useState } from 'react';

import './global.css'
import axios from 'axios';

function App() {
  const [todoList, setTodoList] = useState(null);
  const [todoInput, setTodoInput] = useState('')
  useEffect(()=>{
    const fetchData = async () => {
      const response = await axios.get('http://localhost:4848/todo/list')
      setTodoList(response?.data?.result)
    }
    fetchData()
  },[todoList])

  const handleAddTodo = async() => {
    const response = await axios.post('http://localhost:4848/todo/add',{todoName: todoInput})
    setTodoInput('')
  }

  const handleDeleteTodo = async(id) => {
    const response = await axios.delete(`http://localhost:4848/todo/delete/${id}`)
    const newTodoList = todoList.filter((item)=> item?._id != id);
    setTodoList(newTodoList)
  }

  return (
    <div className='main'>
      <div className='todobox'>
        <div>
          <label>Todo Name</label>
          <div className='todoInput'>
          <input type='text' className='todoText' value={todoInput} onChange={(e)=>setTodoInput(e.target.value)} placeholder='type...'/>
          <button className='addBtn' onClick={()=>handleAddTodo()}>Add Todo</button>
          </div>
        </div>

        <div className='todoList'>
          {
            todoList && todoList.map((todo, index)=>(
              <div key={index} className='todoItem'>
                <span>{todo.todoName}</span>
                <button onClick={()=>handleDeleteTodo(todo?._id)}>delete</button>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;
