import {random} from '../../util/common.js'
import {Area} from "../../models/area";
import {Banner} from "../../models/banner";
import {Lost} from '../../models/lost.js';

Page({

  data: {
    banners: [],
    losts: [],
    searching: false,
    more: '',
    selectArea: []
  },

  async onLoad (options) {
    this.initArea()
    this.initBanner()
    this.initLostData()
  },

  async onShow() {

  },

  async initLostData() {
    let area = Area.getSelectArea()
    this._searchArea(area)
  },

  async initBanner() {
    let banners = await Banner.getBanner()
    this.setData({
      banners
    })
  },

  async initArea() {
    let area = Area.getLocal()
    if(!area) {
      area = await Area.getArea()
    }
    this.setData({
      selectArea: area
    })
  },

  async _searchArea(area) {
    let losts = []
    if(area === null || area === "全部") {
      losts = await Lost.listLost(0, false)
    } else {
      losts = await Lost.listLost(0, area)
    }
    this.setData({
      losts
    })
  },

  async onSelectArea(event) {
    let selectArea = event.detail.name
    Area.setSelectArea(selectArea)
    this._searchArea(selectArea)
  },

  onSearching() {
    this.setData({
      searching: true
    })
  },

  onCancel() {
    this.setData({
      searching: false
    })
  },

  //随机字符串保证每次触底会改变组件中more属性值
  async onReachBottom() {
    this.setData({
      more: random(16)
    })
    let losts = []
    let start = this.data.losts.length
    let area = Area.getSelectArea()
    if(area === null || area === "全部") {
      losts = await Lost.listLost(start, false)
    } else {
      losts = await Lost.listLost(start, area)
    }
    this.setData({
      losts: this.data.losts.concat(losts)
    })
  },

})