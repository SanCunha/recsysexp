import React, { Dispatch, SetStateAction, useState } from 'react';
import { FormGroup, Typography } from '@mui/material';
import CustomComponent from '../custom_component';
import { IExperiment, Instance, Hybrid } from '@/app/interfaces';
import { ConfigExp } from '../typed';

interface HybridProps {
    idx: number
    hybrid: Hybrid
    set_hybrid: Dispatch<SetStateAction<ConfigExp[]>>
    set_list: Dispatch<SetStateAction<ConfigExp[]>>
}

function Hybrid(props: HybridProps) {

    const handle_change = (key: string, target: any) => {

        let new_instances = props.hybrid["parameters"]["instances"]
        const idx = props.hybrid.parameters.instances.findIndex((e: any) => e.class_name == key.split("-")[0])

        new_instances[idx]["parameters"] = { ...props.hybrid["parameters"]["instances"][idx]["parameters"], [key.split("-")[1]]: target }

        // props.set_hybrid((prevSections: IExperiment) => ({
        //     ...prevSections,
        //     "hybrid": {
        //         ...prevSections["hybrid"],
        //         "parameters": {
        //             instances: new_instances
        //         }
        //     }

        // }));
        props.set_hybrid((prevData) => {
            return [
                ...prevData.slice(0, props.idx),
                {
                    ...prevData[props.idx],
                    config: {
                        ...prevData[props.idx]["config"],
                        hybrid: {
                            ...prevData[props.idx]["config"]["hybrid"],
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
                {props.hybrid.parameters.instances.map((instance: Instance) => (
                    <CustomComponent
                        idx={props.idx}
                        key={instance["class_name"]}
                        father="hybrid"
                        title={instance["class_name"]}
                        parameters={instance["parameters"]}
                        set_parameters={handle_change}
                        checkbox={true}
                        set_list={props.set_list}
                    />
                ))}
            </FormGroup>
        </div>

    );;
}

export default Hybrid;