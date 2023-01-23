import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {supabase} from "../configs/supabaseClient"


const Create = () => {
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [name , setName] = useState('')
  
  const [body , setBody] = useState('')



  const [formError, setFormError] = useState(null)

  const handleSubmit = async (e) => {
    
    e.preventDefault()

    if (!name || !title || !body) {
      setFormError('Please fill in all the fields correctly.')
      return
    }

    const { data, error } = await supabase
      .from('anon_thoughts')
      .insert([{ name, title, body  }])
      console.log('The data logged from creating ')
    

    if (error) {
      console.log(error)
      setFormError('Please fill in all the fields correctly.')
    }
    if (data) {
    
      setFormError(null)
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
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

       

        <button>Create This Thought</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default Create