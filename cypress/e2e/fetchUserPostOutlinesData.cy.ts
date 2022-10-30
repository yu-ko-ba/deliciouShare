import fetchUserPostOutlinesData from "../../src/utils/fetchUserPostOutlinesData"

describe('fetch user post outlines data test', () => {
  it('should return user post outlines', async () => {
    const result = await fetchUserPostOutlinesData("1")
    expect(result[0].postedTime).to.equal("2022-10-18-06-27-54+0000")
    expect(result[0].smallImageUrl).to.equal("https://meshitero-user-post-photos-bucket.s3.ap-northeast-1.amazonaws.com/small/bb01454a-a4ed-4bf9-8ea2-b75a362d08cd.jpg")
    expect(result[0].postId).to.equal("bb01454a-a4ed-4bf9-8ea2-b75a362d08cd")
  })
})
