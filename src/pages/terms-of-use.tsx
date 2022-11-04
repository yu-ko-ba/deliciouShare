import { Container, Typography } from "@mui/material"
import DelicioushareHead from "../components/DelicioushareHead"
import TermsOfUse from "../components/TermsOfUse"

const TermsOfUsePage = () => {
  return (
    <Container maxWidth="sm">
      <DelicioushareHead title="利用規約" />
      <Typography variant="h5">利用規約</Typography>
      <br />
      <TermsOfUse />
    </Container>
  )
}

export default TermsOfUsePage
