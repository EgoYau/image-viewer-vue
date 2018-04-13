import imageViewer from './ImageViewer.vue'

const imgViewer = {
    install(Vue, options){
        Vue.component(imageViewer.name, imageViewer)
    }
}

export default imgViewer