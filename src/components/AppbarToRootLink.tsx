import { Link, Typography } from "@mui/material"
import NextLink from "next/link"

const AppbarToRootLink = () => {
  return (
    <NextLink href="/" passHref>
      <Link color="inherit" underline="hover">
        <Typography variant="h6">
          deliciouShare
        </Typography>
      </Link>
    </NextLink>
  )
}

export default AppbarToRootLink
