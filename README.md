# image-viewer-vue
[![NPM version](https://img.shields.io/npm/v/image-viewer-vue.svg)](https://www.npmjs.org/package/image-viewer-vue) [![Build Status](https://travis-ci.org/EgoYau/image-viewer-vue.svg?branch=master)](https://travis-ci.org/EgoYau/image-viewer-vue)
> A Vue.js project for viewing image

## install
```
npm install image-viewer-vue --save
```

## Usage
1. import in main.js

```
import imageViewer from 'image-viewer-vue'
Vue.use(imageViewer)
```

2. how to use

```
<template>
  <div>
    <button @click="imageViewerFlag = true">点击查看图片</button>
    <image-viewer-vue 
        v-if="imageViewerFlag" 
        @closeImageViewer="imageViewerFlag = false" 
        :imgUrlList="imgUrlList"
        :index="currentIndex"
        :title="title">
    </image-viewer-vue>
  </div>
</template>
<script>
    export default {
        data() {
            return {
                imageViewerFlag: false,
                currentIndex: 1,
                title: '图片',
                imgUrlList: ['url1','url2','url3']
            }
        }
    }
</script>
```

## Props
| Name | Type | Required | Description | Default |
| :- | :- | :- | :- | :- | 
| `imgUrlList` | `Array`| `true` | image url list | `[]` |
| `index` | `Number`| `false` | Which image to show first | `0` |
| `title` | `String`| `false` | the image title | `'图片'` |

## Methods
| Name | Description |
| :- | :- | 
| `closeImageViewer` | the callback for closing imageViewer | 

