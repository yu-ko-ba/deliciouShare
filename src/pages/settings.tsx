import { Container, Grid } from "@mui/material"
import { Auth } from "aws-amplify"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import ChangeEmailCard from "../components/ChangeEmailCard"
import ChangePasswordCard from "../components/ChangePasswordCard"
import DeleteUserCard from "../components/DeleteUserCard"
import DelicioushareHead from "../components/DelicioushareHead"
import SignOutCard from "../components/SignOutCard"
import PageProps from "../utils/PageProps"

const Settings = ({ openSuccessSnackbar, openFailureSnackbar }: PageProps) => {
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
    <Container maxWidth="sm">
      <DelicioushareHead title="アカウント設定" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <ChangeEmailCard
            user={user}
            openFailureSnackbar={openFailureSnackbar}
            openSuccessSnackbar={openSuccessSnackbar}
          />
        </Grid>
        <Grid item xs={12}>
          <ChangePasswordCard
            user={user}
            openFailureSnackbar={openFailureSnackbar}
            openSuccessSnackbar={openSuccessSnackbar}
          />
        </Grid>
        <Grid item xs={12}>
          <SignOutCard user={user} />
        </Grid>
        <Grid item xs={12}>
          <DeleteUserCard user={user} />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Settings
