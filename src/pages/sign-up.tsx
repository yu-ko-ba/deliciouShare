import { Button, Card, CardActions, CardContent, CardHeader, Container, FormHelperText, Grid, TextField, ThemeProvider, Typography } from "@mui/material"
import { useRouter } from "next/router"
import { useState } from "react"
import InputPasswordTextField from "../components/InputPasswordTextField"
import MeshiteroAppBar from "../components/MeshiteroAppBar"
import theme from "../theme"

const SignUp = () => {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [emailHasError, setEmailHasError] = useState(false)
  const [password, setPassword] = useState("")
  const [passwordHasError, setPasswordHasError] = useState(false)
  const [reEnteredPassword, setReEnteredPassword] = useState("")
  const [reEnteredPasswordHasError, setReEnteredPasswordHasError] = useState(false)

  const [signUpButtonIsEnable, setSingUpButtonIsEnable] = useState(false)

  return (
    <ThemeProvider theme={theme}>
      <MeshiteroAppBar />
      <Container maxWidth="xs">
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="アカウントを作成" />
              <CardContent>
                <TextField
                  label="メールアドレス"
                  value={email}
                  onChange={(e) => {
                    const v = e.target.value
                    setEmail(v)
                    setEmailHasError(v === "")
                    if (
                      v !== ""
                      && password !== ""
                      && reEnteredPassword !== ""
                    ) {
                      setSingUpButtonIsEnable(true)
                    }
                  }}
                  error={emailHasError}
                  helperText={emailHasError ? "必須項目です" : ""}
                  margin="dense"
                  required
                  fullWidth
                />
                <InputPasswordTextField label="パスワード"
                  value={password}
                  onChange={(e) => {
                    const v = e.target.value
                    setPassword(v)
                    setPasswordHasError(v === "")
                    if (
                      email !== ""
                      && v !== ""
                      && reEnteredPassword !== ""
                    ) {
                      setSingUpButtonIsEnable(true)
                    }
                  }}
                  error={passwordHasError}
                  helperText={passwordHasError ? "必須項目です" : ""}
                  margin="dense"
                  required
                  fullWidth
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
                    if (
                      email !== ""
                      && password !== ""
                      && v !== ""
                    ) {
                      setSingUpButtonIsEnable(true)
                    }
                  }}
                  margin="normal"
                  error={reEnteredPasswordHasError}
                  helperText={reEnteredPasswordHasError ? "必須項目です" : ""}
                  required
                  fullWidth
                />
                <FormHelperText>*は必須項目です</FormHelperText>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  onClick={() => {
                    if (password !== reEnteredPassword) {
                      setReEnteredPassword("")
                      setReEnteredPasswordHasError(true)
                      setSingUpButtonIsEnable(false)
                      return
                    }
                  }}
                  disabled={!signUpButtonIsEnable}
                  fullWidth
                >
                  作成
                </Button>
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
      </Container>
    </ThemeProvider>
  )
}

export default SignUp
