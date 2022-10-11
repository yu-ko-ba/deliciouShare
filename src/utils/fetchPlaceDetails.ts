import axios from "axios"
import apiUrls from "./apiUrls"
import environmentVariables from "./environmentVariables"

const fetchPlaceDetails = async (placeId: string) => {
  const details = await axios.get(
    apiUrls.getPlaceDetailsUrl,
    {
      params: {
        key: environmentVariables.googleCloudApiKey,
        place_id: placeId,
        language: "ja"
      }
    }
  )

  return details
}

export default fetchPlaceDetails
