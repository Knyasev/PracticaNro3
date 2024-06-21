import Cookies from 'js-cookie';
import {GET,POST} from './connection';

export async function  get_lotes(token){
    let datos = null;
    try {

        datos = await GET('lote',token);
    } catch (error) {
        console.log(error.response.data);
        return{"code": 500}
    }
    return datos.data;
    // TODO agarrar errores
}
export async function create_lote(data, token) {
        try {
            return await POST('registrar/lote', data, token);
        } catch (error) {
            console.error(error);
            return null;
        }
    }

export async function update_lote(data,params, token) {
        try {
            return await POST('lote/'+params.external, data, token);
        } catch (error) {
            console.error(error);
            return null;
        }
    }    

export async function get_tiposP(token){
    let datos = null;
    try {
        datos = await GET('listar_tiposP',token);
    } catch (error) {
        console.log(error.response.data);
        return{"code": 500}
    }
    return datos.data;
    // TODO agarrar errores
}    

export async function  get_lote(token,params){
    let datos = null;
    try {

        datos = await GET('lote/'+params,token);
    } catch (error) {
        console.log(error.response.data);
        return{"code": 500}
    }
    return datos.data;
    // TODO agarrar errores
}
