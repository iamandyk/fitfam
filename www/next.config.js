module.exports = {
  target: "serverless",
  env: {
    API_URL: process.env.API_URL,
    GRAPHQL_API_URL: process.env.GRAPHQL_API_URL
  }
};
