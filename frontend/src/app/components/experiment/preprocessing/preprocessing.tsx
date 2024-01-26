import React, { Dispatch, SetStateAction, useState } from 'react';
import { FormGroup, Typography } from '@mui/material';
import CustomComponent from '../custom_component';
import { Preprocessing, IExperiment, Instance } from '@/app/interfaces';
import { ConfigExp } from '../typed';



interface PreProcessingProps {
    idx: number
    preprocessing: Preprocessing
    set_preprocessing: Dispatch<SetStateAction<ConfigExp[]>>
    set_list: Dispatch<SetStateAction<ConfigExp[]>>
}

function PreProcessing(props: PreProcessingProps) {

    const handle_change = (key: string, target: any) => {
        let new_instances = props.preprocessing["parameters"]["instances"]
        const idx = props.preprocessing.parameters.instances.findIndex((e: any) => e.class_name == key.split("-")[0])

        new_instances[idx]["parameters"] = { ...props.preprocessing["parameters"]["instances"][idx]["parameters"], [key.split("-")[1]]: target }

        props.set_preprocessing((prevData) => {
            return [
                ...prevData.slice(0, props.idx),
                {
                    ...prevData[props.idx],
                    config: {
                        ...prevData[props.idx]["config"],
                        preprocessing: {
                            ...prevData[props.idx]["config"]["preprocessing"],
                            parameters: {
                                instances: new_instances,
                            },
                        },
                    },
                },
                ...prevData.slice(props.idx + 1),
            ];
        });
    }
    return (
        <div style={{ display: 'flex', alignItems: 'center', width: "100%" }}>
            <FormGroup style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', justifyContent: "space-evenly" }}>
                {props.preprocessing.parameters.instances.map((instance: Instance) => (
                    <CustomComponent idx={props.idx} key={instance["class_name"]} father="preprocessing" title={instance["class_name"]} parameters={instance["parameters"]} set_parameters={handle_change} checkbox={true} set_list={props.set_list} />
                ))}
            </FormGroup>
        </div>

    );;
}

export default PreProcessing;