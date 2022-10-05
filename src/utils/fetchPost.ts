import axios from "axios"
import apiUrls from "./apiUrls"

const fetchPost = async (userId: string, postedTime: string) => {
  return await axios.post(
    apiUrls.getPostUrl,
    {
      "userId": userId,
      "postedTime": postedTime
    }
  )
}

export default fetchPost
