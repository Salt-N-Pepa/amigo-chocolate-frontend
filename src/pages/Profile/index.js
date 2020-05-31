import React, { useState, useEffect } from 'react';
import { link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

import respect from '../../assets/pressf.jpg';

export default function Profile() {
    const apelido = localStorage.getItem('apelido')

    return (
        <div className="profile-container">
            <header>
                <span>Bem vindo(a), {apelido}</span>
            </header>
            <h1>Infelizmente esta pagina ainda não existe</h1>

            <img src={respect} alt="respect" />

        </div>


    )
}