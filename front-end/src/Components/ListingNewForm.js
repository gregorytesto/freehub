import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//import {Link} from "react-router-dom";


function ListingNew(){
    const[listing, setListing] = useState({
        category:"",
        title:"",
        description:"",
        image:""
    })

    const navigate = useNavigate();

    const handleTextChange = (event) => {
        setListing({ ...listing, [event.target.id]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`${process.env.REACT_APP_API_URL}/listings`, listing)
          .then((res)=>{
            navigate("/listings");
          }).catch((err)=>{
            console.log(err);
          })
    };

    return(
        <div>
            New Listing Form
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Listing Category</label>
                <input required
                id="category"
                value={listing.category}
                type="text"
                onChange={handleTextChange}
                placeholder="Listing Category"
                />
                <label htmlFor="title">Title:</label>
                <input
                id="title"
                type="text"
                onChange={handleTextChange}
                value={listing.title}
                placeholder="Title"
                />
                <label htmlFor="description">Description:</label>
                <input
                id="description"
                type="text"
                value={listing.description}
                placeholder="Description"
                onChange={handleTextChange}
                />
                <label htmlFor="image">Image:</label>
                <input
                id="image"
                value={listing.image}
                type="text"
                onChange={handleTextChange}
                placeholder="Image"
                />
                <br />
                <input type="submit" />
            </form>
        </div>
    )
   
}

export default ListingNew;
