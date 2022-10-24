import { TextField } from "@mui/material"
import { useState } from "react"

type Props = {
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const EmailInput = ({ value, onChange }: Props) => {
  const [error, setError] = useState(false)
  return (
    <TextField
      label="メールアドレス"
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e)
        setError(e.target.value === "")
      }}
      error={error}
      helperText={error ? "必須項目です" : ""}
      margin="dense"
      required
      fullWidth
    />
  )
}

export default EmailInput
