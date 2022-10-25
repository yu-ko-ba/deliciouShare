import { LoadingButton } from "@mui/lab"
import { Card, CardActions, CardContent, CardHeader, Container, FormHelperText, TextField, ThemeProvider, Typography } from "@mui/material"
import { Auth } from "aws-amplify"
import { useRouter } from "next/router"
import { useState } from "react"
import MeshiteroAppBar from "../components/MeshiteroAppBar"
import theme from "../theme"

const ConfirmEmail = () => {
  const router = useRouter()

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
      </Container>
    </ThemeProvider>
  )
}

export default ConfirmEmail
