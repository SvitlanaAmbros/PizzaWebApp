export module entity{
    export interface UserInfo {
        name: string;
        phone: string;
    }

    export module db {
        export interface Pizzas {
            pizzas: PizzaInfo[];
        }

        export interface PizzaInfo {
            id: number;
            name: string;
            ingridients: string[];
            pricePerWeight: PricePerWeight[];
            imgUrl: string;
            selectedPrice?: number;
            selectedSize?: number;
            quantity?: number;
        }

        export interface PricePerWeight {
            size: number;
            price: number;
            isChecked?: boolean;
        }

        export interface Order {
            user : UserInfo,
            pizzas: {
                [key: number]: PricePerWeight,
            },
            totalSum : number
        }

        export interface UserInfo {
            name: string,
            phone: string
        }  
    }
} 