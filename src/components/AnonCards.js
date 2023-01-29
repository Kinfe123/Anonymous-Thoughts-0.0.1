import { useNavigate , Link } from "react-router-dom"
import { supabase } from "../configs/supabaseClient"
import { useEffect, useState } from "react"
import TimeAgo from "javascript-time-ago"
import moment from "moment/moment"
import Unknown from '../assests/unknown.png'

const AnonCards = (props) => {
    const {anon , onDelete  , onHandle} = props
    const [likes , setLikes] = useState(0)
    const [dislikes , setDislikes] = useState(0)
    const [counter , setCounter] = useState(1)
    const [results, setResults] = useState(0)
    const [resultsD , setResultsD] = useState(0)
    const [date , setDate] = useState('')
    const [avgRating  , setAvgRating] = useState(0)

    const updateLikes = async () => {
        const {data , error} = await supabase.from('anon_thoughts').select().eq('id' , anon.id).single()
        setLikes(data.likes+1)
        setResults(data.likes)
        setDislikes(data.dislikes)
        setResults(data.likes)
        setResultsD(data.dislikes)
        var t = new Date(anon.created_at)
        // var st = `${t.getDay()} ${t.getMonth()} ${t.getFullYear()} ${t.getHours()}:${t.getMinutes()}`
        setDate(data.created_at)
        // console.log(timeago);
        // setDate(t)
        // var r = moment.utc(st.toString()).local().startOf('seconds').fromNow()
        // console.log(r)
       
        
      
      
        
       }

   useEffect(()=>{
       


       updateLikes()

   }, [])

//    console.log(date)
   


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
              <div className="wrapper-card">
              <div className="unknown-wrapper">
              <img  className="unknown-png"src={Unknown} alt="Anon Guys" />
             <p>{anon.name} </p>
              </div>
            <h3>{anon.title}</h3>
            <p className="disc">{anon.body}</p>
            </div>


      <div className="placed">

    
        <div className="like-wrapper">
            <div className="buttons">
           <button className="liking" onClick={handleLike}>👍 </button>
           <button className="liking" onClick={handleDisLike}>👎</button>
            </div>
        <div className="card-footer">
        
        <div className="likes">
          <p><b>- {results} </b> like(s)</p>
          <p className="low"><b>- {resultsD}</b> dislike(s)</p>
       
         </div>
         <div className="date-and-time">
            {/* <p>Posted{` ${ moment.utc(date.toString()).local().startOf('seconds').fromNow()}`}</p> */}
            <p> Posted {moment(date).fromNow()}</p>
        </div>

        </div>

       
        

         </div>

         </div>
               </div>
        </>
    )
}

export default AnonCards

{
    /**/
}