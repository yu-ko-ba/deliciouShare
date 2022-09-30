import getUserPosts from "../../src/utils/getUserPosts"

describe('get user posts test', () => {
  it('should return user posts', () => {
    expect(getUserPosts("1")).to.equal([
      {
        userId: "1",
        postedTime: "1",
        imageUrl: "https://cdn.discordapp.com/attachments/755257997789233195/990916206804488222/DSC_0200.jpg"
      },
      {
        userId: "1",
        postedTime: "2",
        imageUrl: "https://cdn.discordapp.com/attachments/755257997789233195/990916227989897226/DSC_0064.jpg"
      }
    ])
  })
})
