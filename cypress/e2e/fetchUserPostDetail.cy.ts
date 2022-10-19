import fetchUserPostDetail from "../../src/utils/fetchUserPostDetail"

describe('fetch user post detail test', () => {
  it('should show response', async () => {
    console.log(await fetchUserPostDetail("4ec4fe7c-3fbe-49ef-883e-ac18ca82291f"))
  })
})
