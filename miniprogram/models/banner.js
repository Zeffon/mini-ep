
const db = wx.cloud.database()

class Banner {

  static async getBanner() {
    const res = await db.collection('banner').where({
      online: true
    }).get()
    return res.data  
  }

}

export {Banner}