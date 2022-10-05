import { Card, CardMedia, Container, Grid, ThemeProvider, Typography } from "@mui/material"
import theme from "../../theme"
import fetchPostData from "../../utils/fetchPostData"

type contextQueryType = {
  userId: string
  postedTime: string
}

export const getServerSideProps = async (context) => {
  const { userId, postedTime } = context.query as contextQueryType
  const data = await fetchPostData(userId, postedTime)
  return {
    props: data
  }
}

const Post = ({ imageUrl }) => {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xs">
        <Grid container>
          <Grid item xs={12}>
            <Card>
              <CardMedia
                component="img"
                image={imageUrl}
              />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  )
}

export default Post
