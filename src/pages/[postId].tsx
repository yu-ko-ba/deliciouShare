import { Card, CardMedia, Container, Grid, Link, ThemeProvider } from "@mui/material"
import { Auth } from "aws-amplify"
import { GetServerSidePropsContext } from "next"
import NextLink from "next/link"
import { useEffect, useState } from "react"
import AppbarBackButtonOrToRootLink from "../components/AppbarBackButtonOrToRootLink"
import EatingPlaceInfo from "../components/EatingPlaceInfo"
import MeshiteroAppBar from "../components/MeshiteroAppBar"
import MeshiteroMenu from "../components/MeshiteroMenu"
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
  const [image, setImage] = useState("")
  const [eatingPlaceName, setEatingPlaceName] = useState("")
  const [eatingPlaceAddress, setEatingPlaceAddress] = useState("")
  const [eatingPlaceWebsite, setEatingPlaceWebsite] = useState("")
  const [eatingPlaceId, setEatingPlaceId] = useState("")

  const [signedIn, setSignedIn] = useState(true)

  useEffect(() => {
    fetchUserPostDetailData(postId)
      .then((detail) => {
        setImage(detail.largeImageUrl)
        setEatingPlaceName(detail.eatingPlace.name)
        setEatingPlaceAddress(detail.eatingPlace.address)
        setEatingPlaceWebsite(detail.eatingPlace.website)
        setEatingPlaceId(detail.eatingPlace.id)
      })
    Auth.currentUserInfo()
      .then((user) => {
        if (!user) {
          setSignedIn(false)
        }
      })
      .catch((err: Error) => {
        console.log(err)
        setSignedIn(false)
      })
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <MeshiteroAppBar>
        <AppbarBackButtonOrToRootLink />
        {signedIn && (
          <MeshiteroMenu canBack />
        )}
      </MeshiteroAppBar>
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
          <Grid item xs={12} />
        </Grid>
      </Container>
        <NextLink href="/terms-of-use" passHref>
          <Link variant="caption">
            利用規約
          </Link>
        </NextLink>
    </ThemeProvider>
  )
}

export default Post
