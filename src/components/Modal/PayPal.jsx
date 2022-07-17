import React, { useRef, useEffect, useState } from "react";
import { useCart } from "../../hooks/useCart";
import PaymentAproved from "../../assets/payment-aproved.svg"
import { Link } from "react-router-dom";

export default function Paypal() {
  const [loaded, setLoaded] = useState(false);
  const [pago, setPago] = useState(false);

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
                      value: (subTotal),
                    },
                  },
                ],
              });
            },
            onApprove: async (data, actions) => {
              const order = await actions.order.capture();
              setPago(true)
              console.log(order);
            },
            onError: (err) => {
              console.log(err);
            },
          })
          .render(paypalRef);
        })
      }
      loadButtonsPaypal();
    }
  })

  return (
    <>
      <div>
        <div ref={v => (paypalRef = v)}></div>
      </div>
      {pago &&(
        <div className='modal-pago'>
          <strong>Compra realizada com sucesso!</strong>
          <p>Você recebera o mais informações da compra, assim como codigo de rastreio no seu email. Fique atento!</p>
          <img src={PaymentAproved} alt="pagamento-aprovado"/>
          <Link to='/inicio'>
            Voltar para o início
          </Link>
        </div>
      )}
    </>
  );
}