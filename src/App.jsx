import { useRef, useState, useCallback } from 'react';

import Places from './components/Places.jsx';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces.jsx';
import { updateUserPlaces,fetchSavedPlaces } from './http.js'
import ErrorPage from './components/ErrorPage.jsx';
import {useFetch} from './hooks/useFetch.js'


function App() {
  const selectedPlace = useRef();

  const [errorUpdatingPlaces,setErrorUpdatingPlaces] = useState()

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { fetchedData:userPlaces,setFetchedData:setUserPlaces,isLoading,error} = useFetch(fetchSavedPlaces,[]);

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  async function handleSelectPlace(selectedPlace) {
    setUserPlaces((prevPickedPlaces) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }
      return [selectedPlace, ...prevPickedPlaces];
    });
    try{
      await updateUserPlaces([selectedPlace, ...userPlaces]) 
      console.log(`Inside try ${userPlaces}${errorUpdatingPlaces}`)
    }
    catch(error){
      setUserPlaces(userPlaces)
      setErrorUpdatingPlaces({message:error.message || "Failed to update"})
      console.log(`Inside catch ${error.message}`)

    }
  }

  const handleRemovePlace = useCallback(async function handleRemovePlace() {
    setUserPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current.id)
    );

    setModalIsOpen(false);

    try{
      await updateUserPlaces(userPlaces.filter((place)=>place.id !== selectedPlace.current.id))
    }
    catch(error){
      setUserPlaces(userPlaces)
      setErrorUpdatingPlaces({
        message:error.message || "Failed to delete place"
      })
    }

  }, [userPlaces,setUserPlaces]);

  function handleErrorModalClose(){
    setErrorUpdatingPlaces(null)
  }

  return (
    <>
      <Modal open={errorUpdatingPlaces} onClose={handleErrorModalClose}>
        {errorUpdatingPlaces && (<ErrorPage
        title="An error occured"
        message={errorUpdatingPlaces.message}
        onConfirm={handleErrorModalClose}
        ></ErrorPage>)}
      </Modal>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>

        {error && <ErrorPage
        title="An error occured"
        message={error.message}
        ></ErrorPage>
        }

        {!error && (<Places
          title="I'd like to visit ..."
          fallbackText="Select the places you would like to visit below."
          places={userPlaces}
          loadingText="Fetching your places...."
          isLoading={isLoading}
          onSelectPlace={handleStartRemovePlace}
        />)}

        <AvailablePlaces 
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
