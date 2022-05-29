import { formatDate } from "../../modules/formatter.js";
import "./Vente.css";

function Vente({ vente }) {
  return (
    <>
      <td>{formatDate(vente.date)}</td>
      <td>{vente.quantite}</td>
      <td>{vente.total.toFixed(2)} €</td>
    </>
  );
}

export default Vente;
