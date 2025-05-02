import { useState } from 'react'
import './App.css'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'  
import About from './components/About'
import WelcomePage from './components/WelcomePage'
import News from './components/News'

function App() {

  return (
    <Router>
      <div className="App">
        <Navbar title="VartaSamachar"/>
        <Routes>
          <Route path="/" element={<News country={"us"} pageSize={5} category={"general"} />} />
          <Route path="/business" element={<News country={"us"} pageSize={5} category={"business"} />} />
          <Route path="/entertainment" element={<News country={"us"} pageSize={5} category={"entertainment"} />} />
          <Route path="/health" element={<News country={"us"} pageSize={5} category={"health"} />} />
          <Route path="/science" element={<News country={"us"} pageSize={5} category={"science"} />} />
          <Route path="/sports" element={<News country={"us"} pageSize={5} category={"sports"} />} />
          <Route path="/technology" element={<News country={"us"} pageSize={5} category={"technology"} />} />

          <Route path="/about" element={<About/>} />
          <Route path="/welcome" element={<WelcomePage/>} />
          <Route path="*" element={<h1>404 Not Found</h1>} />  
        </Routes>
      </div>  
    </Router>
  )
}

export default App


// 9946f9d5838b4bb5ba730391ccfa4346