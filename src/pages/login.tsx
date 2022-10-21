import { Visibility, VisibilityOff } from "@mui/icons-material"
import { Button, Card, CardActions, CardContent, CardHeader, Container, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, ThemeProvider, Typography } from "@mui/material"
import { Hub } from "aws-amplify"
import { useRouter } from "next/router"
import { useState } from "react"
import InputPasswordTextField from "../components/InputPasswordTextField"
import MeshiteroAppBar from "../components/MeshiteroAppBar"
import theme from "../theme"

const Login = () => {
  const router = useRouter()
  Hub.listen("auth", ({ payload }) => {
    if (payload.event === "autoSignIn") {
      router.push("/")
    }
  })

  const [Email, setEmail] = useState("")

  return (
    <ThemeProvider theme={theme}>
      <MeshiteroAppBar />
      <Container maxWidth="xs">
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="ログイン" />
              <CardContent>
                <TextField
                  label="メールアドレス"
                  value={Email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                  }}
                  margin="dense"
                  required
                  fullWidth
                />
                <InputPasswordTextField label="パスワード" showHelperText />
              </CardContent>
              <CardActions>
                <Button variant="contained" fullWidth>ログイン</Button>
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

export default Login
