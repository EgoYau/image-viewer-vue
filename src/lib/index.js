import imageViewer from './ImageViewer.vue'

const imgViewer = {
    install(Vue, options) {
        Vue.component(imageViewer.name, imageViewer)
    }
}

// if (typeof window !== 'undefined' && window.Vue) {
//     window.Vue.use(imgViewer);
// }

export default imgViewer