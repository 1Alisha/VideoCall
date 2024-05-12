import './App.css';
//import Home from "./components/Home.js"
import RoomPage from "./components/Room/Room.jsx"
import {Routes,Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <>
    <Routes>

      <Route path='/' element={<RoomPage/>}/>
      
    </Routes>
    </>
  );
}

export default App;

