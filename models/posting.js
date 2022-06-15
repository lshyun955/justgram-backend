const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const findAll = async () => {
  const postings = await prisma.$queryRaw`
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
  return postings;
};

const findById = async (id) => {
  const posting = await prisma.$queryRaw`
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
        ON CL.comment_id = comment.id where feed.id=${id} group by feed.id`;
  return posting;
};

const update = async (id, content) => {
  const result =
    await prisma.$queryRaw`UPDATE feed SET content=${content} WHERE id=${id}`;
  return result;
};

const create = async (userDto) => {
  const { user_id, posting_type, content, images } = userDto;
  await prisma.$transaction(async (prisma) => {
    if (images) {
      const feed_data = await prisma.feed.create({
        data: { user_id, posting_type, content },
      });
      const data = await images.split(",").map((image) => ({
        feed_id: feed_data.id,
        url: image,
      }));
      const result = await prisma.feed_image.createMany({ data });
      return result;
    } else {
      const result = await prisma.feed.create({
        data: {
          user_id,
          posting_type,
          content,
        },
      });
      return result;
    }
  });
};

const remove = async (id) => {
  const result = await prisma.$queryRaw`DELETE FROM feed WHERE id=${id}`;
  return result;
};

module.exports = {
  findAll,
  findById,
  update,
  create,
  remove,
};
