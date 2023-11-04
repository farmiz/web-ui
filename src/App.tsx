import { Routes, Route } from "react-router-dom";
import { RoutesProps, routes } from "./routes";
import PersistLogin from "./components/persistentAuth/PersistLogin";
import RequireAuth from "./components/persistentAuth/RequireAuth";
import NotFoundScreen from "./pages/error/NotFoundScreen";

function App() {
  return (
    <Routes>
      {routes.map((route: RoutesProps) =>
        route.requireAuth ? (
          <Route element={<PersistLogin />} key={route.url}>
            <Route element={<RequireAuth permission={route.permission!}/>}>
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

      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  );
}

export default App;
