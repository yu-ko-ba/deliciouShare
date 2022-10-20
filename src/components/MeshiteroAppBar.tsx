import { AppBar, Slide, Toolbar, Typography, useScrollTrigger } from "@mui/material"

const MeshiteroAppBar = () => {
  const trigger = useScrollTrigger()
  return (
    <>
      <Slide appear={false} direction="down" in={!trigger}>
        <AppBar>
          <Toolbar>
            <Typography variant="h6">
              Meshitero
            </Typography>
          </Toolbar>
        </AppBar>
      </Slide>
      <Toolbar />
    </>
  )
}

export default MeshiteroAppBar
