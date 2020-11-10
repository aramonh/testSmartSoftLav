import {UserController} from "./controller/UserController";
import {AuthController} from "./controller/AuthController";
import {ProductController} from "./controller/ProductController";
export const Routes = [
    
{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all"
}, {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one"
},{
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove"

},
{
    method: "post",
    route: "/login",
    controller: AuthController,
    action: "login"
}, {
    method: "post",
    route: "/register",
    controller: AuthController,
    action: "save"
},{
    method: "post",
    route: "/logout",
    controller: AuthController,
    action: "logout"

},







{
    method: "get",
    route: "/products",
    controller: ProductController,
    action: "all"
}, {
    method: "get",
    route: "/products/:id",
    controller: ProductController,
    action: "one"
}, {
    method: "post",
    route: "/products",
    controller: ProductController,
    action: "save"
}, {
    method: "delete",
    route: "/products/:id",
    controller: ProductController,
    action: "remove"
},


];