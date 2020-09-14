// components/card/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    lost: Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onItemTap(event) {
      const lid = event.currentTarget.dataset.lid
      wx.navigateTo({
          url: `/pages/lostDetail/lostDetail?lid=${lid}`
      })
    },
  }
})
