import { useState } from "react";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";

const RestaurantMenu = () => {

    const { resId } = useParams();

    const resInfo = useRestaurantMenu(resId);

    const [showIndex, setShowIndex] = useState(0);

    if (resInfo === null) return <Shimmer />;

    const { name, cuisines, costForTwoMessage, avgRating, sla, areaName } = resInfo?.cards[2]?.card?.card?.info;

    const { itemCards } = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1].card?.card;

    const categories = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter((c) => 
        c.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    )

    return (
        <div className="menu w-7/12 m-auto">
            <h1 className="font-bold text-3xl mt-12">{name}</h1>
            <div className="border border-solid border-gray-300 rounded-3xl p-6 mt-8 shadow-lg">
              <p className="font-semibold py-0.5">⭐ {avgRating} ◦ {costForTwoMessage}</p>
              <p className="py-0.5">{cuisines.join(", ")}</p>
              <h3 className="font-semibold py-0.5">{sla.minDeliveryTime} - {sla.maxDeliveryTime} mins</h3>
              <div className="font-normal text-gray-500 py-0.5">{areaName}</div>
            </div>

            <div className="">
                {
                  categories.map((category, index) => (
                    //Controlled component
                     <RestaurantCategory 
                     categoryData={category?.card?.card} 
                     key={category?.card?.card?.title}
                     showItems={index === showIndex ? true : false}
                     setShowIndex={() => setShowIndex(showIndex === index ? null : index)} />
                   ))
                }
            </div>
        </div>
    )
}

export default RestaurantMenu;