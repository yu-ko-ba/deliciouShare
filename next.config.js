const config = {
  images: {
    domains: ["cdn.discordapp.com"]
  }
}

const withPwa = require("next-pwa")({
  dest: "public",
})

module.exports = withPwa({
  config
})
