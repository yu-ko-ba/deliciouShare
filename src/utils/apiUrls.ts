const apiUrls = {
  getUserPostsUrl: process.env.NEXT_PUBLIC_GET_USER_POSTS_URL || Cypress.env("get_user_posts_url")
}

export default apiUrls
