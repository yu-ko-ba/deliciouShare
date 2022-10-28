const environmentVariables = {
  getUserPostsUrl:
    process.env.NEXT_PUBLIC_GET_USER_POSTS_URL
    || Cypress.env("get_user_posts_url"),

  getPostUrl:
    process.env.NEXT_PUBLIC_GET_POST_URL
    || Cypress.env("get_post_url"),

  googleCloudApiKey:
    process.env.NEXT_PUBLIC_GOOGLE_CLOUD_API_KEY
    || Cypress.env("google_cloud_api_key"),

  getEatingPlacesUrl:
    process.env.NEXT_PUBLIC_GET_EATING_PLACES_URL
    || Cypress.env("get_eating_places_url"),

  fetchPlaceDetailUrl:
    process.env.NEXT_PUBLIC_FETCH_PLACE_DETAIL_URL
    || Cypress.env("fetch_place_detail_url"),

  putUserPostUrl:
    process.env.NEXT_PUBLIC_PUT_USER_POST_URL
    || Cypress.env("put_user_post_url"),

  getUserPostOutlinesUrl:
    process.env.NEXT_PUBLIC_GET_USER_POST_OUTLINES_URL
    || Cypress.env("get_user_post_outlines_url"),

  getUserPostDetailUrl:
    process.env.NEXT_PUBLIC_GET_USER_POST_DETAIL_URL
    || Cypress.env("get_user_post_detail_url"),

  deleteUserPostUrl:
    process.env.NEXT_PUBLIC_DELETE_USER_POST_URL
    || Cypress.env("delete_user_post_url"),
}

export default environmentVariables
