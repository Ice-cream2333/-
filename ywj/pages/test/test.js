Page({
  data:{
    tip: '点击你认识的卡片',
    words: [],
    result: ''
  },
  check: function(event) {
    var index = event.currentTarget.id;
    this.data.words[index].isCheck = true;
    this.setData({
      words: this.data.words
    })
  },
  uncheck: function(event) {
    var index = event.currentTarget.id;
    this.data.words[index].isCheck = false;
    this.setData({
      words: this.data.words
    })
  },
  back: function() {
    wx.navigateBack({
      delta: 1
    })
  },
  nextStep: function() {
    this.getData();
  },
  getUnknow: function() {
    var list = [];
    for(var i = 0; i < 9; i++){
      if(!this.data.words[i].isCheck)
        list.push(this.data.words[i].word);
    }
    return list.toString();
  },
  getWords: function() {
    for(var i = 0 ; i < 9; i++){
      this.data.words[i].isCheck = false;
      this.setData({
        words: this.data.words
      })
    }
  },
  getData: function(){
    var str = this.getUnknow(); 
    console.log(str)    
    var _this = this;
    wx.request({
      url: 'https://edu.tachiba.cn/word/saveLevel',
      data: {
        words: str,
        accesstoken: 2
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res.data)
        if(res.data.result == null){
          _this.data.words = [];          
          _this.setData({
            words: res.data.words
          })
          _this.getWords();
        }else
          wx.redirectTo({
            url: '../result/result?level='+res.data.result
          })
      }
    })
  },
  onReady: function() {
    var _this = this;
    wx.request({
      url: 'https://edu.tachiba.cn/word/getWordsFirst',
      data: {
        // words: '' ,
        accesstoken: 2
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res.data)
        _this.setData({
          words: res.data.words,
          result: res.data.result
        })
         _this.getWords();
      }
    })
  }
})