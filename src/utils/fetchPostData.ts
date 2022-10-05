import fetchPost from "./fetchPost"

type fetchPostDataType = {
  userId: string
  postedTime: string
  imageUrl: string
}

const fetchPostData = async (userId: string, postedTime: string) => {
  const data = await fetchPost(userId, postedTime)
    .then((res) => res.data)

  return data as fetchPostDataType
}

export default fetchPostData
