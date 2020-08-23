import React, { Component } from "react";
import ReactDOM from "react-dom";
import Base from "./account/Base";
import "../styles/styles.scss";
import store from "../store";
import { Provider } from "react-redux";
import { loadUser } from "../actions/auth";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Alert from "../component/layout/Alert";

const options = {
  position: positions.TOP_CENTER,
  timeout: 10000,
  offset: "30px",
  transition: transitions.SCALE,
};

export class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...options}>
          <div>
            <Alert />
            <Base />
          </div>
        </AlertProvider>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
