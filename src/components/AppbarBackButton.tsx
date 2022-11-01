import { ArrowBackIos } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { useRouter } from "next/router"

const AppbarBackButton = () => {
  const router = useRouter()

  return (
    <IconButton
      color="inherit"
      onClick={() => {
        router.back()
      }}
    >
      <ArrowBackIos />
    </IconButton>
  )
}

export default AppbarBackButton
