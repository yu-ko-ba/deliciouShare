import { Card, CardMedia, Container, Grid, ThemeProvider } from "@mui/material"
import { GetServerSidePropsContext } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import EatingPlaceInfo from "../components/EatingPlaceInfo"
import MeshiteroAppBar from "../components/MeshiteroAppBar"
import theme from "../theme"
import apiUrls from "../utils/apiUrls"
import environmentVariables from "../utils/environmentVariables"
import fetchUserPostDetailData from "../utils/fetchUserPostDetailData"

type PostProps = {
  postId: string
}

export const getServerSideProps = (context: GetServerSidePropsContext) => {
  const { postId } = context.query
  return {
    props: {
      postId: postId
    }
  }
}

const Post = ({ postId }: PostProps) => {
  const router = useRouter()

  const [image, setImage] = useState("")
  const [eatingPlaceName, setEatingPlaceName] = useState("")
  const [eatingPlaceAddress, setEatingPlaceAddress] = useState("")
  const [eatingPlaceWebsite, setEatingPlaceWebsite] = useState("")
  const [eatingPlaceId, setEatingPlaceId] = useState("")

  useEffect(() => {
    fetchUserPostDetailData(postId)
      .then((detail) => {
        setImage(detail.largeImageUrl)
        setEatingPlaceName(detail.eatingPlace.name)
        setEatingPlaceAddress(detail.eatingPlace.address)
        setEatingPlaceWebsite(detail.eatingPlace.website)
        setEatingPlaceId(detail.eatingPlace.id)
      })
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <MeshiteroAppBar beforePath={router.query.beforePath as string} />
      <Container maxWidth="sm">
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Card>
              <CardMedia
                component="img"
                image={image}
              />
            </Card>
          </Grid>
          {(() => {
            if (
              eatingPlaceName !== ""
              || eatingPlaceAddress !== ""
              || eatingPlaceWebsite !== ""
            ) {
              return (
                <Grid item xs={12}>
                  <EatingPlaceInfo
                    placeName={eatingPlaceName}
                    placeAddress={eatingPlaceAddress}
                    websiteUrl={eatingPlaceWebsite}
                  />
                </Grid>
              )
            }
          })()}
          {(() => {
            if (eatingPlaceId !== "") {
              return (
                <Grid item xs={12}>
                  <Card>
                    <CardMedia
                      component="iframe"
                      src={`${apiUrls.getMapsEmbedUrl}?key=${environmentVariables.googleCloudApiKey}&q=place_id:${eatingPlaceId}`}
                      height={400}
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
