import { useEffect, useState } from "react"
import { supabase } from "../configs/supabaseClient"
import { Link, useParams } from "react-router-dom"
import { Audio } from "react-loader-spinner"
import {Helmet} from "react-helmet";

const PostDetail = (props) => {
    const par = useParams()
    
    const [ids , setIds ] = useState(par.id)
    const [errorMsg , setErrorMsg] = useState(null)
    const [postTitle , setPosTitle] = useState()
    const [datas , setDatas] = useState(null)
    const [loading , setLoading] = useState(false)
    const [postDesc , setPostDesc] = useState()
    const [postLikes , ssetPostLikes] = useState()
    const [postDislikes , setPostDislikes] = useState()
    useEffect(()=> {
        setLoading(true)
        const fetchAPost = async () => {
            const {data , error} = await supabase.from('anon_thoughts').select().eq('id', ids).single()
            setDatas(data)
        
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
         <Link className="homes-creates" to="/"> 
             BACK
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
             <textarea type="text" className="comments"/>
             <button className="post-comment">Post a Comment</button>
             
         </div>
         
     </div>
    )}
        </div>



        </>
    )
}
export default PostDetail