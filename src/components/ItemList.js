import { IMG_CDN_URL } from "../utils/constants";


const ItemList = ({ itemData }) => {

    const { name, price, defaultPrice, description, ratings, imageId, isVeg } = itemData;

    return (
        <div className="flex justify-between py-4 pb-8 border-b border-gray-300">
          <div className="px-3 w-9/12">
             <div className="font-bold text-lg">{name}</div>
             <div className="font-semibold">₹{price / 100 || defaultPrice / 100}</div>
             {
               (ratings.aggregatedRating.rating) && (
                 <div className="font-bold text-sm text-red-400 pt-2">★ {ratings.aggregatedRating.rating} ({ratings.aggregatedRating.ratingCountV2})</div>
               )
             }
             <p className="text-gray-500 pt-2">{description}</p>
           </div>

          <div className="w-2/12 flex justify-center items-end">
              <div className="absolute">
                <button className="bg-white text-red-500 font-bold border border-gray-300 rounded-lg shadow-lg px-6 py-1">ADD</button>
              </div>

              <div className="">
                 <img src={IMG_CDN_URL + imageId} className="rounded-xl my-2"/>
              </div>
           </div>

        </div>
    )
}

export default ItemList;