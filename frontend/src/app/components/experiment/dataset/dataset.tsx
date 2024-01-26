import React, { Dispatch, SetStateAction, useState } from 'react';
import { FormGroup, Typography } from '@mui/material';
import CustomComponent from '../custom_component';
import { Dataset, IExperiment } from '@/app/interfaces';
import { ConfigExp } from '../typed';
import CsvUploader from './upload_dataset';
import SeletorArquivo from './test';
import Select from './select';

interface DatasetProps {
    idx: number
    dataset: Dataset
    set_dataset: Dispatch<SetStateAction<ConfigExp[]>>
    set_list: Dispatch<SetStateAction<ConfigExp[]>>
}

function Dataset(props: DatasetProps) {
    const [selectedComponent, setSelectedComponent] = useState<string>('select');

    const handle_change = (name: string) => {
        props.set_dataset((prevData) => {
            return [
                ...prevData.slice(0, props.idx),
                {
                    ...prevData[props.idx],
                    config: {
                        ...prevData[props.idx]["config"],
                        dataset: {
                            ...prevData[props.idx]["config"]["dataset"],
                            parameters: {
                                ...prevData[props.idx]["config"]["dataset"]["parameters"],
                                name,
                            },
                        },
                    },
                },
                ...prevData.slice(props.idx + 1),
            ];
        });
    }

    const handleComponentChange = (component: string) => {
        setSelectedComponent(component);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-around', width: "100%" }}>
            <div>
                <div>
                    <input
                        type="radio"
                        id="csvUploader"
                        value="csvUploader"
                        checked={selectedComponent === 'csvUploader'}
                        onChange={() => handleComponentChange('csvUploader')}
                    />
                    <label htmlFor="csvUploader">Upload CSV</label>
                </div>
                <div style={{ opacity: selectedComponent === 'csvUploader' ? 1 : 0.7 }}>
                    <CsvUploader onSelectChange={handle_change} />
                </div>

            </div>

            <div>


                <div>
                    <input
                        type="radio"
                        id="select"
                        value="select"
                        checked={selectedComponent === 'select'}
                        onChange={() => handleComponentChange('select')}
                    />
                    <label htmlFor="select">Load CSV</label>
                </div>

                <div style={{ opacity: selectedComponent === 'select' ? 1 : 0.7 }}>
                    <Select onSelectChange={handle_change} />
                </div>
            </div>
        </div>
    );
}

export default Dataset;

