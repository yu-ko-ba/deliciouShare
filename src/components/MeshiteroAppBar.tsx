import { AppBar, CssBaseline, Slide, Toolbar, Typography, useScrollTrigger } from "@mui/material"

const MeshiteroAppBar = () => {
  return (
    <>
      <Slide
        appear={false}
        direction="down"
        in={!useScrollTrigger({ target: window })}
      >
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
