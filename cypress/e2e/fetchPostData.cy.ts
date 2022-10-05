import fetchPostData from "../../src/utils/fetchPostData"

describe('empty spec', () => {
  it('passes', async () => {
    const result = await fetchPostData("1", "1")
    expect(result.userId).to.equal("1")
    expect(result.postedTime).to.equal("1")
    expect(result.imageUrl).to.equal("https://cdn.discordapp.com/attachments/755257997789233195/990916206804488222/DSC_0200.jpg")
  })
})
