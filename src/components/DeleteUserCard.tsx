import { ExpandMore } from "@mui/icons-material"
import { LoadingButton } from "@mui/lab"
import { Accordion, AccordionActions, AccordionSummary, Card, CardContent, CardHeader, Typography } from "@mui/material"
import { useState } from "react"
import DeleteUserConfirmDialog from "./DeleteUserConfirmDialog"

type Props = {
  user: any
}

const DeleteUserCard = ({ user }: Props) => {
  const [confirmDialogOpenFlag, setConfirmDialogOpenFlag] = useState(false)
  return (
    <Card>
      <CardHeader title="アカウントを削除する" />
      <CardContent>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="subtitle2" color="error">
              アカウントを削除する
            </Typography>
          </AccordionSummary>
          <AccordionActions>
            <LoadingButton
              variant="contained"
              color="error"
              onClick={() => {
                setConfirmDialogOpenFlag(true)
              }}
              disabled={!user}
              fullWidth
            >
              削除
            </LoadingButton>
          </AccordionActions>
        </Accordion>
      </CardContent>
      <DeleteUserConfirmDialog
        userId={user?.attributes.sub}
        openFlag={confirmDialogOpenFlag}
        setOpenFlag={setConfirmDialogOpenFlag}
      />
    </Card>
  )
}

export default DeleteUserCard
