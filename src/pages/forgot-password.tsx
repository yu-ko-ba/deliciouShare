import { LoadingButton } from "@mui/lab"
import { Card, CardActions, CardContent, CardHeader, Container, Grid } from "@mui/material"
import { Auth } from "aws-amplify"
import React, { useState } from "react"
import DelicioushareHead from "../components/DelicioushareHead"
import RequiredInput from "../components/RequiredInput"
import SetNewPasswordDialog from "../components/SetNewPasswordDialog"
import PageProps from "../utils/PageProps"

const ForgotPassword = ({openFailureSnackbar, openSuccessSnackbar}: PageProps) => {
  const [email, setEmail] = useState("")
  const [sendButtonIsLoading, setSendButtonIsLoading] = useState(false)

  const [setNewPasswordDialogOpenFlag, setSetNewPasswordDialogOpenFlag] = useState(false)

  return (
    <Container maxWidth="sm">
      <DelicioushareHead title="パスワードを再設定" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="パスワード再設定用のメールを送信" />
            <CardContent>
              <RequiredInput
                label="メールアドレス"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
                margin="dense"
              />
            </CardContent>
            <CardActions>
              <LoadingButton
                variant="contained"
                loading={sendButtonIsLoading}
                onClick={() => {
                  setSendButtonIsLoading(true)
                  Auth.forgotPassword(email)
                    .then(() => {
                      openSuccessSnackbar("メールを送信しました")
                      setSetNewPasswordDialogOpenFlag(true)
                    })
                    .catch((err: Error) => {
                      if (process.env.NODE_ENV === "development") {
                        console.log(err)
                      }
                      openFailureSnackbar("メールの送信に失敗しました")
                      setSendButtonIsLoading(false)
                    })
                }}
                disabled={email === ""}
                fullWidth
              >
                送信
              </LoadingButton>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <SetNewPasswordDialog
        email={email}
        openFlag={setNewPasswordDialogOpenFlag}
        openFailureSnackbar={openFailureSnackbar}
      />
    </Container>
  )
}

export default ForgotPassword
