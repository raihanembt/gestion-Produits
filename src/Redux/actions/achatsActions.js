export  function addAchatsActions(achats){
    return(
        {
            type:"AJOUTER_ACHATS",
            payload:achats
        }
    )
}
export  function deleteAchatsActions(numero){
    return(
        {
            type:"SUPPRIMER_ACHATS",
            payload:numero
        }
    )
}
export  function  FilterAchatsActions(numeroAchats){
    return(
        {
            type:"FILTER_ACHATS",
            payload:numeroAchats
        }
    )
}
export function fetchProduitsAction(){
    return function (dispatch,getState){
        fetch("http://196.127.103.9:3000/api/produits")
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            dispatch(remplirProduitAction(data))
        });
    }
}
export function remplirProduitAction(data){
    return{
        type:"REMPLIR_PRODUIT",
        payload:data,
    };
}