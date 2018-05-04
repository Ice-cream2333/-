Page({
  data:{
    result: 0,
    tip: '相当于',
    img: ''
  },
  backTraining: function() {
    wx.redirectTo({
      url: '../test/test'
    })
  },
  getRank: function(index) {
    var imglist = [
      'http://ojpmyoxbq.bkt.clouddn.com/qual-1g-1.png',
      'http://ojpmyoxbq.bkt.clouddn.com/qual-1g-2.png',
      'http://ojpmyoxbq.bkt.clouddn.com/qual-2g-1.png',
      'http://ojpmyoxbq.bkt.clouddn.com/qual-2g-2.png',
      'http://ojpmyoxbq.bkt.clouddn.com/qual-3g-1.png',
      'http://ojpmyoxbq.bkt.clouddn.com/qual-3g-2.png',
      'http://ojpmyoxbq.bkt.clouddn.com/qual-4g-1.png',
      'http://ojpmyoxbq.bkt.clouddn.com/qual-4g-2.png',
      'http://ojpmyoxbq.bkt.clouddn.com/qual-5g-1.png',
      'http://ojpmyoxbq.bkt.clouddn.com/qual-5g-2.png',
      'http://ojpmyoxbq.bkt.clouddn.com/qual-6g-1.png',
      'http://ojpmyoxbq.bkt.clouddn.com/qual-6g-2.png'
    ];
    this.setData({
      img: imglist[index]
    })
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    var level = parseInt(options.level) - 1;
    var data = {
      result: 6000,
      rank: level
    }
    this.setData({
      result: data.result
    })
    this.getRank(data.rank);
  },
  onShareAppMessage: function () {
    return {
      title: '语文菌',
      desc: '自定义分享描述',
      path: '../home/home'
    }
  }
})
