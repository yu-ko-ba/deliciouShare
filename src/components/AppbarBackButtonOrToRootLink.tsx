import { ArrowBackIos } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { useRouter } from "next/router"
import AppbarToRootLink from "./AppbarToRootLink"

const AppbarBackButtonOrToRootLink = () => {
  const router = useRouter()
  if (!router.query.canBack) {
    return <AppbarToRootLink />
  }

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

export default AppbarBackButtonOrToRootLink
