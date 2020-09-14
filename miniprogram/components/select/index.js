import {
  Area
} from "../../models/area";

Component({

  properties: {
    propArray: {
      type: Array,
    }
  },

  data: {
    selectShow: false,
    selectTitle: "请选择地区",
    animationData: {}
  },

  lifetimes: {
    attached() {
      const selectArea = Area.getSelectArea()
      if (selectArea) {
        this.setData({
          selectShow: false,
          selectTitle: selectArea,
        })
      }
    }
  },

  methods: {
    selectToggle: function () {
      let nowShow = this.data.selectShow;
      let animation = wx.createAnimation({
        timingFunction: "ease"
      })
      this.animation = animation;
      if (nowShow) {
        animation.rotate(0).step();
        this.setData({
          animationData: animation.export()
        })
      } else {
        animation.rotate(180).step();
        this.setData({
          animationData: animation.export()
        })
      }
      this.setData({
        selectShow: !nowShow
      })
    },

    setText(event) {
      let nowData = this.properties.propArray;
      let nowIndex = event.target.dataset.index;
      let selectArea = nowData[nowIndex];
      let name = selectArea.name
      this.animation.rotate(0).step();
      this.triggerEvent('select', {
        name
      }, {
        bubbles: true, // 开启冒泡
        composed: true // 跨越组件的边界
      })
      this.setData({
        selectShow: false,
        selectTitle: name,
        animationData: this.animation.export()
      })
    }
  }
})