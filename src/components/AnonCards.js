import { useNavigate , Link } from "react-router-dom"
import { supabase } from "../configs/supabaseClient"
import { useEffect, useState } from "react"
import {FaClock , FaShare, FaShareAlt, FaShareAltSquare, FaVoicemail} from 'react-icons/fa'
import TimeAgo from "javascript-time-ago"
import moment from "moment/moment"
import {EmailShareButton,
    FacebookShareButton,
    HatenaShareButton,
    InstapaperShareButton,
    LineShareButton,
    LinkedinShareButton,
    LivejournalShareButton,
    MailruShareButton,
    OKShareButton,
    PinterestShareButton,
    PocketShareButton,
    RedditShareButton,
    TelegramShareButton,
    TumblrShareButton,
    TwitterIcon,
    FacebookShareCount,
    TwitterShareButton,
    ViberShareButton,
    VKShareButton,
    WhatsappShareButton,
    WorkplaceShareButton } from 'react-share'
import Unknown from '../assests/unknown.png'
import CryptoJS from "crypto-js"
const AnonCards = (props) => {
    const navigate = useNavigate()
    const {anon , onDelete  , onHandle} = props
    const [propsState , setPropsState ] = useState()
    const [likes , setLikes] = useState(0)
    const [dislikes , setDislikes] = useState(0)
    const [counter , setCounter] = useState(1)
    const [results, setResults] = useState(0)
    const [resultsD , setResultsD] = useState(0)
    const [date , setDate] = useState('')
    const [postId , setPostId] = useState('')
    const [avgRating  , setAvgRating] = useState(0)
    const [angry , setAngry] = useState(0)
    const [love , setLove] = useState(0)
    const [smile , setSmile] = useState(0)
    const [fire , setFire] = useState(0)
    const [big_eye , setEye] = useState(0)

    const updateLikes = async () => {

        const {data , error} = await supabase.from('anon_thoughts').select().eq('id' , anon.id).single()
        setLikes(data.likes)
        setResults(data.likes)
        setAngry(data.angry)
        setSmile(data.smile)
        setFire(data.fire)
        setEye(data.big_eye)
        setLove(data.love)
        setDislikes(data.dislikes)
        setResults(data.likes)
        setResultsD(data.dislikes)
        setPostId(data.id)
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

   useEffect(() => {

  
    //    updateLikes()

   }, [likes , dislikes , love ,big_eye , fire , smile , angry])

//    console.log(date)
   


//    useEffect(()=> {

      
//        const updater = async () => {
//         const {data, error} = await supabase.from('anon_thoughts').select().eq('id', anon.id).single()
//         setLikes(data.likes+1)
        
//         setDislikes(data.dislikes+1)

//        }
//        updater()


//    }, [likes , dislikes , love, smile , angry , fire , eye])
   
    
    // const handleLike = async (e) => {
    //  e.stopPropagation()
    //  // preveting the parent div from being activivated 
    //    setLikes(likes+1)
    //     let add = 1

    
    //     const {data , error} = await supabase.from('anon_thoughts').update([{likes}]).eq('id' , anon.id).single()
        
    //     // setLikes(data.likes + 1)

    //     updateLikes()
    //     setResults(likes)
        
       
    //     // setLikes(data.likes)

       
    
    // }
    // const handleDisLike = async (e) => {
    //     e.stopPropagation()
        

    //     setDislikes(dislikes + 1)
        
    
    //     const {data , error} = await supabase.from('anon_thoughts').update([{dislikes}]).eq('id' , anon.id)
    //     updateLikes()
    //     setResultsD(dislikes)

       
       
    
    // }
   const handleReaction = async (event , props ) => {
        event.stopPropagation()
       
        switch(props){
            case "angry":
                setAngry((angry) => angry + 1)
                setPropsState(angry)
                
                const { } = await supabase.from('anon_thoughts').update([{ angry }]).eq('id' , anon.id)
                
                break;
            case "smile":
                setSmile((smile) => smile+1)


                setPropsState(smile)
                const { } = await supabase.from('anon_thoughts').update([{ smile }]).eq('id' , anon.id)
                break;

            case "love":
                setLove((love) => love+1)
                setPropsState(love)
                const { } = await supabase.from('anon_thoughts').update([{ love }]).eq('id' , anon.id)

                break;
            case "big_eye":
                setEye((eye) => eye+1)
                setPropsState(big_eye)
                const { } = await supabase.from('anon_thoughts').update([{ big_eye }]).eq('id' , anon.id)
                break;
            case "likes":
                setLikes((like) => like+1)
                setPropsState(likes)
                const { } = await supabase.from('anon_thoughts').update([{ likes }]).eq('id' , anon.id)
                break;
            case "dislikes":
                setDislikes((dislike) => dislike+1)
                setPropsState(dislikes)
                const { } = await supabase.from('anon_thoughts').update([{ dislikes }]).eq('id' , anon.id)
                break;

            case "fire":
                setFire((fire) => fire+1)
                setPropsState(fire)
                const { } = await supabase.from('anon_thoughts').update([{ fire }]).eq('id' , anon.id)
                break;
        }

        console.log(props)
        // const { } = await supabase.from('anon_thoughts').update([{ props }]).eq('id' , anon.id)
        // if(data) {
        //     console.log('tHE DATa has been successfully updated ')

        // }else {
        //     console.log(error)
        //     console.log("There is some error in retrieving the data from the database ")
        // }
        
    //    const {data , error} = await supabase.from('anon_thoughts').select().eq('id', anon.id).single()
    //    console.log(data)
   }
    // const encryptWithAES = (postId) => {
    //     const passphrase = "My Secret Passphrase";
    //     return CryptoJS.AES.encrypt(postId, passphrase).toString();
    //   };
    // const encr = encryptWithAES(postId)
    const handleClicks = () => {

        navigate('/anon-posts/details/' + postId)
        
    }
    const handleShare = (e) => {
        e.stopPropagation()

        if (navigator.share) {
            navigator.share({

                // Title that occurs over
                // web share dialog
                title: 'Anon Thoughts ',

                // URL to share
                url: `http://anon-thoughts.vercel.app/anon-posts/details/${anon.id}`
            }).then(() => {
                console.log('Thanks for sharing!');
            }).catch(err => {

                // Handle errors, if occured
                console.log(
                "Error during sharing the post");
                console.log(err);
            });
        } else {

            // Alerts user if API not available 
            alert("Browser doesn't support this API !");
        }
        
    }

   

 
    


    return (
        <>
         <div className="smoothie-card" onClick={handleClicks}>
              <div className="wrapper-card">
              <div className="unknown-wrapper">
                  <div>

                        <img  className="unknown-png"src={Unknown} alt="Anon Guys" />
                      
                  </div>

             <p>{anon.name} </p>
            
              </div>
            <h3>{anon.title}</h3>
            <p className="disc">{anon.body}</p>
            </div>


      <div className="placed">

   
        <div className="like-wrapper">
            <div className="buttons">
           <button className="liking" onClick={
                (e)=>{
                    handleReaction(e , 'likes')
               }
           }>👍{likes} </button>
           <button className="liking" onClick={
               (e)=>{
                    handleReaction(e , 'dislikes')
               }
           }>👎{dislikes}</button>
           <button className="liking" onClick={
                (e)=>{
                    handleReaction(e , 'fire')
               }
           }>🔥{fire} </button>
           <button className="liking" onClick={
                (e)=>{
                    handleReaction(e , 'love')
               }
           }>💛{love}</button>
           <button className="liking" onClick={
                (e)=>{
                    handleReaction(e , 'angry')
               }
           }>😡{angry} </button>
           <button className="liking" onClick={
                (e)=>{
                    handleReaction(e , 'big_eye')
               }
           }>😳{big_eye}</button>
           <button className="liking" onClick={
                (e)=>{
                    handleReaction(e , 'smile')
               }
           }>😁{smile}</button>
            </div>

        <div className="card-footer">
        
        {/* <div className="likes">
          <p><b>- {results} </b> like(s)</p>
          <p className="low"><b>- {resultsD}</b> dislike(s)</p>
       
         </div> */}
              
         <div className="date-and-time">

            <div className="icons-with-text">
            <span ><FaClock /></span>
            <p className="posted-ago">  Posted {moment(date).fromNow()}</p>
    
            </div>

            <div onClick={handleShare}  className="including-share">
                <FaShareAlt /> 
                <p></p>
                 </div> 
            {/* <p>Posted{` ${ moment.utc(date.toString()).local().startOf('seconds').fromNow()}`}</p> */}
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