import { Container, Typography } from "@mui/material"
import TermsOfUse from "../components/TermsOfUse"

const TermsOfUsePage = () => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h5">利用規約</Typography>
      <br />
      <TermsOfUse />
    </Container>
  )
}

export default TermsOfUsePage
