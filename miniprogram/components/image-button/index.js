// components/image-button/index.js
Component({
  // 开启插槽
  options: {
      multipleSlots: true
  },
  properties: {
      openType: {
          type: String
      }
  },

  data: {

  },


  methods: {
      onGetUserInfo(event) {
          // console.log(event)
          this.triggerEvent('getuserinfo', event.detail, {})
      }
  }
})