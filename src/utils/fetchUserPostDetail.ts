import axios from "axios"
import apiUrls from "./apiUrls"

const fetchUserPostDetail = async (postId: string) => {
  return await axios.post(
    apiUrls.getUserPostDetailUrl,
    {
      postId: postId,
    },
  )
}

export default fetchUserPostDetail
