import { ExpandMore } from "@mui/icons-material"
import { LoadingButton } from "@mui/lab"
import { Accordion, AccordionActions, AccordionSummary, Card, CardContent, CardHeader, Container, Grid, Stack, ThemeProvider, Typography } from "@mui/material"
import { Auth } from "aws-amplify"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import AppbarBackButtonOrToRootLink from "../components/AppbarBackButtonOrToRootLink"
import ChangeEmailCard from "../components/ChangeEmailCard"
import ChangePasswordCard from "../components/ChangePasswordCard"
import MeshiteroAppBar from "../components/MeshiteroAppBar"
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

  const [signOutButtonIsLoadingNow, setSignOutButtonIsLoadingNow] = useState(false)

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
            <Card>
              <CardHeader title="ログアウトする" />
              <CardContent>
                <Stack spacing={4}>
                  <LoadingButton
                    variant="outlined"
                    loading={signOutButtonIsLoadingNow}
                    color="error"
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
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMore />}
                    >
                      <Typography variant="subtitle2">
                        全ての端末でログアウト
                      </Typography>
                    </AccordionSummary>
                    <AccordionActions>
                      <LoadingButton
                        variant="contained"
                        color="error"
                        onClick={() => {
                          Auth.signOut({ global: true })
                        }}
                        fullWidth
                      >
                        全ての端末でログアウト
                      </LoadingButton>
                    </AccordionActions>
                  </Accordion>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  )
}

export default Settings
