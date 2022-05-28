import { useEffect } from "react";

function Logout({ onLogout, onUser }) {
  useEffect(() => {
    onUser(null);
    onLogout();
  }, []);
}

export default Logout;
