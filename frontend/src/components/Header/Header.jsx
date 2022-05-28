import { Link } from "react-router-dom";
import "./Header.css";

function Header({ nbArticles, user }) {
  return (
    <>
      <header>
        <div>
          <h1>RHUMA SUG</h1>
        </div>
        <div>
          <ul>
            <li>
              <Link to="/">Accueil</Link>
            </li>
            {nbArticles !== 0 && (
              <li>
                <Link to="/cart">Panier</Link>
                <span>{nbArticles}</span>
              </li>
            )}
            {user && (
              <li>
                <Link to="/profile">{user.nom}</Link>
              </li>
            )}
            {user ? (
              <li>
                <Link to="/logout">Déconnexion</Link>
              </li>
            ) : (
              <li>
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
