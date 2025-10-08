import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    const { boxName, items, total } = req.body;
    const userId = req.user.id;

    if (!userId || !boxName || !Array.isArray(items) || items.length === 0 || !total) {
      return res.status(400).json({
        success: false,
        message: "Missing or invalid required fields",
      });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let cartData = user.cartData || [];

    // ✅ Handle both image and images (string or array)
    const resolveImage = (item) => {
      if (typeof item.image === "string" && item.image.trim() !== "") return item.image;
      if (Array.isArray(item.images) && item.images.length > 0) return item.images[0];
      if (typeof item.images === "string" && item.images.trim() !== "") return item.images;
      return "";
    };

    const newBox = {
      _id: Date.now().toString(),
      name: boxName,
      image: resolveImage(items[0]),
      price: Number(total),
      quantity: 1,
      items: items.map((it) => ({
        name: it.name || "Unnamed Item",
        image: resolveImage(it), // ✅ safe image handling
        price: Number(it.price) || 0,
        quantity: Number(it.quantity) || 1,
      })),
    };

    cartData.push(newBox);
    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({
      success: true,
      message: "Box added to cart successfully",
      cartData,
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server error while adding to cart",
    });
  }
};




// ✅ REMOVE BOX FROM CART
const removeFromCart = async (req, res) => {
  try {
    const { boxId } = req.body;
    const userId = req.user.id;

    const user = await userModel.findById(userId);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const updatedCart = (user.cartData || []).filter(
      (box) => box._id !== boxId
    );

    await userModel.findByIdAndUpdate(userId, { cartData: updatedCart });

    res.json({
      success: true,
      message: "Box removed from cart",
      cartData: updatedCart,
    });
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ CLEAR ENTIRE CART
const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;

    await userModel.findByIdAndUpdate(userId, { cartData: [] });

    res.json({ success: true, message: "Cart cleared successfully" });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ GET USER CART
const getUserCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await userModel.findById(userId);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    res.json({ success: true, cartData: user.cartData || [] });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ PLACE ORDER (move cart to orders)
const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { firstName, lastName, address, city, state, postalCode, phone } = req.body;

    const user = await userModel.findById(userId);
    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    if (!user.cartData || user.cartData.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    const newOrder = {
      id: Date.now().toString(),
      date: new Date().toLocaleString(),
      items: user.cartData,
      total: user.cartData.reduce(
        (sum, box) => sum + box.price * box.quantity,
        0
      ),
      shippingDetails: {
        firstName,
        lastName,
        address,
        city,
        state,
        postalCode,
        phone,
      },
    };

    const updatedOrders = [...(user.orders || []), newOrder];

    await userModel.findByIdAndUpdate(userId, {
      cartData: [],
      orders: updatedOrders,
    });

    res.json({
      success: true,
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


export { addToCart, removeFromCart, clearCart, getUserCart, placeOrder };
