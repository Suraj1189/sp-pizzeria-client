import { NonPizzaDTO } from "../side/side.model";

export class PizzaDTO {
    public pizzaId!: number;
    public price!: number;
    public finished!: boolean;
    public sessionId!: number;
    public name!: string;
    public imageUrl!: string;
    public categoryId!: number;
    public description!: string;
    public ingredientIds!: Array<number>;
    public isCustomize!: boolean;
    constructor() { }
}

export enum SideEnum {
    None = 0,
    Sides = 7,
    Dessert = 9,
    Beverage = 8
}

export class PizzaBaseModel {
    public name!: string;
    public price!: number;
    public isSelected!: boolean;
}

export class CartDTO {
    public cartId !: number;
    public pizzaId !: number;
    public nonPizzaId !: number;
    public quantity !: number;
    public price !: number;
    public customerId !: number;
    public pizzaDTO!: PizzaDTO;
    public nonPizzaDTO!: NonPizzaDTO;
    public actualPrice!: number;
}

export class OrderDTO {
    public orderId!: number;
    public totalAmount!: number;
    public customerId!: number;
    public deliveryDateTime!: Date;
    public placeDateTime!: Date;
    public cartList!: Array<CartDTO>;
}

export class CartModalCallBack {
    public cartList!: CartDTO[];
    public cartTotal!: number;
}

export class IngredientDTO {
    public ingredientId !: number;
    public name !: string;
    public price !: number;
    public imageUrl !: string;
    public createDate !: Date;
    public categoryId !: number;
    public isSelected!: boolean;
}

export class CreatePizzaModel {
    public pizzaDTO!: PizzaDTO;
    public customerId!: number;
}