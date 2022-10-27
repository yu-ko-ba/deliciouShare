import { Link as MuiLink, TypographyProps } from "@mui/material"
import NextLink from "next/link"
import React, { HTMLAttributeAnchorTarget } from "react"
import { UrlObject } from "url"

type Props = {
  as?: string | UrlObject
  href: string | UrlObject
  target?: HTMLAttributeAnchorTarget | undefined
  rel?: string | undefined
  variant?: TypographyProps["variant"]
  color?: TypographyProps["color"]
  underline?: "none" | "hover" | "always"
  children?: React.ReactNode
}

const MeshiteroLink = ({ as, href, target, rel, variant, color, underline, children }: Props) => {
  return (
    <NextLink as={as} href={href} passHref>
      <MuiLink target={target} rel={rel} variant={variant} color={color} underline={underline}>
        {children}
      </MuiLink>
    </NextLink>
  )
}
 export default MeshiteroLink
