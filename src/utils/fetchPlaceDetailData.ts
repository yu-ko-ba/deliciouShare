import EatingPlace from "./EatingPlace"
import fetchPlaceDetail from "./fetchPlaceDetail"

const fetchPlaceDetailData = async (placeId: string) => {
  return await fetchPlaceDetail(placeId)
    .then((response) => response.data as EatingPlace)
}

export default fetchPlaceDetailData
