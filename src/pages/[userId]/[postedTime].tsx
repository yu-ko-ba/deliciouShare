import { Card, CardContent, CardHeader, CardMedia, Container, Grid, Link, ThemeProvider, Typography } from "@mui/material"
import { GetServerSidePropsContext } from "next"
import NextLink from "next/link"
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
                    <CardHeader title="店舗情報" />
                    <CardContent>
                      <Typography>店名</Typography>
                      <Typography gutterBottom>{placeName}</Typography>
                      <Typography>住所</Typography>
                      <Typography gutterBottom>{placeAddress}</Typography>
                      <Typography>ホームページ</Typography>
                      <NextLink href={homepageUrl} passHref>
                        <Link target="_blank" rel="noopener noreferrer">
                          {homepageUrl}
                        </Link>
                      </NextLink>
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
                        height="300"
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
