import fetchUserPostDetailData from "../../src/utils/fetchUserPostDetailData"

describe('fetch user post detail data test', () => {
  it('should return user post detail', async () => {
    const result = await fetchUserPostDetailData("4ec4fe7c-3fbe-49ef-883e-ac18ca82291f")
    expect(result.largeImageUrl).to.equal("https://meshitero-user-post-photos-bucket.s3.ap-northeast-1.amazonaws.com/large/4ec4fe7c-3fbe-49ef-883e-ac18ca82291f.jpg")
    expect(result.eatingPlace.name).to.equal("有珠山ロープウェイ Cafe Mt.USU")
    expect(result.eatingPlace.address).to.equal("日本、〒052-0102 北海道有珠郡壮瞥町昭和新山")
    expect(result.eatingPlace.website).to.equal("https://usuzan.hokkaido.jp/ja/")
    expect(result.eatingPlace.id).to.equal("ChIJq4c3iYnjn18R6YgGjkkUZAU")
  })
})
