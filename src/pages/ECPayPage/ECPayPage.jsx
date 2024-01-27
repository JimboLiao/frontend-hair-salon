import { useEffect, useState } from "react";
import { createOrderApi } from "../../api";
import { CartContext } from "../../context/CartContext";
import { useContext } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const ECPayPage = () => {
  let navigate = useNavigate();
  const [html, setHtml] = useState("<div>Loading...</div>");
  const { cart, setCart, deliverPrice, grandTotal } = useContext(CartContext);

  useEffect(() => {
    const createNewOrder = async (data) => {
      try {
        const htmlResponse = await createOrderApi(data);
        const doc = new DOMParser().parseFromString(htmlResponse, "text/html");
        const form = doc.getElementById("_form_aiochk");
        const script = doc.querySelector("script");

        console.log("htmlResponse = ", htmlResponse);
        console.log("doc = ", doc);
        console.log("form = ", form);
        console.log("script = ", script);
        console.log(script.textContent);

        setHtml(form.outerHTML);

        if (script) {
          eval(script.textContent);
          //   eval('document.getElementById("_form_aiochk").submit();');
        }
      } catch (error) {
        console.error(error);
      }
    };

    // if not login
    if (!Cookies.get("id")) {
      navigate("/login");
      return;
    } else {
      const productInfos = cart.map((product) => {
        return {
          productId: product.id,
          productAmount: Number(product.amount),
        };
      });
      const newOrder = {
        memberId: Number(Cookies.get("id")),
        productInfos: productInfos,
        delivery: deliverPrice,
        grandTotal: grandTotal,
      };

      createNewOrder(newOrder);
    }
  }, []);
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export default ECPayPage;
