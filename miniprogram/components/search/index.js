import {
  Keyword
} from '../../models/keyword'
import {
  Lost
} from '../../models/lost'
import {
  paginationBev
} from '../behaviors/pagination'

const keyword = new Keyword()

Component({
  behaviors: [paginationBev],
  properties: {
    more: {
      type: String,
      observer: "loadMore"
    }
  },

  data: {
    historyWords: [],
    hotWords: [],
    searching: false,
    q: '',
    loading: false,
    loadingCenter: false
  },

  async attached() {
    this.setData({
      historyWords: keyword.getHistory(),
      hotWords: await keyword.getHot()
    })
  },

  methods: {

    async loadMore() {
      if (!this.data.q) {
        return
      }
      if (this.isLocked()) {
        return
      }
      if (this.hasMore()) {
        this.locked()
        const res = await Lost.searchByName(this.data.q)
        console.log(res)
        this.unLocked()
      }
    },

    onCancel(event) {
      this.triggerEvent('cancel', {}, {})
      this.initialize()
    },

    onDelete(event) {
      this._closeResult()
      this.initialize()
    },

    async onConfirm(event) {
      this._showResult()
      this._showLoadingCenter()
      const q = event.detail.value || event.detail.text
      let res = await Lost.search(0, q)
      this.setData({
        q
      })
      this.setMoreData(res)
      this.setTotal(res.total)
      keyword.addToHistory(q)
      this._hideLoadingCenter()
    },

    _showLoadingCenter() {
      this.setData({
        loadingCenter: true
      })
    },

    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      })
    },

    _showResult() {
      this.setData({
        searching: true
      })
    },

    _closeResult() {
      this.setData({
        searching: false,
        q: ''
      })
    },

  }
})