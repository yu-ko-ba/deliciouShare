import { Add } from "@mui/icons-material"
import { Box, Fab } from "@mui/material"
import { useState } from "react"
import PostDialog from "./PostDialog"

type PostButtonProps = {
  onPostFinish: () => void
}

const PostButton = ({ onPostFinish }: PostButtonProps) => {
  const [postDialogOpenFlag, setPostDialogOpenFlag] = useState(false)

  return (
    <>
        <Box position="absolute" bottom={16} right={16}>
          <Fab
            color="primary"
            onClick={() => {
              setPostDialogOpenFlag(true)
            }}
          >
            <Add />
          </Fab>
        </Box>
        <PostDialog
          openFlag={postDialogOpenFlag}
          setOpenFlag={setPostDialogOpenFlag}
          onPostFinish={onPostFinish}
        />
    </>
  )
}

export default PostButton
