//nspage
'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Link from "next/link";
import Menu from "../components/menu";
import { get_lotes } from "@/hooks/Services_lote";
import middleware from '../components/mildware';
 function Lote() {
    const [lotes, setlotes] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const token = Cookies.get('token');
        if (!isLoaded) {
            get_lotes(token).then((info) => {
                if (info.code == '200') {
                    setlotes(info.datos);
                    console.log(info.datos);
                } else {
                    console.log(info.datos.error);
                    
                }
                setIsLoaded(true);
            });
        }
    }, [isLoaded]);

    return (
        <div>
            <Menu />
            <main className="container text-center mt-5 " style={{paddingLeft:"300px"}}>
            <div className="col-4">
    <Link href="/lote/new" legacyBehavior>
        <a className="btn btn-info" style={{ margin: "15px", marginRight: "265px" }}>Nuevo Lote</a>
    </Link>
</div>
                <div className="container-fluid">
                    <table className="table table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>Nro</th>
                                <th>Nombre</th>
                                <th>Codigo</th>
                                <th>Tipo de producto</th>
                                <th>Cantidad</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lotes && lotes.map((dato, i) => (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{dato.nombre}</td>
                                    <td>{dato.codigo}</td>
                                    <td>{dato.tipo_prdt}</td> {/* Assuming 'tipoProducto' is the correct attribute */}
                                    <td>{dato.cantidad}</td> {/* Assuming 'cantidad' is the correct attribute */}
                                    <td>
                                        <Link href={'/lote/' + dato.external_id}> {/* Assuming 'id' is the correct attribute for editing */}
                                            <a className="btn btn-primary">Editar</a>
                                        </Link>
                                        <Link href={`/producto/new?lote=${dato.external_id}`}> {/* Assuming 'id' is the correct attribute for editing */}
                                            <a className="btn btn-primary">Seleccionar</a>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}
export default middleware(Lote); // Assuming this is the correct way to export the component