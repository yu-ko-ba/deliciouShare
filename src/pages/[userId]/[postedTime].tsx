import { Card, CardContent, CardMedia, Container, Grid, ThemeProvider, Typography } from "@mui/material"
import { GetServerSidePropsContext } from "next"
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
  homepageUrl: string
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
      homepageUrl: placeInfo.website ? placeInfo.website : "",
      iframeUrl: placeInfo.iframeUrl
    }
  }
}

const Post = ({ imageUrl, placeName, placeAddress, homepageUrl, iframeUrl }: PostPropsType) => {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xs">
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
                || homepageUrl !== ""
            ) {
              return (
                <Grid item xs={12}>
                  <Card>
                    <CardContent>
                      <Typography>{placeName}</Typography>
                      <Typography>{placeAddress}</Typography>
                      <Typography>{homepageUrl}</Typography>
                    </CardContent>
                  </Card>
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
