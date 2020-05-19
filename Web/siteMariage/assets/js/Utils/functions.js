export function contributionCadeauValide (montant, max, min){
   if(parseInt(montant) > parseInt(max) || parseInt(montant) < min){
     return false;
   }else{
     return true;
   }
}


export function calculTotalRecolte(tabMontants){
  var total = 0;
  for ( var i = 0; i < tabMontants.length; i++) {
          total += parseInt(tabMontants[i]);
  }
  return total;
}


export function isCheckBox(name){
  if(name === 'presentCeremonie' || name === 'accompagnant' || name === 'presentVinDHonneur' || name === 'presentRepas' || name === 'presentSoiree'){
    return true;
  }else{
    return false;
  }
}


export function updateTableauAge(tabAge){
  for(var i = 0; i < tabAge.length; i++){
    if(tabAge[i] == 0){
      tabAge.splice(i,1)
      i--
    }
  }
  return tabAge;
}
