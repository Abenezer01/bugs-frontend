import logo from "./logo.svg";
// import './App.css';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loadBugs, resolveBug } from "./store/bugSlice";
import { map } from "lodash";
import AddBug from "./components/addbug";
import { loadItems } from "./store/itemsSlice";
import { addToCart, removeFromCart } from "./store/cartSlice";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadItems());
  }, []);
  const addItemToCart = (item) => {
    dispatch(addToCart(item));
  };
  const removeItemFromCart=(item)=>{
    dispatch(removeFromCart(item))
  }
  const { items, carts } = useSelector((state) => ({
    items: state.items,
    carts: state.carts,
  }));
  useEffect(() => {
    console.log("items", carts.list);
  }, [items]);

  const getItemCount = (id) => {
    const index = carts.list.findIndex((cart) => cart.id === id);
    return index > -1 ? carts.list[index].count : 0;
  };
  return (
    <div className="App m-5">
      <table className="table">
        <thead>
          <tr>
            <td>Name {items.list.length}</td>
            <td>Description</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {map(items.list, (item, i) => (
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
                  {getItemCount(item.id)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
