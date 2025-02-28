import { useState } from 'react';
import Places from './Places.jsx';
import { useEffect } from 'react';

export default function AvailablePlaces({ onSelectPlace }) {

  const [isFetching,setIsFetching] = useState(false)
  const [availabelPlaces,setAvailabelPlaces] = useState([]);

  useEffect(()=>{
    async function fetchPlaces(){
      setIsFetching(true)
      const response = await fetch('http://localhost:3000/places')
      const resData = await response.json()
      setAvailabelPlaces(resData.places)
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
