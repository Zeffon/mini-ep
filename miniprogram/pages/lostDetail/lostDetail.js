// miniprogram/pages/lostDetail/lostDetail.js

import { Lost } from '../../models/lost.js';
Page({

  data: {
    lost: null
  },

  async onLoad (options) {
    const lid = options.lid
    this.getDetail(lid)
  },

  async getDetail(lid) {
    const lost = await Lost.getDetail(lid)
    this.setData({
      lost
    })
  }
})