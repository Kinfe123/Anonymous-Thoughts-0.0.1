import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {supabase} from "../configs/supabaseClient"
import { Audio } from "react-loader-spinner"

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
      console.log('The data logged from creating ')
    

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


  return (
    <div className="page create">
      
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

        <button>Create This Thought</button>


      
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
    visible={true}
/>

       </div>
        </div>

       

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default Create