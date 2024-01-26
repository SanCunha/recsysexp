import React, { Dispatch, SetStateAction, useState } from 'react';
import { FormGroup, Typography } from '@mui/material';
import CustomComponent from '../custom_component';
import { IExperiment, Recommenders, Instance4, Instance5 } from '@/app/interfaces';
import { ConfigExp } from '../typed';

interface RecommendersProps {
    idx: number
    recommenders: Recommenders
    set_recommenders: Dispatch<SetStateAction<ConfigExp[]>>
    set_list: Dispatch<SetStateAction<ConfigExp[]>>
}

function Recommenders(props: RecommendersProps) {

    const handle_change_instances = (key: string, target: any) => {

        let new_instances = props.recommenders["parameters"]["instances"]
        const idx = props.recommenders.parameters.instances.findIndex((e: any) => e.class_name == key.split("-")[0])

        new_instances[idx]["parameters"] = { ...props.recommenders["parameters"]["instances"][idx]["parameters"], [key.split("-")[1]]: target }

        props.set_recommenders((prevData) => {
            return [
                ...prevData.slice(0, props.idx),
                {
                    ...prevData[props.idx],
                    config: {
                        ...prevData[props.idx]["config"],
                        recommenders: {
                            ...prevData[props.idx]["config"]["recommenders"],
                            parameters: {
                                ...prevData[props.idx]["config"]["recommenders"]["parameters"],
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
        props.set_recommenders((prevData) => {
            return [
                ...prevData.slice(0, props.idx),
                {
                    ...prevData[props.idx],
                    config: {
                        ...prevData[props.idx]["config"],
                        recommenders: {
                            ...prevData[props.idx]["config"]["recommenders"],
                            parameters: {
                                ...prevData[props.idx]["config"]["recommenders"]["parameters"],
                                number_of_recommendations: target
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
                {<CustomComponent idx={props.idx} key="number_of_recommendations" father="recommenders" title="number_of_recommendations" parameters={{ number_of_recommendations: props.recommenders.parameters.number_of_recommendations }} set_parameters={handle_change_global} checkbox={false} set_list={props.set_list} />}

                {props.recommenders.parameters.instances.map((instance: Instance5) => (
                    <CustomComponent idx={props.idx} key={instance["class_name"]} father="recommenders" title={instance["class_name"]} parameters={instance["parameters"]} set_parameters={handle_change_instances} checkbox={true} set_list={props.set_list} />
                ))}
            </FormGroup>
        </div>

    );;
}

export default Recommenders;