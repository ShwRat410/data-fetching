import { useState } from 'react';
import Places from './Places.jsx';
import { useEffect } from 'react';
import ErrorPage from './ErrorPage.jsx';
import {sortPlacesByDistance} from '../loc.js'
import { fetchAvailablePlaces } from '../http.js'

export default function AvailablePlaces({ onSelectPlace }) {

  const [isFetching,setIsFetching] = useState(false)
  const [availabelPlaces,setAvailabelPlaces] = useState([]);
  const [error,setError]=useState()

  useEffect(()=>{
    async function fetchPlaces(){
      setIsFetching(true)
      try{

        const places = await fetchAvailablePlaces();
        //console.log(places)
        navigator.geolocation.getCurrentPosition((position)=>{
          //console.log(position)
          const sortedPlaces = sortPlacesByDistance(places,position.coords.latitude,position.coords.longitude)
          //console.log(sortedPlaces)
          setAvailabelPlaces(sortedPlaces)
          setIsFetching(false)
          //console.log(availabelPlaces)
        })

      }
      catch(error){
        console.log(error.message)
        setError(error.message||"Could not fetch places, please try again latter")
        setIsFetching(false)
      }
//      setIsFetching(false)
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
