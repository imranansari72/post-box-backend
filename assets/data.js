import express from "express";

const users = [
  {
    id: 1,
    name: "imran 1",
    email: "imran@123",
    password: "123456",
    posts: [
      {
        id: 1,
        title: "Post One",
        description: "This is post one",
        image: "https://picsum.photos/200/300",
      },
      {
        id: 2,
        title: "Post Two",
        description: "This is post two",
        image: "https://picsum.photos/200/300",
      },
      {
        id: 3,
        title: "Post Three",
        description: "This is post three",
        image: "https://picsum.photos/200/300",
      },
    ],
  },
  {
    id: 2,
    name: "imran 2",
    email: "imran@111",
    password: "123456",
    posts: [
      {
        id: 1,
        title: "Post One",
        description: "This is post one",
        image: "https://picsum.photos/200/300",
      },
      {
        id: 2,
        title: "Post Two",
        description: "This is post two",
        image: "https://picsum.photos/200/300",
      },
      {
        id: 3,
        title: "Post Three",
        description: "This is post three",
        image: "https://picsum.photos/200/300",
      },
    ],
  },
];

export default users;
