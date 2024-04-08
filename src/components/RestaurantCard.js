import { IMG_CDN_URL } from "../utils/constants";

const RestaurantCard = ( props ) => {
    const {resData} = props;

    const {
        cloudinaryImageId, name, cuisines, avgRating, costForTwo, sla
        } = resData?.info;

    return (
        <div className="res-card m-4 w-60 bg-slate-50 rounded-2xl transition-transform duration-200 transform hover:scale-90 hover:shadow-lg">
            <div>
              <img 
                className="res-logo w-full rounded-2xl"
                alt="res-logo" 
                src={IMG_CDN_URL + cloudinaryImageId}/>
            </div>
            <div className="p-4">
                <h3 className="font-bold text-lg">{name}</h3>
                <h4 className="font-extralight">{cuisines.join(", ")}</h4>
                <h4 className="font-bold">⭐ {avgRating}</h4>
                <h4 className="font-medium">{costForTwo}</h4>
                <h4 className="font-bold">{sla?.slaString}</h4>
            </div>
        </div>
    )

}

export const withVegLabel = (RestaurantCard) => {
    return ( props ) => {
        return (
            <div>
                <label className="absolute bg-black text-white rounded-md mx-4 z-20 px-6 py-0.5 font-medium">Veg</label>
                <RestaurantCard {...props} />
            </div>
        )
    }
}

export default RestaurantCard;