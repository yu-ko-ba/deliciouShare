import { Alert, Snackbar } from "@mui/material"
import { Dispatch, SetStateAction } from "react"

type Props = {
  message: string
  openFlag: boolean
  setOpenFlag: Dispatch<SetStateAction<boolean>>
}

const SuccessSnackbar = ({ message, openFlag, setOpenFlag }: Props) => {
  return (
    <Snackbar
      open={openFlag}
      autoHideDuration={2500}
      onClose={() => {
        setOpenFlag(false)
      }}
    >
      <Alert>{message}</Alert>
    </Snackbar>
  )
}

export default SuccessSnackbar
