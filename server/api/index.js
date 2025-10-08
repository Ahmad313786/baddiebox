import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("✅ Simple API working!");
});

export default app;
