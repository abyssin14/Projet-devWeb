const API_HOST = 'http://localhost:8000'

export async function getCadeaux(){
  const response = await fetch(API_HOST + "/api/cadeaux?page=1");
  if(response.ok){
    const result = await response.json()
    return(result);
  }
}

export async  function getInvites(){
  const response = await fetch(API_HOST + "/api/invites");
  if(response.ok){
    const result = await response.json()
    return(result);
  }
}

export function putCadeau(idCadeau, body){
fetch(API_HOST + '/api/cadeaux/' + idCadeau, {
                          method: 'PUT',
                          headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                          },
                          body: body
                        })
}

export function postInvite(body){
  fetch(API_HOST + '/api/invites', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: body
  })
}

/*export function findAcheteurId(nom, prenom){

const response = await fetch(API_HOST + "/api/invites");
if(response.ok){
  const result = await response.json()
  result.find();
  return(result);
}
}
}*/
