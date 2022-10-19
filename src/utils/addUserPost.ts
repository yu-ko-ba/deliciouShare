import axios, { AxiosResponse } from "axios"
import { Dispatch, SetStateAction } from "react"
import apiUrls from "./apiUrls"
import EatingPlace from "./EatingPlace"

const addUserPost = async (userId: string, base64Image: string, eatingPlace: EatingPlace) => {
  return await axios.post(
    apiUrls.putUserPostUrl,
    {
      userId: userId,
      base64Image: base64Image,
      eatingPlace: eatingPlace,
    },
  )
    .then((response: AxiosResponse) => response.status)
}

export default addUserPost
