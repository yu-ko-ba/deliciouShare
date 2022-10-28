import axios from "axios"
import apiUrls from "./apiUrls"

const removeUserPost = async (postId: string, userId: string, postedTime: string) => {
  return await axios.post(
    apiUrls.deleteUserPostUrl,
    {
      postId: postId,
      userId: userId,
      postedTime: postedTime,
    },
  )
}

export default removeUserPost
