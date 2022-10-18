import { Container, Grid, Link, ThemeProvider } from "@mui/material";
import NextLink from "next/link";
import React, { useEffect, useState } from "react";
import LoadingBar from "../components/LoadingBar";
import PostButton from "../components/PostButton";
import PostPreview from "../components/PostPreview";
import theme from "../theme";
import fetchUserPostsData from "../utils/fetchUserPostsData";

export default function Home() {
  const [nowLoading, setNowLoading] = useState(false)

  const [userPosts, setUserPosts] = useState([])

  const fetchUserPosts = () => {
    setNowLoading(true)
    fetchUserPostsData("1")
      .then((posts) => {
        setUserPosts(posts)
        setNowLoading(false)
      })
  }

  useEffect(() => {
    fetchUserPosts()
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <LoadingBar nowLoading={nowLoading} />
      <main>
        <Container maxWidth="md">
          <Grid container spacing={4}>
            <Grid item xs={12} />
            {userPosts.map((p) => (
              <Grid item xs={6} sm={4} key={p.postedTime}>
                <NextLink href={`${p.userId}/${p.postedTime}`} passHref>
                  <Link>
                    <PostPreview imageUrl={p.imageUrl} />
                  </Link>
                </NextLink>
              </Grid>
            ))}
          </Grid>
        </Container>
        <PostButton onPostFinish={fetchUserPosts} />
      </main>
    </ThemeProvider>
  )
}
