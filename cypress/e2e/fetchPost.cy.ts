import fetchPost from "../../src/utils/fetchPost"

describe('fetch post test', () => {
  it('should return post data', async () => {
    const result = await fetchPost("1", "1")
    console.log(result)
  })
})
