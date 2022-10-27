import { Link as MuiLink, LinkProps as MuiLinkProps } from "@mui/material"
import NextLink, { LinkProps as NextLinkProps } from "next/link"
import React from "react"

type Props = NextLinkProps & MuiLinkProps

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
