import EatingPlace from "./EatingPlace"
import fetchUserPostDetail from "./fetchUserPostDetail"

type UserPostDetail = {
  largeImageUrl: string
  eatingPlace: EatingPlace
  contributor: {
    userId: string
  }
  postedTime: string
}

const fetchUserPostDetailData = async (postId: string) => {
  return await fetchUserPostDetail(postId)
    .then((response) => response.data as UserPostDetail)
}

export default fetchUserPostDetailData
