import React,{useEffect,useState} from 'react'
import axios from 'axios'

const App = () => {
  const [item,setItem] = useState([]);
  const [newtask,setNewtask] =useState('');
  useEffect(()=>{
    axios.get('http://localhost:5000/gettask').then(
      arr => setItem(arr.data)
    )
  },[])
  const submitHandler = e =>{
    e.preventDefault();
    axios.post('http://localhost:5000/addtask',{todo:newtask}).then(
      arr => setItem(arr.data)
    )
    setNewtask('');
  }
  const deleteHandler = id =>{
    axios.delete(`http://localhost:5000/delete/${id}`).then(
      arr => setItem(arr.data)
    )
  }
  return (
    <div>
      <center>
        <br/><br/>
        <form onSubmit={submitHandler}>
          <input type="text" value={newtask} onChange={(e)=>setNewtask(e.target.value)}/>
          <input type="submit" value="submit"  />
        </form> <br/>
        
        {item.map(task => <div key={task._id}>
          <h3>{task.todo}</h3><button onClick={()=>deleteHandler(task._id)}>Delete</button>
        </div>)}
      </center>
    </div>
  )
}

export default App