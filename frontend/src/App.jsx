import React from 'react'
import "./App.css";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import NoPage from './pages/NoPage';
import { SignUp } from './pages/SignUp';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <RouteHandler />

      </BrowserRouter>
    </>
  )
};

const RouteHandler = () => {
     return (
      <>
       <Routes>
         <Route path="/" element={<Home/>}/>
         <Route path="/signUp" element={<SignUp/>}/>
         <Route path="*" element={<NoPage/>}/>
        
       </Routes>
      </>
     )
}

export default App