import { useEffect, useState } from "react"
import {supabase} from "../configs/supabaseClient"
import { Audio } from "react-loader-spinner"
import {Helmet} from "react-helmet";
import AnonCards from "../components/AnonCards"
const Home = () => {
  

  const [errorMsg , setErrorMsg] = useState(null)
  const [loading , setLoading] = useState(false)
  const [fetchedData , setFetchedData] = useState(null)

  

  const handling = () => {
    setFetchedData(prev=> {
      return prev
    })
  }
  useEffect(()=>{
    setLoading(true)
    const fetchData = async () => {
      const {data , error} = await supabase
        .from('anon_thoughts')
        .select()

      
  
      if (error) {
        setErrorMsg('Could not get anonymous thought due to bad network. Please try again')
        console.log(error)
        setFetchedData(null)
        setLoading(false)

      }
      if(data){
        setFetchedData(data)
        setLoading(false)
        setErrorMsg(null)
      }
    }
   fetchData()
  } , [])

  console.log(fetchedData)
  return (


    <div className="page home">

            <Helmet>
                <meta charSet="utf-8" />
                <title>HOME | Anon-Thoughts</title>
                {/* <link rel="canonical" href="" /> */}
            </Helmet>
      <div className="fixed-header">
      <h2 className="homes">Thoughts</h2>
      <div className="underline"></div>




      </div>
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
     

   
      {errorMsg && <p>{errorMsg}</p>}
      {fetchedData && (
         <div className="smoothies">
             

         {/* order-by buttons */}
         <div className="smoothie-grid">
           {fetchedData.map(anon => (
             <AnonCards key={anon.id} anon={anon} onHandling = {handling}  />
             
           ))}
         </div>
       </div>
      )}
    </div>
  )
}

export default Home