import { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { CartContext, useCartContext } from "app/context/store";
// import { useCartContext, addToCart } from "app/context/store";

type CartItem = {
  productID: string;
  productName: string;
  productImage: string[];
  quantity: number;
};

export const ProductForm: React.FC<{
  id: string;
  name: string;
  images: string[];
}> = ({ id, name, images }) => {
  const [quantity, setQuantity] = useState<number>(1);
  // const isLoading = false;
  // const isLoading = useCartContext()[2];
  // const addToCart = useAddToCartContext();
  const { addToCart } = useContext(CartContext);

  const atcBtnStyle = isLoading
    ? `pt-3 pb-2 bg-palette-primary text-white w-full mt-2 rounded-sm font-primary font-semibold text-xl flex
                      justify-center items-baseline  hover:bg-palette-dark opacity-25 cursor-none`
    : `pt-3 pb-2 bg-palette-primary text-white w-full mt-2 rounded-sm font-primary font-semibold text-xl flex
                      justify-center items-baseline  hover:bg-palette-dark`;

  async function handleAddToCart() {
    if (quantity !== 0) {
      addToCart({
        productID: id,
        productName: name,
        productImage: images,
        quantity: quantity,
      });
    }
  }

  function updateQuantity(e: string) {
    if (e === "") {
      setQuantity(0);
    } else {
      setQuantity(Math.floor(Number(e)));
    }
  }

  return (
    <div className="w-full">
      <div className="flex justify-start space-x-2 w-full">
        <div className="flex flex-col items-start space-y-1 flex-grow-0">
          <label className="text-gray-500 text-base">Qty.</label>
          <input
            type="number"
            inputMode="numeric"
            id="quantity"
            name="quantity"
            min="1"
            step="1"
            value={quantity}
            onChange={(e) => updateQuantity(e.target.value)}
            className="text-gray-900 form-input border border-gray-300 w-16 rounded-sm focus:border-palette-light focus:ring-palette-light"
          />
        </div>
      </div>
      <button
        className={atcBtnStyle}
        aria-label="cart-button"
        onClick={handleAddToCart}
      >
        Add To Cart
        <FontAwesomeIcon icon={faShoppingCart} className="w-5 ml-2" />
      </button>
    </div>
  );
};
