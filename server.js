const express = require("express");
const { PrismaClient } = require("@prisma/client");
const userRouter = require("./routes/user.js");
const postingRouter = require("./routes/posting.js");
const prisma = new PrismaClient();

const app = express();

app.use(express.json());
app.use("/users", userRouter);
app.use("/postings", postingRouter);
// 회원가입
app.post("/users/signup", async (req, res) => {
  try {
    const { user_id, name, nickname, phone_number, email, password } = req.body;

    if (password.length < 8) {
      const error = new Error("PASSWORD_TOO_SHORT");
      error.statusCode = 400;
      throw error;
    } else {
      const check =
        await prisma.$queryRaw`SELECT * FROM user where user_id=${user_id}`;
      console.log("check", check.length);
      if (check.length === 0) {
        await prisma.$queryRaw`
        INSERT INTO user(user_id,password,name,nickname,email,phone_number) 
        VALUES (${user_id}, ${password}, ${name}, ${nickname}, ${email}, ${phone_number})`;
        return res.status(201).json({ message: "SIGNUP_SUCCESS" });
      } else {
        const error = new Error("EXSITING_USER");
        error.statusCode = 400;
        throw error;
      }
    }
    // const user = prisma.user.create({
    //   data: { user_id, name, password, email, nickname, phone_number },
    // });
    // user.then((data) => console.log(data.id));
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
});

// 회원 전체보기
app.get("/users", async (req, res) => {
  try {
    const users = await prisma.$queryRaw`SELECT * FROM USER`;

    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
});

// 게시글 전체보기
app.get("/postings", async (req, res) => {
  try {
    const feeds = await prisma.$queryRaw`
      SELECT feed.id, 
      user.nickname as username, 
      feed.posting_type as postingTypes,
      feed.content, 
      JSON_ARRAYAGG(CASE WHEN feed_image.id IS NOT NULL THEN JSON_OBJECT('id', feed_image.id, 'url',feed_image.url) END) postingImages, 
      IFNULL(FL.likes,0) as likes 
      FROM feed 
      LEFT JOIN user 
      ON feed.user_id = user.id 
      LEFT JOIN (select feed_id, COUNT(*) as likes from feed_like where is_like=true group by feed_id) as FL 
      ON FL.feed_id = feed.id 
      LEFT JOIN feed_image 
      ON feed.id=feed_image.feed_id 
      GROUP BY feed.id`;

    const result = feeds.map((feed) => {
      return { ...feed, postingImages: feed.postingImages.filter(Boolean) };
    });
    // console.log("result : ", result);

    return res.status(201).json({ data: result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
});

// 게시글 상세보기
app.get("/postings/:id", async (req, res) => {
  try {
    const feedId = req.params.id;
    const feedById = await prisma.$queryRaw`
      SELECT feed.id, 
      user.nickname, 
      feed.content,
      feed.posting_type as postingTypes,
      IFNULL(FL.likes,0) as likes, 
      JSON_ARRAYAGG(CASE WHEN comment.id IS NOT NULL THEN JSON_OBJECT('id',comment.id, 'parentId',comment.parent_id,'username',(select nickname FROM user as u where comment.user_id=u.id), 'content',comment.content,'likes',IFNULL(CL.likes,0)) END) comments 
      FROM feed 
      LEFT JOIN user 
      ON feed.user_id=user.id 
      LEFT JOIN (select feed_id, COUNT(*) as likes from feed_like where is_like=true group by feed_id) as FL 
      ON FL.feed_id= feed.id 
      LEFT JOIN comment 
      ON feed.id=comment.feed_id
      LEFT JOIN (select comment_id,COUNT(*) as likes from comment_like where is_like=true group by comment_id) as CL 
      ON CL.comment_id = comment.id where feed.id=${feedId} group by feed.id`;

    if (feedById.length) {
      const result = {
        ...feedById[0],
        comments: feedById[0]["comments"].filter(Boolean),
      };
      return res.status(200).json({ data: result });
    } else {
      const error = new Error("Not Found");
      error.statusCode = 400;
      throw error;
    }
  } catch (error) {
    console.error(error);
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
});

// 게시글 수정하기
app.put("/postings/:id", async (req, res) => {
  try {
    const feedId = req.params.id;
    const content = req.body.content;
    const check = prisma.$queryRaw`SELECT * FROM feed WHERE id=${feedId}`;
    if (check.length) {
      await prisma.$queryRaw`UPDATE feed SET content=${content} WHERE id=${feedId}`;
      return res.status(200).json({ message: "UPDATED" });
    } else {
      const error = new Error("Not Found");
      error.statusCode = 400;
      throw error;
    }
  } catch (error) {
    console.error(error);
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
});

// 게시글 작성하기
app.post("/postings", async (req, res) => {
  try {
    const { user_id, posting_type, content, images } = req.body;
    await prisma.$transaction(async (prisma) => {
      if (images) {
        const feed_data = await prisma.feed.create({
          data: { user_id, posting_type, content },
        });
        const data = await images.split(",").map((image) => ({
          feed_id: feed_data.id,
          url: image,
        }));
        await prisma.feed_image.createMany({ data });
        return res.status(201).json({ message: "CREATED" });
      } else {
        await prisma.feed.create({
          data: {
            user_id,
            posting_type,
            content,
          },
        });
        return res.status(201).json({ message: "CREATED" });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

// 게시글 삭제하기
app.delete("/postings/:id", async (req, res) => {
  try {
    const feedId = req.params.id;
    const check = prisma.$queryRaw`SELECT * FROM feed WHERE id=${feedId}`;
    if (check.length) {
      await prisma.$queryRaw`DELETE FROM feed WHERE id=${feedId}`;
      return res.sendStatus(204);
    } else {
      const error = new Error("Not Found");
      error.statusCode = 400;
      throw error;
    }
  } catch (error) {
    console.error(error);
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
});

app.listen(8080, async () => {
  try {
    console.log("Server is listening on 8080");
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
  }
});
