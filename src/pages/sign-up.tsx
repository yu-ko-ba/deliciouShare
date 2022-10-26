import { LoadingButton } from "@mui/lab"
import { Button, Card, CardActions, CardContent, CardHeader, Checkbox, Container, FormControl, FormHelperText, FormLabel, Grid, Link, Stack, ThemeProvider, Typography } from "@mui/material"
import { Auth } from "aws-amplify"
import { useRouter } from "next/router"
import { useState } from "react"
import AcceptTermsOfUseDialog from "../components/AcceptTermsOfUseDialog"
import EmailInput from "../components/EmailInput"
import InputPasswordTextField from "../components/InputPasswordTextField"
import MeshiteroAppBar from "../components/MeshiteroAppBar"
import PasswordInput from "../components/PasswordInput"
import theme from "../theme"

const SignUp = () => {
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
  const [reEnteredPassword, setReEnteredPassword] = useState("")
  const [reEnteredPasswordHasError, setReEnteredPasswordHasError] = useState(false)

  const [acceptTermsOfUse, setAcceptTermsOfUse] = useState(false)
  const [acceptTermsOfUseHasError, setAcceptTermsOfUseHasError] = useState(false)
  const setAcceptTermsOfUseAndHasError = (accept: boolean) => {
    setAcceptTermsOfUse(accept)
    setAcceptTermsOfUseHasError(!accept)
    setSingUpButtonIsEnable(
      email !== ""
      && password !== ""
      && reEnteredPassword !== ""
      && accept
    )
  }
  const [acceptTermsOfUseOpenFlag, setAcceptTermsOfUseOpenFlag] = useState(false)

  const [signUpButtonIsLoadingNow, setSignUpButtonIsLoadingNow] = useState(false);
  const [signUpButtonIsEnable, setSingUpButtonIsEnable] = useState(false)

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
              <CardHeader title="アカウントを作成" />
              <CardContent>
                <EmailInput
                  value={email}
                  onChange={(e) => {
                    const v = e.target.value
                    setEmail(v)
                    setSingUpButtonIsEnable(
                      v !== ""
                      && password !== ""
                      && reEnteredPassword !== ""
                      && acceptTermsOfUse
                    )
                  }}
                />
                <PasswordInput
                  value={password}
                  onChange={(e) => {
                    const v = e.target.value
                    setPassword(v)
                    setSingUpButtonIsEnable(
                      email !== ""
                      && v !== ""
                      && reEnteredPassword !== ""
                      && acceptTermsOfUse
                    )
                  }}
                />
                <Typography variant="caption" color="text.secondary">
                  パスワード要件
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  ・少なくとも１つの小文字を含む
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  ・少なくとも１つの大文字を含む
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  ・少なくとも１つの数字を含む
                </Typography>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  {"・少なくとも１つの特殊文字 (^ $ * . [ ] { } ( ) ? - \" ! @ # % & / \ , > < ' : ; | _ ~ ` + =) を含む"}
                </Typography>
                <InputPasswordTextField
                  label="パスワードを再入力"
                  value={reEnteredPassword}
                  onChange={(e) => {
                    const v = e.target.value
                    setReEnteredPassword(v)
                    setReEnteredPasswordHasError(v === "")
                    setSingUpButtonIsEnable(
                      email !== ""
                      && password !== ""
                      && v !== ""
                      && acceptTermsOfUse
                    )
                  }}
                  margin="normal"
                  error={reEnteredPasswordHasError}
                  helperText={reEnteredPasswordHasError ? "必須項目です" : ""}
                  required
                  fullWidth
                />
                <FormControl
                  error={acceptTermsOfUseHasError}
                  required
                >
                  <Stack direction="row" alignItems="center">
                    <Checkbox
                      checked={acceptTermsOfUse}
                      onChange={(e) => {
                        const checked = e.target.checked
                        setAcceptTermsOfUseAndHasError(checked)
                      }}
                    />
                    <FormLabel>
                      <Link
                        component="button"
                        variant="body1"
                        onClick={() => {
                          setAcceptTermsOfUseOpenFlag(true)
                        }}
                      >
                        利用規約
                      </Link>
                      に同意する
                    </FormLabel>
                  </Stack>
                </FormControl>
                <FormHelperText>*は必須項目です</FormHelperText>
              </CardContent>
              <CardActions>
                <LoadingButton
                  variant="contained"
                  onClick={() => {
                    if (password !== reEnteredPassword) {
                      setReEnteredPassword("")
                      return
                    }
                    setSignUpButtonIsLoadingNow(true)
                    Auth.signUp({
                      username: email,
                      password: password,
                      autoSignIn: { enabled: true },
                    })
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
                        if (err.name === "UsernameExistsException") {
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
                              setSignUpButtonIsLoadingNow(false)
                            })
                        }
                        console.log(err)
                        setSignUpButtonIsLoadingNow(false)
                      })
                  }}
                  loading={signUpButtonIsLoadingNow}
                  disabled={!signUpButtonIsEnable}
                  fullWidth
                >
                  作成
                </LoadingButton>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography>アカウントをお持ちの場合</Typography>
              </CardContent>
              <CardActions>
                <Button
                variant="outlined"
                onClick={() => {
                  router.push("sign-in")
                }}
                fullWidth
                >ログインページへ</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
        <AcceptTermsOfUseDialog
          openFlag={acceptTermsOfUseOpenFlag}
          setOpenFlag={setAcceptTermsOfUseOpenFlag}
          setAccept={setAcceptTermsOfUseAndHasError}
        />
      </Container>
    </ThemeProvider>
  )
}

export default SignUp
