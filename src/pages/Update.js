import { useEffect, useState } from "react"
import { useParams, useNavigate } from 'react-router-dom'
import {supabase} from "../configs/supabaseClient"

const Update = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [errorform , setErrorForm] = useState('')
  const [rating, setRating] = useState('')


  useEffect(() => {
    const fetchSmoothie = async () => {
      const { data, error } = await supabase
        .from('smoothies')
        .select()
        .eq('id', id)
        .single()

      if (error) {
        navigate('/', { replace: true })
      }
      if (data) {
        setTitle(data.title)
        setMethod(data.method)
        setRating(data.rating)
      }
    }

    fetchSmoothie()
  }, [id, navigate])

  const updateForm  = async (e) => {
    e.preventDefault()

    const {data , error} = await supabase.from('smoothies').update([{title , method , rating}]).eq('id' , id)

    if(data) {
      navigate('/', { replace: true })
    }
    
      

      

  



   
     
  }

  return (
    <div className="page create">
      <form>
        <label htmlFor="title">Title:</label>
        <input 
          type="text" 
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="method">Method:</label>
        <textarea 
          id="method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        />

        <label htmlFor="rating">Rating:</label>
        <input 
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <button onClick={updateForm}>Update Smoothie Recipe</button>
      </form>
    </div>
  )
}

export default Update