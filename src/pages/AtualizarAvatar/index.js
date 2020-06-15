import React, { useCallback,useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDropzone  } from 'react-dropzone'
import { FiArrowLeft, FiUpload } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

export default function AtualizarAvatar() {
    const [selectedFileUrl, setSelectedFileUrl] = useState('');
    const [selectedFile, setSelectedFile] = useState();


    const history = useHistory();

    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];

        const fileUrl = URL.createObjectURL(file);

        console.log(file);
        
        setSelectedFile(file);
        setSelectedFileUrl(fileUrl);
    }, [])

    const {getRootProps, getInputProps} = useDropzone({
        onDrop,
        accept: 'image/*'
    })

    async function handleNewAvatar(e) {
        e.preventDefault();

        const data = new FormData();

            data.append('imagem', selectedFile);

        try {

            await api.put(`pessoa/change/${id}`, data, {
                headers: {
                    Authorization: token,
                }
            })

            history.push('/Atualizar')
        } catch (err) {
            alert('Erro ao atualizar foto de perfil')
        }
   }
    return (
        <div className="new-group-container">
        <div className="content">   
            
            <h1>Atualizar perfil</h1>
            <br />

            <div className="dropzone" {...getRootProps()}>
            <input {...getInputProps()} accepted="image/*"/>

            { selectedFileUrl
                ? <img src={selectedFileUrl} alt="avatar" />
                : (
                    <p>
                        <FiUpload />
                        Imagem de avatar
                    </p>
                )
            }

            <button className="button" onClick={handleNewAvatar} >Atualizar</button>
            </div>

            <Link className="back-link" to="/profile"> 
                <FiArrowLeft size={16} color="#541919" />
                Voltar para o seu perfil
            </Link>

        </div>
    </div>
    )
}