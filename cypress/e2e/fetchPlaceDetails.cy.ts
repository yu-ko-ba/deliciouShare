import fetchPlaceDetails from "../../src/utils/fetchPlaceDetails"

describe('fetch place details test', () => {
  it('should return Place Details API result', async () => {
    const result = await fetchPlaceDetails("ChIJq4c3iYnjn18R6YgGjkkUZAU")
    expect(result.name).to.equal("有珠山ロープウェイ Cafe Mt.USU")
    expect(result.formatted_address).to.equal("日本、〒052-0102 北海道有珠郡壮瞥町昭和新山")
    expect(result.website).to.equal("https://usuzan.hokkaido.jp/ja/")
  })
})
