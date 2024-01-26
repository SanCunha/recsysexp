import React, { ReactNode, useState } from 'react';
import './infos.css'


import Experiment from '../experiment/experiment';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

interface LooseObject {
    [key: string]: string
}

function Infos(props: any) {
    const [contExps, set_contExps] = useState(1)
    const [exps, set_exps] = useState([{ "experiment": "Experiment-01" } as LooseObject])

    const handle_click = (e: any) => {
        props.display(props.components, e.target.value)
    }
    const change_cont = (operation: string) => {
        if (operation == "plus" && contExps < 3) {
            set_contExps(contExps + 1)
            set_exps([...exps, { experiment: `Experiment-0${contExps + 1}` }])
            // props.set_components({...props.components, [`experiment-0${contExps + 1}`]:<Experiment name={`Experiment-0${contExps + 1}`}/> })
        }
        if (operation == "minus" && contExps > 1) {
            set_contExps(contExps - 1)
            set_exps(() => exps.filter((_, index) => index !== contExps - 1));

            const new_components = props.components
            if (new_components["experiment-03"]) {
                delete new_components["experiment-03"]
            }
            else {
                if (props.components["experiment-02"]) delete new_components["experiment-02"]
            }
            props.set_components(new_components)

        }
    }

    const render_buttons = (): ReactNode => {
        const dict_buttons = {
            cluster_info: "Cluster Info",
            recipe_default: "Recipe Default",
            dependencies: "Dependencies"
        }
        const buttons: ReactNode[] = []
        Object.entries(dict_buttons).forEach(([key, value], index) => {
            buttons.push(<Button key={key} value={key} size='small' disableElevation onClick={handle_click}> {value}</Button>)
        })
        return buttons
    }
    const render_exps = (): ReactNode[] => {
        const exps_list: ReactNode[] = []
        let i = 0
        for (const exp of exps) {
            i++
            Object.entries(exp).forEach(([key, value], idx) => {
                exps_list.push(<Button key={`${key}-0${i}`} value={`${key}-0${i}`} size='small' disableElevation onClick={handle_click}> {value}</Button>)
            })
        }
        return exps_list
    }
    return (
        <>
            <Box component="form" sx={{ display: 'flex', alignItems: 'end', marginBottom: "5px", '& > :not(style)': { m: 0, width: '100%' }, }} noValidate autoComplete="off">
                <TextField id="standard-basic" label="Nº Experimentos" variant="standard" value={contExps} aria-readonly />
                <ButtonGroup orientation="vertical" aria-label="vertical contained button group" size="small" style={{ width: "20%" }}>
                    <Button key="plus" size='small' disableElevation onClick={(e) => change_cont("plus")} ><AddIcon /></Button>
                    <Button key="minus" size='small' disableElevation onClick={(e) => change_cont("minus")}><RemoveIcon /></Button>
                </ButtonGroup>
            </Box>
            <Box component="form" sx={{ '& > :not(style)': { m: 0, width: '100%' }, }} noValidate autoComplete="off">
                <ButtonGroup orientation="vertical" aria-label="vertical contained button group" size="small">
                    {render_buttons()}
                    {render_exps()}
                </ButtonGroup>
            </Box>
        </>
    );
}

export default Infos;