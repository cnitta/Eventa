import Components from "views/Components/Components.jsx";
import LandingPage from "views/LandingPage/LandingPage.jsx";
import ProfilePage from "views/ProfilePage/ProfilePage.jsx";
import LoginPage from "views/LoginPage/LoginPage.jsx";
import IndProduct from "views/ProductPage/IndProduct.jsx";
import ProductPage from "views/ProductPage/ProductPage.jsx";
import SignupPage from "views/SignupPage/SignupPage.jsx";
import CartPage from "views/CartPage/CartPage.jsx";
import ChatPage from "views/ChatPage/ChatPage.jsx";
import BookingPage from "views/BookingPage/BookingPage.jsx";
import IndBooking from "views/BookingPage/IndBooking.jsx";

var indexRoutes = [
  { path: "/landing-page", name: "LandingPage", component: LandingPage },
  { path: "/profile-page", name: "ProfilePage", component: ProfilePage },
  { path: "/product-page", name: "ProductPage", component: ProductPage },
  { path: "/ind-product", name: "IndProduct", component: IndProduct},
  { path: "/login-page", name: "LoginPage", component: LoginPage },
  { path: "/signup-page", name: "SignupPage", component: SignupPage },
  { path: "/chat-page", name: "ChatPage", component: ChatPage },
  { path: "/cart-page", name: "CartPage", component: CartPage },
  { path: "/booking-page", name: "BookingPage", component: BookingPage },
  { path: "/ind-booking", name: "IndBooking", component: IndBooking },
  { path: "/", name: "LandingPage", component: LandingPage }
];

export default indexRoutes;
