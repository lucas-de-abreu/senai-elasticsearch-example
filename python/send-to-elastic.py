import csv
import json
import requests

url = "http://localhost:9200/movies/_doc/"
headers = {"Content-Type": "application/json"}

output = "./dataset/output.csv"

try:
    with open(output, mode="r", newline="", encoding="utf-8") as csvfile:
        csv_reader = csv.DictReader(csvfile)

        id = 1
        for row in csv_reader:
            json_payload = json.dumps(row)

            response = requests.post(url + str(id), data=json_payload, headers=headers)
            response.raise_for_status()

            id += 1
except requests.exceptions.HTTPError as err:
    raise SystemExit(err)
