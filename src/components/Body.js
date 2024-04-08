import RestaurantCard, { withVegLabel } from "./RestaurantCard";
import { useState, useEffect } from "../../node_modules/react";
import Shimmer from "./Shimmer";
import { Link } from "../../node_modules/react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { RESTAURANTLIST_API } from "../utils/constants";

const Body = () => {
    
    const [listOfRestaurants, setListOfRestaurants] = useState([]);

    const [searchText, setSearchText] = useState("");

    const [filteredList, setFilteredList] = useState([]);

    const VegRestaurantCard = withVegLabel(RestaurantCard);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await fetch(RESTAURANTLIST_API);
        
        const json = await data.json();

        setListOfRestaurants(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setFilteredList(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    }

    const onlineStatus = useOnlineStatus();

    if(onlineStatus === false) return <h1>Looks like ! You're offline, Please check your connection !!!</h1>
      
    return listOfRestaurants.length === 0 ? <Shimmer /> : (

        <div className="body">
            <div className="filter flex m-4 p-4 ml-[130px]">
                <div className="search">
                    <input type="text" className="search-box border border-solid border-black focus:border-pink-400 focus:outline-none focus:shadow-md rounded-sm" value={searchText} onChange={(e) => {
                        setSearchText(e.target.value);
                    }} />
                    <button className="search-btn mx-2 px-2 py-0.5 bg-green-100 border border-solid border-blue-400 rounded-md font-medium hover:bg-green-200" onClick={() => {
                        const filteredRestaurant = listOfRestaurants.filter((res) =>
                           res.info.name.toLowerCase().includes(searchText.toLowerCase())
                        )
                        setFilteredList(filteredRestaurant);
                    }}>Search</button>
                </div>
                <div className="filter-btn">
                    <button className="bg-gray-100 mx-6 px-4 py-0.5 border border-solid border-purple-200 rounded-md font-medium hover:bg-gray-200" onClick={() => {
                    const topRatedRestaurants = listOfRestaurants.filter((res) => 
                        res.info.avgRating > 4
                    )
                    setFilteredList(topRatedRestaurants);
                    }}>
                        Top Rated Restaurants    
                    </button>
                </div> 
            </div>

            <div className="res-container bg-slate-50 flex flex-wrap justify-center">
                {
                  filteredList.map(restaurant => (
                   <Link to={"/restaurants/" + restaurant.info.id} key={restaurant.info.id}>
                    {
                        restaurant.info.veg ? <VegRestaurantCard resData={restaurant} /> : <RestaurantCard resData={restaurant} />
                    }
                   </Link>
                   )
                  )
                }
            </div>
        </div>
    )
}

export default Body;