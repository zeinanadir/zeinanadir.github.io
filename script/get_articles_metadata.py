import yaml
from newspaper import Article
from bs4 import BeautifulSoup
import requests
import time

REL_PATH_FORMAT_STRING = "../_data/articles/%s.yml"
FILE_NAMES = ["politico"]
# FILE_NAMES = ["boston_globe", "freelance", "politico", "uva", "wash"]


def get_yaml_content(path):
  with open(path) as stream:
    try:
      return yaml.safe_load(stream)
    except yaml.YAMLError as exc:
      print(exc)


def overwrite_yaml_content(path, content):
  with open(path, "w") as file:
    yaml.safe_dump(content, file, default_flow_style=False, sort_keys=False)


def update_article_metadata(article_metadata):
  url = article_metadata['url']
  article = Article(url)
  article.download()
  article.parse()

  # article_metadata['title'] = article.title
  article_metadata['image_url'] = article.top_image
  article_metadata['publish_date'] = article.publish_date

  # response = requests.get(url)
  # soup = BeautifulSoup(response.text, "html.parser")

  # title = soup.find("meta", attrs={"property": "title"})
  # if title:
  #   article_metadata['title'] = title.get("content")


for file_name in FILE_NAMES:
  print(file_name)
  file_path = REL_PATH_FORMAT_STRING % file_name
  file_content = get_yaml_content(file_path)
  articles = file_content['members']
  for article in articles:
    update_article_metadata(article)
    time.sleep(1)
  overwrite_yaml_content(file_path, file_content)
