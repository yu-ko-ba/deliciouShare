import { Link } from "@mui/material"
import NextLink from "next/link"
import React, { ReactNode } from "react"

type Props = {
  as?: URL
  href: URL
  variant?: "body1" | "body2" | "button" | "caption" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "inherit" | "overline" | "subtitle1" | "subtitle2"
  color?: any
  underline?: "always" | "hover" | "none"
  children: ReactNode
}

const MeshiteroLink = ({ as, href, variant, color, underline, children }: Props) => {
  return (
    <NextLink as={as} href={href} passHref>
      <Link variant={variant} color={color} underline={underline}>
        {children}
      </Link>
    </NextLink>
  )
}
 export default MeshiteroLink
