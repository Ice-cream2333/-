// pages/create/create.js
var app = getApp()
Page({
  data:{
    sid: '',
    sname: ''
  },
  success:function(){
    setTimeout(() => {
      wx.redirectTo({
        url: '../courselist/courselist'
      })
    }, 600);
  },
  create(){
    var _this = this;
    wx.request({
      url: app.globalData.ip + '/daxuejun/wx/students', //仅为示例，并非真实的接口地址
      data: {
        studentNo: _this.data.sid,
        studentName: _this.data.sname
      },
      method: 'PUT',
      header: {
        'content-type': 'application/json',
        'authorization': wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(res.data)
        wx.showToast({
          title: '添加成功~',
          success: _this.success(),
          duration: 600
        })
      }
    })
  },
  setSid: function (e) {
    this.setData({
      sid: e.detail.value
    })
  },
  setSname: function (e) {
    this.setData({
      sname: e.detail.value
    })
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})