import React from "react";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { store } from "./store/configureStore";
import { persistor } from "./store/configureStore";

// import Layout from "./modules/Layout.module";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div className="App">
            <DndProvider backend={HTML5Backend}></DndProvider>
          </div>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
