import axios from "axios";
import { useEffect, useState } from "react";

interface SelectProps {
    onSelectChange: (name: string) => void;
}

const Select: React.FC<SelectProps> = ({ onSelectChange }) => {
    const [opcoesSelect, setOpcoesSelect] = useState<string[]>([]);

    useEffect(() => {
        let configAxios = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:5000/listar_pastas',
            headers: {}
        };

        axios
            .request(configAxios)
            .then((response) => {
                setOpcoesSelect(response.data.datasets);
            })
            .catch((error) => {
                console.error('Erro ao obter opções do servidor:', error);
            });
    }, []);

    const handleSelecionarOpcao = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const opcaoSelecionada = event.target.value;
        onSelectChange(opcaoSelecionada); // Chame a função fornecida pela propriedade onSelectChange
    };

    return (
        <div>
            <h2>Seleção no Select</h2>
            <select onChange={handleSelecionarOpcao}>
                {opcoesSelect.map((opcao) => (
                    <option key={opcao} value={opcao}>
                        {opcao}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;