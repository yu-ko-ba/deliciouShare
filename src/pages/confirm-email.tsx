import { LoadingButton } from "@mui/lab"
import { Button, Card, CardActions, CardContent, CardHeader, Container, FormHelperText, Grid, TextField, ThemeProvider, Typography } from "@mui/material"
import { Auth } from "aws-amplify"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import MeshiteroAppBar from "../components/MeshiteroAppBar"
import theme from "../theme"

const ConfirmEmail = () => {
  const router = useRouter()

  useEffect(() => {
    if (!router.query.email) {
      router.replace("/")
    }
  }, [])

  Auth.currentUserInfo()
    .then((user) => {
      if (user) {
        router.replace("/")
      }
    })

  const [verificationCode, setVerificationCode] = useState("")
  const [verificationCodeHasError, setVerificationCodeHasError] = useState(false)

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
              <CardHeader title="メールアドレスを認証" />
              <CardContent>
                <TextField
                  label="認証コード"
                  onChange={(e) => {
                    const v = e.target.value
                    setVerificationCode(v)
                    setVerificationCodeHasError(v === "")
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
                        console.log(err);
                      })
                  }}
                  disabled={verificationCode === ""}
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
                <Button
                  variant="outlined"
                  onClick={() => {
                    Auth.resendSignUp(router.query.email as string)
                  }}
                  fullWidth
                >
                  認証コードを再送信
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  )
}

export default ConfirmEmail
