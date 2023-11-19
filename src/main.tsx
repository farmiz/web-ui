import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/global.css";
import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider.tsx";
import { Toaster } from "sonner";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <Router>
      <ThemeProvider>
        <Provider store={store}>
          <App />
          <Toaster />
        </Provider>
      </ThemeProvider>
    </Router>
  </>
);
