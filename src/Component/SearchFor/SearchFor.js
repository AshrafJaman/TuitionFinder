import { Button } from "@material-ui/core";
import React from "react";
import "./SearchFor.css";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import { Link } from "react-router-dom";
const SearchFor = () => {
  return (
    <div className="searchFor">
      <div>
        <h2>Tutors</h2>
        <p>Let's see who is waiting For you</p>
      </div>
      <div>
        <div>
          <img
            src="https://assets.skooli.com/images/homepage-images/homepage-tutors.png?1605871329"
            alt=""
          />
        </div>
        <div>
          <h2>Find your subject expert</h2>
          <h3>Get instant help for your questions.</h3>
          <div>
            <Link to="/subject/math">
              <Button>
                Math <ArrowRightAltIcon></ArrowRightAltIcon>
              </Button>
            </Link>
            <Link to="/subject/physics">
              <Button>
                Physics <ArrowRightAltIcon></ArrowRightAltIcon>
              </Button>
            </Link>
            <Link to="/subject/english">
              <Button>
                English <ArrowRightAltIcon></ArrowRightAltIcon>
              </Button>
            </Link>
            <Link to="/subject/science">
              <Button>
                Science <ArrowRightAltIcon></ArrowRightAltIcon>
              </Button>
            </Link>
            <Link to="/subject/business">
              <Button>
                Business <ArrowRightAltIcon></ArrowRightAltIcon>
              </Button>
            </Link>
            <Link to="/more-subject">
              <Button variant="outlined" color="primary">
                More Subjects.
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFor;
