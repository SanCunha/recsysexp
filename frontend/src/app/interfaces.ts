export interface Root {
    cluster_info: IClusterInfo
    experiment_dependencies: ExperimentDependency[]
    recipesDefault: IRecipesDefault
    experiments: IExperiment[]
  }
  
  export interface IClusterInfo {
    clusterName: string
    projectID: string
    clusterIp: string
  }
  
  export interface ExperimentDependency {
    id: string
    deps: string[]
  }
  
  export interface IRecipesDefault {
    database: string[]
    metafeatures: string[]
    metrics: string[]
    hybrid: string[]
    algorithms: string[]
    results: string[]
    folds: any[]
  }
  
  export interface IExperiment {
    experiment_id: string
    dataset: Dataset
    preprocessing: Preprocessing
    hybrid: Hybrid
    metrics: Metrics
    metafeatures: Metafeatures
    recommenders: Recommenders
    visualization: Visualization
    results: Results
    [key: string]: any;
  }
  
  export interface Dataset {
    class: string
    module: string
    parameters: Parameters
  }
  
  export interface Parameters {
    name: string
  }
  
  export interface Filters {}
  
  export interface Preprocessing {
    module: string
    class: string
    parameters: Parameters2
  }
  
  export interface Parameters2 {
    instances: Instance[]
  }
  
  export interface Instance {
    module: string
    class_name: string
    parameters: Parameters3
  }
  
  export interface Parameters3 {
    target?: string
    train_size?: number
    test_size?: number
    random_state?: number
    shuffle?: boolean
    stratify?: string
    target_column?: string
    folds?: number
    strategy?: string
    column_to_apply?: string
    remove_stop_words?: boolean
    tokenize_words?: boolean
    column_to_index?: string
  }
  
  export interface Hybrid {
    class: string
    module: string
    parameters: Parameters4
  }
  
  export interface Parameters4 {
    instances: Instance2[]
  }
  
  export interface Instance2 {
    module: string
    class_name: string
    parameters: Parameters5
  }
  
  export interface Parameters5 {}
  
  export interface Metrics {
    class: string
    module: string
    parameters: Parameters6
  }
  
  export interface Parameters6 {
    instances: Instance3[]
  }
  
  export interface Instance3 {
    module: string
    class_name: string
    parameters: Parameters7
  }
  
  export interface Parameters7 {
    sample_weight?: string
    squared?: boolean
    missing?: string
    labels?: string
    average?: string
    zero_division?: string
    multioutput?: string
    k?: string
    ignore_ties?: boolean
  }
  
  export interface Metafeatures {
    module: string
    class: string
    parameters: Parameters8
  }
  
  export interface Parameters8 {
    global: Global
    instances: Instance4[]
  }
  
  export interface Global {
    doUser: boolean
    doItem: boolean
    doItemUser: boolean
    basePath: string
    resourceFile: string
    partitionLength: number
    outputFolder: string
    bufferSize: number
    numThreads: number
    useTextOutput: boolean
  }
  
  export interface Instance4 {
    module: string
    class_name: string
    parameters: Parameters9
  }
  
  export interface Parameters9 {
    type: string
    basePath: string
    doUser: boolean
    doItem: boolean
    doItemUser: boolean
    numThreads: number
    metricParameter: MetricParameter
    fields: string[]
    items: Item[]
  }
  
  export interface MetricParameter {
    id?: string
    value?: string
  }
  
  export interface Item {
    dataFile: string
    resourceFile: string
    outputFolder: string
  }
  
  export interface Recommenders {
    class: string
    module: string
    parameters: Parameters10
  }
  
  export interface Parameters10 {
    number_of_recommendations: number
    instances: Instance5[]
  }
  
  export interface Instance5 {
    module: string
    class_name: string
    parameters: Parameters11
  }
  
  export interface Parameters11 {
    features: number
    iterations: number
  }
  
  export interface Visualization {
    class: string
    module: string
    parameters: Parameters12
  }
  
  export interface Parameters12 {
    instances: Instance6[]
  }
  
  export interface Instance6 {
    module: string
    class_name: string
    parameters: Parameters13
  }
  
  export interface Parameters13 {
    plot_types: PlotTypes
  }
  
  export interface PlotTypes {
    ratings_by_user: boolean
    ratings_by_item: boolean
    items_predict: boolean
    item_ratings_distribution: boolean
  }
  
  export interface Results {
    class: string
    module: string
    parameters: Parameters14
  }
  
  export interface Parameters14 {
    instances: Instance7[]
  }
  
  export interface Instance7 {
    module: string
    class_name: string
    parameters: Parameters15
  }
  
  export interface Parameters15 {
    axis?: number
    models?: string
    scale: string
    test?: string
    typ?: string
    robust?: string
    type?: string
    alpha?: number
    loc?: string
    sigma?: string
  }
  