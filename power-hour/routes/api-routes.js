module.exports = function(app) {
  app.get("/api/times", function(req, res) {
    // 1. Add a join to include all of each Author's Posts
      res.json("time");
  });
}