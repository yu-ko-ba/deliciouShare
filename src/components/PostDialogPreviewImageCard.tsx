import { LoadingButton } from "@mui/lab"
import { Card, CardActions, CardMedia } from "@mui/material"
import { Dispatch, SetStateAction, useRef, useState } from "react"
import EatingPlace from "../utils/EatingPlace"
import fetchEatingPlacesData, { FetchEatingPlacesDataType } from "../utils/fetchEatingPlacesData"
import fetchPlaceDetailData from "../utils/fetchPlaceDetailData"
import SelectPlaceDialog from "./SelectPlaceDialog"

type PostDialogPreviewImageCardProps = {
  image: string
  setEatingPlaceName: Dispatch<SetStateAction<string>>
  setEatingPlaceAddress: Dispatch<SetStateAction<string>>
  setEatingPlaceWebsiteUrl: Dispatch<SetStateAction<string>>
  setEatingPlaceId: Dispatch<SetStateAction<string>>
  clearEatingPlaceInfo: () => void
}

const PostDialogPreviewImageCard = ({
  image,
  setEatingPlaceName,
  setEatingPlaceAddress,
  setEatingPlaceWebsiteUrl,
  setEatingPlaceId,
  clearEatingPlaceInfo
}: PostDialogPreviewImageCardProps) => {

  const [searchingPlaces, setSearchingPlaces] = useState(false)
  const places = useRef<FetchEatingPlacesDataType[]>([])

  const setEatingPlaceInfo = (place: EatingPlace) => {
    setEatingPlaceName(place.name)
    setEatingPlaceAddress(place.address)
    setEatingPlaceWebsiteUrl(place.website)
    setEatingPlaceId(place.id)
  }

  const [selectPlaceDialogOpenFlag, setSelectPlaceDialogOpenFlag] = useState(false)

  const searchEatingPlaces = async () => {
    if (image === "") {
      return
    }
    places.current = await fetchEatingPlacesData(image.slice(23))
      if (places.current.length <= 0) {
        return
      }
    if (places.current.length === 1) {
      setEatingPlaceInfo(await fetchPlaceDetailData(places.current[0].placeId))
        return
    }
    setSelectPlaceDialogOpenFlag(true)
  }

  return (
    <Card>
      <CardMedia
        component="img"
        image={image}
      />
      <CardActions>
        <LoadingButton
          variant="contained"
          loading={searchingPlaces}
          onClick={async () => {
            clearEatingPlaceInfo()
            setSearchingPlaces(true)
            await searchEatingPlaces()
            setSearchingPlaces(false)
          }}
          disabled={image === ""}
          fullWidth
        >
          写真の位置情報を元にお店の情報を取得
        </LoadingButton>
      </CardActions>
      <SelectPlaceDialog
        openFlag={selectPlaceDialogOpenFlag}
        places={places.current}
        onSelect={(selectedPlace) => {
          fetchPlaceDetailData(selectedPlace.placeId)
            .then((place) => {
              setEatingPlaceInfo(place)
              setSelectPlaceDialogOpenFlag(false)
            })
        }}
      />
    </Card>
  )
}

export default PostDialogPreviewImageCard
