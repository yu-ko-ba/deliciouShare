import axios from "axios"
import apiUrls from "./apiUrls"

const fetchPlaceDetail = async (placeId: string) => {
  return await axios.post(
    apiUrls.fetchPlaceDetailUrl,
    {
      placeId: placeId
    }
  )
}

export default fetchPlaceDetail
