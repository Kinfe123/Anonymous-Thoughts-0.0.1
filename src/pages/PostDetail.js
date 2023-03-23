import { useEffect, useState } from "react"
import { supabase } from "../configs/supabaseClient"
import { Link, useParams } from "react-router-dom"
import { Audio } from "react-loader-spinner"
import Unknown from '../assests/unknown.png'
import {Helmet} from "react-helmet";
import { FaArrowLeft , FaCheck } from "react-icons/fa"

const PostDetail = (props) => {
    const par = useParams()
    
    const [ids , setIds ] = useState(par.id)
    const [errorMsg , setErrorMsg] = useState(null)
    const [postTitle , setPosTitle] = useState()
    const [datas , setDatas] = useState(null)
    const [loading , setLoading] = useState(false)
    const [postDesc , setPostDesc] = useState()
    const [postLikes , ssetPostLikes] = useState()
    const [comments , setComments] = useState([])
    const [postDislikes , setPostDislikes] = useState()
    const [displayComment , setDisplayComment] = useState(false)
    const [comment , setComment] = useState()
    useEffect(()=> {
        setLoading(true)
        const fetchAPost = async () => {
            const {data , error} = await supabase.from('anon_thoughts').select().eq('id', ids).single()
            setDatas(data)
            setComments(data.comments)
            if (error) {
                setErrorMsg('Could not get anonymous thought due to bad network. Please try again')
                console.log(error)
                setDatas(null)
                setLoading(false)
        
              }
              if(data){
                setDatas(data)
                
                setLoading(false)
                setErrorMsg(null)
              }

        }
     fetchAPost()

    } , [])

    useEffect(() => {
        const fetchAPost = async () => {
            const {data , error} = await supabase.from('anon_thoughts').select().eq('id', ids).single()
            setDatas(data)
            setComments(data.comments)
            if (error) {
                setErrorMsg('Could not get anonymous thought due to bad network. Please try again')
                console.log(error)
                setDatas(null)
                setLoading(false)
        
              }
              if(data){
                setDatas(data)
                
                setLoading(false)
                setErrorMsg(null)
              }

        }
     fetchAPost()


    } , [comment , displayComment])
   
    const handleCommentPost = async (e) => {
        e.preventDefault()
        
    
       
        if(comments === null){
            setComments([comment])
            setComment("")
        }
        else{
           
            comments.push(comment)
            setComments(comments)
           
            setComment('')

            // setComments([...comments , comment])
        }
        
        
        const { data, error } = await supabase
                    .from('anon_thoughts')
                    .update([{ comments  }]).eq('id' , ids)


        if(data) {
            console.log("The data logged from the comment - "  , data)
         }else {
             console.log(error)
         }
               
         
        setComments('')
        

    }
    const handleLoad = () => {
        setDisplayComment(!displayComment)
    }
   
    
    return (

        <>
        <div className="post-detail">
                <div className="loading">
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
                marginBottom:"40px",
            
  
    }}
    wrapperClass="wrapper-class"
    visible={loading}

    />
   
    
    </div>
    {datas && (
     <div className="details">
         <Link className="homes-creates back" to="/"> 
             < FaArrowLeft />
         </Link>
         
         <div className="descr">
             <div className="outliner">
                <h2>Title:  {datas.title}</h2>
                <p className="bodies">{datas.body}</p>
                <div className="likesanddislike">
                    <p>{datas.likes} likes</p>
                    <p>{datas.dislikes} Dislikes</p>
                </div>

             </div>
        
             <p>Share Comment</p>
             <textarea type="text" className="comments" onChange={(e) => setComment(e.target.value)} value={comment}/>
             <button className="post-comment" onClick={handleCommentPost}>Post a Comment <span className="post-icon"><FaCheck /></span></button>
             
         </div>
         <span onClick={handleLoad} className="load">  {!displayComment  ? <span>Load Comments  🔽</span>  : <span>Hide Comments  🔼</span> }</span>
         <div>
             {displayComment && comments.length == 1  && comments[0] === "" && "There is no comments yet"}
             {displayComment && comments  && (

                 comments.filter((comment) => comment !== "").map((c) => {
                     return (
                        <div className="smoothie-card single-comment">
                        <div className="wrapper-card ">
                        <div className="unknown-wrapper">
                        <img  className="unknown-png"src={Unknown} alt="Anon Guys" />
                       
                        </div>
                       
                        <p className="disc">{c}</p>
                        </div>
                          </div>
                     )
                 })
                
             )}
         </div>
     </div>
    )}
        </div>



        </>
    )
}
export default PostDetail