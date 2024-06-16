import Router from "./shared/Router";
import GlobalStyles from "./components/GlobalStyles";
import { Provider } from "react-redux";
import store from "./redux/config/configStore";

function App() {
  return (
    <Provider store={store}>
      <GlobalStyles />
      <Router />
    </Provider>
  );
}

export default App;
