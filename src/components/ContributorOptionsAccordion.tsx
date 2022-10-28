import { ExpandMore } from "@mui/icons-material"
import { LoadingButton } from "@mui/lab"
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material"
import { useRouter } from "next/router"
import { useState } from "react"
import removeUserPost from "../utils/removeUserPost"

type Props = {
  postId: string
  userId: string
  postedTime: string
}

const ContributorOptionsAccordion = ({ postId, userId, postedTime }: Props) => {
  const router = useRouter()

  const [deleteButtonIsLoading, setDeleteButtonIsLoading] = useState(false)

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
            <LoadingButton
              color="error"
              variant="outlined"
              loading={deleteButtonIsLoading}
              onClick={() => {
                setDeleteButtonIsLoading(true)
                removeUserPost(postId, userId, postedTime)
                  .then(() => {
                    router.push("/")
                  })
                  .catch((err) => {
                    setDeleteButtonIsLoading(false)
                    if (process.env.NODE_ENV === "development") {
                      console.log(err)
                    }
                  })
              }}
              fullWidth
            >
              削除
            </LoadingButton>
          </AccordionDetails>
        </Accordion>
      </AccordionDetails>
    </Accordion>
  )
}

export default ContributorOptionsAccordion
