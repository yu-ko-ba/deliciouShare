import { ArrowBackIos } from "@mui/icons-material"
import { AppBar, Box, IconButton, Link, Slide, Toolbar, Typography, useScrollTrigger } from "@mui/material"
import NextLink from "next/link"
import { useRouter } from "next/router"
import MeshiteroMenu from "./MeshiteroMenu"

type Props ={
  beforePath?: string
  userId?: string
}

const MeshiteroAppBar = ({ beforePath, userId }: Props) => {
  const trigger = useScrollTrigger()
  const router = useRouter()

  return (
    <>
      <Slide appear={false} direction="down" in={!trigger}>
        <AppBar>
          <Toolbar>
            {(() => {
              if (beforePath && router.asPath !== "/") {
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
              return (
                <NextLink href="/" passHref>
                  <Link color="inherit" underline="hover">
                    <Typography variant="h6">
                      deliciouShare
                    </Typography>
                  </Link>
                </NextLink>
              )
            })()}
            <Box sx={{ flexGrow: 1 }} />
            {(() => {
              if (userId) {
                return <MeshiteroMenu />
              }
            })()}
          </Toolbar>
        </AppBar>
      </Slide>
      <Toolbar />
    </>
  )
}

export default MeshiteroAppBar
