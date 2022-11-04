import { ExpandMore } from "@mui/icons-material"
import { Accordion, AccordionDetails, AccordionSummary, Container, Stack, TextField, Typography } from "@mui/material"
import axios, { AxiosResponse } from "axios"
import React from "react"
import DelicioushareHead from "../components/DelicioushareHead"
import licenseUrls from "../utils/licenseUrls"

type Props = {
  licenses: { [license: string]: string }
}

export const getStaticProps = async () => {
  // ライセンスの内容をurlから取得する
  const licenses: {[license: string]: string} = {}
  const promises = Object.keys(licenseUrls).map((ossName: string) => {
  return axios.get(licenseUrls[ossName])
    .then((res: AxiosResponse<string>) => {
      licenses[ossName] = res.data
    })
  })
  await Promise.all(promises)
  return { props: { licenses: licenses } }
}

const License = ({ licenses }: Props) => {
  return (
    <Container maxWidth="sm">
      <DelicioushareHead title="ライセンス" />
      <Stack spacing={2}>
        {
          Object.keys(licenses)
            .sort((nameA: string, nameB: string) => {
              const a = nameA.toLowerCase()
              const b = nameB.toLowerCase()
              if (a < b) {
                return -1
              }
              if (a > b) {
                return 1
              }
              return 0
            })
            .map((ossName: string) => (
              <Accordion key={ossName}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="h6">
                    {ossName}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TextField
                    value={licenses[ossName]}
                    multiline
                    disabled
                    fullWidth
                  />
                </AccordionDetails>
              </Accordion>
            ))
        }
      </Stack>
    </Container>
  )
}

export default License
