import { LoadingButton } from "@mui/lab"
import { Card, CardActions, CardContent, CardHeader, Container, FormHelperText, Grid, TextField, Typography } from "@mui/material"
import { Auth } from "aws-amplify"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import DelicioushareHead from "../components/DelicioushareHead"
import PageProps from "../utils/PageProps"

const ConfirmEmail = ({ openSuccessSnackbar, openFailureSnackbar }: PageProps) => {
  const router = useRouter()

  useEffect(() => {
    // 認証するメールアドレスを受け取ってない場合にルートへリダイレクトする
    if (!router.query.email) {
      if (process.env.NODE_ENV !== "development") {
        router.replace("/")
        return
      }
    }
    // ログイン済みの場合にルートへリダイレクトする
    Auth.currentUserInfo()
      .then((user) => {
        if (user) {
          if (process.env.NODE_ENV !== "development") {
            router.replace("/")
          }
        }
      })
  }, [])


  const [verificationCode, setVerificationCode] = useState("")
  const [verificationCodeHasError, setVerificationCodeHasError] = useState(false)

  const [reSendButtonIsLoading, setReSendButtonIsLoading] = useState(false)

  return (
    <Container maxWidth="xs">
      <DelicioushareHead title="メールアドレスの認証" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="メールアドレスを認証" />
            <CardContent>
              <TextField
                label="認証コード"
                onChange={(e) => {
                  const v = e.target.value
                  setVerificationCode(v)
                  setVerificationCodeHasError(v.length !== 6)
                }}
                error={verificationCodeHasError}
                helperText={verificationCodeHasError ? "必須項目です" : ""}
                required
                fullWidth
              />
              <FormHelperText>*は必須項目です</FormHelperText>
            </CardContent>
            <CardActions>
              <LoadingButton
                variant="contained"
                onClick={() => {
                  Auth.confirmSignUp(
                    router.query.email as string,
                    verificationCode,
                  )
                    .then(() => {
                      router.push("/")
                    })
                    .catch((err: Error) => {
                      if (process.env.NODE_ENV === "development") {
                        console.log(err)
                      }
                      openFailureSnackbar("認証に失敗しました")
                    })
                }}
                disabled={verificationCode.length !== 6}
                fullWidth
              >
                認証
              </LoadingButton>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2">
                認証コードが届かない場合はこちら
              </Typography>
            </CardContent>
            <CardActions>
              <LoadingButton
                variant="outlined"
                loading={reSendButtonIsLoading}
                onClick={() => {
                  setReSendButtonIsLoading(true)
                  Auth.resendSignUp(router.query.email as string)
                    .then(() => {
                      openSuccessSnackbar("送信しました")
                      setReSendButtonIsLoading(false)
                    })
                    .catch((err: Error) => {
                      if (process.env.NODE_ENV === "development") {
                        console.log(err)
                      }
                      openFailureSnackbar("再送信に失敗しました")
                      setReSendButtonIsLoading(false)
                    })
                }}
                fullWidth
              >
                認証コードを再送信
              </LoadingButton>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}

export default ConfirmEmail
