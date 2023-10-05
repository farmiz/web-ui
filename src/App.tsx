import "./App.css";
import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/error/NotFound";
import { RoutesProps, routes } from "./defaults/routes";
function App() {
  return (
    <Routes>
      {routes.map((route: RoutesProps) => {
        return (
          <Route
            path={route.url}
            element={<route.component />}
            key={route.url}
          />
        );
      })}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
