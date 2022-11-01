import { LoadingButton } from "@mui/lab"
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import { Auth } from "aws-amplify"
import { useRouter } from "next/router"
import { useState } from "react"
import PasswordInput from "./PasswordInput"
import RequiredInput from "./RequiredInput"

type Props = {
  email: string
  openFlag: boolean
  openFailureSnackbar: ((message: string) => void)
}

const SetNewPasswordDialog = ({ email, openFlag, openFailureSnackbar }: Props) => {
  const router = useRouter()

  const [verifyCode, setVerifyCode] = useState("")

  const [password, setPassword] = useState("")
  const [reEnteredPassword, setReEnteredPassword] = useState("")

  const [changeButtonIsLoading, setChangeButtonIsLoading] = useState(false)

  return (
    <Dialog open={openFlag}>
      <DialogTitle>新しいパスワードに変更する</DialogTitle>
      <DialogContent>
        <RequiredInput
          label="認証コード"
          value={verifyCode}
          onChange={(e) => {
            setVerifyCode(e.target.value)
          }}
          margin="dense"
        />
        <PasswordInput
          label="パスワード"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
          margin="dense"
        />
        <PasswordInput
          label="パスワードを再入力"
          value={reEnteredPassword}
          onChange={(e) => {
              setReEnteredPassword(e.target.value)
            }}
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <LoadingButton
          variant="contained"
          loading={changeButtonIsLoading}
          onClick={() => {
            setChangeButtonIsLoading(true)
            Auth.forgotPasswordSubmit(email, verifyCode, password)
              .then(() => {
                router.push("/")
              })
              .catch((err: Error) => {
                if (process.env.NODE_ENV === "development") {
                  console.log(err)
                }
                openFailureSnackbar("変更に失敗しました")
                setPassword("")
                setReEnteredPassword("")
                setChangeButtonIsLoading(false)
              })
          }}
          disabled={
            verifyCode === ""
            || password === ""
            || reEnteredPassword === ""
            || password !== reEnteredPassword
          }
          fullWidth
        >
          変更
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

export default SetNewPasswordDialog
