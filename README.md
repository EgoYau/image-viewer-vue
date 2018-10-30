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
        @clickImage="clickImage"
        :imgUrlList="imgUrlList"
        :index="currentIndex"
        :title="title"
        :closable=true
        :cyclical=false>
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
        },
        methods:{
            clickImage: function(index){
                console.log(index)
            }
        }
    }
</script>
```

## Props
| Name | Type | Required | Description | Default |
| :- | :- | :- | :- | :- | 
| `imgUrlList` | `Array`| `true` | image url list | `[]` |
| `index` | `Number`| `false` | which image to show first | `0` |
| `title` | `String`| `false` | image's title | `'图片'` |
| `alt` | `String`| `false` | the property of img tag | `'图片'` |
| `closable` | `Boolean`| `false` | the imageViewer will close when clicked blank | `true` |
| `cyclical` | `Boolean`| `false` | browse pictures can be repeated | `true` |

## Methods
| Name | Description | Params |
| :- | :- | :- | 
| `closeImageViewer` | the callback for closing imageViewer | null |
| `clickImage` | the callback for clicking the image | the index for the image which clicked |

