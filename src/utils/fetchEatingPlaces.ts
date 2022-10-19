import axios from "axios"
import apiUrls from "./apiUrls"

const fetchEatingPlaces = async (base64Image: string) => {
  return await axios.post(
    apiUrls.getEatingPlacesUrl,
    { image: base64Image }
  )
}

export default fetchEatingPlaces
