import Places from './Places.jsx';
import ErrorPage from './ErrorPage.jsx';
import {sortPlacesByDistance} from '../loc.js'
import { fetchAvailablePlaces } from '../http.js'
import { useFetch } from '../hooks/useFetch.js';

// navigator.geolocation.getCurrentPosition((position)=>{
//   const sortedPlaces = sortPlacesByDistance(places,position.coords.latitude,position.coords.longitude)
//   setAvailabelPlaces(sortedPlaces)
//   setIsFetching(false)
// })

export default function AvailablePlaces({ onSelectPlace }) {

  const {
    fetchedData:availabelPlaces,
    setFetchedData:setAvailabelPlaces,
    isLoading:isFetching,
    error
  } = useFetch(fetchAvailablePlaces,[])

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
