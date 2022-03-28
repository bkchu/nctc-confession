import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useBeforeUnload } from "remix";
import { Version } from "~/types";

type VersionContext = {
  version: Version;
  setVersion(version: Version): void;
};

const VersionContext = createContext<VersionContext | null>(null);

export const useVersionContext = () => {
  const context = useContext(VersionContext);

  if (!context) {
    throw new Error(
      "Something went wrong. Please place a context provider above this component in the tree."
    );
  }

  return context;
};

type VersionProviderProps = {
  children: ReactNode;
};

const VersionProvider = ({ children }: VersionProviderProps): JSX.Element => {
  const [versionState, setVersionState] = useState<Version>("NKJV");

  useEffect(() => {
    // can only access localStorage in useEffect
    const localVersion = localStorage.getItem("Version") as Version;

    if (localVersion) {
      setVersionState(localVersion);
    }
  }, []);

  useBeforeUnload(() => {
    localStorage.setItem("Version", versionState);
  });

  const contextValue = useMemo(() => {
    const setVersion = (version: Version) => {
      setVersionState(version);
    };

    return {
      version: versionState,
      setVersion,
    };
  }, [versionState]);

  return (
    <VersionContext.Provider value={contextValue}>
      {children}
    </VersionContext.Provider>
  );
};

export default VersionProvider;
