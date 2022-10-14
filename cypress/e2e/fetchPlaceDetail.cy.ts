import fetchPlaceDetail from "../../src/utils/fetchPlaceDetail";

describe('fetch place detail test', () => {
  it('should return place detail', async () => {
    console.log(await fetchPlaceDetail("ChIJq4c3iYnjn18R6YgGjkkUZAU"));
  })
})
