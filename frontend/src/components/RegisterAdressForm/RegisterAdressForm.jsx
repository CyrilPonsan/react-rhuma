<section className="reg-section">
  <form className="user-form">
    <div>
      <label>
        Civilité
        <select
          value={civilite}
          onChange={(e) => {
            updateCivilite(e.target.value);
          }}
        >
          <option value="">---</option>
          <option value="mr">Mr</option>
          <option value="mme">Mme</option>
        </select>
      </label>
      <label>
        Nom
        <input
          type="text"
          value={nom}
          onChange={(e) => {
            updateNom(e.target.value);
          }}
        />
      </label>
    </div>
    <div>
      <label>
        Prénom
        <input
          type="text"
          value={prenom}
          onChange={(e) => {
            updatePrenom(e.target.value);
          }}
        />
      </label>
    </div>
    <div>
      <label>
        adresse
        <textarea
          rows={3}
          value={adresse}
          onChange={(e) => {
            updateAdresse(e.target.value);
          }}
        />
      </label>
    </div>
    <div>
      <label>
        Complément d'adresse
        <textarea
          rows={3}
          value={complement}
          onChange={(e) => {
            updateComplement(e.target.value);
          }}
        />
      </label>
    </div>
    <div>
      <label>
        Code codePostal
        <input
          value={codePostal}
          onChange={(e) => {
            updateCodePostal(e.target.value);
          }}
        />
      </label>
      <label>
        ville
        <input
          type="texte"
          value={ville}
          onChange={(e) => {
            updateVille(e.target.value);
          }}
        />
      </label>
    </div>
    <div>
      <span>
        <button type="submit" className="button" onClick={handleSubmit}>
          Envoyer
        </button>
      </span>
    </div>
  </form>
</section>;
