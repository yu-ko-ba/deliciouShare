import { ExpandMore } from "@mui/icons-material"
import { Accordion, AccordionDetails, AccordionSummary, Card, CardActions, CardHeader, Collapse, Container, Stack, TextField, ThemeProvider, Typography } from "@mui/material"
import axios from "axios"
import AppbarBackButtonOrToRootLink from "../components/AppbarBackButtonOrToRootLink"
import DelicioushareAppbar from "../components/DelicioushareAppbar"
import DelicioushareMenu from "../components/DelicioushareMenu"
import theme from "../theme"
import licenses from "../utils/licenses"

export const getServerSideProps = async () => {
  // ライセンスの内容をurlから取得する
  return {
    props: {},
  }
}

const License = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <DelicioushareAppbar>
          <AppbarBackButtonOrToRootLink />
          <DelicioushareMenu />
        </DelicioushareAppbar>
        <Stack spacing={4}>
          {Object.keys(licenses).sort().map((name: string) => (
            <Accordion key={name}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
              >
                <Typography variant="h6">{name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TextField
                  value={axios.get(licenses[name]).then((res) => res.data)}
                  multiline
                  disabled
                  fullWidth
                />
              </AccordionDetails>
            </Accordion>
          ))}
        </Stack>
      </Container>
    </ThemeProvider>
  )
}

export default License
