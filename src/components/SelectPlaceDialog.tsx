import { Dialog, DialogTitle, List, ListItem, ListItemText } from "@mui/material"
import { Dispatch, SetStateAction } from "react"
import { FetchEatingPlacesDataType } from "../utils/fetchEatingPlacesData"

type SelectPlaceDialogPropsType = {
  openFlag: boolean
  places: FetchEatingPlacesDataType[]
  onSelect: (selectedPlace: FetchEatingPlacesDataType) => void
}

const SelectPlaceDialog = ({ openFlag, places, onSelect }: SelectPlaceDialogPropsType) => {
  return (
    <Dialog
      open={openFlag}
    >
      <DialogTitle>お店を選んでください</DialogTitle>
      <List>
        {places.map((place) => (
          <ListItem
            button
            onClick={() => {
              onSelect(place)
            }}
            key={place.placeId}
          >
            <ListItemText primary={place.name} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  )
}

export default SelectPlaceDialog
