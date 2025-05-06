import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import WelcomePage from './components/WelcomePage'
import News from './components/News'
import LoadingBar from "react-top-loading-bar";
import { useState } from 'react'

function App() {
  const apiKey = import.meta.env.VITE_NEWS_API_KEY;
  const [progress, setProgress] = useState(0);
  // console.log("API Key from .env:", apiKey);

  return (
    <Router>
      <div className="App">
        <Navbar title="VartaSamachar" />
        <LoadingBar
          color="#f11946"
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
        <Routes>
          <Route path="/" element={<News setProgress={setProgress} apiKey = {apiKey} country={"us"} pageSize={10} category={"general"} />} />
          <Route path="/business" element={<News setProgress={setProgress} apiKey = {apiKey} country={"us"} pageSize={10} category={"business"} />} />
          <Route path="/entertainment" element={<News setProgress={setProgress} apiKey = {apiKey} country={"us"} pageSize={10} category={"entertainment"} />} />
          <Route path="/health" element={<News setProgress={setProgress} apiKey = {apiKey} country={"us"} pageSize={10} category={"health"} />} />
          <Route path="/science" element={<News setProgress={setProgress} apiKey = {apiKey} country={"us"} pageSize={10} category={"science"} />} />
          <Route path="/sports" element={<News setProgress={setProgress} apiKey = {apiKey} country={"us"} pageSize={10} category={"sports"} />} />
          <Route path="/technology" element={<News setProgress={setProgress} apiKey = {apiKey} country={"us"} pageSize={10} category={"technology"} />} />

          <Route path="/about" element={<About />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App


// set env variables on netlify