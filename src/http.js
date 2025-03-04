export async function fetchAvailablePlaces(){
    const response = await fetch('http://localhost:3000/places')
    const resData = await response.json()
    //console.log(resData.places)
    if(!response.ok){
      throw new Error("Cannot fetch data.........")
    }
    return resData.places
}

export async function updateUserPlaces(places){
//  try{
    console.log(places)
    const response = await fetch("http://localhost:3000/user-places",{
      method:"PUT",
      body:JSON.stringify({places}),
      headers:{
        "Content-Type":"application/json"
      }
    })
    const resData = await response.json()
    console.log("Inside http.js")
    console.log(resData.message)

    if(!response.ok){
      throw new Error("Unable to update")
    }
    return resData.message
  // }
  // catch(error){
  //   console.log("Inside catch")
  //   console.log(error)
  //   return error.message
  // }

}