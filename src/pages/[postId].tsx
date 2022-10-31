import { Card, CardMedia, Container, Grid, ThemeProvider } from "@mui/material"
import { Auth } from "aws-amplify"
import { GetServerSidePropsContext } from "next"
import { useEffect, useState } from "react"
import AppbarBackButtonOrToRootLink from "../components/AppbarBackButtonOrToRootLink"
import ContributorOptionsAccordion from "../components/ContributorOptionsAccordion"
import EatingPlaceInfo from "../components/EatingPlaceInfo"
import DelicioushareAppbar from "../components/DelicioushareAppbar"
import DelicioushareLink from "../components/DelicioushareLink"
import DelicioushareMenu from "../components/DelicioushareMenu"
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

  const [contributorUserId, setContributorUserId] = useState("")
  const [postedTime, setPostedTime] = useState("")

  const [signedIn, setSignedIn] = useState(true)

  const [currentUserId, setCurrentUserId] = useState("")

  useEffect(() => {
    fetchUserPostDetailData(postId)
      .then((detail) => {
        setImage(detail.largeImageUrl)
        setEatingPlaceName(detail.eatingPlace.name)
        setEatingPlaceAddress(detail.eatingPlace.address)
        setEatingPlaceWebsite(detail.eatingPlace.website)
        setEatingPlaceId(detail.eatingPlace.id)
        setContributorUserId(detail.contributor.userId)
        setPostedTime(detail.postedTime)
      })
    Auth.currentUserInfo()
      .then((user) => {
        if (!user) {
          setSignedIn(false)
          return
        }
        setCurrentUserId(user.attributes.sub)
      })
      .catch((err: Error) => {
        console.log(err)
        setSignedIn(false)
      })
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <DelicioushareAppbar>
        <AppbarBackButtonOrToRootLink />
        {signedIn && (
          <DelicioushareMenu canBack />
        )}
      </DelicioushareAppbar>
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
          {currentUserId === contributorUserId && (
            <>
              <Grid item xs={12} />
              <Grid item xs={12}>
                <ContributorOptionsAccordion
                  postId={postId}
                  userId={contributorUserId}
                  postedTime={postedTime}
                />
              </Grid>
            </>
          )}
          <Grid item xs={12} />
        </Grid>
      </Container>
        <DelicioushareLink
          as="/terms-of-use"
          href={{
            pathname: "/terms-of-use",
            query: { canBack: true },
          }}
          variant="caption"
        >
            利用規約
        </DelicioushareLink>
    </ThemeProvider>
  )
}

export default Post
