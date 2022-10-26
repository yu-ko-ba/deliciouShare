import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material"
import { Dispatch, SetStateAction } from "react"

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
        <Typography gutterBottom>
          ・deliciouShareの利用は全て、利用者の責任で行うものとします。
        </Typography>
        <br />
        <Typography>
          ・deliciouShareのサービス内容は予告なく変更する場合があります。
        </Typography>
        <Typography gutterBottom>
          (例：サービスのアップデートや悪質なユーザーへの対策など)
        </Typography>
        <br />
        <Typography>
          ・deliciouShareの利用規約には変更が入る場合があります。
        </Typography>
        <Typography gutterBottom>
          その場合、deliciouShareの利用継続をもって同意したとみなします。
        </Typography>
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
