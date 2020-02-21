module.exports = {
  env: {
    ACCESS_KEY: process.env.ACCESS_KEY,
    DOMAIN:
      process.env.NODE_ENV === "production"
        ? "unsplash-client.now.sh"
        : "localhost:3000",
    FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID
  }
};
