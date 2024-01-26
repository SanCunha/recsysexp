import axios, { AxiosRequestConfig } from 'axios';
import React, { useEffect, useState } from 'react';
import CSVReader, { CSVReaderProps } from 'react-csv-reader';
import FormData from 'form-data';
import fs from 'fs';

import stream from 'stream';



interface CsvUploaderProps {
    onSelectChange: (name: string) => void;
}

const CsvUploader: React.FC<CsvUploaderProps> = ({ onSelectChange }) => {
    const [arquivoSelecionado, setArquivoSelecionado] = useState<File | null>(null);

    const handleSelecionarArquivo = (event: React.ChangeEvent<HTMLInputElement>) => {
        const arquivo = event.target.files?.[0] || null;
        setArquivoSelecionado(arquivo);
        if (arquivo)
            onSelectChange(arquivo.name.split('.')[0])
    };

    const handleUploadArquivo = () => {
        if (!arquivoSelecionado) {
            console.error('Nenhum arquivo selecionado.');
            return;
        }

        const data = new FormData();
        data.append('file', arquivoSelecionado);

        const config: AxiosRequestConfig = {
            method: 'post',
            url: 'http://localhost:5000/upload',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            data: data,
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });

        console.log('Arquivo enviado:', arquivoSelecionado);
    };

    return (
        <div>
            <div style={{ marginRight: '20px' }}>
                <h2>Seleção de Arquivo</h2>
                <input type="file" onChange={handleSelecionarArquivo} />
                <button onClick={handleUploadArquivo} disabled={!arquivoSelecionado}>Upload</button>
            </div>
        </div>
    );
};

// return (
//     <div>
//         {/* <CSVReader
//             onFileLoaded={handleCsvUpload}
//             parserOptions={{
//                 header: true,
//                 dynamicTyping: true,
//                 skipEmptyLines: true
//             }}
//         /> */}
//         {/* <button onClick={handleVisualizeClick}>Visualize CSV</button> */}
//         <div style={{ marginRight: '20px' }}>
//             <h2>Seleção de Arquivo</h2>
//             <input type="file" onChange={handleSelecionarArquivo} />
//             <button onClick={handleUploadArquivo} disabled={!arquivoSelecionado}>Upload</button>
//         </div>
//     </div>
// );
// };

export default CsvUploader;
