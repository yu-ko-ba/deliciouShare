import { LoadingButton } from "@mui/lab"
import { Card, CardActions, CardContent, CardHeader } from "@mui/material"
import { Auth } from "aws-amplify"
import { useState } from "react"
import InputPasswordTextField from "./InputPasswordTextField"
import SuccessSnackbar from "./SuccessSnackbar"

type Props = {
  user: any
}

const ChangePasswordCard = ({ user }: Props) => {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [reEnteredNewPassword, setReEnteredNewPassword] = useState("")

  const [successSnackbarOpenFlag, setSuccessSnackbarOpenFlag] = useState(false)

  return (
    <Card>
      <CardHeader title="パスワードを変更する" />
      <CardContent>
        <InputPasswordTextField
          label="現在のパスワード"
          value={currentPassword}
          onChange={(e) => {
            setCurrentPassword(e.target.value)
          }}
          margin="dense"
          fullWidth
        />
        <InputPasswordTextField
          label="新しいパスワード"
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value)
          }}
          margin="dense"
          fullWidth
        />
        <InputPasswordTextField
          label="新しいパスワードを再入力"
          value={reEnteredNewPassword}
          onChange={(e) => {
            setReEnteredNewPassword(e.target.value)
          }}
          margin="dense"
          fullWidth
        />
      </CardContent>
      <CardActions>
        <LoadingButton
          variant="outlined"
          onClick={() => {
            Auth.changePassword(user, currentPassword, newPassword)
              .then(() => {
                setSuccessSnackbarOpenFlag(true)
                setCurrentPassword("")
                setNewPassword("")
                setReEnteredNewPassword("")
              })
              .catch((err: Error) => {
                if (process.env.NODE_ENV === "development") {
                  console.log(`Error: ${err}`)
                }
              })
          }}
          disabled={
            !user
            || currentPassword === ""
            || newPassword === ""
            || reEnteredNewPassword === ""
          }
          fullWidth
        >
          変更
        </LoadingButton>
      </CardActions>
      <SuccessSnackbar
        message="変更しました"
        openFlag={successSnackbarOpenFlag}
        setOpenFlag={setSuccessSnackbarOpenFlag}
      />
    </Card>
  )
}

export default ChangePasswordCard
