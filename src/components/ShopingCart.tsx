import React from "react";
import { Offcanvas, Stack } from "react-bootstrap";
import { useShopingCart } from "../context/ShopingCartContext";
import { CartItem } from "./CartItem";
import storeItems from "../data/items.json";
import { formatCurrency } from "../utilities/formatCurrency";

type ShopingCartProps = {
  isOpen: boolean;
};

export default function ShopingCart({ isOpen }: ShopingCartProps) {
  const { closeCart, cartItems } = useShopingCart();
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            Total{" "}
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const item = storeItems.find((i) => i.id === cartItem.id);
                return total + (item?.price || 0) * cartItem.quantity;
              }, 0)
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
