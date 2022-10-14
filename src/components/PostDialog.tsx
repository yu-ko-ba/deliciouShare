import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from "@mui/material"
import React, { Dispatch, SetStateAction, useRef, useState } from "react"
import fetchEatingPlacesData, { FetchEatingPlacesDataType } from "../utils/fetchEatingPlacesData"
import fetchPlaceDetailData, { Place } from "../utils/fetchPlaceDetailData"
import fetchPlaceDetailsData from "../utils/fetchPlaceDetailsData"
import SelectPlaceDialog from "./SelectPlaceDialog"

type PostDialogPropsType = {
  openFlag: boolean
  setOpenFlag: Dispatch<SetStateAction<boolean>>
}

const PostDialog = ({ openFlag, setOpenFlag }: PostDialogPropsType) => {
  const imageInputRef = useRef(null)

  const [image, setImage] = useState("")
  const [canFetchPlaceInfo, setCanFetchPlaceInfo] = useState(false)

  const [selectPlacesDialogOpenFlag, setSelectPlacesDialogOpenFlag] = useState(false)
  const places = useRef<FetchEatingPlacesDataType[]>([])

  const [eatingPlaceName, setEatingPlaceName] = useState("")
  const [eatingPlaceAddress, setEatingPlaceAddress] = useState("")
  const [websiteUrl, setWebsiteUrl] = useState("")
  const [placeInfoTextFieldIsEnable, setPlaceInfoTextFieldIsEnable] = useState(true)
  const [placeId, setPlaceId] = useState("")

  const setEatingPlaceInfo = (place: Place) => {
    setEatingPlaceName(place.name)
    setEatingPlaceAddress(place.address)
    setWebsiteUrl(place.website)
    setPlaceId(place.id)
  }

  const clearEatingPlaceInfo = () => {
    setEatingPlaceName("")
    setEatingPlaceAddress("")
    setWebsiteUrl("")
    setPlaceId("")
  }

  const [canPost, setCanPost] = useState(false)

  const closeDialog = () => {
    setImage("")
    setCanFetchPlaceInfo(false)
    setCanPost(false)

    clearEatingPlaceInfo()

    setOpenFlag(false)
  }

  return (
    <Dialog
      open={openFlag}
      onClose={() => {
        closeDialog()
      }}
    >
      <DialogTitle>写真を投稿する</DialogTitle>
      <DialogContent>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={() => {
                imageInputRef.current.click()
              }}
              fullWidth
            >
              写真を選ぶ
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardMedia
                component="img"
                image={image}
              />
              <CardActions>
                <Button
                  variant="contained"
                  onClick={async () => {
                    places.current = await fetchEatingPlacesData(image.slice(23))
                    if (places.current.length === 1) {
                      setEatingPlaceInfo(await fetchPlaceDetailData(places.current[0].placeId))
                      return
                    }
                    setSelectPlacesDialogOpenFlag(true)
                  }}
                  disabled={!canFetchPlaceInfo}
                  fullWidth
                >
                  写真の位置情報を元にお店の情報を取得
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="お店の情報" />
              <CardContent>
                <TextField
                  label="名前"
                  margin="dense"
                  value={eatingPlaceName}
                  onChange={(e) => {
                    setEatingPlaceName(e.target.value)
                  }}
                  disabled={placeId !== ""}
                  fullWidth
                />
                <TextField
                  label="住所"
                  margin="dense"
                  value={eatingPlaceAddress}
                  onChange={(e) => {
                    setEatingPlaceAddress(e.target.value)
                  }}
                  disabled={placeId !== ""}
                  fullWidth
                />
                <TextField
                  label="ホームページ"
                  margin="dense"
                  value={websiteUrl}
                  onChange={(e) => {
                    setWebsiteUrl(e.target.value)
                  }}
                  disabled={placeId !== ""}
                  fullWidth
                />
                <TextField
                  label="place ID"
                  margin="dense"
                  value={placeId}
                  onChange={(e) => {
                    if (e.target.value !== "") {
                      setPlaceInfoTextFieldIsEnable(false)
                      return
                    }
                    setPlaceInfoTextFieldIsEnable(true)
                  }}
                  InputProps={{
                    readOnly: true
                  }}
                  disabled={placeId === ""}
                  fullWidth
                />
              </CardContent>
              <CardActions>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setPlaceId("")
                  }}
                  style={{ textTransform: "none" }}
                  fullWidth
                >
                  place IDを消去
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    clearEatingPlaceInfo()
                  }}
                  fullWidth
                >
                  入力内容を消去
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          onClick={() => {
            closeDialog()
          }}
        >
          キャンセル
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            closeDialog()
          }}
          disabled={!canPost}
        >
          投稿
        </Button>
      </DialogActions>
      <input
        type="file"
        accept="image/jpeg"
        ref={imageInputRef}
        onChange={(event) => {
          const imageFile = event.target.files[0]
          const fileReader = new FileReader()
          fileReader.onload = (e) => {
            setImage((e.target!.result as string))
            setCanFetchPlaceInfo(true)
            setCanPost(true)
          }
          fileReader.readAsDataURL(imageFile)
          event.target.value = ""
        }}
        hidden
      />
      <SelectPlaceDialog
        openFlag={selectPlacesDialogOpenFlag}
        places={places.current}
        onSelect={(selectedPlace) => {
          fetchPlaceDetailData(selectedPlace.placeId)
            .then((place) => {
              setEatingPlaceInfo(place)
              setSelectPlacesDialogOpenFlag(false)
            })
        }}
      />
    </Dialog>
  )
}

export default PostDialog
