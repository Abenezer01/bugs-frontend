import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../store/cartSlice";
import {map,sum} from 'lodash'
import { useEffect } from "react";
const CartsComponent = () => {
    const carts=useSelector(state=>state.carts)
    useEffect(() => {
       console.log(carts)
    }, [carts])
    const dispatch=useDispatch()
    const addItemToCart = (item) => {
        dispatch(addToCart(item));
      };
      const removeItemFromCart=(item)=>{
        dispatch(removeFromCart(item))
      }
    return (  <div className="App m-5">
    <table className="table">
      <thead>
        <tr>
          <td>Name </td>
          <td>Description</td>
          <td>Action</td>
        </tr>
      </thead>
      <tbody>
        {map(carts.list, (item, i) => (
          <tr key={i}>
            <td>{item.name}</td>
            <td>{item.description}</td>
            <td>
              <button
                onClick={() => addItemToCart(item)}
                className="btn btn-sm mr-2"
              >
                add
              </button>
              <button onClick={()=>removeItemFromCart(item)} className="btn btn-sm mr-2">remove</button>
              <span className="badge badge-info">
                  {item.count}
              </span>
            </td>
          </tr>
        ))}
        <tr>
            <td>
                Total
                </td>
                <td colSpan={2} className="text-right">
                {sum(carts.list.map(cart=>cart.count*cart.cost))}

                    </td>
        </tr>
      </tbody>
    </table>
    </div>);
}
 
export default CartsComponent;