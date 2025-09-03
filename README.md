# SENAI - Exemplo ElasticSearch

Caso queira, é possível importar o arquivo insomnia-endpoints.json no seu Insomnia e testar as requisições.

#### Requirements

- docker (com o plugin compose)
- node
- python 3
- pip (opcional)

#### ElasticSearch

URL: localhost:9200

Para subir o ElasticSearch:

```
docker compose up -d
```

#### Dataset

Para popular os dados no Elastic:

```
cd python
python3 send-to-elastic.py
```

Caso queira gerar outro dataset, vá até o [Kaggle](https://www.kaggle.com/datasets/gsimonx37/letterboxd/data) e baixe os arquivos **actors.csv** e **posters.csv**, deixando-os na pasta **python**.
Caso queira mudar a quantidade de filmes, mude o nrows do arquivo _merge.py_
Obs: É necessário instalar o pandas.

Depois:

```
pip install pandas
cd python
sudo rm -rf output.csv
python merge.py
```

#### Frontend

URL: http://localhost:3000/

Para subir o frontend:

```
cd elastic_front
npm i
npm run dev
```
