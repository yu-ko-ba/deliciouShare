import { LoadingButton } from "@mui/lab"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material"
import React, { Dispatch, SetStateAction, useRef, useState } from "react"
import PostDialogEatingPlaceInfoCard from "./PostDialogEatingPlaceInfoCard"
import PostDialogPreviewImageCard from "./PostDialogPreviewImageCard"

type PostDialogPropsType = {
  openFlag: boolean
  setOpenFlag: Dispatch<SetStateAction<boolean>>
}

const PostDialog = ({ openFlag, setOpenFlag }: PostDialogPropsType) => {
  const imageInputRef = useRef(null)

  const [image, setImage] = useState("")

  const [eatingPlaceName, setEatingPlaceName] = useState("")
  const [eatingPlaceAddress, setEatingPlaceAddress] = useState("")
  const [websiteUrl, setWebsiteUrl] = useState("")

  const clearEatingPlaceInfo = () => {
    setEatingPlaceName("")
    setEatingPlaceAddress("")
    setWebsiteUrl("")
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
            <Button
              variant="contained"
              onClick={() => {
                clearEatingPlaceInfo()
                imageInputRef.current.click()
              }}
              fullWidth
            >
              写真を選ぶ
            </Button>
          </Grid>
          <Grid item xs={12}>
            <PostDialogPreviewImageCard
              image={image}
              setEatingPlaceName={setEatingPlaceName}
              setEatingPlaceAddress={setEatingPlaceAddress}
              setEatingPlaceWebsiteUrl={setWebsiteUrl}
              clearEatingPlaceInfo={clearEatingPlaceInfo}
            />
          </Grid>
          <Grid item xs={12}>
            <PostDialogEatingPlaceInfoCard
              eatingPlaceName={eatingPlaceName}
              setEatingPlaceName={setEatingPlaceName}
              eatingPlaceAddress={eatingPlaceAddress}
              setEatingPlaceAddress={setEatingPlaceAddress}
              eatingPlaceWebsiteUrl={websiteUrl}
              setEatingPlaceWebsiteUrl={setWebsiteUrl}
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
          onClick={() => {
            setAddingUserPost(true)
            closeDialog()
            setAddingUserPost(false)
          }}
          disabled={image === ""}
        >
          投稿
        </LoadingButton>
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
