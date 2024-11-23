import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAchatsActions, fetchProduitsAction } from "./Redux/actions/achatsActions.js";
import ListeAchats from './ListeAchats.jsx';

export default function AchatsForm() {                                                                                                                               
  const [codeProduit, setCodeProduit] = useState('');
  const [qte, setQte] = useState('');
  const [numero, setNumero] = useState('');
  const [selectedProduit, setSelectedProduit] = useState(null);
 
  const clients = useSelector((state) => state.achatReducer.clients);
  const produits = useSelector((state) => state.achatReducer.produits);

  const dispatch = useDispatch();      
  useEffect(()=>{
    dispatch(fetchProduitsAction())
  },[])       

  const handleProduitChange = (e) => {
    const code = e.target.value;
    setCodeProduit(code);
    const produit = produits.find((p) => p.codeProduit === code);
    setSelectedProduit(produit);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!codeProduit || !numero || !qte) {
      alert("Veuillez remplir tous les champs.");
      return;
    }
    if (selectedProduit && qte > selectedProduit.quantite) {
      alert("La quantité demandée dépasse le stock disponible !");
      return;
    }
    dispatch(addAchatsActions({ numero, codeProduit, qte: parseInt(qte) }));
    setCodeProduit('');
    setQte('');
    setSelectedProduit(null);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-16 max-w-xl bg-white shadow-lg rounded-lg p-8 border border-gray-200"
      >
        <h2 className="text-3xl font-semibold text-center text-blue-700 mb-8">Ajouter un Achat</h2>
        
        {/* Sélection du client */}
        <div className="mb-6">
          <label htmlFor="numero" className="block text-lg font-medium text-gray-700 mb-1">Client</label>
          <select
            id="numero"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
          >
            <option value="" className="text-gray-400">Sélectionnez le numéro</option>
            {clients.map((client) => (
              <option key={client.numero} value={client.numero}>
                {client.nom}
              </option>
            ))}
          </select>
        </div>

        {/* Sélection du produit */}
        <div className="mb-6">
          <label htmlFor="produit" className="block text-lg font-medium text-gray-700 mb-1">Produit</label>
          <div className="flex items-center gap-4">
            <select
              id="produit"
              value={codeProduit}
              onChange={handleProduitChange}
              className="w-full h-full rounded-md border border-gray-300 bg-white px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="" className="text-gray-400">Sélectionnez un produit</option>
              {produits.map((produit) => (
                <option key={produit.id} value={produit.id}>
                  {produit.libelle}
                </option>
              ))}
            </select>

            {/* Affichage de la quantité disponible */}
            {selectedProduit && (
              <span
                className={`text-sm font-semibold px-3 py-1 rounded ${
                  selectedProduit.quantite > 5
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {selectedProduit.quantite > 5
                  ? `Disponible : ${selectedProduit.quantite}`
                  : `Stock faible : ${selectedProduit.quantite}`}
              </span>
            )}
          </div>
        </div>

        {/* Saisie de la quantité */}
        <div className="mb-6">
          <label htmlFor="quantite" className="block text-lg font-medium text-gray-700 mb-1">Quantité</label>
          <input
            type="number"
            id="quantite"
            value={qte}
            onChange={(e) => setQte(e.target.value)}
            placeholder="Entrez la quantité"
            className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
          />
        </div>

        {/* Bouton Ajouter */}
        <button
          type="submit"
          className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Ajouter l'achat
        </button>
      </form>

      {/* Liste des achats */}
      <ListeAchats />
    </>
  );
}
