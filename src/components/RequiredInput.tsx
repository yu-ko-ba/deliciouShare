import { TextField } from "@mui/material"
import { useState } from "react"

type Props = {
  label: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  margin?: "dense" | "normal" | "none"
}

const RequiredInput = ({ label, value, onChange, margin }: Props) => {
  const [error, setError] = useState(false)
  return (
    <TextField
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

export default RequiredInput
