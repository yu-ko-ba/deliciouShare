import { Container, ThemeProvider, Typography } from "@mui/material"
import AppbarBackButtonOrToRootLink from "../components/AppbarBackButtonOrToRootLink"
import MeshiteroAppBar from "../components/MeshiteroAppBar"
import TermsOfUse from "../components/TermsOfUse"
import theme from "../theme"

const TermsOfUsePage = () => {
  return (
    <ThemeProvider theme={theme}>
      <MeshiteroAppBar>
        <AppbarBackButtonOrToRootLink />
      </MeshiteroAppBar>
      <Container maxWidth="sm">
        <Typography variant="h5">利用規約</Typography>
        <br />
        <TermsOfUse />
      </Container>
    </ThemeProvider>
  )
}

export default TermsOfUsePage
