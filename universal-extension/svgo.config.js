module.exports = {
  multipass: true,
  plugins: [
    {
      name: "preset-default",
      params: {
        overrides: {
          // disable cleanupIDs
          cleanupIDs: false
        }
      }
    }
  ]
};
