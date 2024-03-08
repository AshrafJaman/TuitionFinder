import { Button } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
const BlogCard = ({ x }) => {
  let history = useHistory();
  return (
    <>
      {x.approved && (
        <div className="blog__card">
          <img src={x.img} alt="" />
          <div>
            <h2>{x.title}</h2>
            <small>{`Updated ${x.date}`}</small>
            <h3>{x.subTitle}</h3>
            <p>{`${x.article.substring(0, 100)} . . . . .`}</p>
          </div>
          <div>
            <Button onClick={() => history.push(`/blog/${x._id}`)}>
              Read More
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogCard;
