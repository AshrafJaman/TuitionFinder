import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardActionArea,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import StarsIcon from "@material-ui/icons/Stars";
import "./CardBox.css";
import { Link } from "react-router-dom";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    margin: "40px 0px 5px 0px",
  },
}));
const CardBox = ({ name, img, other, star, inst, subject, id, verified }) => {
  console.log(verified);
  const classes = useStyles();
  const [can, setCan] = useState([]);
  useEffect(() => {
    const sub = Object.keys(other);
    const val = Object.values(other);
    const joiN = sub.filter((x, index) => {
      if (val[index] === true) {
        return x;
      }
    });
    setCan(joiN);
  }, [other]);
  return (
    <Link to={`/profile/${id}`}>
      <Card className="cardBox">
        <Avatar src={img} alt={name} className={classes.large}></Avatar>
        <p>
          {verified && (
            <VerifiedUserIcon className="verified"></VerifiedUserIcon>
          )}
          <StarsIcon></StarsIcon> {star}
        </p>
        <CardActionArea className="cardBoxTop">
          <h3>{name}</h3>
          <p>{`${subject} @ ${inst}`}</p>
          <div className="iCanTutor">
            <span style={{ color: "gray" }}>I can teach :</span>
            {can.map((x) => (
              <Button>{x}</Button>
            ))}
          </div>
        </CardActionArea>
        <CardActions className="cardFooter">
          <Button size="small" color="primary">
            View Profile
          </Button>
        </CardActions>
      </Card>
    </Link>
  );
};

export default CardBox;
