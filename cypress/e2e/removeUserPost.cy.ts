import removeUserPost from "../../src/utils/removeUserPost"

describe('remove user post test', () => {
  it('status should return 200', async () => {
    const result = await removeUserPost(
      "405038b5-2959-4066-a52c-6a4b5430f6fd",
      "1",
      "2022-10-28-01-46-46+0000",
    )

    expect(result.status).to.equal(200)
  })
})
