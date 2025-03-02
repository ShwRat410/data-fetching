import { useState } from 'react';
import Places from './Places.jsx';
import { useEffect } from 'react';
import ErrorPage from './ErrorPage.jsx';

export default function AvailablePlaces({ onSelectPlace }) {

  const [isFetching,setIsFetching] = useState(false)
  const [availabelPlaces,setAvailabelPlaces] = useState([]);
  const [error,setError]=useState()

  useEffect(()=>{
    async function fetchPlaces(){
      setIsFetching(true)
      try{
        const response = await fetch('http://localhost:3000/placessss')
        const resData = await response.json()
        console.log(response)
        setAvailabelPlaces(resData.places)
        if(!response.ok){
          throw new Error("Cannot fetch data.........")
        }
      }
      catch(error){
        console.log(error.message)
        setError(error.message||"Could not fetch places, please try again latter")
      }
      setIsFetching(false)
    }
    fetchPlaces()
    // fetch('http://localhost:3000/places').then((response)=>{
    //   return response.json()
    //   .then((resData)=>{
    //     console.log(resData.places)
    //     setAvailabelPlaces(resData.places)
    //   })
    // })
  },[])

  if(error){
    return(
      <ErrorPage title="An error occured" message={error}></ErrorPage>
    )
  }

  return (
    <Places
      title="Available Places"
      places={availabelPlaces}
      isLoading={isFetching}
      loadingText="Fetching places........."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
