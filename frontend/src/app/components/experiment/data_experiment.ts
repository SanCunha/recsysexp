export const data_experiments = {
        "experiment_id": "exp1",
        "dataset": {
          "class": "MovieLens",
          "module": "src.data.movielens",
          "parameters": {
            "proportion": "ml-latest-small",
            "filters": {
  
            }
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
                  "folds": 5,
                  "shuffle": false,
                  "random_state": 42,
                  "strategy": "stratifiedshufflesplit"
                }
              },
              {
                "module": "src.preprocessing.text",
                "class_name": "TextProcessing",
                "parameters": {
                  "apply_on": "genres",
                  "remove_stop_words": true,
                  "tokenize_words": true,
                  "tf_idf": true,
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
              "partitionLength":  1,
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
                    "1", "2", "3"
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
                  "damping":  5,
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
              },
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
      }