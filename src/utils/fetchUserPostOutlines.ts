import axios from "axios"
import apiUrls from "./apiUrls"

const fetchUserPostOutlines = async (userId: string) => {
  return await axios.post(
    apiUrls.getUserPostOutlinesUrl,
    {
      userId: userId,
    }
  )
}

export default fetchUserPostOutlines
