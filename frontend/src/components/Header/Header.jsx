import { Link } from "react-router-dom";
import "./Header.css";

function Header({ nbArticles, onToggleCart }) {
  const handleToggleCart = () => {
    onToggleCart();
  };
  return (
    <>
      <header>
        <div>
          <h1>RHUMA SUG</h1>
        </div>
        <div>
          <ul>
            <li>
              <Link to="home">Accueil</Link>
            </li>
            {nbArticles !== 0 && (
              <li onClick={handleToggleCart}>
                <span>Panier</span>
                <span>{nbArticles}</span>
              </li>
            )}
          </ul>
        </div>
      </header>
    </>
  );
}

export default Header;
