import { useContext, useEffect, useState } from "react";
import { DNA } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";

import { buscar } from "../../../services/Service";
import Treino from "../../../models/Treino";
import CardTreino from "../cardtreino/CardTreino";

function ListaTreinos() {  

    const navigate = useNavigate();

    const [treinos, setTreinos] = useState<Treino[]>([]);  

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    async function buscarTreinos() {  
        try {
            await buscar('/postagens', setTreinos, {  
                headers: { Authorization: token }
            });
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout();
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado!');
            navigate('/');
        }
    }, [token]);

    useEffect(() => {
        buscarTreinos();  
    }, [treinos.length]);

    return (
        <>
        {treinos.length === 0 && (
            <DNA
            visible={true}
            height="200"
            width="200"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper mx-auto"
        />
        )}
            <div className="flex justify-center w-full my-4">
                <div className="container flex flex-col">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                       {treinos.map((treino) => (  
                            <CardTreino key={treino.id} treino={treino} />  
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ListaTreinos;
