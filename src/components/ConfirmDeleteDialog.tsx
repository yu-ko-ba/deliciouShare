import { LoadingButton } from "@mui/lab"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import React, { Dispatch, SetStateAction, useState } from "react"

type Props = {
  openFlag: boolean
  setOpenFlag: Dispatch<SetStateAction<boolean>>
  title?: string
  message?: string
  onYesButtonClick?: ((onCatch?: () => void) => void)
}

const ConfirmDeleteDialog = ({ openFlag, setOpenFlag, title, message, onYesButtonClick }: Props) => {
  const [yesButtonIsLoading, setYesButtonIsLoading] = useState(false)
  return (
    <Dialog
      open={openFlag}
      onClose={() => {
        setOpenFlag(false)
      }}
    >
      {title && (
        <DialogTitle>{title}</DialogTitle>
      )}
      {message && (
        <DialogContent>
          <DialogContentText>
            {message}
          </DialogContentText>
        </DialogContent>
      )}
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => {
            setOpenFlag(false)
          }}
          fullWidth
        >
          いいえ
        </Button>
        <LoadingButton
          loading={yesButtonIsLoading}
          color="error"
          onClick={() => {
            setYesButtonIsLoading(true)
            if (onYesButtonClick) {
              onYesButtonClick(() => {
                setYesButtonIsLoading(false)
              })
            }
          }}
          fullWidth
        >
          はい
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDeleteDialog
