import { Card, CardMedia } from "@mui/material"

type postPreviewPropType = {
  imageUrl: string
}

const PostPreview = ({ imageUrl }: postPreviewPropType) => {
  return (
    <Card>
      <CardMedia
        component="img"
        image={imageUrl}
      />
    </Card>
  )
}

export default PostPreview
