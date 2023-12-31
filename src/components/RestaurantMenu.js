import { useState, useEffect } from "../../node_modules/react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { MENU_API } from "../utils/constants";

const RestaurantMenu = () => {

    const [resInfo, setResInfo] = useState(null);

    const { resId } = useParams();

    useEffect(() => {
        fetchMenu();
    }, []);
    
    const fetchMenu = async () => {
        const menu = await fetch(MENU_API + resId);
        const json = await menu.json();

        setResInfo(json.data);
    }

    if (resInfo === null) return <Shimmer />;

    const { name, cuisines, costForTwoMessage } = resInfo?.cards[0]?.card?.card?.info;

    const { itemCards } = resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1].card?.card;

    console.log(itemCards);

    return (
        <div className="menu">
            <h1>{name}</h1>
            <p>{cuisines.join(", ")}  -  {costForTwoMessage}</p>
            <ul>
                    {
                       itemCards.map((item) => (
                         <li key={item?.card?.info?.id}>{item?.card?.info?.name}
                            <p>Rs.{item?.card?.info?.price/100 || item?.card?.info?.defaultPrice/100}</p>
                        </li>
                        )
                       )
                    }
            </ul>
        </div>
    )
}

export default RestaurantMenu;