import { Button } from "@mui/material"
import { Dispatch, SetStateAction, useRef } from "react"

type PostDialogSelectImageButtonProps = {
  clearEatingPlaceInfo: () => void
  setImage: Dispatch<SetStateAction<string>>
}

const PostDialogSelectImageButton = ({
  clearEatingPlaceInfo,
  setImage
}: PostDialogSelectImageButtonProps) => {
  const imageInputRef = useRef(null)

  return (
    <>
      <Button
        variant="contained"
        onClick={() => {
          clearEatingPlaceInfo()
          imageInputRef.current.click()
        }}
        fullWidth
      >
        写真を選ぶ
      </Button>
      <input
        type="file"
        accept="image/jpeg"
        ref={imageInputRef}
        onChange={(event) => {
          const imageFile = event.target.files[0]
          const fileReader = new FileReader()
          fileReader.onload = (e) => {
            setImage((e.target!.result as string))
          }
          fileReader.readAsDataURL(imageFile)
          event.target.value = ""
        }}
        hidden
      />
    </>
  )
}

export default PostDialogSelectImageButton
