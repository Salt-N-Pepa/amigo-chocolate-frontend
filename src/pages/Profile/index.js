import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

export default function Profile() {
    const [pessoa, setPessoa] = useState([]);

    const imagem = localStorage.getItem('imagem');
    const apelido = localStorage.getItem('apelido');
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');

    useEffect(() => {
        api.get(`pessoa/${id}`, {
            headers: {
                Authorization: token,
            }
        }).then(response => {
            console.log(response.data)
            setPessoa(response.data);
        })
    }, [token], [id])

    return (
        <div className="profile-container">

            <div className="content">

                <section>
                    <Link className="back-link" to="/home">
                        <FiArrowLeft size={16} color="#541919" />
                        Voltar para home
                    </Link>
                    <Link to="/AtualizarAvatar">
                        <img src={imagem} alt="avatar" />
                    </Link>
                        <h1>"{apelido}"</h1>
                </section>

                <ul>
                    <li>
                        <strong>Nome:</strong>
                        <p>{`${pessoa.nome} ${pessoa.sobrenome}`}</p>
                    </li>
                    <li>
                        <strong>Email:</strong>
                        <p>{pessoa.email}</p>
                    </li>
                    <li>
                        <strong>Lista de Desejos</strong>
                        <p>Cacau Doce</p>
                    </li>
                    <li>
                        <Link className="button" to="/atualizar">Atualizar perfil</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}