import { BrowserRouter, Routes, Route, Link } from "react-router-dom"


import Home from "./pages/Home"
import Create from "./pages/Create"
import './index.css'

import Update from "./pages/Update"



function App() {
  return (
    <BrowserRouter>
      <nav>

        <h1>Anonymous Thoughs</h1>
        <div className="creates">
          <Link className="homes-create" to="/">Home</Link>
          <Link   to="/create">Create Thoughts</Link>
        </div>
        
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/:id" element={<Update />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
