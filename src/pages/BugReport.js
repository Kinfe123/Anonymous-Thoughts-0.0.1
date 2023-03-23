import { supabase } from "../configs/supabaseClient";
import { useState , useEffect } from "react";
import {FaBug } from 'react-icons/fa'
import { Audio , Bars } from "react-loader-spinner";



const BugReport = () => {
    const [bugs , setBugs ] = useState("");
    const [loading ,setLoading] = useState(false)
    const [error , setError] = useState(null);
    const [successMessage , setSuccessMessage] = useState(null)
    const handleBugReport = async () => {
    setLoading(true)
    if(bugs.length < 10){
        setLoading(false)
        alert("Please write at least 10 characters which describes the bugs that you have found.")
        return 
    }
    else {
        const { data, error } = await supabase
      .from('bugs')
      .insert([{ bugs  }])
      setBugs("")

      if(error) {
          setLoading(false)
          setError("Error has occurred!")
          setSuccessMessage(null)
          setTimeout(()=> {

            setError(null)

          } , 4000)

          
      }
      if(data){
          setError(null)
          setLoading(false)
          setSuccessMessage("Thanks for reporting the bugs to us.")
          setTimeout(()=> {

            setSuccessMessage(null)

          } , 4000)
         
          

      }

    }

    

    
        
    }
    useEffect(()=> {

        window.scrollTo(0, 0)
       } , [])
      
    
    
    return (
        <div className="bugs">
           <p>Please kindly share the bugs that you have got so far.</p>
           <textarea type="text" className="comments bugs-text" onChange={(e) => setBugs(e.target.value)} value={bugs} />
         <div className="along-loader">
          <button className="post-comment bugs-report" onClick={handleBugReport}>Report Bug  <span className="bugs-icon"><FaBug className="bugs-icon"/></span></button>
        <div className="loading-bar">

     
       <Bars
            height="100"
            width="100"
            color="#FFFFFF"
            ariaLabel="audio-loading"
            className="alongloader"
            
            wrapperStyle={{
                position: 'absolute',
                left: '58%',
                zIndex: "1000",
                marginBottom:"40px",
                width:"50px",
                height:"50px",
               
            
        
            }}
            wrapperClass="wrapper-class"
            visible={loading}       
            />
           </div>
       
         </div>


         {/* <p className="red">I dot know what to say to be commened </p> */}
         
          {
          error && <p className="error"> ❌ {error}</p>}
          {successMessage && <p className="success"> ✅ {successMessage} </p>}
        </div>
    )
}
export default BugReport;