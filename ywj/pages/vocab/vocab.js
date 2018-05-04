var app = getApp()
Page({
  data:{
    index: 0,
    scrollTop: 0,
    scrollTop2: 0,
    test: true,
    isturn: true,
    isEmpty: false,
    isChange: true,//大小
    flag: false,
    divX: '50%',
    divY: '50%',
    animation: {},
    animations: {},
    word: {},
    detail: {}
  },
  turnLarge: function(){
    this.setData({
      isChange: false,
      test:true
    })
    this.setData({
      index: 0,
      word: this.data.words[0],
      nextword: this.data.words[1],
    })
    this.getDetail();    
  },
  turnSmall: function() {
    this.setData({
      isChange: true,
      isEmpty: false
    })
  },
  getScrollTop: function(event) { 
	  var scrollTop = parseInt(event.detail.scrollTop); 
    console.log(event);
	  this.setData({
      scrollTop: scrollTop
    })
  }, 
  getDetail: function(){
    var word = this.data.words[this.data.index].word;
    var _this = this;
    wx.request({
      url: 'https://edu.tachiba.cn/word/getWordDetails',
      data: {
        word: word
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res.data)
        res.data.brief = res.data.brief.replace(/<brs*\/?>/gi,"\r\n");
        _this.setData({
          detail: res.data
        });
      }
    })
  },
  showDetail: function(event){
    this.setData({
      scrollTop2: this.data.scrollTop
    })
    if(this.data.isChange){
      var index = event.currentTarget.id;
      this.setData({
        index: parseInt(index),
        word: this.data.words[index]
      })
      this.getDetail();
    }
    this.setData({
      isturn: false,
    })
  },
  hideDetail: function(){
    this.setData({
      isturn: true,
      scrollTop: this.data.scrollTop2
    })
  },
  nextWord: function(){
    var index = this.data.index + 1;
    var nextindex = index + 1;
    console.log(index)
    if(nextindex >= this.data.words.length){
      index = this.data.words.length-1;
      this.setData({
        isEmpty: true,
        index: index,
        word: this.data.words[index]
      })
    }
    else{
      this.setData({
        index: index,
        word: this.data.words[index],
        nextword: this.data.words[nextindex]
      })
    }
    this.getDetail();    
  },
  startMove: function(){},
  dh:function(){
    this.animation.rotate(30).translateX(250).step({timingFunction: "ease"})
    this.animation.opacity(0).step()   
    this.setData({
      animation: this.animation.export()
    })
  },
  move: function(event){
    // var divX = parseInt(event.touches[0].pageX)
    // var divY = parseInt(event.touches[0].pageY)
    // this.setData({
    //   divX: divX + 'px',
    //   divY: divY + 'px',
    //   x: divX,
    //   y: divY
    // })
    this.dh();
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
  clearMove: function(){
    // this.nextWord();
    
    if(this.data.flag){
      // if(this.data.x >= this.data.width-30 || this.data.x <= 75){
      //   this.nextWord();
      //   this.delay();
      // }else if(this.data.y >= this.data.height-150 || this.data.y <= 40){
      //   this.nextWord();     
      //   this.delay();
      // }
      this.setData({
        flag: false
      })
    }else
      this.showDetail();
    this.setData({
      divX: '50%',
      divY: '50%'
    })

      // this.setData({
      //   test: false
      // })
  },
  removeWord: function(event){
    var index = this.data.index;
    var word = this.data.words[index].word;
    this.data.words.splice(index,1);
    if(this.data.isChange == false){
      if(index >= this.data.words.length-1){
        this.setData({
          index: index-1,
          word: this.data.words[index-1]
        })
      }else{
        this.setData({
          word: this.data.words[index],
          nextword: this.data.words[index+1]
        })
      }
    }
    var _this = this;
    wx.request({
      url: 'https://edu.tachiba.cn/word/removeWrongWordByUserId',
      data: {
        accesstoken: 2,
        word: word
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res.data)
      }
    })
    app.globalData.words = this.data.words;
    this.setData({
      words: this.data.words
    })
     wx.showToast({
      title: '删除',
      icon: 'success',
      duration: 2000
    })
    this.hideDetail();
  },
  onReady: function(){
    this.setData({
      words: app.globalData.words
    })
    this.animation = wx.createAnimation({
      duration: 500,
      timingFunction: "ease",
      delay: 0
    })
    var _this = this;
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