import React, { Dispatch, SetStateAction, useState } from 'react';
import { FormGroup, Typography } from '@mui/material';
import CustomComponent from '../custom_component';
import { IExperiment, Metrics, Instance3 } from '@/app/interfaces';
import { ConfigExp } from '../typed';

interface MetricsProps {
    idx: number,
    metrics: Metrics
    set_metrics: Dispatch<SetStateAction<ConfigExp[]>>
    set_list: Dispatch<SetStateAction<ConfigExp[]>>
}

function Metrics(props: MetricsProps) {

    const handle_change = (key: string, target: any) => {

        let new_instances = props.metrics["parameters"]["instances"]
        const idx = props.metrics.parameters.instances.findIndex((e: any) => e.class_name == key.split("-")[0])

        new_instances[idx]["parameters"] = { ...props.metrics["parameters"]["instances"][idx]["parameters"], [key.split("-")[1]]: target }
        props.set_metrics((prevData) => {
            return [
                ...prevData.slice(0, props.idx),
                {
                    ...prevData[props.idx],
                    config: {
                        ...prevData[props.idx]["config"],
                        metrics: {
                            ...prevData[props.idx]["config"]["metrics"],
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
                {props.metrics.parameters.instances.map((instance: Instance3) => (
                    <CustomComponent idx={props.idx} key={instance["class_name"]} father="metrics" title={instance["class_name"]} parameters={instance["parameters"]} set_parameters={handle_change} checkbox={true} set_list={props.set_list} />
                ))}
            </FormGroup>
        </div>

    );;
}

export default Metrics;