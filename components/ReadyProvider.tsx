"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

type ReadyContextValue = {
  ready: boolean;
  setReady: (v: boolean) => void;
};

const ReadyContext = createContext<ReadyContextValue | null>(null);

/**
 * Sinal global "Loader terminou — animações iniciais podem rodar".
 * Usado pelo HeroReel (e qualquer outro componente que anime no mount,
 * acima da fold) pra não desperdiçar a animação enquanto o Loader cobre
 * a tela.
 */
export function ReadyProvider({ children }: { children: ReactNode }) {
  const [ready, setReadyState] = useState(false);
  const setReady = useCallback((v: boolean) => setReadyState(v), []);
  return (
    <ReadyContext.Provider value={{ ready, setReady }}>
      {children}
    </ReadyContext.Provider>
  );
}

export function useReady() {
  const ctx = useContext(ReadyContext);
  if (!ctx) throw new Error("useReady must be used within ReadyProvider");
  return ctx;
}
