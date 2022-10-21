import { Button, Card, CardActions, CardContent, CardHeader, Container, Grid, TextField, ThemeProvider, Typography } from "@mui/material"
import { useRouter } from "next/router"
import InputPasswordTextField from "../components/InputPasswordTextField"
import MeshiteroAppBar from "../components/MeshiteroAppBar"
import theme from "../theme"

const SignUp = () => {
  const router = useRouter()
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
                  margin="dense"
                  required
                  fullWidth
                />
                <InputPasswordTextField label="パスワード" />
                <Typography color="text.secondary">使用可能な文字は</Typography>
                <InputPasswordTextField label="パスワードを再入力" showHelperText/>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  onClick={() => {
                  }}
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
                  router.push("login")
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
