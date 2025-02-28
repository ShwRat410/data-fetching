import { useState } from 'react';
import Places from './Places.jsx';
import { useEffect } from 'react';

export default function AvailablePlaces({ onSelectPlace }) {

  const [availabelPlaces,setAvailabelPlaces] = useState([]);

  useEffect(()=>{
    async function fetchPlaces(){
      const response = await fetch('http://localhost:3000/places')
      const resData = await response.json()
      setAvailabelPlaces(resData.places)
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
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
