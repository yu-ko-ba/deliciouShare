import { useState } from "react"
import InputPasswordTextField from "./InputPasswordTextField"

type Props = {
  label: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  margin?: "none" | "dense" | "normal"
}

const PasswordInput = ({ label, value, onChange, margin }: Props) => {
  const [error, setError] = useState(false)
  return (
    <InputPasswordTextField
      label={label}
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e)
        setError(e.target.value === "")
      }}
      error={error}
      helperText={error ? "必須項目です" : ""}
      margin={margin}
      required
      fullWidth
    />
  )
}

export default PasswordInput
