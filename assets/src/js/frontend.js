import Vue from 'vue/dist/vue.min.js'
import Tinybox from 'vue-tinybox'
import '../sass/frontend.scss'

const jPageSlider = () => {
  const images = [
    `https://picsum.photos/200/300`,
    `https://picsum.photos/200/300`,
    `https://picsum.photos/200/300`,
    `https://picsum.photos/200/300`,
    `https://picsum.photos/200/300`,
    `https://picsum.photos/200/300`,
  ]
  const thumbs = [
    `https://picsum.photos/200/300`,
    `https://picsum.photos/200/300`,
    `https://picsum.photos/200/300`,
    `https://picsum.photos/200/300`,
    `https://picsum.photos/200/300`,
    `https://picsum.photos/200/300`,
  ]
  const image_gallery = new Vue({
    el: '#image_gallery',
    components: {
      tinybox: Tinybox,
    },
    data: {
      index: null,
      isLoading: true,
      images: [
        {
          src: images[0],
          thumbnail: thumbs[0],
          caption: 'Gallery photo 01 caption here',
          alt: 'himan_pocchari07_ojisan',
        },
        {
          src: images[1],
          thumbnail: thumbs[1],
          caption: 'Gallery photo 02 caption here',
          alt: 'himan_pocchari07_ojisan',
        },
        {
          src: images[2],
          thumbnail: images[2],
          caption: 'Gallery photo 03 caption here',
          alt: 'himan_pocchari07_ojisan',
        },
        {
          src: images[3],
          thumbnail: thumbs[3],
          caption: 'Gallery photo 04 caption here',
          alt: 'himan_pocchari07_ojisan',
        },
        {
          src: images[4],
          thumbnail: thumbs[4],
          caption: 'Gallery photo 05 caption here',
          alt: 'himan_pocchari07_ojisan',
        },
        {
          src: images[5],
          thumbnail: thumbs[5],
          caption: 'Gallery photo 06 caption here',
          alt: 'himan_pocchari07_ojisan',
        },
      ],
    },
    mounted: function () {
      this.isLoading = false
      if (!this.isLoading) {
      }
      console.log('aaa')
    },
  })
}

jPageSlider()
