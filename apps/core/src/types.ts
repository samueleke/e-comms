import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { sellerBody } from './users/admin/adminSchema';
import { loginBody, registerBody } from './users/buyer/buyerSchema';
import {
    BuyersPostSchema,
    ProductPostSchema,
    ProductUpdateSchema,
} from './utils/schemas';

export type MiddlewareFunction = {
    (req: Request, res: Response, next: NextFunction): void;
};

export type BodyType = {
    name: string;
    email: string;
};

export type ProductDto = {
    id: string | undefined;
    seller: string;
    category: string;
    name: string;
    price: number;
    quantity: number;
    description: string;
    discountPercentage: number;
    image: string[]; //path
    recommended: boolean;
    reviews: string[];
};

export type ProductPost = z.infer<typeof ProductPostSchema>;
export type ProductUpdate = z.infer<typeof ProductUpdateSchema>;

export type paginationAndFilters = {
    page: number;
    size: number;
    search: string;
    category: string;
};

export type Filter = {
    _id: string;
    role?: string;
};

export type BuyerDTO = z.infer<typeof BuyersPostSchema>;

export type Role = 'admin' | 'seller' | 'buyer';

export type Route = {
    route: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    role?: Role;
    body?: z.ZodObject<any, any>;
    auth?: boolean;
    middleware?: MiddlewareFunction[];
    controller: (req: Request, res: Response) => void;
};

export type RegisterDTO = z.infer<typeof registerBody>;
export type LoginDTO = z.infer<typeof loginBody>;
export type SellerDTO = z.infer<typeof sellerBody>;

export type IRequest<Req = unknown, Res = unknown> = Request<
    Record<string, string>,
    Res,
    Req
>;

export type Invoice = {
    id: string;
    items: {
        description: string;
        price: number;
    }[];
    total: number;
};
