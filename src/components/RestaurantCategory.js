import { useState } from "react";
import ItemList from "./ItemList";

const RestaurantCategory = ({categoryData, showItems, setShowIndex }) => {

    const { title, itemCards } = categoryData;

    const handleClick = () => {
        setShowIndex();
    }

    return (
        <div>

            {/* Accordion Header */}
            <div>
              <span className=" cursor-pointer text-lg font-bold my-6 flex justify-between border-b-[14px] border-gray-100 py-4 px-3" onClick={handleClick}>
              {title} ({itemCards.length})
              <span>🔽</span>
              </span>
            </div>

            {/* Accordion Body */}
            <div>
                { showItems && itemCards.map(item => (
                     <ItemList itemData={item?.card?.info} key={item?.card?.info?.id}/>
                     ))
                }
            </div>

        </div>    
    )
}

export default RestaurantCategory;