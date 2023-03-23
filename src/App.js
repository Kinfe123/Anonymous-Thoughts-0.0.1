import { BrowserRouter, Routes, Route, Link } from "react-router-dom"


import Home from "./pages/Home"
import Create from "./pages/Create"
import './index.css'

import Update from "./pages/Update"
import NotFound from "./pages/NotFound"
import About from "./pages/About"
import PostDetail from "./pages/PostDetail"
import BugReport from "./pages/BugReport"



function App() {
  return (
    <BrowserRouter>
      <nav>

       <Link to='/'><h1>Anonymous Thoughts</h1></Link> 
        <div className="creates">
          <Link className="homes-create" to="/">Home</Link>
          <Link to="/create" className="create-tot">Create Thoughts</Link>
          {/* <Link to="/about" className="create-tot">About Anon</Link> */}
         

        </div>
        
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/anon-posts/details/:id" element={<PostDetail />} />
        <Route path="/bug-reports" element={<BugReport />} />
        <Route path='/*' element={<NotFound />}/>
        <Route path="/create" element={<Create />} />
        {/* <Route path="/:id" element={<Update />} /> */}
        <Route path='/about' element={<About />} />
 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
