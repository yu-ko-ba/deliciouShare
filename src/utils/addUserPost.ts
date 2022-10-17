import axios from "axios"
import apiUrls from "./apiUrls"
import EatingPlace from "./EatingPlace"

const addUserPost = async (userId: string, base64Image: string, eatingPlace: EatingPlace) => {
  const response = await axios.post(
    apiUrls.putUserPostUrl,
    {
      userId: userId,
      base64Image: base64Image,
      eatingPlace: eatingPlace,
    },
  )

  return response.status
}

export default addUserPost
