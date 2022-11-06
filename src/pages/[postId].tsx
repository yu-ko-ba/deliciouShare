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
import EatingPlace from "../utils/EatingPlace"

type PostProps = {
  postId: string
  imageUrl: string
  eatingPlace: EatingPlace
  contributorUserId: string
  postedTime: string
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const postId = context.query.postId as string
  const detail = await fetchUserPostDetailData(postId)
  return {
    props: {
      postId: postId,
      imageUrl: detail.largeImageUrl,
      eatingPlace: detail.eatingPlace,
      contributorUserId: detail.contributor.userId,
      postedTime: detail.postedTime,
    }
  }
}

const Post = ({ postId, imageUrl, eatingPlace, contributorUserId, postedTime }: PostProps & PageProps) => {
  const [currentUserId, setCurrentUserId] = useState("")

  useEffect(() => {
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
        title={eatingPlace.name !== "" ? `in ${eatingPlace.name}` : "deliciouShare.app"}
        description="見るだけならアカウント不要！ deliciouShare.app - おいしい！をシェアしよう -"
        imageUrl={imageUrl}
        twitterCardType="summary_large_image"
      />
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
            eatingPlace.name !== ""
            || eatingPlace.address !== ""
            || eatingPlace.website !== ""
          ) {
            return (
              <Grid item xs={12}>
                <EatingPlaceInfo
                  placeName={eatingPlace.name}
                  placeAddress={eatingPlace.address}
                  websiteUrl={eatingPlace.website}
                />
              </Grid>
            )
          }
        })()}
        {(() => {
          if (eatingPlace.id !== "") {
            return (
              <Grid item xs={12}>
                <Card>
                  <CardMedia
                    component="iframe"
                    src={`${apiUrls.getMapsEmbedUrl}?key=${environmentVariables.googleCloudApiKey}&q=place_id:${eatingPlace.id}`}
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
