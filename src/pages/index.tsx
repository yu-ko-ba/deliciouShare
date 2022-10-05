import { Container, Grid, Link, ThemeProvider } from "@mui/material";
import Image from "next/image";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import PostPreview from "../components/PostPreview";
import theme from "../theme";
import apiUrls from "../utils/apiUrls";
import fetchUserPosts from "../utils/fetchUserPosts";
import fetchUserPostsData from "../utils/fetchUserPostsData";

export default function Home() {
  const [userPosts, setUserPosts] = useState([])
  useEffect(() => {
    fetchUserPostsData("1")
      .then((posts) => {
        setUserPosts(posts)
      })
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
      </main>
    </ThemeProvider>
  )
}
