const apiUrls = {
  getUserPostsUrl: process.env.NEXT_PUBLIC_GET_USER_POSTS_URL || Cypress.env("get_user_posts_url"),
  getPostUrl: process.env.NEXT_PUBLIC_GET_POST_URL || Cypress.env("get_post_url")
}

export default apiUrls
