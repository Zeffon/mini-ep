
const db = wx.cloud.database()

class Lost {

  static async search(start, q) {
    const res = await db.collection('lost').where({
      name: q
    }).get()  
    return res.data
  }

  static async list(start, area) {
    console.log(start)
    console.log(area)
    let res = null;
    if(area === false) {
      res = await wx.cloud.callFunction({
        name: 'paginator2',
        data: {
          dbName: 'lost',
          filter: null,
          start: start,
          count: 20
        }
      }) 
    } else {
      res = await wx.cloud.callFunction({
        name: 'paginator2',
        data: {
          dbName: 'lost',
          filter: {lostAddress:area},
          start: start,
          count: 20
        }
      })
    }
    return res.result.data
  }

  static async searchByName(name) {
    const res = await db.collection('lost').where({
      name: name
    }).get()  
    return res.data
  }

  static async listLost(start, area) {
    let res = null;
    if(area === false) {
      res = await db.collection('lost').skip(start).get()  
    } else {
      res = await db.collection('lost').where({
        lostAddress: area
      }).skip(start).get()
    }
    return res.data
  }

  static async getDetail(id) {
    const res = await db.collection('lost').where({
      _id: id
    }).get()
    return res.data[0]
  }
  
}

export {Lost}
