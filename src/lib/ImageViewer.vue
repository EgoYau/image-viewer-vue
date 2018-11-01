<template id="ImageViewer">
    <div ref="imageContainer" class="image-container">
        <div class="image-viewer-wrap" @click="clickWrap()">
            <div ref="imageDiv" class="image-div" @click.stop="clickImageDiv">
                <Spin size="large" fix v-if="spinShow"></Spin>
                <div ref="imageDiv"
                     class="image-photos"
                     @mousewheel="mouseWheelScroll($event)">
                    <img class="imgContent"
                         draggable="false"
                         ref="imagePhoto"
                         :src="innerImgUrl"
                         :alt="alt"
                         @click.stop="clickImage()"
                         @load="imageLoadSuccess()"
                         @error="imageLoadError()"
                         @mousedown="mousedown"
                         @mousemove="mousemove"
                         @mouseup="mouseup">
                    <span class="cancelButton iconfont"
                        @click.stop="closeSelf()"
                        @mouseenter="cancelButtonHighlight = true"
                        @mouseleave="cancelButtonHighlight = false">
                    </span>
                    <span class="leftButton iconfont icon-zuojiantou" 
                        v-if="showArrow"
                        @click.stop="leftBtnClick()">
                    </span>
                    <span class="rightButton iconfont icon-youjiantou" 
                        v-if="showArrow"
                        @click.stop="rightBtnClick()">
                    </span>
                    <span class="bottomTitle" 
                        @click.stop="clickImage()">
                        {{innerTitle}}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import '../assets/iconfont/iconfont.css'
    let position = {
        offsetX: 0, //点击处偏移元素的X
        offsetY: 0, //偏移Y值
        state: 0 //是否正处于拖拽状态，1表示正在拖拽，0表示释放
    };
    export default {
        name: 'image-viewer-vue',
        props: {
            // 图片url数组
            imgUrlList: {
                type: Array,
                default: [],
                required: true
            },
            // 图片alt描述
            alt: {
                type: String,
                default: '图片',
                required: false
            },
            // 当前图片索引
            index: {
                type: Number,
                default: 0,
                required: false
            },
            // 底部文字描述
            title: {
                type: String,
                default: '图片',
                required: false
            },
            // 点击空白处是否可关闭
            closable: {
                type: Boolean,
                default: true,
                required: false
            },
            // 是否可循环浏览图片
            cyclical: {
                type: Boolean,
                default: true,
                required: false
            }
        },
        data() {
            return {
                // 内部变量
                innerIndex: 0,
                innerImgUrl: '',
                innerTitle: '',
                isLoadError: false,
                showArrow: false,
                spinShow: true,
                cancelButtonHighlight: false
            }
        },
        methods: {
            // 图片加载完成
            imageLoadSuccess: function() {
                this.fixImageSize();
                this.spinShow = false;
                this.isLoadError = false;
                this.$emit('imageLoadSuccess', this.innerIndex)
            },
            // 图片加载失败
            imageLoadError: function() {
                this.fixImageSize();
                this.spinShow = false;
                this.isLoadError = true;
                this.$emit('imageLoadError', this.innerIndex)
            },
            // 调整图片尺寸
            fixImageSize: function() {
                let imageDom = this.$refs.imagePhoto;
                imageDom.width = imageDom.naturalWidth || 400;
                imageDom.height = imageDom.naturalHeight || 400;
                let width = imageDom.width,
                    height = imageDom.height,
                    maxWidth = document.body.clientWidth,
                    maxHeight = document.body.clientHeight,
                    widthRate = width / maxWidth,
                    heightRate = height / maxHeight;
                if (widthRate >= 0.9 || heightRate >= 0.9) {
                    if (widthRate >= heightRate) {
                        let tempRate = width / (maxWidth * 3 / 4);
                        width = maxWidth * 3 / 4;
                        imageDom.width = width;
                        imageDom.height = height / tempRate;
                    } else {
                        let tempRate = height / (maxHeight * 3 / 4);
                        height = maxHeight * 3 / 4;
                        imageDom.width = (width / tempRate);
                        imageDom.height = height;
                    }
                }
            },
            // 点击事件
            clickWrap: function() {
                if (this.closable){
                    this.closeSelf();
                }
            },
            clickImageDiv: function(){

            },
            clickImage: function() {
                this.$emit("clickImage", this.innerIndex);
            },
            // 关闭按钮
            clickCloseIcon: function() {
                this.closeSelf();
            },
            // 左翻页
            leftBtnClick: function() {
                let imgUrlList = this.imgUrlList,
                    totalCount = imgUrlList.length;
                if (this.innerIndex > 0) {
                    this.innerIndex--;
                } else {
                    if (this.cyclical){
                        this.innerIndex = imgUrlList.length - 1;
                    }else{
                        this.innerIndex = 0
                    }
                }
                this.innerImgUrl = imgUrlList[this.innerIndex];
            },
            // 右翻页
            rightBtnClick: function() {
                let imgUrlList = this.imgUrlList,
                    totalCount = imgUrlList.length;
                if (this.innerIndex < totalCount - 1) {
                    this.innerIndex++;
                } else {
                    if (this.cyclical){
                        this.innerIndex = 0;
                    }else{
                        this.innerIndex = imgUrlList.length - 1;
                    }
                }
                this.innerImgUrl = imgUrlList[this.innerIndex];
            },
            // 关闭
            closeSelf: function() {
                this.reset();
                this.$emit("closeImageViewer");
            },
            // 重置
            reset: function() {
                this.position = {
                    offsetX: 0, //点击处偏移元素的X
                    offsetY: 0, //偏移Y值
                    state: 0 //是否正处于拖拽状态，1表示正在拖拽，0表示释放
                };
            },
            // 移动事件
            mousedown: function(event) {
                //获得偏移的位置以及更改状态
                let e = this.getEvent(event);
                position.offsetX = e.offsetX;
                position.offsetY = e.offsetY;
                position.state = 1;
            },
            mouseup: function(event) {
                position.state = 0;
            },
            mousemove: function(event) {
                var e = this.getEvent(event);
                if (position.state) {
                    position.endX = e.clientX;
                    position.endY = e.clientY;
                    //设置绝对位置在文档中，鼠标当前位置-开始拖拽时的偏移位置
                    let element = this.$refs.imageDiv;
                    element.style.top = position.endY - position.offsetY + 'px';
                    element.style.left = position.endX - position.offsetX + 'px';
                }
            },
            // 鼠标滚轮事件
            mouseWheelScroll(e) {
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
                } else {
                    // 缩小 滚轮上滑
                    if (width > 300) {
                        imgW = width * 0.975;
                        imgH = height * 0.975;
                    }
                }
                image.height = Math.round(imgH);
                image.width = Math.round(imgW);
                var offsetLeft = (imageDiv.offsetLeft),
                    offsetTop = (imageDiv.offsetTop);
                imageDiv.style.left = '' + (offsetLeft - (imgW - width) / 2) + 'px';
                imageDiv.style.top = '' + (offsetTop - (imgH - height) / 2) + 'px';
            },
            getEvent: function(event) {
                return event || window.event;
            }
        },
        mounted (){
            this.showArrow = this.imgUrlList.length > 1;
            this.fixImageSize();
        },
        // watch方法有先后顺序
        watch: {
            'index': {
                handler: function(newValue) {
                    this.innerIndex = Number(newValue);
                },
                immediate: true
            },
            'cancelButtonHighlight': {
                handler: function(newValue) {
                    console.log('cancelButtonHighlight = ' + newValue)
                },
                immediate: true
            },  
            'innerIndex': {
                handler: function(newValue, oldValue) {
                    let tempValue = Number(newValue),
                        element = this.$refs.imageDiv;
                    if (element && element.style) {
                        element.style.top = '';
                        element.style.left = '';
                    }
                    tempValue < 0 && (tempValue = 0)
                    tempValue > this.imgUrlList.length && (tempValue = this.imgUrlList.length - 1)
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
.icon-guanbi, .icon-guanbi-highlight{
    font-size: 32px;
}

.image-container {
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
            &:hover>.leftButton {
                opacity: 0.4;
            }
            &:hover>.rightButton {
                opacity: 0.4;
            }
            &:hover>.bottomTitle {
                opacity: 0.8;
            }
            .imgContent {
                cursor: move;
            }
            .cancelButton {
                width: 32px;
                height: 32px;
                position: absolute;
                top: -16px;
                right: -16px; 
                background: url(../assets/img/img-viewer-cancel.png) round;
                &:hover {
                    background: url(../assets/img/img-viewer-cancel-highlight.png) round;
                };
                z-index: 10100;
                cursor: pointer;
            }
            .leftButton {
                height: 68px;
                position: absolute;
                top: 0;
                bottom: 0;
                margin-top: auto;
                margin-bottom: auto;
                left: 0; 
                background-repeat: repeat;
                opacity: 0.0;
                z-index: 10100;
                font-size: 68px;
                cursor: pointer;
                &:hover {
                    opacity: 1;
                }
            }
            .rightButton {
                height: 68px;
                position: absolute;
                top: 0;
                bottom: 0;
                margin-top: auto;
                margin-bottom: auto;
                right: 0; 
                background-repeat: repeat;
                opacity: 0.0;
                z-index: 10100;
                font-size: 68px;
                cursor: pointer;
                &:hover {
                    opacity: 1;
                }
            }
            .bottomTitle {
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                height: 32px;
                line-height: 32px;
                background-color: rgba(0, 0, 0, .8);
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