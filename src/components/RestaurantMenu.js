import useRestaurantMenu from "../utils/useRestaurantMenu";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";

const RestaurantMenu = () => {

    const { resId } = useParams();

    const resInfo = useRestaurantMenu(resId);

    if (resInfo === null) return <Shimmer />;

    const { name, cuisines, costForTwoMessage, avgRating, sla, areaName } = resInfo?.cards[2]?.card?.card?.info;

    const { itemCards } = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1].card?.card;

    console.log(resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards);

    const categories = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter((c) => 
        c.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    )

    console.log(categories)

    return (
        <div className="menu">
            <h1 className="font-bold text-[26px] mt-12 w-1/2 m-auto">{name}</h1>
            <div className="border border-solid border-gray-300 rounded-3xl w-1/2 m-auto p-6 mt-8 shadow-lg">
              <p className="font-semibold">⭐ {avgRating} ◦ {costForTwoMessage}</p>
              <p>{cuisines.join(", ")}</p>
              <h3 className="font-semibold">{sla.minDeliveryTime} - {sla.maxDeliveryTime} mins</h3>
              <div className="font-normal text-gray-500 font-light">{areaName}</div>
            </div>  
        </div>
    )
}

export default RestaurantMenu;