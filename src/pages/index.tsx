import { Container, Grid, Link, ThemeProvider } from "@mui/material";
import { Auth } from "aws-amplify";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import AppbarToRootLink from "../components/AppbarToRootLink";
import LoadingBar from "../components/LoadingBar";
import MeshiteroAppBar from "../components/MeshiteroAppBar";
import MeshiteroMenu from "../components/MeshiteroMenu";
import PostButton from "../components/PostButton";
import PostPreview from "../components/PostPreview";
import theme from "../theme";
import fetchUserPostOutlinesData, { UserPostOutline } from "../utils/fetchUserPostOutlinesData";

const Home = () => {
  const router = useRouter()

  const [userId, setUserId] = useState("")

  useEffect(() => {
    if (userId !== "") {
      fetchUserPosts()
      return
    }
    Auth.currentUserInfo()
      .then((user) => {
        if (!user) {
          router.replace("sign-in")
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
  }

  return (
    <ThemeProvider theme={theme}>
      <MeshiteroAppBar>
        <AppbarToRootLink />
        <MeshiteroMenu canBack />
      </MeshiteroAppBar>
      <LoadingBar nowLoading={nowLoading} />
      <Container maxWidth="md">
        <Grid container spacing={4}>
          {(() => {
            if (userPostOutlines?.map) {
              return userPostOutlines.map((outline: UserPostOutline) => (
                <Grid item xs={6} sm={4} key={outline.postedTime}>
                  <NextLink
                    as={`${outline.postId}`}
                    href={{
                      pathname: `${outline.postId}`,
                      query: { canBack: true }
                    }}
                    passHref
                  >
                    <Link>
                      <PostPreview imageUrl={outline.smallImageUrl} />
                    </Link>
                  </NextLink>
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
