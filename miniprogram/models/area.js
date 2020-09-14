class Area {

  static STORAGE_KEY = 'area'
  static STORAGE_SELECT = 'select_area'

  static async getArea() {
    const res = await wx.cloud.callFunction({
      name: 'area',
    })
    this.setLocal(res.result.data)
    return res.result.data
  }

  static getLocal() {
    const area = wx.getStorageSync(Area.STORAGE_KEY)
    return area ? area : null
  }

  static setLocal(area) {
    wx.setStorageSync(Area.STORAGE_KEY, area)
  }

  static getSelectArea() {
    const selectArea = wx.getStorageSync(Area.STORAGE_SELECT)
    return selectArea ? selectArea : null
  }

  static setSelectArea(selectArea) {
    wx.setStorageSync(Area.STORAGE_SELECT, selectArea)
  }

}

export {
  Area
}