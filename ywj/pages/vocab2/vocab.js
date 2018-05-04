var app = getApp()
Page({
  data:{
    index: 0,
    count: 0,
    index1: 1050,
    index2: 1050,
    index3: 1050,
    opacity1: 1,
    opacity2: 0,
    opacity3: 0,
    scrollTop: 0,
    scrollTop2: 0,
    isturn: true,
    isChange: true,//大小
    flag: false,
    animation1: {},
    animation2: {},
    animation3: {},
    word: [],
    detail: {}
  },
  init: function(){
    this.data.word = [];
    for(var i = 0; i < 3; i++){
      this.data.word.push(this.data.words[i]);
    }
    this.setData({
      index: 0,
      count: 0,
      index1: 1050,
      index2: 1050,
      index3: 1050,
      opacity1: 1,
      opacity2: 0,
      opacity3: 0,
      animation1: {},
      animation2: {},
      animation3: {},
      word: this.data.word,
    })
  },
  turnLarge: function(){
    this.setData({
      isChange: false,
      test:true
    })
    this.init();
    this.getDetail();
    this.animation1.scale(1.15,1.15).translateY(-30).step() 
    this.animation1.opacity(1).step()             
    this.setData({
      animation1: this.animation1.export()
    })
    this.animation2.rotate(0).translateX(0).step()
    this.animation2.translateY(0).scale(1,1).step()   
    this.animation2.opacity(1).step()   
    this.setData({
      animation2: this.animation2.export()
    })
  },
  turnSmall: function() {
    this.setData({
      isChange: true,
      isEmpty: false,
      opacity1: 1,
      opacity2: 0,
      opacity3: 0,
      word: []
    })
    // this.dh3();
    this.animation3.rotate(30).translateX(250).step({timingFunction: "ease"})
    this.animation3.opacity(0).step()    
    this.setData({
      animation3: this.animation3.export()
    })
    this.animation1.rotate(0).translateX(0).step()
    this.animation1.translateY(0).scale(1,1).step()   
    // this.animation1.scale(1.15,1.15).translateY(-30).step()
    this.animation1.opacity(1).step()                    
    this.setData({
      animation1: this.animation1.export()
    })
    this.animation2.rotate(0).translateX(0).step()
    this.animation2.translateY(0).scale(1,1).step()   
    this.animation2.opacity(1).step()   
    this.setData({
      animation2: this.animation2.export()
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
    
    // this.animation1.rotateY(180).scale(1.3,1.3).step({duration: 1000})      
    // this.setData({
    //   animation1: this.animation1.export()
    // })
  },
  hideDetail: function(){
    this.setData({
      isturn: true,
      scrollTop: this.data.scrollTop2
    })
    this.dh3();
  },
  nextWord: function(num){
    var index = (this.data.index + 2)%this.data.words.length;
    var word = this.data.words[index];
   
    this.data.word[num] = this.data.words[index];
    this.setData({
      word: this.data.word
    })
    // console.log(this.data.words[index])
    this.getDetail();    
  },
  dh:function(){
    if(this.data.count%3 == 0){
      this.animation1.rotate(30).translateX(250).step({timingFunction: "ease"})
      this.animation1.opacity(0).step()    
      this.setData({
        animation1: this.animation1.export()
      })
      this.animation2.scale(1.15,1.15).translateY(-30).step()
      this.animation2.opacity(1).step()         
      this.setData({
        animation2: this.animation2.export()
      })
      this.animation3.rotate(0).translateX(0).step()
      this.animation3.translateY(0).scale(1,1).step()   
      this.animation3.opacity(1).step({delay: 250})   
      this.setData({
        animation3: this.animation3.export()
      })
      this.setData({
        opacity2: 1,
        opacity3: 0,
      })
    }else if(this.data.count%3 == 1){
      this.animation2.rotate(30).translateX(250).step({timingFunction: "ease"})
      this.animation2.opacity(0).step()    
      this.setData({
        animation2: this.animation2.export()
      })
      this.animation3.scale(1.15,1.15).translateY(-30).step()
      this.animation3.opacity(1).step()           
      this.setData({
        animation3: this.animation3.export()
      })
      this.animation1.rotate(0).translateX(0).step()
      this.animation1.translateY(0).scale(1,1).step()   
      this.animation1.opacity(1).step({delay: 250})   
      this.setData({
        animation1: this.animation1.export()
      })
      this.setData({
        // index1: 1045,
        opacity1: 0, 
        opacity3: 1
      })
    }else if(this.data.count%3 == 2){
      this.animation3.rotate(30).translateX(250).step({timingFunction: "ease"})
      this.animation3.opacity(0).step()    
      this.setData({
        animation3: this.animation3.export()
      })
      this.animation1.scale(1.15,1.15).translateY(-30).step()
      this.animation1.opacity(1).step()                    
      this.setData({
        animation1: this.animation1.export()
      })
      this.animation2.rotate(0).translateX(0).step()
      this.animation2.translateY(0).scale(1,1).step()   
      this.animation2.opacity(1).step({delay: 250})   
      this.setData({
        animation2: this.animation2.export()
      })
      this.setData({
        // index2: 1045,
        opacity1: 1, 
        opacity2: 0
      })
    }
  },
  dh2: function(){
    if(this.data.count%3 == 0){
      this.nextWord(2);
      this.setData({
        index1: 1045,
        opacity1: 0
      })
    }else if(this.data.count%3 == 1){
      this.nextWord(0);
       this.setData({
        index2: 1045,
        opacity2: 0
      })
    }else if(this.data.count%3 == 2){
      this.nextWord(1);
      this.setData({
        index1:1050,
        index2:1050,
        index3:1050,
        opacity3: 0
      })    
    }
  },
  dh3:function(){
    if(this.data.count%3 == 1){
      this.animation2.scale(1.15,1.15).step()
      this.animation2.opacity(1).step()         
      this.setData({
        animation2: this.animation2.export()
      })
      this.animation3.rotate(0).translateX(0).step()
      this.animation3.translateY(0).scale(1,1).step()   
      // this.animation3.opacity(1).step()   
      this.setData({
        animation3: this.animation3.export()
      })
    }else if(this.data.count%3 == 2){
      this.animation3.scale(1.15,1.15).step()
      this.animation3.opacity(1).step()           
      this.setData({
        animation3: this.animation3.export()
      })
      this.animation1.rotate(0).translateX(0).step()
      this.animation1.translateY(0).scale(1,1).step()   
      // this.animation1.opacity(1).step()   
      this.setData({
        animation1: this.animation1.export()
      })
    }else if(this.data.count%3 == 0){
      this.animation1.scale(1.15,1.15).step()
      this.animation1.opacity(1).step()                    
      this.setData({
        animation1: this.animation1.export()
      })
      this.animation2.rotate(0).translateX(0).step()
      this.animation2.translateY(0).scale(1,1).step()   
      // this.animation2.opacity(1).step()   
      this.setData({
        animation2: this.animation2.export()
      })
    }
  },  
  dh4:function(){
    if(this.data.count%3 == 0){
      this.animation2.scale(1.15,1.15).step()
      this.animation2.opacity(1).step()         
      this.setData({
        animation2: this.animation2.export()
      })
      this.animation3.rotate(0).translateX(0).step()
      this.animation3.translateY(0).scale(1,1).step()   
      // this.animation3.opacity(1).step()   
      this.setData({
        animation3: this.animation3.export()
      })
    }else if(this.data.count%3 == 2){
      this.animation3.scale(1.15,1.15).step()
      this.animation3.opacity(1).step()           
      this.setData({
        animation3: this.animation3.export()
      })
      this.animation1.rotate(0).translateX(0).step()
      this.animation1.translateY(0).scale(1,1).step()   
      // this.animation1.opacity(1).step()   
      this.setData({
        animation1: this.animation1.export()
      })
    }else if(this.data.count%3 == 0){
      this.animation1.scale(1.15,1.15).step()
      this.animation1.opacity(1).step()                    
      this.setData({
        animation1: this.animation1.export()
      })
      this.animation2.rotate(0).translateX(0).step()
      this.animation2.translateY(0).scale(1,1).step()   
      // this.animation2.opacity(1).step()   
      this.setData({
        animation2: this.animation2.export()
      })
    }
  },
  move: function(event){
    this.data.flag = true;
    this.setData({
      flag: true,
    })
    this.dh();         
  },
  clearMove: function(){
    if(this.data.flag){
      this.dh2();
      var index = this.data.index + 1;
      var count = this.data.count + 1;      
      if(index >= this.data.words.length)
        index = 0;
      this.setData({
        flag: false,
        index: index,
        count: count
      })
    }else{
      this.showDetail();
    }
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
    // this.setData({
    //   words: app.globalData.words
    // })
    var data = [
      {
        word: '一',
      },{
        word: '二',
      },{
        word: '三',
      },{
        word: '四',
      },{
        word: '五',
      },{
        word: '六',
      },{
        word: '七',
      },{
        word: '八',
      },{
        word: '九',
      },{
        word: '十',
      },{
        word: '百',
      },{
        word: '千',
      }
    ]
    this.setData({
      words: data
    })
    this.animation1 = wx.createAnimation({
      duration: 500,
      timingFunction: "ease",
      delay: 0
    })
    this.animation2 = wx.createAnimation({
      duration: 500,
      timingFunction: "ease",
      delay: 0
    })
    this.animation3 = wx.createAnimation({
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