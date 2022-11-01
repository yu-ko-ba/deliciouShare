import { Alert, Snackbar } from "@mui/material"
import React, { Dispatch, SetStateAction } from "react"

type Props = {
  message: string
  openFlag: boolean
  setOpenFlag: Dispatch<SetStateAction<boolean>>
  severity?: "success" | "info" | "warning" | "error"
}

const DelicioushareSnackbar = ({ message, openFlag, setOpenFlag, severity }: Props) => {
  return (
    <Snackbar
      open={openFlag}
      autoHideDuration={2500}
      onClose={() => {
        setOpenFlag(false)
      }}
    >
      <Alert severity={severity}>{message}</Alert>
    </Snackbar>
  )
}

export default DelicioushareSnackbar
