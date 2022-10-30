import { Container, Grid, ThemeProvider } from "@mui/material"
import { Auth } from "aws-amplify"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import AppbarBackButtonOrToRootLink from "../components/AppbarBackButtonOrToRootLink"
import ChangeEmailCard from "../components/ChangeEmailCard"
import ChangePasswordCard from "../components/ChangePasswordCard"
import DeleteUserCard from "../components/DeleteUserCard"
import MeshiteroAppBar from "../components/MeshiteroAppBar"
import SignOutCard from "../components/SignOutCard"
import theme from "../theme"

const Settings = () => {
  const router = useRouter()

  const [user, setUser] = useState<any>()

  // ログインされてない場合はログインページへリダイレクトする
  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        setUser(user)
      })
      .catch((err: Error) => {
        if (process.env.NODE_ENV === "development") {
          console.log(`Error: ${err}`)
        }
        if (process.env.NODE_ENV !== "development") {
          router.replace("/sign-in")
        }
          })
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <MeshiteroAppBar>
        <AppbarBackButtonOrToRootLink />
      </MeshiteroAppBar>
      <Container maxWidth="sm">
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <ChangeEmailCard user={user} />
          </Grid>
          <Grid item xs={12}>
            <ChangePasswordCard user={user} />
          </Grid>
          <Grid item xs={12}>
            <SignOutCard user={user} />
          </Grid>
          <Grid item xs={12}>
            <DeleteUserCard user={user} />
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  )
}

export default Settings
