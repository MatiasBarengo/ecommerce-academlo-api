import React from "react";
import "./styles/cartProduct.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setIsLoading } from "../../store/slices/isLoading.slice";
import { getUserCart } from "../../store/slices/cart.slice";

const CartProduct = ({ product }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    const header = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    dispatch(setIsLoading(true));
    axios
      .delete(`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${product.id}`, header)
      .then((res) => {
        dispatch(getUserCart());
        dispatch(setIsLoading(false));
      })
      .catch((err) => {
        console.log(err);
        dispatch(setIsLoading(false));
      });
  };

  console.log("product in cart", product);

  return (
    <article className="cart-product">
      <header>
        <h4>{product.product.brand}</h4>
        <h3>{product.product.title}</h3>
      </header>
      <div className="cant-container">
        <div>
          <p>Cant:</p>
          <span>{product.quantity}</span>
        </div>
        <div>
          <p>Unit price:</p>
          <span>$ {product.product.price}</span>
        </div>
      </div>
      <div className="button-img-container">
        <button onClick={handleDelete}>
          <i className="fa-solid fa-trash-can"></i>
        </button>
        <img src={product.product.images[0].url} alt="product img" />
      </div>
    </article>
  );
};

export default CartProduct;
