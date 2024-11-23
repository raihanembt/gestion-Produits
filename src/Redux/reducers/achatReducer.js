const initialState = {
    clients: [
      {
        numero: '1',
        nom: 'N1',
        prenom: 'P1',
      },
      {
        numero: '2',
        nom: 'N2',
        prenom: 'P2',
      }

    ],
    produits: [
        { codeProduit: '1', intitule: 'Produit1', prix: 10, quantite: 15 },
        { codeProduit: '2', intitule: 'Produit2', prix: 20, quantite: 4 },
        { codeProduit: '3', intitule: 'Produit3', prix: 30, quantite: 8 },
    ],
    achats: [{ numero: '1', codeProduit: '1', qte: 5 }],
  };
export default function produitReducer(state = initialState, action)  {
    switch (action.type) {
      case 'AJOUTER_ACHATS':
        return {...state,achats:[...state.achats,action.payload] };
      case 'SUPPRIMER_ACHATS':
        return{...state,achats:[...state.achats.filter(function(item){
            return item.numero !== action.payload
        })]}
      case 'FILTRER_ACHATS':
        return{...state,achatsFilters:state.achats.filter(achat=>achat.numero===action.payload) }
      case "REMPLIR_PRODUIT":
        return{...state,produits:action.payload}
      default:
        return state;
    }
  };
  