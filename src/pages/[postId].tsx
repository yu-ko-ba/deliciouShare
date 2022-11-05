import { Card, CardMedia, Container, Grid } from "@mui/material"
import { Auth } from "aws-amplify"
import { GetServerSidePropsContext } from "next"
import React, { useEffect, useState } from "react"
import ContributorOptionsAccordion from "../components/ContributorOptionsAccordion"
import EatingPlaceInfo from "../components/EatingPlaceInfo"
import DelicioushareLink from "../components/DelicioushareLink"
import apiUrls from "../utils/apiUrls"
import environmentVariables from "../utils/environmentVariables"
import fetchUserPostDetailData from "../utils/fetchUserPostDetailData"
import PageProps from "../utils/PageProps"
import DelicioushareHead from "../components/DelicioushareHead"

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

const Post = ({ postId, openFailureSnackbar }: PostProps & PageProps) => {
  const [image, setImage] = useState("")
  const [eatingPlaceName, setEatingPlaceName] = useState("")
  const [eatingPlaceAddress, setEatingPlaceAddress] = useState("")
  const [eatingPlaceWebsite, setEatingPlaceWebsite] = useState("")
  const [eatingPlaceId, setEatingPlaceId] = useState("")

  const [contributorUserId, setContributorUserId] = useState("")
  const [postedTime, setPostedTime] = useState("")

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
      .catch((err: Error) => {
        if (process.env.NODE_ENV === "development") {
          console.log(err)
        }
        openFailureSnackbar("データの取得に失敗しました")
      })
    Auth.currentUserInfo()
      .then((user) => {
        setCurrentUserId(user.attributes.sub)
      })
      .catch((err: Error) => {
        if (process.env.NODE_ENV === "development") {
          console.log(err)
        }
      })
  }, [])

  return (
    <Container maxWidth="sm">
      <DelicioushareHead
        title={eatingPlaceName !== "" ? `in ${eatingPlaceName}` : "deliciouShare.app"}
        description="見るだけならアカウント不要！ deliciouShare.app - おいしい！をシェアしよう -"
        imageUrl={image}
        twitterCardType="summary_large_image"
      />
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
    </Container>
  )
}

export default Post
