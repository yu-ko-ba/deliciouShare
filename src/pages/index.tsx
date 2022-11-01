import { Container, Grid, ThemeProvider } from "@mui/material";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import AppbarToRootLink from "../components/AppbarToRootLink";
import LoadingBar from "../components/LoadingBar";
import DelicioushareAppbar from "../components/DelicioushareAppbar";
import DelicioushareLink from "../components/DelicioushareLink";
import DelicioushareMenu from "../components/DelicioushareMenu";
import PostButton from "../components/PostButton";
import PostPreview from "../components/PostPreview";
import theme from "../theme";
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
        // ログインされてない場合はログインページへリダイレクトする
        if (!user) {
          if (process.env.NODE_ENV !== "development") {
            router.replace("sign-in")
          }
          return
        }
        const id = user.attributes.sub
        setUserId(id)
        fetchUserPosts(id)
      })
      .catch((err: Error) => {
        console.log(err);
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
    <ThemeProvider theme={theme}>
      <DelicioushareAppbar>
        <AppbarToRootLink />
        <DelicioushareMenu canBack />
      </DelicioushareAppbar>
      <LoadingBar nowLoading={nowLoading} />
      <Container maxWidth="md">
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
      </Container>
      <PostButton userId={userId} onPostFinish={fetchUserPosts} />
    </ThemeProvider>
  )
}

export default Home
