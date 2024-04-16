import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "./components/Cart";
import { Provider } from "react-redux";
import store from "./store/store";
import Login from "./components/Login";
import Register from "./components/Register";
import MultiFiles from "./components/MultiFiles";
import SingleProduct from "./components/SingleProduct";
import OrderPage from "./components/OrderPage";
import HistoryPage from "./components/HistoryPage";
import Protected from "./components/Protected";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<MultiFiles />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/product/:id"
              exact
              element={<Protected Component={SingleProduct} />}
            />
            <Route
              path="/cart"
              exact
              element={<Protected Component={Cart} />}
            />
            <Route
              path="/orderpage"
              exact
              element={<Protected Component={OrderPage} />}
            />
            <Route
              path="/history"
              exact
              element={<Protected Component={HistoryPage} />}
            />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
