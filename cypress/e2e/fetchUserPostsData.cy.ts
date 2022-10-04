import fetchUserPostsData from "../../src/utils/fetchUserPostsData"

describe('fetch user posts data test', () => {
  it('should return user posts data', async () => {
    const result = await fetchUserPostsData("1")
    expect(result[0].userId).to.equal("1")
    expect(result[0].postedTime).to.equal("1")
    expect(result[0].imageUrl).to.equal("https://cdn.discordapp.com/attachments/755257997789233195/990916206804488222/DSC_0200.jpg")
  })
})
