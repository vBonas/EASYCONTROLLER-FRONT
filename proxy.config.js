const proxy = [
  {
    context: "/api",
    target: "https://easycontroller.onrender.com",
    pathRewrite: { "^/api": "" },
  },
];
module.exports = proxy;
