import sys

sys.path.insert(0, "/home/san-cunha/Desktop/Desktop/UFOP/MonoII/RecSysExp-main")

from src.data.loader import Loader
from src.tasks.task import Task
from src.experiments.experiment_handler import ExperimentHandler
from src.utils import (
    hrf_experiment_output_path,
    check_if_directory_exists,
    create_directory,
)


class DatasetTask(Task):
    def __init__(self, dataset):
        """

        @param dataset:
        """
        self.dataset_instance = dataset
        self.experiment_output_dir = hrf_experiment_output_path()

    def check_args(self, args):
        pass

    def run(self):
        """
        Essa função irá realizar todos os processos definidos para o conjunto de dados
        a partir do arquivo de configuração

        @return:
        """
        self.dataset_instance.run()
        # dataset = self._handle_operations_dataset(self.dataset_instance)
        # return dataset

    def _handle_operations_dataset(self, dataset):
        """

        @param dataset:
        @return:
        """
        dataset = dataset.apply_filters()
        return dataset

    # def run_dataset_task():
    # loader = Loader()
    # config_obj = loader.load_json_file("config.json")

    # experiments = config_obj["experiments"]

    # exp_handler = ExperimentHandler(experiments=experiments)

    # experiment = exp_handler.get_experiment("exp1")
    # print(experiment)
    # experiment_instances = experiment.instances

    # dataset_instance = experiment_instances["datasets"]

    # dataset_task = DatasetTask(dataset_instance)

    # print("\n")
    # print(" => Iniciando a execução da tarefa dos datasets")

    # dataset_result = dataset_task.run()
    # print(dataset_result)
    # dataset_experiment_dir = hrf_experiment_output_path().joinpath("datasets/")

    # is_dataset_dir_exists = check_if_directory_exists(dataset_experiment_dir)

    # if is_dataset_dir_exists is False:
    #     create_directory(hrf_experiment_output_path(), "datasets")

    # path_to_save_ratings = hrf_experiment_output_path().joinpath(
    #     "datasets/new_ratings_dataset.csv"
    # )
    # path_to_save_items = hrf_experiment_output_path().joinpath("datasets/items.csv")

    # dataset_result.to_csv(path_to_save_ratings, index=False)
    # dataset_instance.items.to_csv(path_to_save_items, index=False)

    # print(" => Finalizando a tarefa dos datasets")
    # print("\n")
    # return dataset_result


def run_dataset_task():
    loader = Loader()
    config_obj = loader.load_json_file("config.json")

    experiments = config_obj["experiments"]

    exp_handler = ExperimentHandler(experiments=experiments)

    experiment = exp_handler.get_experiment("exp1")

    experiment_instances = experiment.instances

    dataset_instance = experiment_instances["datasets"]
    dataset_task = DatasetTask(dataset_instance)  # Isso aqui vira o GeneralDataset

    print("\n")
    print(" => Iniciando a execução da tarefa dos datasets")

    dataset_result = dataset_task.run()
    # print(dataset_result)
    # dataset_experiment_dir = hrf_experiment_output_path().joinpath("datasets/")

    # is_dataset_dir_exists = check_if_directory_exists(dataset_experiment_dir)

    # if is_dataset_dir_exists is False:
    #     create_directory(hrf_experiment_output_path(), "datasets")

    # path_to_save_ratings = hrf_experiment_output_path().joinpath(
    #     "datasets/new_ratings_dataset.csv"
    # )
    # path_to_save_items = hrf_experiment_output_path().joinpath("datasets/items.csv")

    # dataset_result.to_csv(path_to_save_ratings, index=False)
    # dataset_instance.items.to_csv(path_to_save_items, index=False)

    print(" => Finalizando a tarefa dos datasets")
    print("\n")
    return dataset_result


if __name__ == "__main__":
    run_dataset_task()
