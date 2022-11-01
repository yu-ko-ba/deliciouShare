import { LoadingButton } from "@mui/lab"
import { Card, CardActions, CardContent, CardHeader, Stack, TextField } from "@mui/material"
import { Auth } from "aws-amplify"
import { useState } from "react"
import PageProps from "../utils/PageProps"
import VerifyNewEmailCard from "./VerifyNewEmailCard"

type Props = {
  user: any
}

const ChangeEmailCard = ({ user, openSuccessSnackbar, openFailureSnackbar }: Props & PageProps) => {
  const [newEmail, setNewEmail] = useState("")
  const [newEmailConfirmFieldIsVisible, setNewEmailConfirmFieldIsVisible] = useState(false)
  const [updateEmailButtonIsLoading, setUpdateEmailButtonIsLoading] = useState(false)

  return (
    <Card>
      <CardHeader title="メールアドレスを変更する" />
      <CardContent>
        <Stack spacing={2}>
          <TextField
            label="新しいメールアドレス"
            value={newEmail}
            onChange={(e) => {
              setNewEmail(e.target.value)
            }}
            margin="dense"
            fullWidth
          />
          {newEmailConfirmFieldIsVisible && (
            <VerifyNewEmailCard
              onSuccess={() => {
                openSuccessSnackbar("変更しました")
                setNewEmailConfirmFieldIsVisible(false)
                setUpdateEmailButtonIsLoading(false)
                setNewEmail("")
              }}
            />
          )}
        </Stack>
      </CardContent>
      <CardActions>
        <LoadingButton
          variant="outlined"
          loading={updateEmailButtonIsLoading}
          onClick={() => {
            setUpdateEmailButtonIsLoading(true)
            Auth.updateUserAttributes(
              user,
              { "email": newEmail },
            )
              .then(() => {
                setNewEmailConfirmFieldIsVisible(true)
              })
              .catch((err: Error) => {
                setUpdateEmailButtonIsLoading(false)
                if (process.env.NODE_ENV === "development") {
                  console.log(err)
                }
                openFailureSnackbar("メールアドレスの変更に失敗しました")
              })
          }}
          disabled={newEmail === "" || !user}
          fullWidth
        >
          変更
        </LoadingButton>
      </CardActions>
    </Card>
  )
}

export default ChangeEmailCard
