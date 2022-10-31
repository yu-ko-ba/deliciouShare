import { Card, CardContent, CardHeader, Typography } from "@mui/material"
import DelicioushareLink from "./DelicioushareLink"

type EatingPlaceInfoPropsType = {
  placeName: string
  placeAddress: string
  websiteUrl: string
}

const EatingPlaceInfo = ({ placeName, placeAddress, websiteUrl }: EatingPlaceInfoPropsType) => {
  return (
    <Card>
      <CardHeader title="店舗情報" />
      <CardContent>
        {(() => {
          if (placeName !== "") {
            return (
              <>
                <Typography>店名</Typography>
                <Typography gutterBottom>{placeName}</Typography>
              </>
            )
          }
        })()}
        {(() => {
          if (placeAddress !== "") {
            return (
              <>
                <Typography>住所</Typography>
                <Typography gutterBottom>{placeAddress}</Typography>
              </>
            )
          }
        })()}
        {(() => {
          if (websiteUrl !== "") {
            return (
              <>
                <Typography>ホームページ</Typography>
                <DelicioushareLink href={websiteUrl} target="_blank" rel="noopener noreferrer">
                    {websiteUrl}
                </DelicioushareLink>
              </>
            )
          }
        })()}
      </CardContent>
    </Card>
  )
}

export default EatingPlaceInfo
