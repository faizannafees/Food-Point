import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "../../node_modules/react";
import Shimmer from "./Shimmer";
import { Link } from "../../node_modules/react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
    
    const [listOfRestaurants, setListOfRestaurants] = useState([]);

    const [searchText, setSearchText] = useState("");

    const [filteredList, setFilteredList] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=26.449923&lng=80.3318736&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
        
        const json = await data.json();

        setListOfRestaurants(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setFilteredList(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    }

    const onlineStatus = useOnlineStatus();

    if(onlineStatus === false) return <h1>Looks like ! You're offline, Please check your connection !!!</h1>
      
    return listOfRestaurants.length === 0 ? <Shimmer /> : (
        <div className="body">
            <div className="filter">
                <div className="search">
                    <input type="text" className="search-box" value={searchText} onChange={(e) => {
                        setSearchText(e.target.value);
                    }} />
                    <button className="search-btn"onClick={() => {
                        const filteredRestaurant = listOfRestaurants.filter((res) =>
                           res.info.name.toLowerCase().includes(searchText.toLowerCase())
                        )
                        setFilteredList(filteredRestaurant);
                    }}>Search</button>
                </div>
                <button className="filter-btn" onClick={() => {
                    const topRatedRestaurants = listOfRestaurants.filter((res) => 
                        res.info.avgRating > 4
                    )
                    setFilteredList(topRatedRestaurants);
                }}>
                        Top Rated Restaurants    
                </button>
            </div>
            <div className="res-container">
                {
                  filteredList.map(restaurant => (
                   <Link to={"/restaurants/" + restaurant.info.id} key={restaurant.info.id}>
                       <RestaurantCard resData={restaurant} />
                   </Link>
                   )
                  )
                }
            </div>
        </div>
    )
}

export default Body;