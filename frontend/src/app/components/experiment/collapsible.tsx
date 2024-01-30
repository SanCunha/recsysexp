import React, { Dispatch, SetStateAction, useState } from 'react';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { ConfigExp, Data, Dependencies } from './typed';
import { IExperiment } from '@/app/interfaces';

interface CollapsibleProps {
    title: string;
    component: React.ReactNode;
    header?: boolean
    experiment?: boolean
    set_experiment?: Dispatch<SetStateAction<ConfigExp[]>>
    set_dependencies?: Dispatch<SetStateAction<Dependencies[]>>
}

const Collapsible: React.FC<CollapsibleProps> = ({ title, component, header = false, experiment = false, set_experiment = () => { }, set_dependencies = () => { } }) => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const handleToggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const [recipe, set_recipe] = useState<Data>({
        "database": [],
        "preprocessing": [],
        "metafeatures": [],
        "metrics": [],
        "hybrid": [],
        "algorithms": [],
        "results": [],
        "folds": []
    })

    const handleButtonClick = (action: string) => {
        if (action == '+') {
            set_experiment((prevData) => {
                return [...prevData, {
                    config: {
                        "experiment_id": `Experiment 0${prevData.length}`,
                        "dataset": {
                            "class": "GeneralDataset",
                            "module": "src.data.general_dataset",
                            "parameters": {
                                "name": "MovieLens"
                            }
                        },
                        "preprocessing": {
                            "module": "src.preprocessing.preprocessing_container",
                            "class": "PreProcessingContainer",
                            "parameters": {
                                "instances": [
                                    {
                                        "module": "src.preprocessing.split",
                                        "class_name": "SplitProcessing",
                                        "parameters": {
                                            "target": "rating",
                                            "train_size": 70,
                                            "test_size": 30,
                                            "random_state": 42,
                                            "shuffle": true,
                                            "stratify": ""
                                        }
                                    },
                                    {
                                        "module": "src.preprocessing.folds",
                                        "class_name": "FoldsProcessing",
                                        "parameters": {
                                            "target_column": "rating",
                                            "folds": 1,
                                            "shuffle": false,
                                            "random_state": 42,
                                            "strategy": "stratifiedshufflesplit"
                                        }
                                    },
                                    {
                                        "module": "src.preprocessing.text",
                                        "class_name": "TextProcessing",
                                        "parameters": {
                                            "column_to_apply": "genres",
                                            "remove_stop_words": true,
                                            "tokenize_words": true,
                                            "column_to_index": "title"
                                        }
                                    }
                                ]
                            }
                        },
                        "hybrid": {
                            "class": "HybridContainer",
                            "module": "src.hybrid.hybrid_container",
                            "parameters": {
                                "instances": [
                                    {
                                        "module": "src.hybrid.flws",
                                        "class_name": "Flws",
                                        "parameters": {
                                        }
                                    },
                                    {
                                        "module": "src.hybrid.stream",
                                        "class_name": "Stream",
                                        "parameters": {
                                        }
                                    }
                                ]
                            }
                        },
                        "metrics": {
                            "class": "MetricsContainer",
                            "module": "src.metrics.metrics_container",
                            "parameters": {
                                "instances": [
                                    {
                                        "module": "src.metrics.rmse",
                                        "class_name": "RMSE",
                                        "parameters": {
                                            "sample_weight": "None",
                                            "squared": true,
                                            "missing": "error"
                                        }
                                    },
                                    {
                                        "module": "src.metrics.recall",
                                        "class_name": "Recall",
                                        "parameters": {
                                            "labels": "None",
                                            "average": "binary",
                                            "sample_weight": "None",
                                            "zero_division": "warn"
                                        }
                                    },
                                    {
                                        "module": "src.metrics.mae",
                                        "class_name": "MAE",
                                        "parameters": {
                                            "multioutput": "uniform_average"
                                        }
                                    },
                                    {
                                        "module": "src.metrics.ndcg",
                                        "class_name": "NDCG",
                                        "parameters": {
                                            "k": "None",
                                            "sample_weight": "None",
                                            "ignore_ties": false
                                        }
                                    }
                                ]
                            }
                        },
                        "metafeatures": {
                            "module": "src.metafeatures.metafeatures_container",
                            "class": "MetaFeatureContainer",
                            "parameters": {
                                "global": {
                                    "doUser": true,
                                    "doItem": true,
                                    "doItemUser": true,
                                    "basePath": "",
                                    "resourceFile": "",
                                    "partitionLength": 1,
                                    "outputFolder": "",
                                    "bufferSize": 1000,
                                    "numThreads": 0,
                                    "useTextOutput": true
                                },
                                "instances": [
                                    {
                                        "module": "src.metafeatures.jaccard",
                                        "class_name": "Jaccard",
                                        "parameters": {
                                            "type": "content-based",
                                            "basePath": "",
                                            "doUser": true,
                                            "doItem": false,
                                            "doItemUser": false,
                                            "numThreads": 0,
                                            "metricParameter": {
                                                "id": "",
                                                "value": ""
                                            },
                                            "fields": [
                                                "1",
                                                "2",
                                                "3"
                                            ],
                                            "items": []
                                        }
                                    },
                                    {
                                        "module": "src.metafeatures.gini",
                                        "class_name": "Gini",
                                        "parameters": {
                                            "type": "collaborative",
                                            "basePath": "",
                                            "doUser": true,
                                            "doItem": false,
                                            "doItemUser": false,
                                            "numThreads": 0,
                                            "metricParameter": {},
                                            "items": [
                                                {
                                                    "dataFile": "",
                                                    "resourceFile": "",
                                                    "outputFolder": ""
                                                }
                                            ],
                                            "fields": []
                                        }
                                    }
                                ]
                            }
                        },
                        "recommenders": {
                            "class": "RecommendersContainer",
                            "module": "src.recommenders.recommenders_container",
                            "parameters": {
                                "number_of_recommendations": 10,
                                "instances": [
                                    {
                                        "module": "src.recommenders.implicit_mf",
                                        "class_name": "LenskitImplicitMF",
                                        "parameters": {
                                            "features": 20,
                                            "iterations": 30
                                        }
                                    }
                                ]
                            }
                        },
                        "visualization": {
                            "class": "VisualizationContainer",
                            "module": "src.visualization.visualization_container",
                            "parameters": {
                                "instances": [
                                    {
                                        "module": "src.visualization.static_scatter",
                                        "class_name": "StaticScatter",
                                        "parameters": {
                                            "plot_types": {
                                                "ratings_by_user": true,
                                                "ratings_by_item": true,
                                                "items_predict": true,
                                                "item_ratings_distribution": true
                                            }
                                        }
                                    },
                                    {
                                        "module": "src.visualization.static_bar",
                                        "class_name": "StaticBar",
                                        "parameters": {
                                            "plot_types": {
                                                "ratings_by_user": true,
                                                "ratings_by_item": true,
                                                "items_predict": true,
                                                "item_ratings_distribution": true
                                            }
                                        }
                                    },
                                    {
                                        "module": "src.visualization.interactive_bar",
                                        "class_name": "InteractiveBar",
                                        "parameters": {
                                            "plot_types": {
                                                "ratings_by_user": true,
                                                "ratings_by_item": true,
                                                "items_predict": true,
                                                "item_ratings_distribution": true
                                            }
                                        }
                                    }
                                ]
                            }
                        },
                        "results": {
                            "class": "ResultsContainer",
                            "module": "src.results.results_container",
                            "parameters": {
                                "instances": [
                                    {
                                        "module": "src.results.anova",
                                        "class_name": "ANOVA",
                                        "parameters": {
                                            "axis": 0,
                                            "models": "",
                                            "scale": "None",
                                            "test": "",
                                            "typ": "1",
                                            "robust": ""
                                        }
                                    },
                                    {
                                        "module": "src.results.confidence_interval",
                                        "class_name": "ConfidenceInterval",
                                        "parameters": {
                                            "type": "norm",
                                            "alpha": 0.9,
                                            "loc": "mean",
                                            "scale": "",
                                            "sigma": ""
                                        }
                                    }
                                ]
                            }
                        }
                    } as IExperiment, checkeds: recipe
                }]
            })
            set_dependencies((prevData) => {
                return [...prevData, { id: `Experiment 0${prevData.length + 1}`, deps: [] } as Dependencies]
            })
        }
        else {
            set_experiment((prevData) => {
                return prevData.length > 2 ? [...prevData.slice(0, prevData.length - 1)] : prevData

            })
            set_dependencies((prevData) => {
                return [...prevData.slice(0, prevData.length - 1)]
            })

        }

    };

    const backgroundColor = header ? "#595959" : "#808080";
    const display = title == "Recipe Defaults" ? "none" : "flex"
    const new_title = title == "exp1" ? "Experiment" : title

    return (
        <div style={{ display, flexDirection: "column", alignItems: 'center', width: '100%' }}>
            <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: backgroundColor }}>

                {/* <div style={{ display: experiment ? "flex" : "none", alignItems: "center" }}>
                    <IconButton onClick={() => handleButtonClick('+')}>
                        +
                    </IconButton>
                    <IconButton onClick={() => handleButtonClick('-')}>
                        -
                    </IconButton>
                </div> */}
                <Typography variant="h5">
                    {new_title}
                </Typography>
                <IconButton onClick={handleToggleCollapse}>
                    <ArrowDropDownIcon />
                </IconButton>
            </div>

            <Collapse in={!isCollapsed} style={{ width: "100%" }}>
                {component}
            </Collapse>
        </div>
    );
};


export default Collapsible;
