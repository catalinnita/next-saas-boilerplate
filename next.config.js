module.exports = {
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/events/:key*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "https://192.168.0.17:8080" },
          { key: "Access-Control-Allow-Methods", value: "OPTIONS,POST" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type, ApiKey" },
        ]
      }
    ]
  }
};
