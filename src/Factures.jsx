import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function Facture() {
  const [numeroClient, setNumeroClient] = useState('');
  const [erreur, setErreur] = useState('');
  
  const clients = useSelector(state => state.achatReducer.clients);
  const achats = useSelector(state => state.achatReducer.achats);
  const produits = useSelector(state => state.achatReducer.produits);


  const getProduitByCode = (codeProduit) => {
    return produits.find(produit => produit.codeProduit === codeProduit) || {};
  };

  const getAchatsClient = (numeroClient) => {
    return achats.filter(achat => achat.numero === numeroClient);
  };
  const client = clients.find(client => client.numero === numeroClient);
  const achatsClient = getAchatsClient(numeroClient);
  
  const totalAchats = achatsClient.reduce((total, achat) => {
    const produit = getProduitByCode(achat.codeProduit);
    return total + (produit.prix || 0) * achat.qte;
  }, 0);

  const handleSubmit = () => {
    if (!client) {
      setErreur("Numéro de client invalide. Veuillez vérifier le numéro.");
    } else {
      setErreur('');
    }
  };

  return (
    <div>
      <h2>Facture</h2>
      <input 
        type="text" 
        placeholder="Numéro du client" 
        value={numeroClient} 
        onChange={(e) => setNumeroClient(e.target.value)} 
      />
      <button onClick={handleSubmit}>Afficher la facture</button>

      {erreur && <p style={{ color: 'red' }}>{erreur}</p>}

      {client && !erreur && (
        <div>
          <h3>Client: {client.nom} {client.prenom}</h3>
          <table border="3" width="300" height="300" align="center">
            <thead>
              <tr>
                <th>Code Produit</th>
                <th>Intitulé</th>
                <th>Quantité</th>
                <th>Prix</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {achatsClient.map(achat => {
                const produit = getProduitByCode(achat.codeProduit);
                const total = produit.prix * achat.qte;
                return (
                  <tr key={achat.codeProduit}>
                    <td>{achat.codeProduit}</td>
                    <td>{produit.intitule}</td>
                    <td>{achat.qte}</td>
                    <td>{produit.prix}DH</td>
                    <td>{total}DH</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <h4>Total des achats: {totalAchats}DH</h4>
        </div>
      )}
    </div>
  );
}

export default Facture;
