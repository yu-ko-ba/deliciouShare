import { LoadingButton } from "@mui/lab"
import { Card, CardActions, CardContent, CardHeader, TextField } from "@mui/material"
import { Auth } from "aws-amplify"
import { useState } from "react"

type Props = {
  onSuccess?: () => void
}

const VerifyNewEmailCard = ({ onSuccess }: Props) => {
  const [verifyCode, setVerifyCode] = useState("")
  const [verifyButtonIsEnable, setVerifyButtonIsEnable] = useState(false)
  const [verifyButtonIsLoading, setVerifyButtonIsLoading] = useState(false)

  return (
    <Card>
      <CardHeader title="新しいメールアドレスを認証する" />
      <CardContent>
        <TextField
          label="認証コード"
          value={verifyCode}
          onChange={(e) => {
            const code = e.target.value
            setVerifyCode(code)
            setVerifyButtonIsEnable(code.length === 6)
          }}
          fullWidth
        />
      </CardContent>
      <CardActions>
        <LoadingButton
          variant="contained"
          loading={verifyButtonIsLoading}
          onClick={() => {
            setVerifyButtonIsLoading(true)
            Auth.verifyCurrentUserAttributeSubmit("email", verifyCode)
              .then(() => {
                if (onSuccess) {
                  onSuccess()
                }
                setVerifyCode("")
                setVerifyButtonIsEnable(false)
                setVerifyButtonIsLoading(false)
              })
              .catch((err: Error) => {
                if (process.env.NODE_ENV === "development") {
                  console.log(`Error: ${err}`)
                }
                setVerifyCode("")
                setVerifyButtonIsEnable(false)
                setVerifyButtonIsLoading(false)
              })
          }}
          disabled={!verifyButtonIsEnable}
          fullWidth
        >
          認証
        </LoadingButton>
      </CardActions>
    </Card>
  )
}

export default VerifyNewEmailCard
