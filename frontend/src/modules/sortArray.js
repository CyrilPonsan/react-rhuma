export function sortCart(panier) {
  panier.sort(function compare(a, b) {
    if (a.nom < b.nom) return -1;
    if (a.nom > b.nom) return 1;
    return 0;
  });
  return panier;
}

export function setTotal(panier) {
  let total = 0;
  panier.forEach((el) => {
    total += el.prix * el.quantite;
  });
  return total;
}

export function setNbArticles(panier) {
  let nbArticles = 0;
  panier.forEach((el) => {
    nbArticles += el.quantite;
  });
  return nbArticles;
}
