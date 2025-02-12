"use client";
import { useState } from "react";

export default function OrderAction({ data }) {
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => {
    if (quantity == data.data.stock) return;
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity == 1) return;
    setQuantity(quantity - 1);
  };
  return (
    <div className="bg-dark/20 p-5 rounded-lg">
      <p className="font-medium">stock : {data.data.stock}</p>
      <div className="flex items-center gap-4 bg-white w-fit text-xl font-medium rounded-md overflow-hidden mt-1">
        <button
          className="bg-dark text-white w-10 aspect-square"
          onClick={decrementQuantity}
        >
          -
        </button>
        <input
          type="number"
          onChange={(e) => setQuantity(Number(e.target.value))}
          value={quantity}
          min={1}
          max={data.data.stock}
          className="w-16 text-center appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:outline-none"
        />
        <button
          className="bg-dark text-white w-10 aspect-square"
          onClick={incrementQuantity}
        >
          +
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-3">
        <button className="bg-dark text-white text-lg font-medium px-3 py-2 rounded-md">
          Add to Cart
        </button>
        <button className="bg-white text-black text-lg font-medium px-3 py-2 rounded-md">
          Buy Now
        </button>
      </div>
    </div>
  );
}
