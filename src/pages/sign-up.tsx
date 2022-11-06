import { LoadingButton } from "@mui/lab"
import { Button, Card, CardActions, CardContent, CardHeader, Checkbox, Container, FormControl, FormHelperText, FormLabel, Grid, Link, Stack, Typography } from "@mui/material"
import { Auth } from "aws-amplify"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import AcceptTermsOfUseDialog from "../components/AcceptTermsOfUseDialog"
import InputPasswordTextField from "../components/InputPasswordTextField"
import PasswordInput from "../components/PasswordInput"
import PageProps from "../utils/PageProps"
import RequiredInput from "../components/RequiredInput"
import DelicioushareHead from "../components/DelicioushareHead"

const SignUp = ({ openFailureSnackbar }: PageProps) => {
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
    <Container maxWidth="xs">
      <DelicioushareHead title="アカウント作成" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="アカウントを作成" />
            <CardContent>
              <RequiredInput
                label="メールアドレス"
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
                margin="dense"
              />
              <PasswordInput
                label="パスワード"
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
                margin="dense"
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
                          query: {
                            email: email,
                            password: password,
                          },
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
                            if (process.env.NODE_ENV === "development") {
                              console.log(err)
                            }
                            openFailureSnackbar("アカウントの作成に失敗しました")
                            setSignUpButtonIsLoadingNow(false)
                          })
                      }
                      if (process.env.NODE_ENV === "development") {
                        console.log(err)
                      }
                      openFailureSnackbar("アカウントの作成に失敗しました")
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
  )
}

export default SignUp
