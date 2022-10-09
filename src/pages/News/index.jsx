import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "react-bootstrap/Card";

import { getPosts } from "../../features/content/contentSlice";

const NewsItem = (props) => {
  const title = props.title;
  const body = props.body;
  const tags = props.tags;

  return (
    <Card className="col-sm-12 col-sm-6 col-md-3 m-3" bg={"Dark"} text={"dark"}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{tags}</Card.Subtitle>
        <Card.Text className="text-truncate">{body}</Card.Text>
      </Card.Body>
    </Card>
  );
};

const News = () => {
  const posts = useSelector((state) => state.content.posts);
  const dispatch = useDispatch();
  const newsItems =
    posts &&
    posts.map((value, number) => (
      <NewsItem
        key={number}
        body={value.body}
        title={value.title}
        tags={value.tags}
      />
    ));
  useEffect(() => {
    dispatch(getPosts());
  }, []);

  return (
    <>
      <h1 className="mt-5 pt-5">News</h1>
      <div className="container">
        <div className="row justify-content-center">{newsItems}</div>
      </div>
    </>
  );
};

export default News;
