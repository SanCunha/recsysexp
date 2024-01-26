import React, { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


type Data = Record<string, string[]>;


const data = {
    "database": ["MovieLens"],
    "metafeatures": ["PCR", "PR", "GINI", "PEARSON", "PQMEAN", "SD"],
    "metrics": ["RMSE", "F1", "EPC", "EILD"],
    "hybrid": ["STREAM", "FWLS"],
    "algorithms": ["Sigmoid", "Biased", "MF", "Uknn", "SVD", "Latent", "Factor", "BiPolar", "SO"],
    "results": ["mean", "IC"],
    "folds": []
} as Data

function RecipeDefault(props: { recipe: Dispatch<SetStateAction<Data>> }) {



    const [selectedItems, setSelectedItems] = useState<Record<string, Record<string, boolean>>>({});

    const handleCheckboxChange = (category: string, item: string) => {
        setSelectedItems((prevSelectedItems) => ({
            ...prevSelectedItems,
            [category]: {
                ...(prevSelectedItems[category] || {}),
                [item]: !prevSelectedItems[category]?.[item],
            },
        }));
    };

    useEffect(() => {
        props.recipe(formatSelectedItems());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedItems, props.recipe]);

    const formatSelectedItems = () => {
        const finalItems = {
            "database": [],
            "metafeatures": [],
            "metrics": [],
            "hybrid": [],
            "algorithms": [],
            "results": [],
            "folds": []
        } as Data

        Object.entries(selectedItems).forEach(([key, obj]) => {
            Object.entries(obj).forEach(([key_obj, value]) => {
                if (value) finalItems[key].push(key_obj)
            })
        })
        return finalItems
    }
    return (
        <div>
            <h2 style={{ textAlign: "center" }}>Recipe Defaults</h2>
            {Object.entries(data).map(([category, items]) => (
                <div key={category} style={{ display: "flex", flexDirection: "column", alignItems: "center", borderBottom: "1px solid #bcab8a" }}>
                    <h3 style={{ fontWeight: "bold" }}>{category}</h3>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly", width: '100%' }}>
                        {items.map((item) => (
                            <label key={item}>
                                <input
                                    type="checkbox"
                                    checked={selectedItems[category]?.[item] || false}
                                    onChange={() => handleCheckboxChange(category, item)}
                                />
                                {item}
                            </label>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default RecipeDefault;