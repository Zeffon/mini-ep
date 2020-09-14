
const db = wx.cloud.database()

class Remark {

  static async getRemark() {
    const res = await db.collection('remark').where({
      online: true
    }).get()
    return res.data[0]
  }

}

export {Remark}