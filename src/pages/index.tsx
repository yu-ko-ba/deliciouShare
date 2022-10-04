import apiUrls from "../utils/apiUrls";
import fetchUserPosts from "../utils/fetchUserPosts";

export default function Home() {
  const clickHundler = () => {
    fetchUserPosts("1")
  }
  return (
    <>
      <button onClick={clickHundler}>fetchUserPosts</button>
    </>
  )
}
