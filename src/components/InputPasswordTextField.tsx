import { Visibility, VisibilityOff } from "@mui/icons-material"
import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material"
import { useState } from "react"

type Props = {
  label: string
  showHelperText?: boolean
}

const InputPasswordTextField = ({ label, showHelperText }: Props) => {
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  return (
    <FormControl
      variant="outlined"
      margin="dense"
      required
      fullWidth
    >
      <InputLabel>{label}</InputLabel>
      <OutlinedInput
        label={label}
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => {
          setPassword(e.target.value)
        }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={() => {
                setShowPassword(!showPassword)
              }}
              onMouseDown={(e) => {
                e.preventDefault()
              }}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      {(() => {
        if (showHelperText) {
          return <FormHelperText>*は必須項目です</FormHelperText>
        }
      })()}
    </FormControl>
  )
}

export default InputPasswordTextField
