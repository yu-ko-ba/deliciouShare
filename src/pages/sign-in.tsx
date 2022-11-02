import { LoadingButton } from "@mui/lab"
import { Button, Card, CardActions, CardContent, CardHeader, Container, FormHelperText, Grid, Typography } from "@mui/material"
import { Auth } from "aws-amplify"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import PasswordInput from "../components/PasswordInput"
import PageProps from "../utils/PageProps"
import DelicioushareLink from "../components/DelicioushareLink"
import RequiredInput from "../components/RequiredInput"

const SignIn = ({ openFailureSnackbar }: PageProps) => {
  const router = useRouter()

  // ログイン済みの場合はルートへリダイレクトする
  useEffect(() => {
    Auth.currentUserInfo()
      .then((user) => {
        if (user) {
          if (process.env.NODE_ENV !== "development") {
            router.replace("/")
          }
        }
      })
  }, [])

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [signInButtonIsLoadingNow, setSignInButtonIsLoadingNow] = useState(false)
  const [signInButtonIsEnable, setSignInButtonIsEnable] = useState(false)

  return (
    <Container maxWidth="xs">
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="ログイン" />
            <CardContent>
              <RequiredInput
                label="メールアドレス"
                value={email}
                onChange={(e) => {
                  const v = e.target.value
                  setEmail(v)
                  setSignInButtonIsEnable(
                    v !== ""
                    && password !== ""
                  )
                }}
                margin="dense"
              />
              <PasswordInput
                label="パスワード"
                value={password}
                onChange={(e) => {
                  const v = e.target.value
                  setPassword(v)
                  setSignInButtonIsEnable(
                    email !== ""
                    && v !== ""
                  )
                }}
                margin="dense"
              />
              <FormHelperText>*は必須項目です</FormHelperText>
              <br />
              <DelicioushareLink
                href={{
                  pathname: "/forgot-password",
                  query: { canBack: true },
                }}
                as="/forgot-password"
                variant="subtitle2"
              >
                パスワードを忘れた場合はこちら
              </DelicioushareLink>
            </CardContent>
            <CardActions>
              <LoadingButton
                variant="contained"
                onClick={() => {
                  setSignInButtonIsLoadingNow(true)
                  Auth.signIn(email, password)
                    .then(() => {
                      router.push("/")
                    })
                    .catch((err: Error) => {
                      if (err.name === "UserNotConfirmedException") {
                        Auth.resendSignUp(email)
                          .then(() => {
                            router.push(
                              {
                                pathname: "confirm-email",
                                query: { email: email },
                              },
                              "confirm-email",
                            )
                          })
                          .catch((err: Error) => {
                            if (process.env.NODE_ENV === "development") {
                              console.log(err)
                            }
                            openFailureSnackbar("ログインに失敗しました")
                            setSignInButtonIsLoadingNow(false)
                          })
                      }
                      if (process.env.NODE_ENV === "development") {
                        console.log(err)
                      }
                      openFailureSnackbar("ログインに失敗しました")
                      setSignInButtonIsLoadingNow(false)
                    })
                }}
                loading={signInButtonIsLoadingNow}
                disabled={!signInButtonIsEnable}
                fullWidth
              >ログイン</LoadingButton>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography>アカウントをお持ちでない場合</Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="outlined"
                onClick={() => {
                  router.push("sign-up")
                }}
                fullWidth
              >アカウント作成</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}

export default SignIn
