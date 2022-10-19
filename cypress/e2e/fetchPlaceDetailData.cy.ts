import fetchPlaceDetailData from "../../src/utils/fetchPlaceDetailData"

describe('fetch place detail data test', () => {
  it('should return Place', async () => {
    const result = await fetchPlaceDetailData("ChIJq4c3iYnjn18R6YgGjkkUZAU")
    expect(result.name).to.equal("有珠山ロープウェイ Cafe Mt.USU")
    expect(result.address).to.equal("日本、〒052-0102 北海道有珠郡壮瞥町昭和新山")
    expect(result.website).to.equal("https://usuzan.hokkaido.jp/ja/")
    expect(result.id).to.equal("ChIJq4c3iYnjn18R6YgGjkkUZAU")
  })
})
