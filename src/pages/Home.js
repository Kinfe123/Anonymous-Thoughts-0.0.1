import { useEffect, useState } from "react"
import {supabase} from "../configs/supabaseClient"

import AnonCards from "../components/AnonCards"
const Home = () => {
  

  const [errorMsg , setErrorMsg] = useState(null)
  const [fetchedData , setFetchedData] = useState(null)

  

  const handling = () => {
    setFetchedData(prev=> {
      return prev
    })
  }
  useEffect(()=>{
    const fetchData = async () => {
      const {data , error} = await supabase
        .from('anon_thoughts')
        .select()

      console.log('tHE DATA IS LOGGED BELOW')
      console.log(data)
      if (error) {
        setErrorMsg('Could not fetch data for anonthoughts')
        console.log(error)
        setFetchedData(null)

      }
      if(data){
        setFetchedData(data)
        setErrorMsg(null)
      }
    }
   fetchData()
  } , [])

  console.log(fetchedData)
  return (
    <div className="page home">

      <h2 className="homes">List of Thoughts</h2>
      <div className="underline"></div>

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