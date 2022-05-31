import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./FeaturedListing.css";

const API = process.env.REACT_APP_API_URL;

function FeaturedListing() {
  const [featuredlisting, setFeaturedlisting] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API}/listings`)
      .then((res) => {
        console.log(res.data);
        setFeaturedlisting(res.data);
      })
      .catch(() => {
        navigate("/not-found");
      });
  }, []);

  let featured = featuredlisting
    .filter((list) => list.id < 5)
    .map((listing) => {
      let { title, image, id } = listing;
      return (
        <div>
          {" "}
          <Link to={`/listings/${id}`}>
            <img className="image" src={image} alt={listing.title} />
            <h5>{title}</h5>
          </Link>
        </div>
      );
    });
  return (
    <div id="listings-container">
      <div className="listingCard"> {featured}</div>
    </div>
  );
}

export default FeaturedListing;
