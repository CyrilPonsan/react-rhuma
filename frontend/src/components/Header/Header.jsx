import { Link, matchPath, useLocation, useMatch } from "react-router-dom";
import "./Header.css";

function Header({ nbArticles, user }) {
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
            {user && (
              <li className={"/profile" === path ? "active" : null}>
                <Link to="/profile">{user.nom}</Link>
              </li>
            )}
            {user ? (
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
