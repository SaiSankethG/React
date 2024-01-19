import { useState, lazy, Suspense } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AdaptedPetContext from "./AdaptedPetContext";

const queryClient = new QueryClient({
  defauultOptions: {
    queries: {
      stateTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const Details = lazy(() => import("./Details"));
const SearchParams = lazy(() => import("./SearchParams"));

const App = () => {
  const adaptedPet = useState(null);

  return (
    <div>
        <QueryClientProvider client={queryClient}>
          <Suspense
            fallback={
              <div className="loading-pane">
                <h2 className="loader">🌀</h2>
              </div>
            }
          >
            <AdaptedPetContext.Provider value={adaptedPet}>
              <header>
                <Link to="/ ">Adopt Me!</Link>
              </header>
              <Routes>
                <Route path="/details/:id" element={<Details />} />
                <Route path="/" element={<SearchParams />} />
              </Routes>
            </AdaptedPetContext.Provider>
          </Suspense>
        </QueryClientProvider>
    </div>
  );
};

export default App;
