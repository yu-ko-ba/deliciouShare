import apiUrls from "./apiUrls"
import environmentVariables from "./environmentVariables"
import fetchPlaceDetails from "./fetchPlaceDetails"

export type FetchPlaceDetailsDataType = {
  name: string
  address: string
  website: string
  iframeUrl: string
}

const fetchPlaceDetailsData = async (placeId: string) => {
  const place = await fetchPlaceDetails(placeId)
  return {
    name: place.data.result.name,
    address: place.data.result.formatted_address,
    website: place.data.result.website,
    iframeUrl: `${apiUrls.getMapsEmbedUrl}?key=${environmentVariables.googleCloudApiKey}&q=place_id:${placeId}`
  } as FetchPlaceDetailsDataType
}

export default fetchPlaceDetailsData
