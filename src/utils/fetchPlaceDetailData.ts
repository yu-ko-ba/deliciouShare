import fetchPlaceDetail from "./fetchPlaceDetail"

type Place = {
  name: string
  address: string
  website: string
  id: string
}

const fetchPlaceDetailData = async (placeId: string) => {
  const d = (await fetchPlaceDetail(placeId)).data
  return {
    name: d.name,
    address: d.address,
    website: d.website,
    id: placeId
  } as Place
}

export default fetchPlaceDetailData
