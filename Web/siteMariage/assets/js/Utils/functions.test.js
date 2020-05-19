import {
   contributionCadeauValide,
   calculTotalRecolte,
   isCheckBox,
   updateTableauAge,
 } from './functions.js'



const montant = 5;
test('Test de la fonctions de vérification du montant entré par l\'utilisateur pour la contribution à un cadeau.\n Prix cadeau : 12€, montant entré : ' + montant + ' €.', () => {
  expect(contributionCadeauValide(montant,12,1)).toBe(true);
})


const tabMontants = [17,5,7];
test(' Test de la fonctions de calcul du montant total contribué pour un cadeau.\n Montants recoltés : ' + tabMontants, () => {
  expect(calculTotalRecolte(tabMontants)).toBe(17+5+7);
})

const name = 'presentCeremonie';
test('Test de la function de vérification du type de champ (checkbox ou non).\n Nom du champ du formulaire : ' + name, () => {
  expect(isCheckBox(name)).toBe(true)
})


const tabAge = [0,0,2,0,0,0,0,4,3,0,0];
test('Test de la function de nettoyage du tableau des âges des enfants (suppression des valeurs 0).\n Ages entrés : ' + tabAge, () => {
  expect(updateTableauAge(tabAge)).toStrictEqual([2,4,3])
})
