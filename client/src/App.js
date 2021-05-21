import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Document from "./components/Document";
import Footer from "./components/Footer";
import {  useEffect, useState } from 'react'
import { io } from "socket.io-client";
import { v4 as uuidv4 } from 'uuid';
import Home from './components/Home';
import Login from './components/Login';

function App() {
  const [socket, setSocket] = useState();
  useEffect(() => {
    const s = io('http://localhost:4000')
    setSocket(s)

    return () => {
      s.disconnect()
    }
  }, [])

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact>
            <Home/>
        </Route>
        <Route path='/add' exact>
            <Redirect to={`/documents/${uuidv4()}`}/>
        </Route>
        <Route path='/login' exact>
            <Login/>  
        </Route>
        <Route path='/documents/:id'>
          <Document socket={socket} />
        </Route>
      </Switch>
        <Footer />
    </BrowserRouter>
  );
}

export default App;
