import {
  PropsWithChildren,
  useState,
} from "react";
import { Preloader } from "../components/Preloader";
import { LoadingContext, LoadingType } from "./LoadingContext";

export const LoadingProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(true);

  const value = {
    isLoading,
    setIsLoading,
    setLoading: () => {}, // No-op to avoid breaking types
  };

  return (
    <LoadingContext.Provider value={value as LoadingType}>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      <main className="main-body" style={{ visibility: isLoading ? 'hidden' : 'visible' }}>
        {children}
      </main>
    </LoadingContext.Provider>
  );
};
