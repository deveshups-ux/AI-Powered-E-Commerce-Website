import { createContext } from "react";

export const authDataContext = createContext();

function AuthContext({ children }) {
  const serverUrl = "https://onecart-backend-3oxq.onrender.com";

  const value = {
    serverUrl,
  };

  return (
    <authDataContext.Provider value={value}>
      {children}
    </authDataContext.Provider>
  );
}

export default AuthContext;
