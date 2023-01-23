import { useNavigate , Link } from "react-router-dom"
import { supabase } from "../configs/supabaseClient"
import { useEffect, useState } from "react"

const AnonCards = (props) => {
    const {anon , onDelete  , onHandle} = props
    const [likes , setLikes] = useState(0)
    const [dislikes , setDislikes] = useState(0)
    const [counter , setCounter] = useState(1)
    const [results, setResults] = useState(0)
    const [resultsD , setResultsD] = useState(0)
    
    const [avgRating  , setAvgRating] = useState(0)

    const updateLikes = async () => {
        const {data , error} = await supabase.from('anon_thoughts').select().eq('id' , anon.id).single()
        setLikes(data.likes+1)
        setResults(data.likes)
        setDislikes(data.dislikes)
        setResults(data.likes)
      
        
       }

   useEffect(()=>{
       


       updateLikes()

   }, [])
   


   useEffect(()=> {
       const updater = async () => {
        const {data, error} = await supabase.from('anon_thoughts').select().eq('id', anon.id).single()
        setLikes(data.likes+1)
        
        setDislikes(data.dislikes+1)

       }
       updater()


   }, [likes , dislikes])
   
    
    const handleLike = async () => {
       setLikes(likes+1)
        let add = 1
        // const result  = await supabase.from('anon_thoughts').select().eq('id', anon.id).single()
        // console.log('this is from liker: ' , result.data)
        // setCounter(result.data.likes)

    
        const {data , error} = await supabase.from('anon_thoughts').update([{likes}]).eq('id' , anon.id).single()
        
        // setLikes(data.likes + 1)

        updateLikes()
        setResults(likes)
        
      
        
       
        // setLikes(data.likes)

        
        
       

       
    
    }
    const handleDisLike = async () => {

        setDislikes(dislikes + 1)
        
    
        const {data , error} = await supabase.from('anon_thoughts').update([{dislikes}]).eq('id' , anon.id)
        updateLikes()
        setResultsD(dislikes)

       
       
    
    }
   
 


    return (
        <>
         <div className="smoothie-card">

             <p>Anon Guy: <b>{anon.name} </b></p>
            <h3>{anon.title}</h3>
            <p>{anon.body}</p>
            
        <div className="like-wrapper">
            <div className="buttons">
           <button className="liking" onClick={handleLike}>👍 </button>
           <button className="liking" onClick={handleDisLike}>👎</button>
            </div>
        <div className="likes">
          <p><b>{results} </b> like(s)</p>
          <p className="low"><b>{resultsD}</b> dislike(s)</p>
       
         </div>

         </div>
               </div>
        </>
    )
}

export default AnonCards