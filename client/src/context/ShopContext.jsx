import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const shopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  // ✅ Helper: Get Authorization header
  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  // ✅ Fetch all products (public)
  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendURL}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products);
      } else toast.error(response.data.message);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error(error.message);
    }
  };

  // ✅ Fetch user's cart
  const getUserCart = async () => {
    try {
      const response = await axios.post(
        `${backendURL}/api/cart/get`,
        {},
        { headers: getAuthHeader() }
      );
      if (response.data.success) setCart(response.data.cartData);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  // ✅ Add box to cart
  const addBoxToCart = async (boxName, items, total) => {
    try {
      console.log("📦 Sending data to backend:", {
        boxName,
        items,
        total,
      });
      const response = await axios.post(
        `${backendURL}/api/cart/add`,
        { boxName, items, total },
        { headers: getAuthHeader() }
      );
      if (response.data.success) {
        setCart(response.data.cartData);
        toast.success("Box added to cart!");
      } else toast.error(response.data.message);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add box");
    }
  };

  // ✅ Remove box from cart
  const removeFromCart = async (boxId) => {
    try {
      const response = await axios.post(
        `${backendURL}/api/cart/remove`,
        { boxId },
        { headers: getAuthHeader() }
      );
      if (response.data.success) setCart(response.data.cartData);
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove item");
    }
  };

  // ✅ Clear entire cart
  const clearCart = async () => {
    try {
      const response = await axios.post(
        `${backendURL}/api/cart/clear`,
        {},
        { headers: getAuthHeader() }
      );
      if (response.data.success) setCart([]);
    } catch (error) {
      console.error(error);
      toast.error("Failed to clear cart");
    }
  };

  // ✅ Helper: Calculate total
  const calcTotal = (cart) =>
    cart.reduce((sum, box) => sum + Number(box.price || 0), 0);

  // 🟢 PLACE ORDER
  const placeOrder = async (form) => {
    try {
      const response = await axios.post(
        `${backendURL}/api/cart/place-order`,
        form, // ✅ send full shipping form
        { headers: getAuthHeader() }
      );

      if (response.data.success) {
        toast.success("Order placed successfully!");
        setCart([]);
        await fetchUserOrders();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Order placement error:", error);
      toast.error("Failed to place order");
    }
  };

  // 🟢 FETCH USER ORDERS
  const fetchUserOrders = async () => {
    try {
      const response = await axios.post(
        `${backendURL}/api/order/my-orders`,
        {},
        { headers: getAuthHeader() }
      );
      if (response.data.success) setOrders(response.data.orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // 🟢 CANCEL ORDER
  const cancelOrder = async (orderId) => {
    try {
      const response = await axios.post(
        `${backendURL}/api/order/cancel`,
        { orderId },
        { headers: getAuthHeader() }
      );

      if (response.data.success) {
        toast.info("Order cancelled successfully!");
        await fetchUserOrders();
      } else toast.error(response.data.message);
    } catch (error) {
      console.error("Error cancelling order:", error);
      toast.error("Failed to cancel order");
    }
  };

  // ✅ Load data on app start
  useEffect(() => {
    getProductsData();
    const token = localStorage.getItem("token");
    if (token) {
      getUserCart();
      fetchUserOrders();
    }
  }, []);

  const value = {
    products,
    cart,
    orders,
    addBoxToCart,
    removeFromCart,
    clearCart,
    placeOrder,
    cancelOrder,
    fetchUserOrders,
  };

  return <shopContext.Provider value={value}>{children}</shopContext.Provider>;
};

export default ShopContextProvider;
