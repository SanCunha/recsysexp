import shutil
import os


class GeneralDataset:
    def __init__(self, parameters: dict):
        folder = "data_storage/" + parameters["name"] + "/items.csv"
        self.dataset = parameters["name"]
        self.origin = os.path.join(os.getcwd(), folder)
        self.destiny_folder = os.path.join(os.getcwd(), "experiment_output/datasets")

    def run(self):
        self.copiar_arquivo(self.origin, self.destiny_folder)

    def copiar_arquivo(self, origem, destino):
        try:
            shutil.copy(origem, destino)
            print(f"Arquivo copiado de {origem} para {destino} com sucesso.")
        except FileNotFoundError:
            print(f"Erro: O arquivo {origem} não foi encontrado.")
        except PermissionError:
            print(f"Erro: Permissão negada ao acessar o arquivo {origem}.")
        except Exception as e:
            print(f"Erro desconhecido: {e}")
