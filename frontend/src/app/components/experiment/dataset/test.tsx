import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CsvUploader from './upload_dataset';

const SeletorArquivo: React.FC = () => {
    const [opcoesSelect, setOpcoesSelect] = useState<string[]>([]);
    const [arquivoSelecionado, setArquivoSelecionado] = useState<File | null>(null);

    useEffect(() => {
        let configAxios = {

            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:5000/listar_pastas',
            headers: {}

        };

        console.log(configAxios);

        axios.request(configAxios)
            .then((response) => {
                console.log(response.data)
                setOpcoesSelect(response.data.datasets)
            })
            .catch((error) => {
                console.error('Erro ao obter opções do servidor:', error)
            });
        return () => console.log("Select Povoado")
    }, []);

    const handleSelecionarArquivo = (event: React.ChangeEvent<HTMLInputElement>) => {
        const arquivo = event.target.files?.[0] || null;
        setArquivoSelecionado(arquivo);
    };

    const handleUploadArquivo = () => {
        // Lógica para enviar o arquivo para o servidor (pode ser adicionada aqui)
        console.log('Arquivo enviado:', arquivoSelecionado);
    };

    const handleSelecionarOpcao = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const opcaoSelecionada = event.target.value;
        // Lógica para lidar com a opção selecionada (pode ser adicionada aqui)
        console.log('Opção selecionada:', opcaoSelecionada);
    };

    return (
        <div style={{ display: 'flex', justifyContent: "space-around", width: "100%" }}>
            {/* Seção à esquerda */}
            {/* <div style={{ marginRight: '20px' }}>
                <h2>Seleção de Arquivo</h2>
                <input type="file" onChange={handleSelecionarArquivo} />
                <button onClick={handleUploadArquivo} disabled={!arquivoSelecionado}>Upload</button>
            </div> */}
            <CsvUploader />

            {/* Seção à direita */}
            <div>
                <h2>Seleção no Select</h2>
                <select onChange={handleSelecionarOpcao}>
                    <option value={opcoesSelect[0]}>{opcoesSelect[0]}</option>
                    {opcoesSelect.map(opcao => (
                        <option key={opcao} value={opcao}>{opcao}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default SeletorArquivo;
