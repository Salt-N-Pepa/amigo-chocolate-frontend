import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logo from '../../assets/logo.svg';

export default function Home() {
    const [ grupos, setGrupos] = useState([]);
    const history = useHistory();

    const token = localStorage.getItem('token');
    const apelido = localStorage.getItem('apelido');
    const imagem = localStorage.getItem('imagem');

    useEffect(() => {
        api.get('grupo', {
            headers: {
                Authorization: token,
            }
        }).then(response => {
            console.log(response.data)
            setGrupos(response.data);
        })
    }, [token])


    async function handleDeleteGrupo(id) {
        try {
            await api.delete(`grupo/${id}`, {
                headers: {
                    Authorization: token,
                }
            });
            
            setGrupos(grupos.filter(grupo => grupo._id !== id))
            
            
        } catch (err) {
            alert('Erro ao deletar caso, tente novamente');
        }
    }

    async function isAuthorized () {
        if(!token) {
            alert("Você não tem permissão para acessar essa função");
        }
    }

    async function handleLogout () {
        localStorage.clear();

        history.push('/')
    }

    async function handleNewFriend (id, apelido) {
        try {
            await api.post(`grupo/${id}/${apelido}`, {}, {
                headers: {
                    Authorization: token,
                }
            });

            alert('Vocês foi cadastrado(a) com sucesso')
            
        } catch (err) {
            alert('Erro ao cadastrar no grupo');
        }
    }
    

    return (
        <div className="home-container">
            <header>
                <div className="avatar-container">
                    <Link to="/profile">
                        <img src={imagem} alt="avatar"/>
                    </Link>
                </div>
                <span>Bem vindo(a), {apelido}</span>

                <Link className="button" onClick={isAuthorized} to="/newgroup">Criar novo grupo</Link>
                <button onClick={handleLogout} type="button"> 
                    <FiPower size={18} color="#541919"/>
                </button>
            </header>

            <h1>Grupos cadastrados</h1>

            <ul>
                {grupos.map(grupo => (
                    <li key={grupo._id}>
                    <strong>Grupo</strong>
                    <p>{grupo.nome}</p>

                    <strong>VALOR MINIMO</strong>
                    <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(grupo.valorMinimo)}</p>

                    <strong>ADMINISTRADOR</strong>
                    <p>{grupo.apelido_admin}</p>

                    <strong>Participantes</strong>
                    {grupo.members.map(member => (
                        <img src={member.imagem} alt="avatar"/>
                    ))}

                
                    <Link className="button" onClick={() => handleNewFriend(grupo._id, apelido)} to="/profile">Participar do Grupo</Link>

                    {
                        apelido === grupo.apelido_admin ? 
                        <button onClick={() => handleDeleteGrupo(grupo._id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button> : ''
                    }
                    
                </li>
                ))}
            </ul>
        </div>


    )
}

