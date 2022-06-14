const Feeds = (req, res) => {
  res.json({
    data: [
      {
        feedId: 1,
        author: {
          nickname: "jay",
          imageUrl:
            "https://images.unsplash.com/photo-1651411249593-b7ecc1e20181?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTl8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
        },
        content: "Hello!!",
        imageUrl:
          "https://images.unsplash.com/photo-1651466607628-7261b8117232?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
        isLiked: true,
        likePeople: {
          imageUrl:
            "https://images.unsplash.com/photo-1651466607628-7261b8117232?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
          count: 13,
        },
        date: new Date(Date.now()).toLocaleString(),
        comments: [
          {
            id: 1,
            author: "lee",
            content: "abc!",
            isLiked: true,
          },
          {
            id: 2,
            author: "lee",
            content: "abc!",
            isLiked: true,
          },
          {
            id: 3,
            author: "lee",
            content: "abc!",
            isLiked: false,
          },
          {
            id: 4,
            author: "lee",
            content: "abc!",
            isLiked: true,
          },
          {
            id: 5,
            author: "lee",
            content: "abc!",
            isLiked: false,
          },
        ],
      },
      {
        feedId: 2,
        author: {
          nickname: "min",
          imageUrl:
            "https://images.unsplash.com/photo-1651411249593-b7ecc1e20181?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTl8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
        },
        content: "Hello!!",
        imageUrl:
          "https://images.unsplash.com/photo-1651466607628-7261b8117232?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
        isLiked: true,
        likePeople: {
          imageUrl:
            "https://images.unsplash.com/photo-1651466607628-7261b8117232?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
          count: 13,
        },
        date: new Date(Date.now()).toLocaleString(),
        comments: [
          {
            id: 1,
            author: "lee",
            content: "abc!",
            isLiked: true,
          },
          {
            id: 2,
            author: "lee",
            content: "abc!",
            isLiked: true,
          },
          {
            id: 3,
            author: "lee",
            content: "abc!",
            isLiked: false,
          },
          {
            id: 4,
            author: "lee",
            content: "abc!",
            isLiked: true,
          },
          {
            id: 5,
            author: "lee",
            content: "abc!",
            isLiked: false,
          },
        ],
      },
      {
        feedId: 3,
        author: {
          nickname: "lee",
          imageUrl:
            "https://images.unsplash.com/photo-1651411249593-b7ecc1e20181?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTl8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
        },
        content: "Hello!!",
        imageUrl:
          "https://images.unsplash.com/photo-1651466607628-7261b8117232?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
        isLiked: true,
        likePeople: {
          imageUrl:
            "https://images.unsplash.com/photo-1651466607628-7261b8117232?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
          count: 13,
        },
        date: new Date(Date.now()).toLocaleString(),
        comments: [
          {
            id: 1,
            author: "lee",
            content: "abc!",
            isLiked: true,
          },
          {
            id: 2,
            author: "lee",
            content: "abc!",
            isLiked: true,
          },
          {
            id: 3,
            author: "lee",
            content: "abc!",
            isLiked: false,
          },
          {
            id: 4,
            author: "lee",
            content: "abc!",
            isLiked: true,
          },
          {
            id: 5,
            author: "lee",
            content: "abc!",
            isLiked: false,
          },
        ],
      },
      {
        feedId: 4,
        author: {
          nickname: "park",
          imageUrl:
            "https://images.unsplash.com/photo-1651411249593-b7ecc1e20181?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTl8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
        },
        content: "Hello!!",
        imageUrl:
          "https://images.unsplash.com/photo-1651466607628-7261b8117232?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
        isLiked: true,
        likePeople: {
          imageUrl:
            "https://images.unsplash.com/photo-1651466607628-7261b8117232?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
          count: 13,
        },
        date: new Date(Date.now()).toLocaleString(),
        comments: [
          {
            id: 1,
            author: "lee",
            content: "abc!",
            isLiked: true,
          },
          {
            id: 2,
            author: "lee",
            content: "abc!",
            isLiked: true,
          },
          {
            id: 3,
            author: "lee",
            content: "abc!",
            isLiked: false,
          },
          {
            id: 4,
            author: "lee",
            content: "abc!",
            isLiked: true,
          },
          {
            id: 5,
            author: "lee",
            content: "abc!",
            isLiked: false,
          },
        ],
      },
      {
        feedId: 5,
        author: {
          nickname: "kim",
          imageUrl:
            "https://images.unsplash.com/photo-1651411249593-b7ecc1e20181?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTl8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
        },
        content: "Hello!!",
        imageUrl:
          "https://images.unsplash.com/photo-1651466607628-7261b8117232?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
        isLiked: true,
        likePeople: {
          imageUrl:
            "https://images.unsplash.com/photo-1651466607628-7261b8117232?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
          count: 13,
        },
        date: new Date(Date.now()).toLocaleString(),
        comments: [
          {
            id: 1,
            author: "lee",
            content: "abc!",
            isLiked: true,
          },
          {
            id: 2,
            author: "lee",
            content: "abc!",
            isLiked: true,
          },
          {
            id: 3,
            author: "lee",
            content: "abc!",
            isLiked: false,
          },
          {
            id: 4,
            author: "lee",
            content: "abc!",
            isLiked: true,
          },
          {
            id: 5,
            author: "lee",
            content: "abc!",
            isLiked: false,
          },
        ],
      },
    ],
  });
};

module.exports = Feeds;
