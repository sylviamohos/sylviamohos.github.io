import classes from "./Checkout.module.css";
import { useNavigate } from "react-router-dom";


function Checkout() {
  const navigate = useNavigate();
  let order = JSON.parse(sessionStorage.getItem("order"));
  let orderProductsNames;

  function addTestOrderToSessionStorage() {
    let testOrder = [{"order":{"orderId":"ca89ae16-f485-4531-9df1-b3a6e08698b1","productNames":["baby yoda oven mitt","donut give up apron","this is my jam tea towel"],"orderDate":1653428454242,"customerId":"dummy-id"}
  ,"responseStatus":{"code":200,"message":"[SUCCESS] Good job everything is working great."}}];
    sessionStorage.setItem("order", JSON.stringify(testOrder));
    console.log("added testOrder to session storage");
    window.location.reload();
  }

  if (order == null) {
    return (<div>
      <title>Checkout Error</title>
      <div className={classes.errorbox}>
      <h1>beep boop. . .</h1>
      <p>There was an error retrieving your order</p>
      <button className={classes.reviewbutton} onClick={() => navigate('/')}>Go Home</button>
      <br></br>
      </div>
      <p><button className={classes.reviewbutton} onClick={addTestOrderToSessionStorage}>Add example order to browser session storage</button></p>
    </div>);
  } else {
    orderProductsNames = order.productNames.join("\n");
    let date = new Date(order.orderDate);
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    order.orderDate = mm + '/' + dd + '/' + yyyy;
    

    return (
      <div>
        <title>Checkout Successful</title>
        <div className={classes.checkoutbox}>
          <h1>Checkout Complete!</h1>
          <p>Your order is on its way!</p>
          <h2>Order Info</h2>
          <table>
            <tbody>
              <tr>
                <th>Order Id</th>
                <th>Order Date</th>
                <th>Products</th>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>
                  <h4>{order.orderId}</h4>
                </td>
                <td>
                  <h3>{order.orderDate}</h3>
                </td>
                <td>
                  <h4>{orderProductsNames}</h4>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Checkout;
