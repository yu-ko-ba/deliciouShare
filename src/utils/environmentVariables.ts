const environmentVariables = {
  getUserPostsUrl: process.env.NEXT_PUBLIC_GET_USER_POSTS_URL || Cypress.env("get_user_posts_url"),
  getPostUrl: process.env.NEXT_PUBLIC_GET_POST_URL || Cypress.env("get_post_url"),
  googleCloudApiKey: process.env.NEXT_PUBLIC_GOOGLE_CLOUD_API_KEY || Cypress.env("google_cloud_api_key"),
  getEatingPlacesUrl: process.env.NEXT_PUBLIC_GET_EATING_PLACES_URL || Cypress.env("get_eating_places_url")
}

export default environmentVariables
