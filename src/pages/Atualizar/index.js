import React, { useCallback,useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDropzone  } from 'react-dropzone'
import { FiArrowLeft, FiUpload } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

export default function Atualizar() {

    const [nome, setNome] = useState();
    const [apelido, setApelido] = useState();
    const [email, setEmail] = useState();
    const [listaDesejos, setListaDesejos] = useState();

    const history = useHistory();

    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');

    async function handleEditPerfil(e) {
        e.preventDefault();

        const data = {
            nome,
            apelido,
            email,
            listaDesejos
        }


        try {
            await api.put(`pessoa/${id}`, data, {
                headers: {
                    Authorization: token,
                }
            })

            history.push('/profile')
        } catch (err) {
            alert('Erro ao cadastrar caso, tente novametne');
        }
    }

    return (
        <div className="new-group-container">
        <div className="content">
        <section>
            
            
            <h1>Atualizar perfil</h1>
            <br />            

            <Link className="back-link" to="/profile"> 
                <FiArrowLeft size={16} color="#541919" />
                Voltar para o seu perfil
            </Link>

        </section>

        <form onSubmit={handleEditPerfil}>
            <input
                placeholder="Nome"
                value={nome}
                onChange={e => setNome(e.target.value)}
            />
            <input
                placeholder="Apelido"
                value={apelido}
                onChange={e => setApelido(e.target.value)}
            />
          
            <input
                placeholder="E-mail"
                value={email}
                onChange={e => setEmail(e.target.value)}
                
            />
            <input
                placeholder="Lista de desejos"
                value={listaDesejos}
                onChange={e => setListaDesejos(e.target.value)}

            />
            
            <button className="button" type="submit">Cadastrar</button>

        </form>
        </div>
    </div>
    )
}