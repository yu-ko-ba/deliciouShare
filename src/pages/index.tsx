import { Container, Grid, Link, ThemeProvider } from "@mui/material";
import NextLink from "next/link";
import React, { useEffect, useState } from "react";
import PostButton from "../components/PostButton";
import PostPreview from "../components/PostPreview";
import theme from "../theme";
import fetchUserPostsData from "../utils/fetchUserPostsData";

export default function Home() {
  const [userPosts, setUserPosts] = useState([])

  const fetchUserPosts = () => {
    // 読み込み中なかんじを表示する処理を書く

    fetchUserPostsData("1")
      .then((posts) => {
        setUserPosts(posts)
      })
  }

  useEffect(() => {
    fetchUserPosts()
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <main>
        <Container maxWidth="md">
          <Grid container spacing={4}>
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
