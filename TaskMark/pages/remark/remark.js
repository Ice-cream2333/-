// pages/remark/remark.js
var app = getApp()
Page({
  data:{
    data: [],
    list: []
  },
  init:function() {
    var _this = this;
    wx.request({
      url: app.globalData.ip + '/daxuejun/wx/courses/' + _this.data.wid.substring(0, 8) + '/works/' + _this.data.wid + '/workItems/' + _this.data.qid,
      header: {
        'content-type': 'application/json',
        'authorization': wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.code == 200) {
          var data = res.data.result
          var images = data.studentWorkItemUrl.split(",")
          var comment = data.studentWorkItemComment
          var list = [];
          for(var i = 0; i < images.length; i++){
            list.push({
              img: images[i]
              // remark: comments[i]
            })
            console.log(list[i]);
          }
          _this.setData({
            data: list,
            remark: comment
          })
        }
      }
    })
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    // var data = []
    // var imgs = options.img.split(",")
    // console.log(imgs);
    // for(var i = 0; i < imgs.length; i++){
    //   data[i].img = imgs[i];
    //   data[i].remark = i;
    //   console.log(data[i].img);      
    // }
    this.setData({
      wid: options.wid,
      qid: options.qid
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
    this.init()
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})