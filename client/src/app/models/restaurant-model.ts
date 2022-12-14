export interface RestaurantModel {
    _id:string;
    partnerId:string;
    restaurantName:string;
    restaurantLocality:string;
    locationLongitude:string;
    locationLatitude:string;
    contactNumber:string;
    address:string;
    ownerName:string;
    ownerEmail:string;
    restaurantType:string;
    cuisineType:string;
    openingTime:string;
    closingTime:string;
    bankAccountNo:string;
    gstNo:string;
    fssaiFile?:string;
    pancardFile?:string;
    passbookFile?:string;
    iconFile?:string;
    status?:string;
    createdAt:string
}
