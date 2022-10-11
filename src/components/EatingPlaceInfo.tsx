import { Card, CardContent, CardHeader, Link, Typography } from "@mui/material"
import NextLink from "next/link"

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
                <NextLink href={websiteUrl} passHref>
                  <Link target="_blank" rel="noopener noreferrer">
                    {websiteUrl}
                  </Link>
                </NextLink>
              </>
            )
          }
        })()}
      </CardContent>
    </Card>
  )
}

export default EatingPlaceInfo
