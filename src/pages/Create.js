import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {supabase} from "../configs/supabaseClient"
import { Audio } from "react-loader-spinner"

import {Helmet} from 'react-helmet'

const Create = () => {
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [name , setName] = useState('')
  
  const [body , setBody] = useState('')
  const [loading , setLoading] = useState(false)


  const [formError, setFormError] = useState(null)

  const handleSubmit = async (e) => {
    
    e.preventDefault()
    setLoading(true)

    if (!name || !title || !body) {
      setLoading(false)
      setFormError('Please fill in all the fields correctly.')
      return
    }

    const { data, error } = await supabase
      .from('anon_thoughts')
      .insert([{ name, title, body  }])
     
    

    if (error) {
      console.log(error)
      setLoading(false)
      setFormError('Please fill in all the fields correctly.')
    }
    if (data) {
    
      setFormError(null)
      setLoading(false)
      navigate('/')
    }
  }
 useEffect(()=> {

  window.scrollTo(0, 0)
 } , [])

  return (
    <div className="page create">
             <Helmet>
                <meta charSet="utf-8" />
                <title>Create Thoughts | Anon-Thoughts</title>
                {/* <link rel="canonical" href="http://mysite.com/example" /> */}
            </Helmet>
      
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">What do you want to be called:</label>
        <input 
          type="text" 

          
          id="title"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
          <label htmlFor="title">Title:</label>
        <input 
          type="text" 
 
          
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="method">Tell Them What You Got:</label>
        <textarea 
          id="method"
          maxLength={200}
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        <div className="together">

        <button>Post This Thought</button>


      
       <div className="loading-for-create">
       <Audio
      height="100"
      width="100"
      color="#5e10ee"
      ariaLabel="audio-loading"
      className="loader"
    
      wrapperStyle={{
        position: 'absolute',
        left: '45%',
        zIndex: "1000",
        width:"50px",
        height:"50px",
        marginBottom:"20px",
    
  
    }}
    wrapperClass="wrapper-class"
    visible={loading}
/>

       </div>
        </div>

       

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default Create