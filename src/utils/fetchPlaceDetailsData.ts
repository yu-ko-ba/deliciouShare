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
    iframeUrl: `https://www.google.com/maps/embed/v1/place?key=${environmentVariables.googleCloudApiKey}&q=place_id:${place.data.result.place_id}`
  } as FetchPlaceDetailsDataType
}

export default fetchPlaceDetailsData
