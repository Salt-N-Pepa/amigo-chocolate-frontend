import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api';
import './styles.css';

export default function Register () {
    const [nome, setNome] = useState('');
    const [sobrenome, setSobreNome] = useState('');
    const [apelido, setApelido] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            nome,
            sobrenome,
            apelido,
            email,
            senha,
        };

        try {
            
            const response = await api.post('pessoa', data);

            alert(`Seu registro foi realizado com sucesso ${response.data.retornoPessoa.apelido}`)

            history.push('/');
        } catch (err) {
            alert('Erro no cadastro, tente novamente.');
        }

    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <h1>Cadastro</h1>
                    <p>Faça o seu cadastro e entre nessa banheira de Nutella</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Já possuo cadastro
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input
                        placeholder="Nome"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                    />
                    <input
                        placeholder="Sobrenome"
                        value={sobrenome}
                        onChange={e => setSobreNome(e.target.value)}
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
                        placeholder="Senha"
                        type="password"
                        value={senha}
                        onChange={e => setSenha(e.target.value)}
                    />

                    <button className="button"  type="submit">Cadastrar</button>

                </form>
            </div>
        </div>
    )
}