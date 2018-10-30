<template>
  <div id="app">
    <div class="example">
      <button class="button" @click="imageViewerFlag = true">点击查看图片</button>
    </div>

    <!-- 查看图片 -->
    <image-viewer-vue 
        v-if="imageViewerFlag" 
        @closeImageViewer="imageViewerFlag = false" 
        @clickImage="clickImage"
        :imgUrlList="imgUrlList"
        :closable=true
        :cyclical=false>
    </image-viewer-vue>
  </div>
</template>

<script>

    export default {
        name: 'App',
        data() {
            return {
                imageViewerFlag: false,
                currentIndex: 1,
                title: '美图',
                imgUrlList: [
                    'https://images.unsplash.com/1photo-1448376561459-dbe8868fa34c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=361907f0deaaf183ac4ce6b62551dfb3&auto=format&fit=crop&w=900&q=60',
                    'https://images.unsplash.com/photo-1514251972625-326e3dd06f0a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a4edd9f3c0c127ee76b85c44a7731bee&auto=format&fit=crop&w=900&q=60',
                    'https://images.unsplash.com/photo-1514846326710-096e4a8035e0?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3e840de32e65ad8bd38e04e646f3d80a&auto=format&fit=crop&w=900&q=60'

                ]
            }
        },
        methods:{
            clickImage: function(index){
                console.log(index)
            }
        }
    }
</script>

<style>
    html {
        height: 100%;
    }
    body {
        height: 100%;
        margin: 0;
    }
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        height: 100%;
    }

    .example {
        padding-top: 100px;
        text-align: center;
    }

    .button {
        border: 1px solid #ccc;
        height: 30px;
        line-height: 30px;
        background: #fff;
    }
</style>