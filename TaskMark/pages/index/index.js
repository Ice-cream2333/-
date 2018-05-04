//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  enter: function() {
    this.initUser();
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  initUser() {
    var that = this;
    wx.request({
      url: app.globalData.ip + '/daxuejun/wx/students/' + wx.getStorageSync('studentId'), //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json',
        'authorization': wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(res.data)
        if(res.data.code == 200){
          if(res.data.result.studentName == null){
            wx.navigateTo({
              url: '../create/create'
            })
          }else {
            wx.navigateTo({
              url: '../courselist/courselist'
            })
          }
        }
      }
    })
  },
  onLoad: function () {
    console.log('onLoad')
    // app.checklogin()
    // app.login()
  },
  onShow: function() {
    // app.checklogin();
    app.login()
  }
})
