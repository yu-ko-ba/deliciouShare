import fetchPostData from "../../src/utils/fetchPostData"

describe('empty spec', () => {
  it('passes', async () => {
    const result = await fetchPostData("1", "3")
    expect(result.userId).to.equal("1")
    expect(result.postedTime).to.equal("3")
    expect(result.imageUrl).to.equal("https://cdn.discordapp.com/attachments/755257997789233195/1028882260943970324/6ee305439f5d3fae.jpg")
    expect(result.placeId).to.equal("ChIJ79oIut9hGGAR8_FMdJzjNpw")
  })
})
