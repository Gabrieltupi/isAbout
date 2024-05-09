async function fazerRequisicao(url,method='GET', body=null, headers={}){

    try{
        const response=await fetch(url,{
            method,
            headers: { 'Content-type':'application/json', ...headers},
            body: body ? JSON.stringify(body):null,
        });
        if(!response.ok){
            throw new Error(`Erro ao fazer a requisição: ${response.status}`)
        }
        return await response.json();

    } catch (error){
        console.error('Ocorreu um erro:',error);
        throw error;
    }

}
export default fazerRequisicao