import { AppBar, Slide, Toolbar, useScrollTrigger } from "@mui/material"
import { ReactNode } from "react"

type Props ={
  children: ReactNode
}

const DelicioushareAppbar = ({ children }: Props) => {
  const trigger = useScrollTrigger()

  return (
    <>
      <Slide appear={false} direction="down" in={!trigger}>
        <AppBar>
          <Toolbar>
            {children}
          </Toolbar>
        </AppBar>
      </Slide>
      <Toolbar />
    </>
  )
}

export default DelicioushareAppbar
