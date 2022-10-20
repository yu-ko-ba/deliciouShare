import { ArrowBackIos } from "@mui/icons-material"
import { AppBar, IconButton, Link, Slide, Toolbar, Typography, useScrollTrigger } from "@mui/material"
import NextLink from "next/link"
import { useRouter } from "next/router"

type Props ={
  beforePath?: string
}

const MeshiteroAppBar = ({ beforePath }: Props) => {
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
          </Toolbar>
        </AppBar>
      </Slide>
      <Toolbar />
    </>
  )
}

export default MeshiteroAppBar
