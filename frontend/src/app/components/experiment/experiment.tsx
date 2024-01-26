import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

import Dataset from './dataset/dataset';
import PreProcessing from './preprocessing/preprocessing';
import { IExperiment } from '@/app/interfaces';
import Hybrid from './hybrid/hybrid';
import Metrics from './metrics/metrics';
import Visualization from './visualization/visualization';
import Metafeatures from './metafeatures/metafeatures';
import Recommenders from './recommenders/recommenders';
import Results from './results/results';
import Collapsible from './collapsible';
import { ConfigExp } from './typed';

interface ExperimentProps {
  idx: number
  experiment: IExperiment
  set_experiment: Dispatch<SetStateAction<ConfigExp[]>>
}

function Experiment(props: ExperimentProps) {
  return (
    <>
      <Collapsible title="Dataset" component={<Dataset idx={props.idx} dataset={props.experiment["dataset"]} set_dataset={props.set_experiment} set_list={props.set_experiment} />} />
      <Collapsible title="PreProcessing" component={<PreProcessing idx={props.idx} preprocessing={props.experiment["preprocessing"]} set_preprocessing={props.set_experiment} set_list={props.set_experiment} />} />
      <Collapsible title="Hybrid" component={<Hybrid idx={props.idx} hybrid={props.experiment["hybrid"]} set_hybrid={props.set_experiment} set_list={props.set_experiment} />} />
      <Collapsible title="Metrics" component={<Metrics idx={props.idx} metrics={props.experiment["metrics"]} set_metrics={props.set_experiment} set_list={props.set_experiment} />} />
      <Collapsible title="Metafeatures" component={<Metafeatures idx={props.idx} metafeatures={props.experiment["metafeatures"]} set_metafeatures={props.set_experiment} set_list={props.set_experiment} />} />
      <Collapsible title="Recommenders" component={<Recommenders idx={props.idx} recommenders={props.experiment["recommenders"]} set_recommenders={props.set_experiment} set_list={props.set_experiment} />} />
      <Collapsible title="Visualization" component={<Visualization idx={props.idx} visualization={props.experiment["visualization"]} set_visualization={props.set_experiment} set_list={props.set_experiment} />} />
      <Collapsible title="Results" component={<Results idx={props.idx} results={props.experiment["results"]} set_results={props.set_experiment} set_list={props.set_experiment} />} />
      {/* <PreProcessing preprocessing={props.experiment["preprocessing"]} set_preprocessing={props.set_experiment} set_list={props.set_experiment} />
      <Hybrid hybrid={props.experiment["hybrid"]} set_hybrid={props.set_experiment} set_list={props.set_experiment} />
      <Metrics metrics={props.experiment["metrics"]} set_metrics={props.set_experiment} set_list={props.set_experiment} />
      <Metafeatures metafeatures={props.experiment["metafeatures"]} set_metafeatures={props.set_experiment} set_list={props.set_experiment} />
      <Recommenders recommenders={props.experiment["recommenders"]} set_recommenders={props.set_experiment} set_list={props.set_experiment} />
      <Visualization visualization={props.experiment["visualization"]} set_visualization={props.set_experiment} set_list={props.set_experiment} />
      <Results results={props.experiment["results"]} set_results={props.set_experiment} set_list={props.set_experiment} /> */}
    </>
  )
}

export default Experiment;