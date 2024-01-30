import React, { Dispatch, SetStateAction, useState } from 'react';

import { FormControlLabel, Checkbox, Typography, Radio, Grid, Switch, TextField } from '@mui/material';
import { styled } from '@mui/system';
import { IExperiment } from '@/app/interfaces';

const MyForm = styled('form')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
}));

type Data = Record<string, string[]>;

type ConfigExp = {
    config: IExperiment,
    checkeds: Data
}

interface CustomComponentProps {
    idx: number
    father: string
    title: string
    parameters: Record<string, any>
    set_parameters: (key: string, target: any) => void
    checkbox: boolean
    // set_list: Dispatch<SetStateAction<Record<string, string[]>>>
    set_list: Dispatch<SetStateAction<ConfigExp[]>>
}
function CustomComponent(props: CustomComponentProps) {
    const mount_form = (key: string, value: any) => {
        const value_type = typeof value;

        switch (value_type) {
            case "string":
            case "number":
                return (
                    <TextField
                        label={key}
                        value={value}
                        onChange={(e) => props.set_parameters(`${props.title}-${key}`, e.target.value)}
                        fullWidth
                        style={{ marginBottom: "5px" }}
                    />
                );
            case "boolean":
                // if (){
                //     return (
                //         <FormControlLabel
                //             control={
                //                 <Switch
                //                     key={`${props.title}-${key}`}
                //                     checked={value}
                //                     onChange={(e) => props.set_parameters(`${props.title}-${key}`, e.target.checked)}
                //                 />
                //             }
                //             label={key}
                //         />
                //     );
                // } else {
                //     return (
                //         <FormControlLabel
                //             control={
                //                 <Switch
                //                     key={`${props.title}-${key}`}
                //                     checked={value}
                //                     onChange={(e) => props.set_parameters(`${props.title}-${key}`, e.target.checked)}
                //                 />
                //             }
                //             label={key}
                //         />
                //     );
                // }
                console.log(props)
                return (
                    <FormControlLabel
                        control={
                            <Switch
                                key={`${props.title}-${key}`}
                                checked={value}
                                onChange={(e) => props.set_parameters(`${props.title}-${key}`, e.target.checked)}
                            />
                        }
                        label={key}
                    />
                );

            default:
                return (
                    <div>
                        {Object.entries(value).map(([nestedKey, nestedValue]) => (
                            <div key={nestedKey}>
                                {mount_form(`${key}.${nestedKey}`, nestedValue)}
                            </div>
                        ))}
                    </div>
                );
        }
    };

    // const handle_checkbox = (key: string, value: boolean) => {
    // if (value) {
    //     props.set_list(prevState => ({
    //         ...prevState,
    //         [props.father]: [...prevState[props.father], key],
    //     }));
    // } else {
    //         props.set_list(prevState => ({
    //             ...prevState,
    //             [props.father]: prevState[props.father].filter(existingItem => existingItem !== key),
    //         }));
    //     }

    // }
    const handle_checkbox = (key: string, value: boolean) => {
        if (value) {
            console.log(props.idx)
            console.log(props.father)
            props.set_list((prevData) => {
                return [
                    ...prevData.slice(0, props.idx),
                    {
                        ...prevData[props.idx],
                        checkeds: {
                            ...prevData[props.idx]["checkeds"],
                            [props.father]: [...prevData[props.idx]["checkeds"][props.father], key]
                        }
                    },
                    ...prevData.slice(props.idx + 1),
                ];
            });
        } else {
            props.set_list((prevData) => {
                return [
                    ...prevData.slice(0, props.idx),
                    {
                        ...prevData[props.idx],
                        checkeds: {
                            ...prevData[props.idx]["checkeds"],
                            [props.father]: prevData[props.idx]["checkeds"][props.father].filter(existingItem => existingItem !== key)
                        }
                    },
                    ...prevData.slice(props.idx + 1),
                ];
            });
        }
        // props.set_list((prevData) => {
        //     return [
        //         ...prevData.slice(0, props.idx),
        //         {
        //             ...prevData[props.idx],
        //             config: {
        //                 ...prevData[props.idx]["config"],
        //                 preprocessing: {
        //                     ...prevData[props.idx]["config"]["preprocessing"],
        //                     parameters: {
        //                         instances: new_instances,
        //                     },
        //                 },
        //             },
        //         },
        //         ...prevData.slice(props.idx + 1),
        //     ];
        // });
    }


    return (
        <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid #ccc', padding: '5px', maxWidth: '400px', margin: "1px" }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">{props.title}</Typography>
                <FormControlLabel control={props.checkbox ? <Checkbox onChange={(e) => handle_checkbox(props.title, e.target.checked)} /> : <Radio checked={true} />} label="" />
            </div>
            <MyForm>
                {
                    Object.entries(props.parameters).map(([key, value]) => (
                        <Grid item xs={12} sm={6} key={key}>
                            {mount_form(key, value)}
                        </Grid>
                    ))
                }
            </MyForm>
        </div>
    );
};
export default CustomComponent;