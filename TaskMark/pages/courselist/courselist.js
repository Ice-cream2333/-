// pages/courselist/courselist.js
var app = getApp()
Page({
  data:{
    course: []
  },
  course:function(e){
    console.log(e.target);
    wx.navigateTo({
      url: '../course/course?id=' + e.currentTarget.dataset.id + '&name=' + e.currentTarget.dataset.name
    })
  },
  addcourse:function(){
    wx.navigateTo({
      url: '../addcourse/addcourse'
    })
  },
  init: function(){
    var _this = this
    wx.request({
      url: app.globalData.ip + '/daxuejun/wx/courses', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json',
        'authorization': wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(res.data)
        _this.setData({
          course: res.data.result
        })
      }
    })
  },
  onPullDownRefresh: function () {
    // console.log(1);
    this.init();
    wx.stopPullDownRefresh()
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
    this.init();
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})