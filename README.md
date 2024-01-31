# RecSysExp

## Introdução

Este repositório contém os arquivos necessários para a utilização do framework para experimentos de sistemas de recomendação **RECSYSEXP**

## Instalação

O único requisito necessário para executar o framework é ter o _Docker_ e o _docker-compose_ instalados na máquina.

O download pode ser realizado em: https://www.docker.com/

Após instalação dos softwares acima, baixe o código do repositório, descompacte na pasta desejada e siga com os seguintes comandos na pasta raiz do projeto (pasta onde se encontra o arquivo docker-compose.yaml)

```bash
docker-compose build
# Esse comando cria as imagens contidas no docker-compose (frontend e framework)
```

Na primeira execução do comando acima é normal que demore alguns minutos.

Em seguida, o comando

```bash
docker-compose up
# Instancia as imagens
```

É possível verificar se tudo ocorreu como deveria de duas maneiras:

1. http://localhost:3000/ => Aqui será a tela de interação com o framework
2. http://localhost:5000/run => Endpoint que indica se o framework está operacional

## Informações Importantes

- Esse é um trabalho em desenvolvimento, logo pode ocorrer alguns bugs durante a utilização
- Para inserir novos datasets é necessário que o arquivo seja .csv e obedeça a seguinte ordem de nomes de colunas: user, item, rating, timestamp.
- A interface gráfica não contém validação de entrada de dados, logo, se uma string for digitada em um campo numeral acarretará em erros.
