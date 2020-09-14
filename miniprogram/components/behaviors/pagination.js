const paginationBev = Behavior({
  data:{
    dataArray:[],
    total:null,
    noneResult:false,
    loading:false
  },

  methods:{
    setMoreData(dataArray){
      const tempArray = this.data.dataArray.concat(dataArray)
      this.setData({
        dataArray: tempArray
      })
    },
    //获取当前数据
    getCurrentStart(){
      return this.data.dataArray.length
    },
    //设置总数
    setTotal(total){
      this.data.total = total
      if(total == 0){
        this.setData({
          noneResult:true
        })
      }
    },

    //是否有更多数据要加载
    hasMore(){
      if(this.data.dataArray.length >= this.data.total){
        return false
      }else{
        return true
      }
    },

    //清空数据
    initialize(){
      this.setData({
        dataArray:[],
        noneResult:false,
        loading:false
      })
      // this.data.dataArray = []
      this.data.total = null
    },

    isLocked() {
      return this.data.loading ? true : false
    },

    locked() {
      this.setData({
        loading: true
      })
      // this.data.loading = true
    },

    unLocked() {
      this.setData({
        loading: false
      })
      this.data.loading = false
    },

  }
})

export {paginationBev}