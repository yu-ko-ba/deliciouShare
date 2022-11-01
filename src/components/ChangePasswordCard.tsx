import { LoadingButton } from "@mui/lab"
import { Card, CardActions, CardContent, CardHeader } from "@mui/material"
import { Auth } from "aws-amplify"
import { useState } from "react"
import PageProps from "../utils/PageProps"
import InputPasswordTextField from "./InputPasswordTextField"

type Props = {
  user: any
}

const ChangePasswordCard = ({ user, openSuccessSnackbar, openFailureSnackbar }: Props & PageProps) => {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [reEnteredNewPassword, setReEnteredNewPassword] = useState("")

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
                openSuccessSnackbar("変更しました")
                setCurrentPassword("")
                setNewPassword("")
                setReEnteredNewPassword("")
              })
              .catch((err: Error) => {
                if (process.env.NODE_ENV === "development") {
                  console.log(`Error: ${err}`)
                }
                openFailureSnackbar("パスワードの変更に失敗しました")
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
    </Card>
  )
}

export default ChangePasswordCard
