import React, { useRef, useEffect, useState } from "react";
import { useCart } from "../../hooks/useCart";

export default function Paypal() {
  const [loaded, setLoaded] = useState(false);
  const cart = useCart()
  const subTotal = Object.keys(cart.cart).reduce((prev, curr) => {
    return prev + (cart.cart[curr].product.valor_Uni * cart.cart[curr].quantity)
  }, 0)

  let paypalRef = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.paypal.com/sdk/js?currency=BRL&client-id=AQQD1w7CDAvQV6G5bNZo4EEdHvWU2FlB-TSScDaDDRk-slv4d0EKJ_eclg7fNolHY5E4toLB1xxijag1"

    script.addEventListener("load", () => setLoaded(true));

    script.onload = () => {
      script.remove()
    }

    document.body.appendChild(script);

    if(loaded){
      function loadButtonsPaypal(){
        setTimeout(() => {
          window.paypal
          .Buttons({
            createOrder: (data, actions, err) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: "BRL",
                      value: (subTotal + 34.90),
                    },
                  },
                ],
              });
            },
            onApprove: async (data, actions) => {
              const order = await actions.order.capture();
              console.log(order);
            },
          })
          .render(paypalRef);
        })
      }
      loadButtonsPaypal();
    }
  })

  return (
    <div>
      <div ref={v => (paypalRef = v)}></div>
    </div>
  );
}