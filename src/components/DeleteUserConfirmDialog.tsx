import { LoadingButton } from "@mui/lab"
import { Backdrop, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import { Auth } from "aws-amplify"
import { useRouter } from "next/router"
import { Dispatch, SetStateAction, useState } from "react"
import fetchUserPostOutlinesData from "../utils/fetchUserPostOutlinesData"
import removeUserPost from "../utils/removeUserPost"

type Props = {
  userId: string
  openFlag: boolean
  setOpenFlag: Dispatch<SetStateAction<boolean>>
}

const DeleteUserConfirmDialog = ({ userId, openFlag, setOpenFlag }: Props) => {
  const router = useRouter()

  const [yesButtonIsLoading, setYesButtonIsLoading] = useState(false)
  const [backdropOnenFlag, setBackdropOnenFlag] = useState(false)

  const deleteUser = async (userId: string) => {
    const userPosts = await fetchUserPostOutlinesData(userId)
    for await (const p of userPosts) {
      await removeUserPost(p.postId, userId, p.postedTime)
    }
    await Auth.deleteUser()
  }

  return (
    <Dialog
      open={openFlag}
      onClose={() => {
        setOpenFlag(false)
      }}
    >
      <DialogTitle>
        アカウントを削除する
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          本当に削除しますか？
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => {
            setOpenFlag(false)
          }}
          fullWidth
        >
          いいえ
        </Button>
        <LoadingButton
          variant="text"
          loading={yesButtonIsLoading}
          color="error"
          onClick={() => {
            setYesButtonIsLoading(true)
            setBackdropOnenFlag(true)
            deleteUser(userId)
              .then(() => {
                router.push("/sign-up")
              })
              .catch((err: Error) => {
                if (process.env.NODE_ENV === "development") {
                  console.log(`Error: ${err}`)
                }
                setOpenFlag(false)
                setBackdropOnenFlag(false)
                setYesButtonIsLoading(false)
              })
          }}
          disabled={!userId}
          fullWidth
        >
          はい
        </LoadingButton>
      </DialogActions>
      <Backdrop
        open={backdropOnenFlag}
        sx={{
          color: "#ffffff",
          zIndex: (theme) => theme.zIndex.drawer + 1
        }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Dialog>
  )
}

export default DeleteUserConfirmDialog
