import environmentVariables from "./environmentVariables"

const apiUrls = {
  getMapsEmbedUrl: "https://www.google.com/maps/embed/v1/place",
  getEatingPlacesUrl: environmentVariables.getEatingPlacesUrl,
  fetchPlaceDetailUrl: environmentVariables.fetchPlaceDetailUrl,
  putUserPostUrl: environmentVariables.putUserPostUrl,
  getUserPostOutlinesUrl: environmentVariables.getUserPostOutlinesUrl,
  getUserPostDetailUrl: environmentVariables.getUserPostDetailUrl,
  deleteUserPostUrl: environmentVariables.deleteUserPostUrl,
}

export default apiUrls
