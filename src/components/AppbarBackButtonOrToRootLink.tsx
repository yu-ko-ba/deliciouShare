import { useRouter } from "next/router"
import React from "react"
import AppbarBackButton from "./AppbarBackButton"
import AppbarToRootLink from "./AppbarToRootLink"

const AppbarBackButtonOrToRootLink = () => {
  const router = useRouter()
  return router.query.canBack !== undefined ? <AppbarBackButton /> : <AppbarToRootLink />
}

export default AppbarBackButtonOrToRootLink
