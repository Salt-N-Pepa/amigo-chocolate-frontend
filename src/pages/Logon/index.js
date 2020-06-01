import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import biscoito from '../../assets/biscoito.png';

export default function Logon() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        const data = {
            email,
            senha,
        };

        try {
            const response = await api.post('login', data);

            localStorage.setItem('apelido', response.data.user.apelido);
            localStorage.setItem('token', response.data.token);

            history.push('/profile')
        } catch (err) {
            alert('Falha no LOGIN tente novamente');
        }
    }

    return (
        <div className="logon-container">
            <section className="form">

                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>
    
                    <input
                        placeholder="Seu email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        placeholder="Senha"
                        type="password"
                        value={senha}
                        onChange={e => setSenha(e.target.value)}
                    />
    
                    <button className="button" type="submit">Entrar</button>
    
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#7c3b0c"/>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={biscoito} alt="biscoito" />
        </div>
    )
}

