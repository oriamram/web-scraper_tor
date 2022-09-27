FROM python

WORKDIR /home/dataFromWeb

COPY . .

RUN python -m pip install pysocks bs4 textblob pymongo requests

CMD ["python","-u","./index.py"]