---
layout: post
title: "Python의 requests를 살펴보기[Get / Post]"
date: 2025-06-12
categories: [Python]
---

# requests

정의 : python에서 api 통신을 할 때 가장 기본적으로 활용하는 라이브러리

## Get

Baseline

```py
import requests

##
url = "http://localhost:8000/models"

##
response = requests.get(url)
response.json()
'''
- url에 get 방식으로 접근해 데이터를 얻는다.
'''
```

With Params

```py
import requests

## A
url = "http://localhost:8000/models"
params = {
    'meta': 'linear'
}

response = requests.get(url=url, params=params)
response.json()

## B
url = "http://localhost:8000/models?meta=linear"
response = requests.get(url=url)
response.json()

'''
- A는 B와 완전히 동일하다.
'''
```

With Data

```py

import requests

## A
url = "http://localhost:8000/models"
data = {
    'meta': 'linear'
}

response = requests.get(url=url, data=data)
response.json()

## B
url = "http://localhost:8000/models"
response = requests.get(url=url)
response.json()

'''
- A는 B와 완전히 동일하다.
- 즉 requests.get에 data를 넣는것은 무의미하다.
'''
```

---

## Post

with Data

```py
import json
import requests

##
url = "http://localhost:8000/models/"
headers = {
    'Content-Type': 'application/json'
}
data = {
    'name': 'SVM',
    'description': 'support vector machine'
}

##
response = requests.post(
    url=url,
    data=json.dumps(data),
    headers=headers
)
response.json()
```

with Json

```py
import json
import requests

##
url = "http://localhost:8000/models/"
data = {
    'name': 'SVM',
    'description': 'support vector machine'
}

##
response = requests.post(
    url=url,
    json=data
)
response.json()
```

post에서 보내야할 데이터의 형태가 json이라면(그러한 경우가 많다.) json으로 보내는 것이 합리적이다.

