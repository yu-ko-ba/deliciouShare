import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from "@mui/material"
import React, { Dispatch, SetStateAction, useRef, useState } from "react"

type PostDialogPropsType = {
  openFlag: boolean
  setOpenFlag: Dispatch<SetStateAction<boolean>>
}

const PostDialog = ({ openFlag, setOpenFlag }: PostDialogPropsType) => {
  const imageInputRef = useRef(null)

  const [previewImage, setPreviewImage] = useState("")
  const [canFetchPlaceInfo, setCanFetchPlaceInfo] = useState(false)

  const [eatingPlaceName, setEatingPlaceName] = useState("")
  const [eatingPlaceAddress, setEatingPlaceAddress] = useState("")
  const [websiteUrl, setWebsiteUrl] = useState("")
  const [placeInfoTextFieldIsEnable, setPlaceInfoTextFieldIsEnable] = useState(true)
  const [placeId, setPlaceId] = useState("")

  const clearEatingPlaceInfo = () => {
    setEatingPlaceName("")
    setEatingPlaceAddress("")
    setWebsiteUrl("")
    setPlaceId("")
  }

  const [canPost, setCanPost] = useState(false)

  const closeDialog = () => {
    setPreviewImage("")
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
                image={previewImage}
              />
              {(() => {
                if (previewImage !== "") {
                  return (
                    <CardContent>
                      <TextField
                        value={previewImage}
                        multiline
                        maxRows={4}
                        InputProps={{
                          readOnly: true
                        }}
                        fullWidth
                      />
                    </CardContent>
                  )
                }
              })()}
              <CardActions>
                <Button
                  variant="contained"
                  onClick={() => {
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
                  disabled={!placeInfoTextFieldIsEnable}
                  fullWidth
                />
                <TextField
                  label="住所"
                  margin="dense"
                  value={eatingPlaceAddress}
                  onChange={(e) => {
                    setEatingPlaceAddress(e.target.value)
                  }}
                  disabled={!placeInfoTextFieldIsEnable}
                  fullWidth
                />
                <TextField
                  label="ホームページ"
                  margin="dense"
                  value={websiteUrl}
                  onChange={(e) => {
                    setWebsiteUrl(e.target.value)
                  }}
                  disabled={!placeInfoTextFieldIsEnable}
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
                  disabled={placeInfoTextFieldIsEnable}
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
            setPreviewImage((e.target!.result as string))
            setCanFetchPlaceInfo(true)
            setCanPost(true)
          }
          fileReader.readAsDataURL(imageFile)
          event.target.value = ""
        }}
        hidden
      />
    </Dialog>
  )
}

export default PostDialog
