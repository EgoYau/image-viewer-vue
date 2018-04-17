<template id="ImageViewer">
    <div ref="imageContainer" class="image-container">
        <div class="image-viewer-mask" @click="clickMask()"></div>
        <div class="image-viewer-wrap" @click="clickWrap()">
            <div ref="imageDiv" class="image-div" @click="clickImageDiv()">
                <!-- <Spin size="large" fix v-if="spinShow"></Spin> -->
                <div ref="imageDiv"
                     v-show="imageDivShow"
                     class="image-photos"
                     @click="clickImagePhotos()"
                     @mousewheel="mouseWheelScroll($event)">
                    <img class="imgContent"
                         draggable="false"
                         :src="innerImgUrl"
                         ref="imagePhoto"
                         @click.stop="clickImage()"
                         @load="imageLoadSuccess()"
                         @error="imageLoadError()"
                         @mousedown="mousedown"
                         @mousemove="mousemove"
                         @mouseup="mouseup">
                    <span class="cancelButton" @click.stop="closeSelf()"></span>
                    <span class="leftButton" ref="leftButton" @click.stop="leftBtnClick()"></span>
                    <span class="rightButton" ref="rightButton" @click.stop="rightBtnClick()"></span>
                    <span class="bottomTitle" @click.stop="clickImage()">{{innerTitle}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    let position = {
        offsetX: 0, //点击处偏移元素的X
        offsetY: 0, //偏移Y值
        state: 0 //是否正处于拖拽状态，1表示正在拖拽，0表示释放
    };
    export default {
        name: 'image-viewer-vue',
        props: {
            // 图片url数组
            imgUrlList:{
                type: Array,
                default: [],
                required: true
            },
            // 当前图片索引
            index:{
                type: Number,
                default: 0,
                required: false
            },
            // 底部文字描述
            title:{
                type: String,
                default: '图片',
                required: false
            }
        },
        data () {
            return {
                // 内部变量
                innerIndex: 0,
                innerImgUrl: '',
                innerTitle: '',
                spinShow: true,
                imageDivShow: false
            }
        },
        methods: {
            // 图片加载完成
            imageLoadSuccess: function () {
                this.spinShow = false;
                this.imageDivShow = true;
                this.fixImageSize();
            },
            // 图片加载失败
            imageLoadError: function () {
                this.spinShow = false;
                this.imageDivShow = true;
            },
            // 调整图片尺寸
            fixImageSize:function () {
                let imageDom = this.$refs.imagePhoto;
                imageDom.width = imageDom.naturalWidth;
                imageDom.height = imageDom.naturalHeight;
                let width = imageDom.width,
                    height = imageDom.height,
                    maxWidth = document.body.clientWidth,
                    maxHeight = document.body.clientHeight,
                    widthRate = width / maxWidth,
                    heightRate = height / maxHeight;
                if (widthRate >= 0.9 || heightRate >= 0.9){
                    if (widthRate >= heightRate){
                        let tempRate = width / (maxWidth * 3 / 4);
                        width = maxWidth * 3 / 4;
                        imageDom.width = width;
                        imageDom.height = height / tempRate;
                    }else{
                        let tempRate = height / (maxHeight * 3 / 4);
                        height = maxHeight * 3 / 4;
                        imageDom.width = (width / tempRate);
                        imageDom.height = height;
                    }
                }
            },
            // 点击事件
            clickMask: function () {
                this.closeSelf();
            },
            clickWrap: function () {
                this.closeSelf();
            },
            clickImageDiv: function () {
                this.closeSelf();
            },
            clickImagePhotos: function () {

            },
            clickImage: function () {
                
            },
            // 关闭按钮
            clickCloseIcon: function () {
                this.closeSelf();
            },
            // 左翻页
            leftBtnClick:function () {
                let imgUrlList = this.imgUrlList,
                    totalCount = imgUrlList.length;
                if (this.innerIndex > 0){
                    this.innerIndex --;
                }else{
                    // this.innerIndex = imgUrlList.length - 1;
                    this.innerIndex = 0
                }
                this.innerImgUrl = imgUrlList[this.innerIndex];
            },
            // 右翻页
            rightBtnClick:function () {
                let imgUrlList = this.imgUrlList,
                    totalCount = imgUrlList.length;
                if (this.innerIndex < totalCount - 1){
                    this.innerIndex ++;
                }else{
                    // this.innerIndex = 0;
                    this.innerIndex = imgUrlList.length - 1
                }
                this.innerImgUrl = imgUrlList[this.innerIndex];
            },
            // 关闭
            closeSelf: function () {
                this.$emit("closeImageViewer");
            },
            // 移动事件
            mousedown:function (event) {
                //获得偏移的位置以及更改状态
                let e = this.getEvent(event);
                position.offsetX = e.offsetX;
                position.offsetY = e.offsetY;
                position.state = 1;
            },
            mouseup:function (event) {
                position.state = 0;
            },
            mousemove:function (event) {
                var e = this.getEvent(event);
                if (position.state) {
                    position.endX = e.clientX;
                    position.endY = e.clientY;
                    //设置绝对位置在文档中，鼠标当前位置-开始拖拽时的偏移位置
                    let element = this.$refs.imageDiv;
//                    element.style.position = 'absolute';
                    element.style.top = position.endY - position.offsetY + 'px';
                    element.style.left = position.endX - position.offsetX + 'px';
                }
            },
            // 鼠标滚轮事件
            mouseWheelScroll(e){
                let imageDiv = this.$refs.imageDiv,
                    image = this.$refs.imagePhoto,
                    width = image.width,
                    height = image.height;
                var imgW = width,
                    imgH = height;
                // 放大 滚轮下滑
                if (e.deltaY < 0) {
                    if (width < 2000) {
                        imgW = width * 1.025;
                        imgH = height * 1.025;
                    }
                }else{
                    // 缩小 滚轮上滑
                    if (width > 300){
                        imgW = width * 0.975;
                        imgH = height * 0.975;
                    }
                }
                image.height = Math.round(imgH);
                image.width = Math.round(imgW);
                var offsetLeft = (imageDiv.offsetLeft),
                    offsetTop = (imageDiv.offsetTop);
                imageDiv.style.left = ''+(offsetLeft - (imgW - width) / 2)+'px';
                imageDiv.style.top = ''+(offsetTop - (imgH - height) / 2)+'px';
            },
            getEvent:function (event) {
                return event || window.event;
            }
        },
        // watch方法有先后顺序
        watch: {
            'index':{
                handler: function (newValue) {
                    this.innerIndex = Number(newValue);
                },
                immediate: true
            },
            'innerIndex': {
                handler: function (newValue, oldValue) {
                    let tempValue = Number(newValue),
                        element = this.$refs.imageDiv;
                    if (element && element.style){
                        element.style.top = '';
                        element.style.left = '';
                    }
                    tempValue < 0 && (tempValue = 0)
                    tempValue > this.imgUrlList.length && (tempValue = this.imgUrlList.length - 1)
                    this.imageDivShow = false;
                    this.spinShow = true;
                    this.innerTitle = this.title + ' ' + (tempValue + 1) + '/' + this.imgUrlList.length
                    this.$set(this._data, 'innerImgUrl', this.imgUrlList[tempValue])
                },
                immediate: true
            }
        }
    }
</script>

<style rel="stylesheet/scss" scoped lang="scss" type="text/css">
    .image-container{
        position: fixed;
        z-index: 10000;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(55, 55, 55, .6);
        height: 100%;
        width: 100%;
    }
    .image-viewer-mask {
        position: fixed;
        z-index: 10000;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(55, 55, 55, .6);
        height: 100%;
    }
    .image-viewer-wrap {
        position: fixed;
        overflow: auto;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        .image-div {
            text-align: center; 
            margin: auto;
            position: absolute;
            background-color: #fff;
            .image-photos {
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
                &:hover > .leftButton {
                    opacity: 0.4;
                }
                &:hover > .rightButton {
                    opacity: 0.4;
                }
                &:hover > .bottomTitle {
                    opacity: 0.8;
                }
                .imgContent{
                    cursor: move;
                }
                .cancelButton{
                    width: 32px;
                    height: 32px;
                    position: absolute;
                    top: -16px;
                    right: -16px;
                    background-image: url("~/src/assets/cancel.png");
                    background-repeat: round;
                    &:hover{
                        background-image: url("~/src/assets/cancel-highlight.png");
                    };
                    z-index: 10100;
                    cursor: pointer;
                }
                .leftButton{
                    width: 24px;
                    height: 68px;
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    margin-top: auto;
                    margin-bottom: auto;
                    left: 10px;
                    background-image: url("~/src/assets/left-row-opaque.png");
                    background-repeat: round;
                    opacity: 0.0;
                    z-index: 10100;
                    cursor: pointer;
                    &:hover{
                        opacity: 1;
                    }
                }
                .rightButton{
                    width: 24px;
                    height: 68px;
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    margin-top: auto;
                    margin-bottom: auto;
                    right: 10px;
                    background-image: url("~/src/assets/right-row-opaque.png");
                    background-repeat: round;
                    opacity: 0.0;
                    z-index: 10100;
                    cursor: pointer;
                    &:hover{
                        opacity: 1;
                    }
                }
                .bottomTitle{
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    width: 100%;
                    height: 32px;
                    line-height: 32px;
                    background-color: rgba(0,0,0,.8);
                    color: #fff;
                    overflow: hidden;
                    font-size: 12px;
                    text-align: center;
                    opacity: 0.0;
                    z-index: 10100;
                }
            }
        }
    }
</style>
