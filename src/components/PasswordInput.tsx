import { useState } from "react"
import InputPasswordTextField from "./InputPasswordTextField"

type Props = {
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const PasswordInput = ({ value, onChange }: Props) => {
  const [error, setError] = useState(false)
  return (
    <InputPasswordTextField
      label="パスワード"
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

export default PasswordInput
