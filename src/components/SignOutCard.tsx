import { ExpandMore } from "@mui/icons-material"
import { LoadingButton } from "@mui/lab"
import { Accordion, AccordionActions, AccordionSummary, Card, CardContent, CardHeader, Stack, Typography } from "@mui/material"
import { Auth } from "aws-amplify"
import { useRouter } from "next/router"
import { useState } from "react"

type Props = {
  user: any
}

const SignOutCard = ({ user }: Props) => {
  const router = useRouter()

  const [signOutButtonIsLoadingNow, setSignOutButtonIsLoadingNow] = useState(false)

  return (
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
            disabled={!user}
            fullWidth
          >
            ログアウト
          </LoadingButton>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMore />}
            >
              <Typography variant="subtitle2">
                全ての端末でログアウトする
              </Typography>
            </AccordionSummary>
            <AccordionActions>
              <LoadingButton
                variant="contained"
                color="error"
                onClick={() => {
                  Auth.signOut({ global: true })
                }}
                disabled={!user}
                fullWidth
              >
                全ての端末でログアウト
              </LoadingButton>
            </AccordionActions>
          </Accordion>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default SignOutCard
