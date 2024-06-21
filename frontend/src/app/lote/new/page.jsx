'use client';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { POST } from '@/hooks/connection.js';
import swal from 'sweetalert';
import Cookies from 'js-cookie';
import Menu from '@/app/components/menu';
import { create_lote ,get_tiposP} from '@/hooks/Services_lote'
import { useRouter } from 'next/navigation';
import {useState} from 'react';

export default function New() {
    const router = useRouter();
    let [estado, setEstado] = useState(null);
    let [tiposProducto, settiposProducto] = useState(null);
    let token = Cookies.get('token');

    if (!estado) {
        get_tiposP(token).then((info) => {
            if (info.code == '200') {
                settiposProducto(info.datos);
                console.log(info.datos);
            }else {
                settiposProducto([]);
            }
        });
        setEstado(true);

    }
    const validationSchema = Yup.object().shape({
        codigo: Yup.string().trim().required('El nombre es requerido'),
        nombre: Yup.string().trim().required('El apellido es requerido'),
        fecha_entrada: Yup.date().required('La fecha de nacimiento es requerida'),
        tipo_prdt: Yup.string().trim().required('El estado civil es requerido'),
        cantidad : Yup.number().required('La cantidad es requerida')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, formState } = useForm(formOptions);
    let { errors } = formState;
    let persona_id = Cookies.get('external_id'); // Asumiendo que guardas el external del usuario en una cookie
    const sendInfo = async (data) => {
        console.log(data);
        // Convertir la fecha de entrada a un objeto Date
        const fecha = new Date(data.fecha_entrada);
        // Construir la fecha formateada manualmente
        const formattedDate = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}-${String(fecha.getDate()).padStart(2, '0')}`;
        // Asegurarse de que todos los campos necesarios están incluidos
        const loteData = {
            persona_id: persona_id, // Asegurarse de que este campo se obtiene correctamente
            fecha_entrada: formattedDate, // Usar la fecha formateada
            codigo: data.codigo,
            nombre: data.nombre,
            tipo_prdt: data.tipo_prdt,
            cantidad: data.cantidad
        };
        console.log(loteData); // Verificar los datos antes de enviar
        const info = await create_lote(loteData, token);
        console.log(info.code);
        if (info.status == '200') {
            swal({
                title: "Registro exitoso",
                text: "Lote registrado correctamente",
                icon: "success",
                button: "Aceptar",
                timer: 4000,
                closeOnEsc: true,
            });
            router.push('/lote');
        } else {
            swal({
                title: "Error",
                text:  "Error desconocido",
                icon: "error",
                button: "Aceptar",
                timer: 4000,
                closeOnEsc: true,
            });
        }
    };
    
    return (
    <div className="container text-center mt-5" style={{ width: "40%", border: "2px solid black", padding: "20px", borderRadius: "15px", margin: "auto" }}> 
        <form onSubmit={handleSubmit(sendInfo)} className="form-signin">
            <div className="mb-3">
                <label className="form-label">Código:</label>
                <input type="text" {...register('codigo')} name="codigo" placeholder="Código del lote" className="form-control"/>
                {errors.codigo && <div>{errors.codigo?.message}</div>}
            </div>
            <div className="mb-3">
                <label className="form-label">Nombre:</label>
                <input type="text" {...register('nombre')} name="nombre" placeholder="Nombre del lote" className="form-control"/>
                {errors.nombre && <div>{errors.nombre?.message}</div>}
            </div>
            <div className="mb-3">
                <label className="form-label">Fecha de Entrada:</label>
                <input type="date" {...register('fecha_entrada')} name="fecha_entrada" className="form-control"/>
                {errors.fecha_entrada && <div>{errors.fecha_entrada?.message}</div>}
            </div>
            <div className="mb-3">
                <label className="form-label">Tipo de Producto:</label>
                <select name="tipo_prdt" {...register('tipo_prdt')} className="form-control">
                    <option value="">Selecciona...</option>
                    {tiposProducto && tiposProducto.map((tipo, index) => (
                        <option key={index} value={tipo.toLowerCase()}>{tipo}</option>
                    ))}
                </select>
                {errors.tipo_prdt && <div>{errors.tipo_prdt?.message}</div>}
            </div>
            <div className="mb-3">
                <label className="form-label">Cantidad:</label>
                <input type="number" {...register('cantidad')} name="cantidad" placeholder="Cantidad" className="form-control"/>
                {errors.cantidad && <div>{errors.cantidad?.message}</div>}
            </div>
            <button type="submit" className="w-100 btn btn-sm btn-primary">Registrar Lote</button>
        </form> 
    </div>
)
}