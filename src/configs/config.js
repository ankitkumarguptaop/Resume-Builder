module.exports = {
    async headers() {
      return [
        {
          source: "/",
          headers: [
            {
              key: "Cross-Origin-Embedder-Policy",
              value: "unsafe-none",
            },
          ],
        },
      ];
    },
  };