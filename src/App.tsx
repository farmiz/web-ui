import { Routes, Route } from "react-router-dom";
import NotAuthorized from "./pages/error/NotAuthorizedScreen";
import { RoutesProps, routes } from "./defaults/routes";
import PersistLogin from "./components/persistentAuth/PersistLogin";
import RequireAuth from "./components/persistentAuth/RequireAuth";

function App() {
  return (
    <Routes>
      {routes.map((route: RoutesProps) =>
        route.requireAuth ? (
          <Route element={<PersistLogin />} key={route.url}>
            <Route element={<RequireAuth allowedRole="customer" />}>
              <Route path={route.url} element={<route.component />} />
            </Route>
          </Route>
        ) : (
          <Route
            path={route.url}
            element={<route.component />}
            key={route.url}
          />
        )
      )}

      <Route path="*" element={<NotAuthorized />} />
    </Routes>
  );
}

export default App;
