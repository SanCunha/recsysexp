from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
import json
import zipfile
from io import BytesIO
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

app.static_url_path = "/experiment_output"
app.static_folder = "experiment_output"

# Configuração para permitir uploads de arquivos
app.config["UPLOAD_FOLDER"] = "data_storage"
app.config["ALLOWED_EXTENSIONS"] = {"csv"}


def allowed_file(filename):
    return (
        "." in filename
        and filename.rsplit(".", 1)[1].lower() in app.config["ALLOWED_EXTENSIONS"]
    )


@app.route("/upload", methods=["POST"])
def upload_file():
    # Verifica se a requisição possui o arquivo
    if "file" not in request.files:
        return jsonify({"error": "Nenhum arquivo enviado"})

    file = request.files["file"]

    # Verifica se o arquivo tem um nome e extensão válidos
    if file.filename == "":
        return jsonify({"error": "Nome de arquivo inválido"})

    if file and allowed_file(file.filename):
        # Gera um nome seguro para o arquivo
        filename = secure_filename(file.filename)

        # Cria o caminho da pasta com base no nome do arquivo
        folder_path = os.path.join(app.config["UPLOAD_FOLDER"], filename.split(".")[0])

        # Verifica se a pasta já existe, se não, cria
        if not os.path.exists(folder_path):
            os.makedirs(folder_path)

        # Salva o arquivo no diretório de upload
        file_path = os.path.join(folder_path, "items.csv")
        file.save(file_path)

        return jsonify({"message": "Arquivo salvo com sucesso"})

    return jsonify({"error": "Tipo de arquivo não permitido"})


@app.route("/listar_pastas", methods=["GET"])
def listar_pastas():
    caminho_do_diretorio = os.path.join(os.getcwd(), "data_storage")
    try:
        # Obtém a lista de itens no diretório
        pastas = [
            item
            for item in os.listdir(caminho_do_diretorio)
            if os.path.isdir(os.path.join(caminho_do_diretorio, item))
        ]
        return jsonify({"datasets": pastas})
    except FileNotFoundError:
        return jsonify({"error": "O diretório não foi encontrado"})
    except PermissionError:
        return jsonify({"error": "Permissão negada ao acessar o diretório"})
    except Exception as e:
        return jsonify({"error": f"Erro desconhecido: {e}"})


@app.route("/run", methods=["POST"])
def run():
    data = request.get_json()
    saved_json = write_json(data)
    if saved_json:
        os.system("python main.py output.json")
        files = get_files()
        return files
    else:
        pass


def write_json(data):
    if data:
        # Assuming the data is a valid JSON object
        try:
            with open("output.json", "w") as file:
                json.dump(data, file)
                print("JSON SALVO COM SUCESSO")
            return True
        except Exception as e:
            return False
    else:
        return False


@app.route("/status", methods=["GET"])
def status():
    return jsonify({"Online": True})


def get_files():
    root_folder = "./experiment_output"
    # Create a BytesIO object to store the ZIP archive
    zip_buffer = BytesIO()
    with zipfile.ZipFile(zip_buffer, "w", zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(root_folder):
            for file in files:
                file_path = os.path.join(root, file)
                arcname = os.path.relpath(file_path, root_folder)
                zipf.write(file_path, arcname=arcname)

    zip_buffer.seek(0)

    # Create a response with the ZIP archive
    response = send_file(zip_buffer, as_attachment=True, download_name="all_files.zip")
    response.headers["Content-Disposition"] = "attachment; filename=all_files.zip"
    return response


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
