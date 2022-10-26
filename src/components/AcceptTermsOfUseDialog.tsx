import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material"
import { Dispatch, SetStateAction } from "react"
import TermsOfUse from "./TermsOfUse"

type Props = {
  openFlag: boolean
  setOpenFlag: Dispatch<SetStateAction<boolean>>
  setAccept: Dispatch<SetStateAction<boolean>>
}

const AcceptTermsOfUseDialog = ({ openFlag, setOpenFlag, setAccept }: Props) => {
  return (
    <Dialog
      open={openFlag}
      onClose={() => {
        setOpenFlag(false)
      }}
    >
      <DialogTitle>利用規約</DialogTitle>
      <DialogContent>
        <TermsOfUse />
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          onClick={() => {
            setAccept(false)
            setOpenFlag(false)
          }}
          fullWidth
        >
          同意しない
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setAccept(true)
            setOpenFlag(false)
          }}
          fullWidth
        >
          同意する
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AcceptTermsOfUseDialog
