import { Container, Grid } from "@mui/material";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import DelicioushareHead from "../components/DelicioushareHead";
import DelicioushareLink from "../components/DelicioushareLink";
import PostButton from "../components/PostButton";
import PostPreview from "../components/PostPreview";
import fetchUserPostOutlinesData, { UserPostOutline } from "../utils/fetchUserPostOutlinesData";
import PageProps from "../utils/PageProps";

const Home = ({ openFailureSnackbar }: PageProps) => {
  const router = useRouter()

  const [userId, setUserId] = useState("")

  useEffect(() => {
    if (userId !== "") {
      fetchUserPosts()
      return
    }
    // ユーザー情報を取得する
    Auth.currentUserInfo()
      .then((user) => {
        const id = user.attributes.sub
        setUserId(id)
        fetchUserPosts(id)
      })
      .catch((err: Error) => {
        if (process.env.NODE_ENV === "development") {
          console.log(err)
        }
        // ログインされてない場合はログインページへリダイレクトする
        if (process.env.NODE_ENV !== "development") {
          router.replace("sign-in")
        }
      })
  }, [])

  const [nowLoading, setNowLoading] = useState(false)

  const [userPostOutlines, setUserPostOutlines] = useState<UserPostOutline[]>()

  const fetchUserPosts = (id: string = userId) => {
    setNowLoading(true)
    fetchUserPostOutlinesData(id)
      .then((outlines: UserPostOutline[]) => {
        setUserPostOutlines(outlines)
        setNowLoading(false)
      })
      .catch((err: Error) => {
        if (process.env.NODE_ENV === "development") {
          console.log(err)
        }
        openFailureSnackbar("データの取得に失敗しました")
      })
  }

  return (
    <Container maxWidth="md">
      <DelicioushareHead twitterCardType="app" />
      <Grid container spacing={4}>
        {(() => {
          if (userPostOutlines?.map) {
            return userPostOutlines.map((outline: UserPostOutline) => (
              <Grid item xs={6} sm={4} key={outline.postedTime}>
                <DelicioushareLink
                  as={`${outline.postId}`}
                  href={{
                    pathname: `${outline.postId}`,
                    query: { canBack: true }
                  }}
                >
                    <PostPreview imageUrl={outline.smallImageUrl} />
                </DelicioushareLink>
              </Grid>
            ))
          }
        })()}
      </Grid>
    <PostButton userId={userId} onPostFinish={fetchUserPosts} />
    </Container>
  )
}

export default Home
