import { Container, Grid, Link, ThemeProvider } from "@mui/material";
import NextLink from "next/link";
import React, { useEffect, useState } from "react";
import LoadingBar from "../components/LoadingBar";
import MeshiteroAppBar from "../components/MeshiteroAppBar";
import PostButton from "../components/PostButton";
import PostPreview from "../components/PostPreview";
import theme from "../theme";
import fetchUserPostOutlinesData, { UserPostOutline } from "../utils/fetchUserPostOutlinesData";

export default function Home() {
  const [nowLoading, setNowLoading] = useState(false)

  const [userPostOutlines, setUserPostOutlines] = useState<UserPostOutline[]>([])

  const fetchUserPosts = () => {
    setNowLoading(true)
    fetchUserPostOutlinesData("1")
      .then((outlines: UserPostOutline[]) => {
        setUserPostOutlines(outlines)
        setNowLoading(false)
      })
  }

  useEffect(() => {
    fetchUserPosts()
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <LoadingBar nowLoading={nowLoading} />
      <Container maxWidth="md">
        <Grid container spacing={4}>
          <Grid item xs={12} />
          {userPostOutlines?.map((outline: UserPostOutline) => (
            <Grid item xs={6} sm={4} key={outline.postedTime}>
              <NextLink href={`${outline.postId}`} passHref>
                <Link>
                  <PostPreview imageUrl={outline.smallImageUrl} />
                </Link>
              </NextLink>
            </Grid>
          ))}
        </Grid>
      </Container>
      <PostButton onPostFinish={fetchUserPosts} />
    </ThemeProvider>
  )
}
