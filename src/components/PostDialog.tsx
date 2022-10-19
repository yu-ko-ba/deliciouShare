import { LoadingButton } from "@mui/lab"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material"
import React, { Dispatch, SetStateAction, useState } from "react"
import addUserPost from "../utils/addUserPost"
import PostDialogEatingPlaceInfoCard from "./PostDialogEatingPlaceInfoCard"
import PostDialogPreviewImageCard from "./PostDialogPreviewImageCard"
import PostDialogSelectImageButton from "./PostDialogSelectImageButton"

type PostDialogPropsType = {
  openFlag: boolean
  setOpenFlag: Dispatch<SetStateAction<boolean>>
  onPostFinish: () => void
}

const PostDialog = ({
  openFlag,
  setOpenFlag,
  onPostFinish
}: PostDialogPropsType) => {

  const [image, setImage] = useState("")

  const [eatingPlaceName, setEatingPlaceName] = useState("")
  const [eatingPlaceAddress, setEatingPlaceAddress] = useState("")
  const [eatingPlaceWebsiteUrl, setEatingPlaceWebsiteUrl] = useState("")
  const [eatingPlaceId, setEatingPlaceId] = useState("")

  const clearEatingPlaceInfo = () => {
    setEatingPlaceName("")
    setEatingPlaceAddress("")
    setEatingPlaceWebsiteUrl("")
    setEatingPlaceId("")
  }

  const [addingUserPost, setAddingUserPost] = useState(false)

  const closeDialog = () => {
    setImage("")
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
            <PostDialogSelectImageButton
              clearEatingPlaceInfo={clearEatingPlaceInfo}
              setImage={setImage}
            />
          </Grid>
          <Grid item xs={12}>
            <PostDialogPreviewImageCard
              image={image}
              setEatingPlaceName={setEatingPlaceName}
              setEatingPlaceAddress={setEatingPlaceAddress}
              setEatingPlaceWebsiteUrl={setEatingPlaceWebsiteUrl}
              setEatingPlaceId={setEatingPlaceId}
              clearEatingPlaceInfo={clearEatingPlaceInfo}
            />
          </Grid>
          <Grid item xs={12}>
            <PostDialogEatingPlaceInfoCard
              eatingPlaceName={eatingPlaceName}
              setEatingPlaceName={setEatingPlaceName}
              eatingPlaceAddress={eatingPlaceAddress}
              setEatingPlaceAddress={setEatingPlaceAddress}
              eatingPlaceWebsiteUrl={eatingPlaceWebsiteUrl}
              setEatingPlaceWebsiteUrl={setEatingPlaceWebsiteUrl}
              eatingPlaceId={eatingPlaceId}
              setEatingPlaceId={setEatingPlaceId}
              clearEatingPlaceInfo={clearEatingPlaceInfo}
            />
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
        <LoadingButton
          variant="contained"
          loading={addingUserPost}
          onClick={async () => {
            setAddingUserPost(true)
            await addUserPost(
              "1",
              image.slice(23),
              {
                name: eatingPlaceName,
                address: eatingPlaceAddress,
                website: eatingPlaceWebsiteUrl,
                id: eatingPlaceId,
              },
            )
            onPostFinish()
            closeDialog()
            setAddingUserPost(false)
          }}
          disabled={image === ""}
        >
          投稿
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

export default PostDialog
