
export type Data = Record<string, string[]>;
export type ConfigExp = {
    config: IExperiment,
    checkeds: Data
  }

export type Dependencies = {
    "id": string,
    "deps": []
}