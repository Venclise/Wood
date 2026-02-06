"use client";

import { Button } from "../ui/button";
import { useCartStore } from "./cartHook";

type CounterProps = {
  id: number;
  title?: string;
  price?: number;
  img?: string;
};

export default function Counter({
  id,
  title = "",
  price = 0,
  img = "",
}: CounterProps) {
  const item = useCartStore((state) =>
    state.cart.find((i) => i.id === id)
  );

  const addToCart = useCartStore((state) => state.addToCart);
  const updateQty = useCartStore((state) => state.updateQty);

const qty = item?.qty ?? 1;

const increment = () => {
  if (!item) {
    addToCart({ id, title, price, img });
    return;
  }
  updateQty(id, item.qty + 1);
};


const decrement = () => {
  if (!item || item.qty <= 1) return;
  updateQty(id, item.qty - 1);
};

  return (
    <div className="flex items-center h-max w-max border border-gray-200 overflow-hidden">
      <Button
        variant="ghost"
        size="sm"

        className="rounded-none border-gray-100 text-xl disabled:opacity-50 "
        onClick={decrement}
        disabled={!item || item.qty <= 1}
      >
        -
      </Button>

      <span className="font-mono w-[1.5rem] text-center text-sm">
        {qty}
      </span>

      <Button
        variant="ghost"
        size="sm"
        className="rounded-none border-gray-100 text-xl"
        onClick={increment}
      >
        +
      </Button>
    </div>
  );
}
