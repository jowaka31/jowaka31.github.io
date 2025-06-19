---
layout: post
title: "점프 투 FastAPI 프로젝트를 진행하고 느낀점"
date: 2025-06-19
categories: [Web]
---

# 점프 투 FastAPI

<mark>wiki-docs</mark>에서 제공하는 [점프 투 FastAPI](https://wikidocs.net/book/8531)를 프로젝트를 쭉 따라가며 공부해보았습니다.

1. 앞으로 작업을 하는데 있어서 <mark>FastAPI</mark>를 잘 활용하는 것이 중요해 보였습니다.
2. 현재 javascript와 typescript에 대한 이해가 필요했기 때문에 <mark>svelte</mark>를 사용하는 이 프로젝트가 매력적으로 느껴졌습니다.

## 배운점

### FastAPI의 기본적인 구조

간단한 FastAPI를 활용하여 ML 모델을 serving 한 적이 있는데요.

```py
# main.py
from fastapi import FastAPI

app = FastAPI()

@app.get('/')
async def root():
    data = {
        'title':'this is title!',
        'content':'this is content'
    }
    return data
```

FastAPI는 이런식으로 API를 생성합니다.

저는 아무래도 간단한 API 구축만 해보아서 이런 식으로만 FastAPI 코드를 작성해 본 상태였습니다.

이번 프로젝트에서는 조금 더 복잡한(할 것이 많은) 상황에서 API를 구축하는 방법을 배울 수 있었습니다.

```py
# main.py
from fastapi import FastAPI
from domain.model import model_router

app = FastAPI()

app.include_router(question_router.router)
app.include_router(answer_router.router)
app.include_router(user_router.router)

# domain/model/model_router.py
from fastapi import APIRouter
from domain.model import model_crud

router = APIRouter(
    prefix='/api/model'
)

@router.get('/{model_name}', response_model=Model)
def model_detail(model_name:str):
    model = model_crud.get_model(model_name)
    return model
```

요런 스타일로 분리가 가능했습니다.

### frontend의 동작 방식

<mark>javascript</mark>는 왜 프론트엔드에 쓰이는 걸까요. 왜 또 이건 <mark>backend</mark>에서도 활용이 가능해진걸까요.


데이터를 다루는 작업을 시작으로 프로그래밍을 시작한 저에게는 참 이해하기 힘든 부분이었습니다.


이번 프로젝트를 진행하니 좀 더 이해가 잘 된것 같습니다.

```plaintext

html -> 메인 프론트엔드
    - css : html을 꾸며주는 녀석
    - javascript : html을 동적으로 활용할 수 있게 해주는 녀석

javascript가 frontend에서 동작할 수 있는데 왜 backend가 안되나!
    - frontend runtime으로 동작하는 javascript로 웹에 접속한 유저의 로컬 환경에 변경을 하는 것은 매우 위험한일!
    - 그러므로 javascript를 유저 로컬 런타임에서 돌릴 수 있는 node.js가 나왔다 -> backend가 가능해진 javascript

이정도로 이해를 한 것 같습니다.
```

### <mark>build</mark>가 뭐냐.

이번엔 최종적으로 <mark>build</mark> 또한 진행해 보았습니다.


주로 python을 사용한 저에게는 build 또한 굉장히 어색한 부분이 었습니다.

```plaintext
build는 일종의 컴파일 이라고 이해했습니다.

다만, 이경우에는 제가 잘 정리해둔 css, html, javascript, etc... 코드들을
컴퓨터가 가장 빠르게 읽을 수 있는 형태로 변환한 것으로 이해했습니다.

이렇게 build가 완료된 코드들은 사람이 읽기는 조금 힘들지만, backend에 mount가 가능하게 됩니다.

그리고 이러한 mount를 통해 
최종적으로 backend 서버를 동작시키는 것으로 frontend와 backend가 같이 작동할 수 있게 됩니다.
```

## 결론

조금 더 <mark>backend</mark> - <mark>frontend</mark>의 관계를 잘 이해할 수 있게 해준 프로젝트였습니다.


- DOM 공부
- javascript 공부
- typescript 공부
- FastAPI 좀 더 깊게 파보기

정도를 추가적으로 해보고 싶습니다.