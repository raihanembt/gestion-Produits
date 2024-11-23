
import { useDispatch, useSelector } from 'react-redux';
import { deleteAchatsActions} from "./Redux/actions/achatsActions.js";

export default function ListeAchats() {
  const achats = useSelector(state => state.achatReducer.achatsFilters || state.achatReducer.achats);
  const produits = useSelector(state => state.achatReducer.produits);
  const dispatch = useDispatch();

  const handleSupprimer = (numero) => {
    dispatch(deleteAchatsActions(numero));
  };

  const getProduitDetails = (codeProduit) => {
    return produits.find(produit => produit.codeProduit === codeProduit) || {};
  };

  return (
    <div className="container mx-auto p-8 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8" align="center">Liste des achats</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm bg-white" border="3" width="500" height="300" align="center">
          <thead className="bg-gray-200 text-gray-600 text-xs uppercase">
            <tr>
              <th className="px-6 py-3 text-left">Code Produit</th>
              <th className="px-6 py-3 text-left">Intitulé</th>
              <th className="px-6 py-3 text-left">Quantité</th>
              <th className="px-6 py-3 text-left">Prix</th>
              <th className="px-6 py-3 text-left">Total</th>
              <th className="px-6 py-3 text-left">Disponibilité</th>
              <th className="px-6 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {achats.map(achat => {
              const produit = getProduitDetails(achat.codeProduit);
              const total = produit.prix * achat.qte;

              // Déterminer la disponibilité et les styles
              const isDisponible = produit.quantite > 0;
              const disponibiliteStyle = isDisponible
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700';
              const disponibiliteTexte = isDisponible ? 'Oui' : 'Non';

              return (
                <tr key={achat.numero} className="border-b hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap">{achat.codeProduit}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{produit.intitule}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{achat.qte}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{produit.prix} DH</td>
                  <td className="px-6 py-4 whitespace-nowrap">{total} DH</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-sm font-semibold rounded ${disponibiliteStyle}`}>
                      {disponibiliteTexte}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button 
                      onClick={() => handleSupprimer(achat.numero)}
                      className="bg-red-500 text-black px-3 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
