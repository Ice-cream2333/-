var app = getApp()
Page({
  data:{
    index: 0,
    isturn: true,
    isEmpty: false,
    flag: false,
    divX: '50%',
    divY: '40%',
    tip: '小提示：点击卡片查看释义等'
  },
  showDetail: function(){
   this.setData({
     isturn: false,
     tip: '小提示：点击返回训练'
   })
  },
  hideDetail: function(){
    this.setData({
      isturn: true,
      tip: '小提示：点击卡片查看释义等'
   })
  },
  nextWord: function(){
    var index = this.data.index + 1;
    var nextindex = index + 1;
    console.log(index)
    if(nextindex >= this.data.words.length){
      this.getNewOne();
    }
    else{
      this.setData({
        index: index,
        word: this.data.words[index],
        nextword: this.data.words[nextindex],
      })
    }
  },
  getNewOne:function(){
    var _this = this;    
    wx.request({
      url: 'https://edu.tachiba.cn/word/trainWords',
      data: {
        accesstoken: 2
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res.data)
        for(var i = 0; i < res.data.length; i++)
          _this.data.words.push(res.data[i]);
        _this.setData({
          words: _this.data.words
        })
      }
    })
  },
  startMove: function(event){
    
  },
  move: function(event){
    var divX = parseInt(event.touches[0].pageX)
    var divY = parseInt(event.touches[0].pageY)
    this.setData({
      divX: divX + 'px',
      divY: divY + 'px',
      x: divX,
      y: divY
    })
    this.data.flag = true;
    // console.log(divX);
    // console.log(divY);
  },
  delay: function() {
    this.setData({
      isEmpty: true
    })
    var index = this.data.index + 1;
    if(index < this.data.words.length){
      setTimeout(function(){
        this.setData({
          isEmpty: false
        })
      }.bind(this),200)
    }
  },
  clearMove: function(event){
    if(this.data.flag){
      if(this.data.x >= this.data.width-30 || this.data.x <= 75){
        this.nextWord();    
        this.delay();
      }else if(this.data.y >= this.data.height-150 || this.data.y <= 40){
        this.nextWord(); 
        this.delay();            
      }
      this.setData({
        flag: false
      })
    }else
      this.showDetail();
    this.setData({
      divX: '50%',
      divY: '40%'
    })
  },
  pushTest: function(){
    wx.navigateTo({
      url: '../test/test'
    })
  },
  pushVacob: function(){
    wx.navigateTo({
      url: '../vocab2/vocab'
    })
  },
  addWord: function(){
    var index =  app.globalData.words.length;
    var word = this.data.word.word;
    app.globalData.words[index] = this.data.words[this.data.index];
    wx.request({
      url: 'https://edu.tachiba.cn/word/insertWords',
      data: {
        words: word,
        accesstoken: 2
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res.data)
      }
    })
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 2000
    })
  },
  onReady: function(){
    var _this = this;    
    wx.request({
      url: 'https://edu.tachiba.cn/word/trainWords',
      data: {
        accesstoken: 2
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res.data)
        for(var i = 0; i < res.data.length; i++){
          // res.data[i].brief = res.data[i].brief.replace(' ','');   
          res.data[i].brief = res.data[i].brief.replace(/<brs*\/?>/gi,'\n');
        }
        _this.setData({
          words: res.data,
          word: res.data[0],
          nextword: res.data[1]
        })
      }
    })
    wx.getSystemInfo({
      success: function(res) {
        _this.setData({
          width: res.windowWidth,
          height: res.windowHeight
        })
      }
    })
  }
})