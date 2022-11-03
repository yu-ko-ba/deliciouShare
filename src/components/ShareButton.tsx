import { Share } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { useRouter } from "next/router"

type Props = {
  openFailureSnackbar: ((message: string) => void)
}

const ShareButton = ({ openFailureSnackbar }: Props) => {
  const router = useRouter()
  return (
    <IconButton
      color="inherit"
      onClick={() => {
        try {
          navigator.share({ url: router.asPath })
            .catch((err: Error) => {
              if (process.env.NODE_ENV === "development") {
                console.log(err)
              }
            })
        } catch (err) {
          if (process.env.NODE_ENV === "development") {
            console.log(err)
          }
          openFailureSnackbar("共有メニューを開けませんでした")
        }
      }}
    >
      <Share />
    </IconButton>
  )
}

export default ShareButton
