

const db = wx.cloud.database()

class Keyword {
  key = 'q'
  maxLength = 8
  getHistory(){
    const words = wx.getStorageSync(this.key)
    if(!words){
      return []
    }
    return words
  }

  async getHot(){
    const res = await db.collection('hot_keyword').get()
    return res.data
  }

  addToHistory(keyword){
    let words = this.getHistory()
    const has = words.includes(keyword)
    if(!has){
      const length = words.length
      if(length >= this.maxLength){
        words.pop()
      }
      words.unshift(keyword)
      wx.setStorageSync(this.key, words)
    }
  }

}

export {Keyword}