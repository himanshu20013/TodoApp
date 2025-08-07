import { useState,useEffect } from 'react'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa"
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';


import './App.css'

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(false)

  useEffect(() => {
    let todosString = localStorage.getItem("todos")
    if(todosString){
   let todos = JSON.parse(localStorage.getItem("todos"))
   setTodos(todos)
    }
  }, [])
  

  const saveToLS = (params)=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  }

  const toggleFinished =(e)=>{
    setshowFinished(!showFinished)

  }



  const handleEdit = (e,id) => {
    let t= todos.filter(i=>i.id===id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  }
  const handleDelete = (e,id) => {
    let index=todos.findIndex(item=>{
      return item.id=== id;

    });
    let newTodos = todos.filter(item=>{
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();

  }
  const handleAdd = () => {   
    setTodos([...todos,{ id : uuidv4(), todo ,isCompleted: false}])
    setTodo("") 
    saveToLS();

  }
  const handleChange = (e) => {
    setTodo(e.target.value)

  }

  const handleCheckbox = (e) => {
    let id= e.target.name;
    let index= todos.findIndex(item=>{
      return item.id === id
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS();

  }

  return (
    <>
    <Navbar/>
      <div className=" mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-1/2">
      <h1 className='font-bold text-center text-3xl'>i-Task Manage Your Todo At One Place</h1>
        <div className="addtodo my-5 flex gap-4 flex-col ">
          <h2 className='text-2xl font-bold '>Add a todo</h2>
          <input onChange={handleChange} value={todo} type="text" className='w-full bg-amber-50 rounded-lg px-5 py-1  '/>
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-800 hover:bg-violet-950  disabled: bg-violet-700 p-2 text-sm font-bold py-1 text-white rounded-md  '>Save</button>
        </div>
        <input className='my-4' onChange={toggleFinished} type="checkbox" checked={showFinished} /> Show Finished 
          <h2 className='text-2xl font-bold'>Your Todo</h2>
          
          <div className="todos">
            {todos.length ===0 && <div className='m-5'>No todo to display</div>}
            {todos.map(item=>{

           
           return (showFinished || !item.isCompleted)&& <div key={item.id} className="todo flex my-3 justify-between">
            <div className='flex gap-5'>
            <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted}  id="" />
              <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
              </div >
              <div className="buttons flex h-full">
                <button onClick={ (e)=>handleEdit(e,item.id)} className='bg-violet-800 hover:bg-violet-950 p-2 text-sm font-bold py-1 text-white rounded-md mx-1 '>    <FaEdit /></button>
                <button onClick={(e)=>{handleDelete(e,item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 text-sm font-bold py-1 text-white rounded-md mx-1 '><MdDelete /></button>
              </div>

            </div>
             })}
          </div>
        
      </div>
    </>
  )
}

export default App
