import fetchPost from "./fetchPost"

type FetchPostDataType = {
  userId: string
  postedTime: string
  imageUrl: string
  placeId: string
}

const fetchPostData = async (userId: string, postedTime: string) => {
  const data = await fetchPost(userId, postedTime)
    .then((res) => res.data)

  return data as FetchPostDataType
}

export default fetchPostData
