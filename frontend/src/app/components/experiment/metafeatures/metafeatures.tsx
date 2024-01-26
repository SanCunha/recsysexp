import React, { Dispatch, SetStateAction, useState } from 'react';
import { FormGroup, Typography } from '@mui/material';
import CustomComponent from '../custom_component';
import { IExperiment, Metafeatures, Instance4 } from '@/app/interfaces';
import { ConfigExp } from '../typed';

interface MetafeaturesProps {
    idx: number
    metafeatures: Metafeatures
    set_metafeatures: Dispatch<SetStateAction<ConfigExp[]>>
    set_list: Dispatch<SetStateAction<ConfigExp[]>>
}

function Metafeatures(props: MetafeaturesProps) {

    const handle_change_instances = (key: string, target: any) => {

        let new_instances = props.metafeatures["parameters"]["instances"]
        const idx = props.metafeatures.parameters.instances.findIndex((e: any) => e.class_name == key.split("-")[0])

        new_instances[idx]["parameters"] = { ...props.metafeatures["parameters"]["instances"][idx]["parameters"], [key.split("-")[1]]: target }

        props.set_metafeatures((prevData) => {
            return [
                ...prevData.slice(0, props.idx),
                {
                    ...prevData[props.idx],
                    config: {
                        ...prevData[props.idx]["config"],
                        metafeatures: {
                            ...prevData[props.idx]["config"]["metafeatures"],
                            parameters: {
                                ...prevData[props.idx]["config"]["metafeatures"]["parameters"],
                                instances: new_instances,
                            },
                        },
                    },
                },
                ...prevData.slice(props.idx + 1),
            ];
        });
    }

    const handle_change_global = (key: string, target: any) => {

        props.set_metafeatures((prevData) => {
            return [
                ...prevData.slice(0, props.idx),
                {
                    ...prevData[props.idx],
                    config: {
                        ...prevData[props.idx]["config"],
                        metafeatures: {
                            ...prevData[props.idx]["config"]["metafeatures"],
                            parameters: {
                                ...prevData[props.idx]["config"]["metafeatures"]["parameters"],
                                global: {
                                    ...prevData[props.idx]["config"]["metafeatures"]["parameters"]["global"],
                                    [key.split("-")[1]]: target
                                }
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
                {<CustomComponent idx={props.idx} key="global" father="metafeatures" title="global" parameters={props.metafeatures.parameters.global} set_parameters={handle_change_global} checkbox={false} set_list={props.set_list} />}

                {props.metafeatures.parameters.instances.map((instance: Instance4) => (
                    <CustomComponent idx={props.idx} key={instance["class_name"]} father="metafeatures" title={instance["class_name"]} parameters={instance["parameters"]} set_parameters={handle_change_instances} checkbox={true} set_list={props.set_list} />
                ))}
            </FormGroup>
        </div>

    );;
}

export default Metafeatures;