import { useRouter } from "next/router"
import React from "react"
import AppbarBackButton from "./AppbarBackButton"
import AppbarToRootLink from "./AppbarToRootLink"

const AppbarBackButtonOrToRootLink = () => {
  const router = useRouter()
  return router.query.canBack ? <AppbarBackButton /> : <AppbarToRootLink />
}

export default AppbarBackButtonOrToRootLink
