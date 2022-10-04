import apiUrls from "../../src/utils/apiUrls";
import fetchUserPosts from "../../src/utils/fetchUserPosts"

describe('get user posts test', () => {
  it('should return user posts', async () => {
    fetchUserPosts("1")
      .then((res) => {
        console.log(res.data)
      })
  })
})
