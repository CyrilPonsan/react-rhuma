import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <section className="sidebar">
      <ul>
        <li>
          <Link to="/">
            <img src="img/home.png" alt="accueil" />
          </Link>
        </li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </section>
  );
}

export default Sidebar;
