const API_HOST = 'https://stephanieetnicolasmars2021.com'

export async function getCadeaux(){
  const response = await fetch(API_HOST + "/api/cadeaux?page=1");
  if(response.ok){
    const result = await response.json()
    console.log(result)

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

export async function putCadeau(idCadeau, body){
const response = await fetch(API_HOST + '/api/cadeaux/' + idCadeau, {
  method: 'PUT',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: body
});
if(response.ok){
  return true;
 }else{
   return false;
 }
}

export async function putInvite(idInvite, body){
  const response = await fetch(API_HOST + '/api/invites/' + idInvite, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: body
  });

  if(response.ok){
    return true;
   }else{
     return false;
   }
  }

export async function deleteCadeau(idCadeau){
  const response = await fetch(API_HOST + '/api/cadeaux/' + idCadeau, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  });

  if(response.ok){
     return true;
   }else{
     return false
   }
  }


export async function deleteInvite(idInvite){
  const response = await fetch(API_HOST + '/api/invites/' + idInvite, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  });

  if(response.ok){
     return true;
   }else{
     return false;
   }
  }

export async function postInvite(body){
  const response = await fetch(API_HOST + '/api/invites', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: body
  });

 if(response.ok){
    return true;
  }else{
    return false;
  }
}

export async function postCadeau(body){
  const response = await  fetch(API_HOST + '/api/cadeaux', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: body
  });

  if(response.ok){
    return true;
   }else{
     return false;
   }
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
