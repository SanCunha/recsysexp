import subprocess
from abc import ABC, abstractmethod
from src.utils import subprocess_output_is_correct
from src.data.loader import Loader


# https://unix.stackexchange.com/questions/31414/how-can-i-pass-a-command-line-argument-into-a-shell-script
class Xperimentor:
    def __init__(self):
        loader = Loader()
        self.xperimentor_pattern_obj = loader.load_json_file("external/xperimentor_config_file_pattern.json")

    def convert_to_xperimentor_pattern(self, experiments: list,
                                       experiment_dependencies: dict = None,
                                       recipes_default: dict = None,
                                       cluster_info: dict = None,
                                       tasks: dict = None):
        """

        @return:
        """

        qtd_experiments = len(experiments)

        experiment_ids = list(map(lambda x: x['id'], experiment_dependencies))

        cluster_ip = cluster_info['clusterIp']
        for i in range(0, qtd_experiments):
            exp_id = experiments[i]['experiment_id']
            dataset = experiments[i]['dataset']
            metafeatures = experiments[i]['metafeatures']
            hybrid = experiments[i]['hybrid']
            folds = None
            recommenders = experiments[i]['recommenders']
            metrics = experiments[i]['metrics']
            results = experiments[i]['results']
            visualization = experiments[i]['visualization']
            clusterName = None
            projectId = None
            self.xperimentor_pattern_obj['recipes'][i]['id'] = exp_id
            self.xperimentor_pattern_obj['recipes'][i]['uses']['DB'] = self._set_database_recipes(dataset)
            self.xperimentor_pattern_obj['recipes'][i]['uses']['Fold'] = self._set_folds_recipes(folds)
            self.xperimentor_pattern_obj['recipes'][i]['uses']['MF'] = self._set_metafeatures_recipes(metafeatures)
            self.xperimentor_pattern_obj['recipes'][i]['uses']['Alg'] = self._set_algorithms_recipes(recommenders)
            self.xperimentor_pattern_obj['recipes'][i]['uses']['HF'] = self._set_hybrid_recipes(hybrid)
            self.xperimentor_pattern_obj['recipes'][i]['uses']['Eval'] = self._set_eval_recipes(metrics)
            self.xperimentor_pattern_obj['recipes'][i]['uses']['Stats'] = self._set_stats_recipes(results)

        # Preciso ter a relação dos folds -> Os datasets precisam guardar essa informação após gera-los
        self.xperimentor_pattern_obj['recipeDefaults'] = self.convert_recipes_default(recipes_default)
        self.xperimentor_pattern_obj['clusterIp'] = cluster_ip

        tasks_aux = []
        for i in range(0, len(tasks)):
            tasks_aux.append({
                "id": tasks[i]['task_name'],
                "command": tasks[i]['command']
            })

        self.xperimentor_pattern_obj['tasks'] = tasks_aux
        return self.xperimentor_pattern_obj

    def convert_recipes_default(self, recipes: dict) -> dict:
        """

        @param recipes:
        @return:
        """
        new_recipes_default = {
            "DB": recipes.get('database'),
            "MF": recipes.get('metafeatures'),
            "Eval": recipes.get('metrics'),
            "Stats": recipes.get('results'),
            "Alg": recipes.get('algorithms'),
            "HF": recipes.get('hybrid'),
            "Fold": recipes.get('folds')
        }
        return new_recipes_default

    def _set_database_recipes(self, database: dict) -> list:
        return [database['class']]

    def _set_hybrid_recipes(self, hybrid) -> list:
        return self._get_class_name_from_instance(hybrid)

    def _set_stats_recipes(self, results: dict) -> list:
        return self._get_class_name_from_instance(results)

    def _get_class_name_from_instance(self, obj: dict) -> list:
        """

        @param obj:
        @return: list
        """
        if obj is None:
            return []

        parameters = obj.get('parameters')
        instances = parameters['instances']
        return list(map(lambda x: x['class_name'], instances))

    def _set_folds_recipes(self, folds) -> list:
        return self._get_class_name_from_instance(folds)

    def _set_metafeatures_recipes(self, metafeatures: dict) -> list:
        return self._get_class_name_from_instance(metafeatures)

    def _set_algorithms_recipes(self, algorithms: dict) -> list:
        return self._get_class_name_from_instance(algorithms)

    def _set_eval_recipes(self, metrics: dict) -> list:
        return self._get_class_name_from_instance(metrics)

    def build(self):
        """

        @return:
        """
        output = subprocess.run(['sh, external/xperimentor/build.sh'], capture_output=True)

        if subprocess_output_is_correct(output) == True:
            print("O processo de build foi bem sucedido")

        raise Exception("Não foi possível construir a imagem")

    def deploy(self):
        output = subprocess.run(['sh', "external/xperimentor/deploy.sh"], capture_output=True)
        print("-- deploy Xperimentor by shell script file -- ")
        print("output: ", output)
        if subprocess_output_is_correct(output) == True:
            print("O deploy do Xperimentor ocorreu corretamente no cluster")

        raise Exception("Nao foi possível fazer o deploy do Xperimentor")


class TaskExecutor:
    def __init__(self):
        pass

    def build(self):
        """

        @return:
        """
        output = subprocess.run(['sh', "external/TaskExecutor/build.sh"])
        print("-- Building Task Executor by shell script file -- ")
        if subprocess_output_is_correct(output) == True:
            print("The image was built successfully")
            print("Task Executor Build Output: ", output)
        else:
            print("Could not build image")
            print("Task Executor Build Output: ", output)
        return output

    def deploy(self):
        """

        @return:
        """
        output = subprocess.run(['sh', "external/TaskExecutor/deploy.sh"])
        print("-- deploy Task Executor by shell script file -- ")

        if subprocess_output_is_correct(output) == True:
            print("The image was built successfully")
            print("Task Executor Deploy Output: ", output)
        else:
            print("Could not build image")
            print("Task Executor Deploy Output: ", output)

        return output
