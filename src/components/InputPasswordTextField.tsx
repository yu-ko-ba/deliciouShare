import { Visibility, VisibilityOff } from "@mui/icons-material"
import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material"
import React, { useState } from "react"

type Props = {
  label: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  margin?: "none" | "dense" | "normal"
  error?: boolean
  helperText?: string
  required?: boolean
  fullWidth?: boolean
}

const InputPasswordTextField = ({ label, value, onChange, margin, error, helperText, required, fullWidth }: Props) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <FormControl
      variant="outlined"
      margin={margin ? margin : "none"}
      error={error}
      required={required}
      fullWidth={fullWidth}
    >
      <InputLabel>{label}</InputLabel>
      <OutlinedInput
        label={label}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
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
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  )
}

export default InputPasswordTextField
