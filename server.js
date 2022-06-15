const express = require("express");

const userRouter = require("./routes/user.js");
const postingRouter = require("./routes/posting.js");

const app = express();

app.use(express.json());
app.use("/users", userRouter);
app.use("/postings", postingRouter);

app.listen(8080, async () => {
  try {
    console.log("Server is listening on 8080");
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
  }
});
