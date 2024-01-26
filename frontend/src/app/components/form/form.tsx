import { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';


import ClusterInfo from "../cluster_info/cluster_info";
import Experiment from "../experiment/experiment";

import { IClusterInfo } from "@/app/interfaces";
import { IExperiment } from "@/app/interfaces";

import Collapsible from "../experiment/collapsible";
import { ConfigExp, Data, Dependencies } from "../experiment/typed";
import axios from "axios";

interface ClusterFields {
    name: string,
    value: string,
    label: string,
    onChange: () => void
}

function Form() {

    const [data, setData] = useState({}); // Initialize with empty object
    const [responseMessage, setResponseMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    const [cluster, set_cluster] = useState({
        clusterName: "",
        projectID: "",
        clusterIp: "",
    } as IClusterInfo)

    const [dependencies, set_dependencies] = useState<Dependencies[]>([{
        "id": "Experiment 01",
        "deps": []
    }])

    const [recipe, set_recipe] = useState<Data>({
        "database": [],
        "preprocessing": [],
        "metafeatures": [],
        "metrics": [],
        "hybrid": [],
        "recommenders": [],
        "results": [],
        "visualization": []
    })

    const [experiments, set_experiments] = useState<ConfigExp[]>([{
        config: {
            "experiment_id": "Recipe Defaults",
            "dataset": {
                "class": "GeneralDataset",
                "module": "src.data.general_dataset",
                "parameters": {
                    "name": "movielens"
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
                            "module": "src.recommenders.item_knn",
                            "class_name": "ItemKNN",
                            "parameters": {
                                "maxNumberNeighbors": 20,
                                "minNumberNeighbors": 4,
                                "saveNeighbors": 6.0,
                                "feedback": "implicit",
                                "aggregate": "weighted-average",
                                "use_ratings": true
                            }
                        },
                        {
                            "module": "src.recommenders.user_knn",
                            "class_name": "UserKNN",
                            "parameters": {
                                "maxNumberNeighbors": 12,
                                "minNumberNeighbors": 4,
                                "min_sim": 0.3,
                                "feedback": "implicit",
                                "aggregate": "weighted-average",
                                "use_ratings": true
                            }
                        },
                        {
                            "module": "src.recommenders.pop_score",
                            "class_name": "PopScore",
                            "parameters": {
                                "score_method": "quantile"
                            }
                        },
                        {
                            "module": "src.recommenders.biasedSVD",
                            "class_name": "BiasedSVD",
                            "parameters": {
                                "damping": 5,
                                "iterations": 20,
                                "features": 10,
                                "bias": true
                            }
                        },
                        {
                            "module": "src.recommenders.scikit_svd",
                            "class_name": "ScikitSVD",
                            "parameters": {
                                "features": 20,
                                "damping": 5
                            }
                        },
                        {
                            "module": "src.recommenders.implicit_mf",
                            "class_name": "ImplicitMF",
                            "parameters": {
                                "features": 20,
                                "iterations": 20
                            }
                        },
                        {
                            "module": "src.recommenders.content_based_recommender",
                            "class_name": "ContentBasedRecommender",
                            "parameters": {
                                "feature": "title",
                                "count_items": 15
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
                                    "ratings_by_movie": true,
                                    "items_predict": true,
                                    "movie_ratings_distribution": true
                                }
                            }
                        },
                        {
                            "module": "src.visualization.static_bar",
                            "class_name": "StaticBar",
                            "parameters": {
                                "plot_types": {
                                    "ratings_by_user": true,
                                    "ratings_by_movie": true,
                                    "items_predict": true,
                                    "movie_ratings_distribution": true
                                }
                            }
                        },
                        {
                            "module": "src.visualization.interactive_bar",
                            "class_name": "InteractiveBar",
                            "parameters": {
                                "plot_types": {
                                    "ratings_by_user": true,
                                    "ratings_by_movie": true,
                                    "items_predict": true,
                                    "movie_ratings_distribution": true
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
    }, {
        config: {
            "experiment_id": "exp1",
            "dataset": {
                "class": "GeneralDataset",
                "module": "src.data.general_dataset",
                "parameters": {
                    "name": "movielens"
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
                            "module": "src.recommenders.item_knn",
                            "class_name": "ItemKNN",
                            "parameters": {
                                "maxNumberNeighbors": 20,
                                "minNumberNeighbors": 4,
                                "saveNeighbors": 6.0,
                                "feedback": "implicit",
                                "aggregate": "weighted-average",
                                "use_ratings": true
                            }
                        },
                        {
                            "module": "src.recommenders.user_knn",
                            "class_name": "UserKNN",
                            "parameters": {
                                "maxNumberNeighbors": 12,
                                "minNumberNeighbors": 4,
                                "min_sim": 0.3,
                                "feedback": "implicit",
                                "aggregate": "weighted-average",
                                "use_ratings": true
                            }
                        },
                        {
                            "module": "src.recommenders.pop_score",
                            "class_name": "PopScore",
                            "parameters": {
                                "score_method": "quantile"
                            }
                        },
                        {
                            "module": "src.recommenders.biasedSVD",
                            "class_name": "BiasedSVD",
                            "parameters": {
                                "damping": 5,
                                "iterations": 20,
                                "features": 10,
                                "bias": true
                            }
                        },
                        {
                            "module": "src.recommenders.scikit_svd",
                            "class_name": "ScikitSVD",
                            "parameters": {
                                "features": 20,
                                "damping": 5
                            }
                        },
                        {
                            "module": "src.recommenders.implicit_mf",
                            "class_name": "ImplicitMF",
                            "parameters": {
                                "features": 20,
                                "iterations": 20
                            }
                        },
                        {
                            "module": "src.recommenders.content_based_recommender",
                            "class_name": "ContentBasedRecommender",
                            "parameters": {
                                "feature": "title",
                                "count_items": 15
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
                                    "ratings_by_movie": true,
                                    "items_predict": true,
                                    "movie_ratings_distribution": true
                                }
                            }
                        },
                        {
                            "module": "src.visualization.static_bar",
                            "class_name": "StaticBar",
                            "parameters": {
                                "plot_types": {
                                    "ratings_by_user": true,
                                    "ratings_by_movie": true,
                                    "items_predict": true,
                                    "movie_ratings_distribution": true
                                }
                            }
                        },
                        {
                            "module": "src.visualization.interactive_bar",
                            "class_name": "InteractiveBar",
                            "parameters": {
                                "plot_types": {
                                    "ratings_by_user": true,
                                    "ratings_by_movie": true,
                                    "items_predict": true,
                                    "movie_ratings_distribution": true
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
    }])

    const [config, set_config] = useState({
        cluster_info: cluster,
        experiment_dependencies: dependencies as Dependencies[],
        recipesDefault: recipe,
        experiments: [] as (IExperiment | undefined)[]
    })

    const clusterChange = (e: any) => {
        const { name, value } = e.target;
        set_cluster((cluster) => ({
            ...cluster,
            [name]: value,
        }));
    };
    const generateClusterFields = () => {
        return [
            {
                name: "clusterName",
                value: cluster["clusterName"],
                label: "Cluster Name",
                onChange: clusterChange
            },
            {
                name: "clusterIp",
                value: cluster["clusterIp"],
                label: "Cluster IP",
                onChange: clusterChange
            },
            {
                name: "projectID",
                value: cluster["projectID"],
                label: "Project ID",
                onChange: clusterChange
            }
        ] as ClusterFields[]
    }

    const [open, setOpen] = useState(false);

    const format_experiment = (experiment: IExperiment, checkboxes: Data) => {
        const intersection = Object.keys(checkboxes).reduce((acc, category) => {
            const selectedCheckboxes = checkboxes[category];
            const categoryInstances = experiment[category]?.parameters?.instances || [];
            const selectedInstances = categoryInstances.filter((instance: { [x: string]: string; }) => selectedCheckboxes.includes(instance['class_name']));
            return { ...acc, [category]: selectedInstances };
        }, {} as Record<string, any[]>);

        const config_file = {
            ...experiment,
            preprocessing: {
                ...experiment["preprocessing"],
                parameters: {
                    instances: intersection["preprocessing"]
                }
            },
            hybrid: {
                ...experiment["hybrid"],
                parameters: {
                    instances: intersection["hybrid"]
                }
            },
            metrics: {
                ...experiment["metrics"],
                parameters: {
                    instances: intersection["metrics"]
                }
            },
            metafeatures: {
                ...experiment["metafeatures"],
                parameters: {
                    ...experiment["metafeatures"]["parameters"],
                    instances: intersection["metafeatures"]
                }
            },
            recommenders: {
                ...experiment["recommenders"],
                parameters: {
                    ...experiment["recommenders"]["parameters"],
                    instances: intersection["recommenders"]
                }
            },

            visualization: {
                ...experiment["visualization"],
                parameters: {
                    instances: intersection["visualization"]
                }
            },

            results: {
                ...experiment["results"],
                parameters: {
                    instances: intersection["results"]
                }
            }


        }

        return config_file as IExperiment
    }

    const handleOpen = () => {
        let final_experiments = experiments.map((experiment, idx) => {
            if (idx != 0) {
                return format_experiment(experiment.config, experiment.checkeds)
            }
        }).slice(1)
        if (final_experiments) {
            final_experiments.map((aux, idx) => {
                Object.entries(experiments[0]["checkeds"]).map(([key, value]) => {
                    if (key != "dataset") {
                        value.map((parameter) => {
                            if (aux && !aux[key]["parameters"]["instances"].find((e: any) => e.class_name == parameter)) {
                                aux[key]["parameters"]["instances"].push(experiments[0]["config"][key]["parameters"]["instances"].filter((e: any) => e.class_name == parameter))
                            }
                        })
                    }
                })
            })
        }

        set_config({
            cluster_info: cluster,
            experiment_dependencies: dependencies,
            recipesDefault: experiments[0]["checkeds"],
            experiments: final_experiments || []

        })
        setOpen(true);
    };

    const handleClose = () => {

        let configAxios = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:5000/run',
            headers: {
                'Content-Type': 'application/json'
            },
            responseType: 'arraybuffer' as const,  // Explicitly specify the type
            data: config
        };

        console.log(configAxios);

        axios.request(configAxios)
            .then((response) => {
                setData(response.data); // Store the response data in state
                setResponseMessage('POST request successful');

                // Create a Blob from the response data
                const blob = new Blob([response.data], { type: 'application/zip' });

                // Create a temporary download link and trigger the download
                const downloadLink = document.createElement('a');
                downloadLink.href = window.URL.createObjectURL(blob);
                downloadLink.download = 'downloaded-file.zip';
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);


            })
            .catch((error) => {
                setErrorMessage('Error in POST request: ' + error.message);
            });
        setOpen(false); // Close the modal or perform any other necessary actions
    };
    return (
        <>
            {/* <ClusterInfo fields={generateClusterFields()} /> */}
            {experiments.map((experiment, idx) => idx != experiments.length - 1 ? (
                <Collapsible key={idx} header={true} title={experiment["config"]["experiment_id"]} component={<Experiment idx={idx} experiment={experiment["config"]} set_experiment={set_experiments} />} />

            ) : (<Collapsible key={idx} header={true} experiment={true} set_experiment={set_experiments} set_dependencies={set_dependencies} title={experiment["config"]["experiment_id"]} component={<Experiment idx={idx} experiment={experiment["config"]} set_experiment={set_experiments} />} />))}
            <Button variant="contained" style={{ backgroundColor: "#212529" }} onClick={handleOpen}>
                Run!
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Config File</DialogTitle>
                <DialogContent>
                    <pre>{JSON.stringify(config["experiments"], null, 2)}</pre>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
            <div>
                <p>{responseMessage}</p>
                <p>{errorMessage}</p>
            </div>
        </>
    )
}
export default Form;