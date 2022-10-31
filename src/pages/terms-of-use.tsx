import { Container, ThemeProvider, Typography } from "@mui/material"
import AppbarBackButtonOrToRootLink from "../components/AppbarBackButtonOrToRootLink"
import DelicioushareAppbar from "../components/DelicioushareAppbar"
import TermsOfUse from "../components/TermsOfUse"
import theme from "../theme"

const TermsOfUsePage = () => {
  return (
    <ThemeProvider theme={theme}>
      <DelicioushareAppbar>
        <AppbarBackButtonOrToRootLink />
      </DelicioushareAppbar>
      <Container maxWidth="sm">
        <Typography variant="h5">利用規約</Typography>
        <br />
        <TermsOfUse />
      </Container>
    </ThemeProvider>
  )
}

export default TermsOfUsePage
