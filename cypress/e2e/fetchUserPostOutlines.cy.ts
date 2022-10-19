import fetchUserPostOutlines from "../../src/utils/fetchUserPostOutlines"

describe('fetch user post outlines test', () => {
  it('should output response data to console', async () => {
    console.log(await fetchUserPostOutlines("1"))
  })
})
