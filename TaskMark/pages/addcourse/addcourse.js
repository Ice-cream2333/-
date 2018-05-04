// pages/addcourse/addcourse.js
var app = getApp()
Page({
  data:{
    courseId: '',
    errormsg: ''
  },
  add:function(){
    var _this = this;
    wx.request({
      url: app.globalData.ip + '/daxuejun/wx/courses', //仅为示例，并非真实的接口地址
      data: {
        courseId: _this.data.courseId,
      },
      method: 'POST',
      header: {
        'content-type': 'application/json',
        'authorization': wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(res.data)
        if(res.data.code == 200){
          wx.showToast({
            title: '添加成功~',
            success: _this.success(),
            duration: 600
          })
        }else if(res.data.code == 50001){
          _this.setData({
            errormsg: '课程已存在！'
          })
          setTimeout(()=>{
            _this.setData({
              errormsg: ''
            })
          },600)
        }
      }
    })
  },
  success:function(){
    setTimeout(()=>{
      wx.navigateBack({
        delta: 1
      })
    },600);
  },
  setCourseId:function(e) {
    this.setData({
      courseId: e.detail.value
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