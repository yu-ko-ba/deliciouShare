import { LoadingButton } from "@mui/lab"
import { Button, Card, CardActions, CardContent, CardHeader, Container, FormHelperText, Grid, ThemeProvider, Typography } from "@mui/material"
import { Auth } from "aws-amplify"
import { useRouter } from "next/router"
import { useState } from "react"
import EmailInput from "../components/EmailInput"
import MeshiteroAppBar from "../components/MeshiteroAppBar"
import PasswordInput from "../components/PasswordInput"
import theme from "../theme"

const SignIn = () => {
  const router = useRouter()

  Auth.currentUserInfo()
    .then((user) => {
      if (user) {
        router.push("/")
      }
    })

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [signInButtonIsLoadingNow, setSignInButtonIsLoadingNow] = useState(false)
  const [signInButtonIsEnable, setSignInButtonIsEnable] = useState(false)

  return (
    <ThemeProvider theme={theme}>
      <MeshiteroAppBar>
        <Typography variant="h6">
          deliciouShare
        </Typography>
      </MeshiteroAppBar>
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
                          router.push(
                            {
                              pathname: "confirm-email",
                              query: { email: email },
                            },
                            "confirm-email",
                          )
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
