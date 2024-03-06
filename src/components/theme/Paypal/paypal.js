import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setCount } from "redux/userSlice";
import { createOrder } from "service/UserService";
const style = { layout: "vertical" };
const ButtonWrapper = ({ currency, showSpinner, amount, payload }) => {
  const [{ isPending, options }, dispatch] = usePayPalScriptReducer();
  const navigate = useNavigate();
  const dispatchh = useDispatch();
  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      },
    });
  }, [currency, showSpinner]);

  const handleSaveOrder = async () => {
    const resetCount = () => {
      const updatedCount = {
        count: 0,
      };
      dispatchh(setCount(updatedCount));
    };
    const res = await createOrder({ ...payload, status: "Succeed" });
    if (res) {
      navigate("/");
      toast.success("Bạn đã thanh toán thành công!!");
      resetCount();
      console.log(res);
    }
  };
  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[style, currency, amount]}
        fundingSource={undefined}
        createOrder={(data, actions) =>
          actions.order
            .create({
              purchase_units: [
                { amount: { currency_code: currency, value: amount } },
              ],
            })
            .then((orderId) => orderId)
        }
        onApprove={(data, actions) => {
          actions.order.capture().then(async (response) => {
            console.log(response);
            console.log(payload);
            if (response?.status === "COMPLETED") {
              handleSaveOrder(payload);
            }
          });
        }}
      />
    </>
  );
};

export default function Paypal({ amount, payload }) {
  return (
    <div style={{ width: "700px", minHeight: "200px", margin: "0 auto" }}>
      <PayPalScriptProvider
        options={{ clientId: "test", components: "buttons", currency: "USD" }}
      >
        <ButtonWrapper
          payload={payload}
          currency={"USD"}
          amount={amount}
          showSpinner={false}
        />
      </PayPalScriptProvider>
    </div>
  );
}
