export module pizzasInfo{
    export module db {
        export interface Pizzas {
            pizzas: PizzaInfo[][];
        }

        export interface PizzaInfo {
            id: number;
            name: string;
            ingridients: string[];
            pricePerWeight: PricePerWeight[];
            imgUrl: string;
            selectedPrice?: number;
            quantity?: number;
        }

        export interface PricePerWeight {
            size: number;
            price: number;
            isChecked?: boolean;
        }
    }
} 