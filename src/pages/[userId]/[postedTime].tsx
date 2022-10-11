import { Card, CardMedia, Container, Grid, ThemeProvider } from "@mui/material"
import { GetServerSidePropsContext } from "next"
import EatingPlaceInfo from "../../components/EatingPlaceInfo"
import theme from "../../theme"
import fetchPlaceDetailsData, { FetchPlaceDetailsDataType } from "../../utils/fetchPlaceDetailsData"
import fetchPostData from "../../utils/fetchPostData"

type ContextQueryType = {
  userId: string
  postedTime: string
}

type PostPropsType = {
  imageUrl: string
  placeName: string
  placeAddress: string
  websiteUrl: string
  iframeUrl: string
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { userId, postedTime } = context.query as ContextQueryType
  const data = await fetchPostData(userId, postedTime)
  const placeInfo = await (async () => {
    let info: FetchPlaceDetailsDataType = {
      name: "",
      address: "",
      website: "",
      iframeUrl: ""
    }
    if (data.placeId !== "") {
      info = await fetchPlaceDetailsData(data.placeId)
    }
    return info
  })()
  return {
    props: {
      imageUrl: data.imageUrl,
      placeName: placeInfo.name,
      placeAddress: placeInfo.address,
      websiteUrl: placeInfo.website ? placeInfo.website : "",
      iframeUrl: placeInfo.iframeUrl
    }
  }
}

const Post = ({ imageUrl, placeName, placeAddress, websiteUrl, iframeUrl }: PostPropsType) => {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Card>
              <CardMedia
                component="img"
                image={imageUrl}
              />
            </Card>
          </Grid>
          {(() => {
            if (
              placeName !== ""
              || placeAddress !== "" 
              || websiteUrl !== ""
            ) {
              return (
                <Grid item xs={12}>
                  <EatingPlaceInfo
                    placeName={placeName}
                    placeAddress={placeAddress}
                    websiteUrl={websiteUrl}
                  />
                </Grid>
              )
            }
          })()}
          {(() => {
            if (iframeUrl !== "") {
              return (
                <Grid item xs={12}>
                  <Card>
                    <CardMedia
                      component="iframe"
                      src={iframeUrl}
                      height="400"
                    />
                  </Card>
                </Grid>
              )
            }
          })()}
        </Grid>
      </Container>
    </ThemeProvider>
  )
}

export default Post
