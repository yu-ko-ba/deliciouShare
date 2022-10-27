import { Card, CardContent, CardHeader, Typography } from "@mui/material"
import MeshiteroLink from "./MeshiteroLink"

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
                <MeshiteroLink href={websiteUrl} target="_blank" rel="noopener noreferrer">
                    {websiteUrl}
                </MeshiteroLink>
              </>
            )
          }
        })()}
      </CardContent>
    </Card>
  )
}

export default EatingPlaceInfo
