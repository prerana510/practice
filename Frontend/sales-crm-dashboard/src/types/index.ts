import { Product } from "../components/retail/Dashboard";

export interface Customer {
    customerShortId: string; // Make this optional for pre-save logic
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    branchShortId: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
export interface Order {
    customerShortId: string;
    orderDate: string;
    orderShortID: number;
    productShortId: string;
    quantity: number;
    totalPrice: number;
    transactionStatus: string;
}

export interface customerDataProps {
    customer: Customer[];
    order: Order[];
    product: Product[];
}