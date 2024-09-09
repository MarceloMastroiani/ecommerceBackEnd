import ProductDao from "../dao/classes/products.dao.js";
import CartDao from "../dao/classes/carts.dao.js";
import TicketDao from "../dao/classes/ticket.dao.js";
import UserDao from "../dao/classes/users.dao.js";

import UserRepository from "./services/user.repository.js";
import ProductRepository from "./services/product.respository.js";
import CartRepository from "./services/cart.respository.js";
import TicketRepository from "./services/ticket.respository.js";

export const productService = new ProductRepository(new ProductDao());
export const cartService = new CartRepository(new CartDao());
export const ticketService = new TicketRepository(new TicketDao());
export const userService = new UserRepository(new UserDao());
