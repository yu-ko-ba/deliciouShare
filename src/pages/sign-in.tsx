import { LoadingButton } from "@mui/lab"
import { Button, Card, CardActions, CardContent, CardHeader, Container, FormHelperText, Grid, ThemeProvider, Typography } from "@mui/material"
import { Auth } from "aws-amplify"
import { useRouter } from "next/router"
import { useState } from "react"
import EmailInput from "../components/EmailInput"
import DelicioushareAppbar from "../components/DelicioushareAppbar"
import PasswordInput from "../components/PasswordInput"
import theme from "../theme"

const SignIn = () => {
  const router = useRouter()

  // ログイン済みの場合はルートへリダイレクトする
  Auth.currentUserInfo()
    .then((user) => {
      if (user) {
        if (process.env.NODE_ENV !== "development") {
          router.replace("/")
        }
      }
    })

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [signInButtonIsLoadingNow, setSignInButtonIsLoadingNow] = useState(false)
  const [signInButtonIsEnable, setSignInButtonIsEnable] = useState(false)

  return (
    <ThemeProvider theme={theme}>
      <DelicioushareAppbar>
        <Typography variant="h6">
          deliciouShare
        </Typography>
      </DelicioushareAppbar>
      <Container maxWidth="xs">
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="ログイン" />
              <CardContent>
                <EmailInput
                  value={email}
                  onChange={(e) => {
                    const v = e.target.value
                    setEmail(v)
                    setSignInButtonIsEnable(
                      v !== ""
                      && password !== ""
                    )
                  }}
                />
                <PasswordInput
                  value={password}
                  onChange={(e) => {
                    const v = e.target.value
                    setPassword(v)
                    setSignInButtonIsEnable(
                      email !== ""
                      && v !== ""
                    )
                  }}
                />
                <FormHelperText>*は必須項目です</FormHelperText>
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
                              console.log(err)
                              setSignInButtonIsLoadingNow(false)
                            })
                        }
                        console.log(err)
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
    </ThemeProvider>
  )
}

export default SignIn
