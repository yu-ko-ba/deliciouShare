import { ExpandMore } from "@mui/icons-material"
import { Accordion, AccordionDetails, AccordionSummary, Button, Typography } from "@mui/material"
import { useRouter } from "next/router"
import React, { useState } from "react"
import removeUserPost from "../utils/removeUserPost"
import ConfirmDeleteUserPostDialog from "./ConfirmDeleteDialog"

type Props = {
  postId: string
  userId: string
  postedTime: string
}

const ContributorOptionsAccordion = ({ postId, userId, postedTime }: Props) => {
  const router = useRouter()

  const [deleteButtonIsLoading, setDeleteButtonIsLoading] = useState(false)

  const [confirmDeleteDialogOpenFlag, setConfirmDeleteDialogOpenFlag] = useState(false)

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMore />}
      >
        <Typography variant="subtitle2">
          投稿者用
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
          >
            <Typography variant="subtitle2" color="error">
              投稿を削除する
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Button
              color="error"
              variant="contained"
              onClick={() => {
                setConfirmDeleteDialogOpenFlag(true)
              }}
              fullWidth
            >
              削除
            </Button>
          </AccordionDetails>
        </Accordion>
      </AccordionDetails>
      <ConfirmDeleteUserPostDialog
        openFlag={confirmDeleteDialogOpenFlag}
        setOpenFlag={setConfirmDeleteDialogOpenFlag}
        message="本当に削除しますか？"
        onYesButtonClick={(onCatch: () => void) => {
          removeUserPost(postId, userId, postedTime)
            .then(() => {
              router.push("/")
            })
            .catch((err: Error) => {
              if (process.env.NODE_ENV === "development") {
                console.log(err)
              }
              if (onCatch) {
                onCatch()
              }
              setDeleteButtonIsLoading(false)
            })
        }}
      />
    </Accordion>
  )
}

export default ContributorOptionsAccordion
