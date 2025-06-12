---
layout: post
title: "HTML-CSS-JavaScript를 맛보고 느낀점"
date: 2025-05-01
categories: [Web]
---

# 웹을 공부해보았다.

정확히 제가 공부한 것을 웹이라고 해야할지도 잘 모르겠습니다 ㅎㅎㅎ. 

일단은 <mark>HTML</mark>과 <mark>CSS</mark> 그리고 <mark>javascript</mark>를 간략하게 공부해보며 새로운 언어를 학습하는 시간을 가졌습니다.

제가 이해한 바를 바탕으로 간단히 이 3가지 언어의 관계를 살펴보겠습니다.

## HTML
<mark>HTML</mark>은 웹에서 다양한 요소들을 보여주게 하는 언어입니다. 

이 언어를 통해서 우리는 웹 상에서 어떤 글자, 이미지, 영상을 보여줄지 선택할 수 있습니다. 

### 간단한 HTML 코드
```html
<!-- heading / paragraph / img / video를 보여주는 html 코드 -->
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <h1>This is Heading</h1>
    <p>This is Paragraph</p>
    <img src="https://i.imgur.com/QUqjHmR.jpeg">
    <video src="https://i.imgur.com/0eRZGrJ.mp4" controls>
</body>

</html>
```

다양한 태그를 필요로 하는 언어입니다. 

하지만 그만큼 단순하여 다양한 자동완성이 있어 실제로 작성하는데 큰 무리가 있지는 않았습니다.

## CSS
<mark>CSS</mark>는 HTML을 꾸며주는 언어입니다. 

사실 언어라기 보다는 다양한 세팅값들의 모음 느낌으로 받아들여 졌습니다.

HTML과 굉장히 밀접하게 정보를 주고 받는 것으로 이해했습니다.

### 간단한 CSS 코드
```css
/* main-color와 default-size를 정의한다. */
.main-color {
    color: blue;
}

.default-size {
    width: 300px;
    height: 300px;
}
```

이러한 CSS 코드는 HTML에서 불러와서 사용하는 것이 가능합니다.

### HTML에서 활용
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css"> <!-- CSS를 불러오는 코드. -->
</head>

<body>
    <h1 class="main-color"> <!-- class를 css 값으로 설정한다. -->
        This is Heading
        </h1>
    <p class="main-color">This is Paragraph</p>
    <img class="default-size" src="https://i.imgur.com/QUqjHmR.jpeg">
    <video class="default-size" src="https://i.imgur.com/0eRZGrJ.mp4" controls>
</body>

</html>
```

## Javascript
<mark>javascript</mark>는 웹브라우저가 default로 이해할 수 있는 언어로 이해했습니다. 

그렇기 때문에 javascript 코드를 통해서 웹 상에서 데이터를 주고 받는것이 가능하다고 느꼈습니다.

로그인, 검색과 같은 작업을 수행할 때 backend와 정보를 주고 받아야하는 상황에서 javascript는 활용하기 굉장히 용이한 것으로 이해했습니다.

### javascript의 특징

```javascript
// javascript를 간단히 Hello, World를 출력
let language = 'javascript';
console.log(language);
```

javascript는 웹 브라우저가 이해할 수 있는 언어이기에 <mark>front-end</mark> 언어로 쓰였습니다.

하지만 <mark>node</mark>라는 것이 나온 후 브라우저 밖에서도 실행이 가능해졌습니다.

즉, 일반적인 프로그래밍 언어와 같이 동작할 수 있게 되었고 이후에 <mark>backend</mark>라이브러리와 같은것이 생겨난 것으로 이해했습니다.

## 결론
저는 <mark>Python</mark>을 주력으로 활용하고 <mark>R</mark>과 <mark>SAS</mark> <mark>SQL</mark>을 이해할 수 있습니다. 

간단히 javascript를 공부하며 느낀점은 굉장히 매력적인 언어라는 생각이 들었습니다. 

python도 언어가 굉장히 유연한 편이지만 <mark>그것보다 더 유연한 점</mark>도 있다고 생각했습니다.

앞으로 javascript를 조금 더 공부해보고 싶습니다.