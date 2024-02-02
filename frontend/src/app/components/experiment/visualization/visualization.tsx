import React, { Dispatch, SetStateAction, useState } from 'react';
import { FormGroup, Typography } from '@mui/material';
import CustomComponent from '../custom_component';
import { IExperiment, Visualization, Instance6 } from '@/app/interfaces';
import { ConfigExp } from '../typed';

interface VisualizationProps {
    idx: number
    visualization: Visualization
    set_visualization: Dispatch<SetStateAction<ConfigExp[]>>
    set_list: Dispatch<SetStateAction<ConfigExp[]>>
}

function Visualization(props: VisualizationProps) {

    const handle_change = (key: string, target: any) => {
        let new_instances = props.visualization["parameters"]["instances"]
        const idx = props.visualization.parameters.instances.findIndex((e: any) => e.class_name == key.split("-")[0])

        new_instances[idx]["parameters"]["plot_types"] = { ...props.visualization["parameters"]["instances"][idx]["parameters"]["plot_types"], [key.split("-")[1]]: target }

        props.set_visualization((prevData) => {
            return [
                ...prevData.slice(0, props.idx),
                {
                    ...prevData[props.idx],
                    config: {
                        ...prevData[props.idx]["config"],
                        visualization: {
                            ...prevData[props.idx]["config"]["visualization"],
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
                {props.visualization.parameters.instances.map((instance: Instance6) => (
                    <CustomComponent idx={props.idx} key={instance["class_name"]} father="visualization" title={instance["class_name"]} parameters={instance["parameters"]["plot_types"]} set_parameters={handle_change} checkbox={true} set_list={props.set_list} />
                ))}
            </FormGroup>
        </div>

    );;
}

export default Visualization;