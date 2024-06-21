import Cookies from 'js-cookie';
import {GET,POST,PathImagen} from './connection';

export async function  get_productos(token){
    let datos = null;
    try {

        datos = await GET('producto',token);
    } catch (error) {
        console.log(error.response.data);
        return{"code": 500}
    }
    return datos.data;
    // TODO agarrar errores
}
export async function create_producto(data, token,searchParams) {
        try {
            return await POST(`${searchParams.lote}/registrar/produto`, data, token);
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    export async function create_producton(data, token, productoData) {
        console.log(productoData.lote);
        try {   
            return await POST(`${productoData.lote}/registrar/produto`, data, token);
        } catch (error) {
            console.error(error);
            return null;
        }
    }

export async function update_producto(data,params, token) {
        try {
            return await POST('producto/'+params.external, data, token);
        } catch (error) {
            console.error(error);
            return null;
        }
    }    


export async function get_estados(token){
    let datos = null;
    try {
        datos = await GET('/producto/listar_estados',token);
    } catch (error) {
        console.log(error.response.data);
        return{"code": 500}
    }
    return datos.data;
    // TODO agarrar errores
}    

export async function  get_producto(token,params){
    let datos = null;
    try {

        datos = await GET('producto/'+params.external,token);
    } catch (error) {
        console.log(error.response.data);
        return{"code": 500}
    }
    return datos.data;
    // TODO agarrar errores
}


export async function listar_productos_buenos( token) {
    try {
        return await GET('productos/buenos', token);
    } catch (error) {
        console.error(error);
        return null;    
    }
}
export async function listar_productos_caducados( token) {
    try {
        return await GET('producto/listar/caducados', token);
    } catch (error) {
        console.error(error);
        return null;
    }
}
export async function listar_productos_por_caducar( token) {
    try {
        return await GET('productos/por_caducar', token);
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function subir_imagen(params, token) {
    try {
        // Corrected the console.log syntax error
        console.log('external_id:', params.get('external_id'), 'Image:', params.get('imagen'));

        // Assuming POST is a function that can handle FormData directly
        // and 'producto/' + params.get('external_id') + '/subir_imagen' is the correct endpoint
        // No changes are needed for the POST function call itself, but ensure it can handle FormData
        return await POST('producto/' + params.get('external_id') + '/subir_imagen', params, token);
    } catch (error) {
        console.error(error);
        return null;
    }
}20
export async function cargar_imagen(imagen_producto) {
    
    try {
        // Ensure PathImagen is awaited if it's an async function
        const url = await PathImagen(imagen_producto);
        console.log('url:', url);
        return url;
    } catch (error) {
        console.error(error);
        // Handle the error appropriately
        return null;
    }
}