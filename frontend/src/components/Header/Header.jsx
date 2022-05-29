import { Link, useLocation } from "react-router-dom";
import { toTitleCase } from "../../modules/formatter";
import { useAuth } from "../AuthProvider/AuthProvider";
import "./Header.css";

function Header({ nbArticles }) {
  const auth = useAuth();
  let path = useLocation().pathname;
  return (
    <>
      <header>
        <div>
          <h1>RHUMA SUG</h1>
        </div>
        <div>
          <ul>
            <li className={"/" === path ? "active" : null}>
              <Link to="/">Accueil</Link>
            </li>
            {nbArticles !== 0 && (
              <>
                <li className={"/cart" === path ? "active" : null}>
                  <Link to="/cart">Panier</Link>
                </li>
                <li className="nb-articles">
                  <span>{nbArticles}</span>
                </li>
              </>
            )}
            {auth.token && (
              <li className={"/account" === path ? "active" : null}>
                <Link to="/account">{toTitleCase(auth.user.nom)}</Link>
              </li>
            )}
            {auth.token ? (
              <li>
                <Link to="/logout">Déconnexion</Link>
              </li>
            ) : (
              <li className={"/login" === path ? "active" : null}>
                <Link to="/login">Connexion</Link>
              </li>
            )}
          </ul>
        </div>
      </header>
    </>
  );
}

export default Header;
