import React, { Dispatch, SetStateAction, useState } from 'react';
import { FormGroup, Typography } from '@mui/material';
import CustomComponent from '../custom_component';
import { IExperiment, Results, Instance7 } from '@/app/interfaces';
import { ConfigExp } from '../typed';

interface ResultsProps {
    idx: number
    results: Results
    set_results: Dispatch<SetStateAction<ConfigExp[]>>
    set_list: Dispatch<SetStateAction<ConfigExp[]>>
}

function Results(props: ResultsProps) {

    const handle_change = (key: string, target: any) => {

        let new_instances = props.results["parameters"]["instances"]
        const idx = props.results.parameters.instances.findIndex((e: any) => e.class_name == key.split("-")[0])

        new_instances[idx]["parameters"] = { ...props.results["parameters"]["instances"][idx]["parameters"], [key.split("-")[1]]: target }

        props.set_results((prevData) => {
            return [
                ...prevData.slice(0, props.idx),
                {
                    ...prevData[props.idx],
                    config: {
                        ...prevData[props.idx]["config"],
                        results: {
                            ...prevData[props.idx]["config"]["results"],
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
                {props.results.parameters.instances.map((instance: Instance7) => (
                    <CustomComponent idx={props.idx} key={instance["class_name"]} father="results" title={instance["class_name"]} parameters={instance["parameters"]} set_parameters={handle_change} checkbox={true} set_list={props.set_list} />
                ))}
            </FormGroup>
        </div>

    );;
}

export default Results;