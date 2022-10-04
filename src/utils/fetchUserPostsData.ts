import fetchUserPosts from "./fetchUserPosts"

type fetchUserPostsDataType = {
  userId: string
  postedTime: string
  imageUrl: string
}

const fetchUserPostsData = async (userId: string) => {
  const data = await fetchUserPosts(userId)
    .then((res) => JSON.parse(res.data))

  return data as fetchUserPostsDataType[]
}

export default fetchUserPostsData
