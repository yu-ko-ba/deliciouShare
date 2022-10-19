import fetchUserPostOutlines from "./fetchUserPostOutlines"

export type UserPostOutline = {
  postedTime: string,
  smallImageUrl: string,
  postId: string,
}

const fetchUserPostOutlinesData = async (userId: string) => {
  return await fetchUserPostOutlines(userId)
    .then((response) => response.data as UserPostOutline[])
}

export default fetchUserPostOutlinesData
