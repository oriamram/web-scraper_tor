FROM python:3.10.5-alpine

WORKDIR /home/dataFromWeb

COPY . .

RUN python -m pip install pysocks bs4 textblob pymongo requests

CMD ["python","-u","./index.py"]