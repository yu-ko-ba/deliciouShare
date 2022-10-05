import axios from "axios";
import apiUrls from "./apiUrls";

const fetchUserPosts = async (userId: string) => {
  return await axios.post(
    apiUrls.getUserPostsUrl,
    { "userId": userId }
  )
}

export default fetchUserPosts
