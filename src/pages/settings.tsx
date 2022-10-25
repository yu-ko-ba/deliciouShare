import { LoadingButton } from "@mui/lab"
import { Container, ThemeProvider } from "@mui/material"
import { Auth } from "aws-amplify"
import { useRouter } from "next/router"
import { useState } from "react"
import AppbarBackButtonOrToRootLink from "../components/AppbarBackButtonOrToRootLink"
import MeshiteroAppBar from "../components/MeshiteroAppBar"
import theme from "../theme"

const Settings = () => {
  const router = useRouter()

  const [signOutButtonIsLoadingNow, setSignOutButtonIsLoadingNow] = useState(false)
  return (
    <ThemeProvider theme={theme}>
      <MeshiteroAppBar>
        <AppbarBackButtonOrToRootLink />
      </MeshiteroAppBar>
      <Container maxWidth="xs">
        <LoadingButton
          variant="outlined"
          loading={signOutButtonIsLoadingNow}
          onClick={() => {
            setSignOutButtonIsLoadingNow(true)
            Auth.signOut()
              .then(() => {
                router.push("sign-in")
              })
              .catch((err) => {
                console.log(err)
                setSignOutButtonIsLoadingNow(false)
                  })
          }}
          fullWidth
        >
          ログアウト
        </LoadingButton>
        <LoadingButton
          variant="outlined"
          onClick={() => {
            Auth.signOut({ global: true })
          }}
          fullWidth
        >
          全ての端末でログアウト
        </LoadingButton>
      </Container>
    </ThemeProvider>
  )
}

export default Settings
