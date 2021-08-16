

export interface MenuDish {
    day: number; 
    companyId: number; 
    name : string ;
    dishId: number;
    inCart?: string;

}



export interface Restaurant {
    companyId: number;
    name: string;
    menu?: MenuDish[][];
    image?: string;

}



