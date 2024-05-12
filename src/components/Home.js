import React,{useState,useCallback} from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [value,setValue]=useState();
    const navigate=useNavigate();
    const HandleJoinRoom=useCallback(()=>{
        navigate(`/room/${value}`)
    },[navigate,value])
    return (
        <div>
            <input
            value={value}
            onChange={(e)=>setValue(e.target.value)}
            type="text" 
            placeholder='Enter room code' 
            />
            <button onClick={HandleJoinRoom}>Join</button>
        </div>
    )
}

export default Home
