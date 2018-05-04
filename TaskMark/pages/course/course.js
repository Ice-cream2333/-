// pages/course/course.js
var app = getApp()
Page({
  data:{
    cid: '12345678',
    isShow: false,
    task: []
  },
  check:function(e){
    wx.navigateTo({
      url: '../homework/homework?id=' + e.currentTarget.dataset.id + '&name=' + e.currentTarget.dataset.name
    })
  },
  back:function(){
    setTimeout(()=>{
      wx.navigateBack({
        delta: 1
      })
    },600)
  },
  delcourse:function(){
    var _this = this;
    wx.showModal({
      title: '退出课程',
      content: '你与此课程相关的内容都将被删除',
      confirmText: '退出',
      confirmColor: '#FF6354',
      success: function(res) {
        if (res.confirm) {
         _this.removeCourse();
          // console.log('用户点击确定')
        } else if (res.cancel) {
          // console.log('用户点击取消')
        }
      }
    })
  },
  removeCourse:function(){
    var _this = this;
    wx.request({
      url: app.globalData.ip + '/daxuejun/wx/courses/' + _this.data.cid, //仅为示例，并非真实的接口地址
      method: 'DELETE',
      header: {
        'content-type': 'application/json',
        'authorization': wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(res.data)
        if(res.data.code == 200){
          wx.showToast({
            title: '删除成功~',
            success: _this.back(),
            duration: 600
          })
        }
      }
    })
  },
  handleData:function(list){
    var task = [], list1 = [], i
    var date = this.handleDate(list[0].work.createDate)
    for ( i = 0; i < list.length; i++ ){
      var date1 = this.handleDate(list[i].work.createDate)
      if (date == date1){
        list1.push({
          workId: list[i].work.workId,
          workName: list[i].work.workName,
          workItems: list[i].work.workItems,
          deadline: this.handleDate(list[i].work.workExpireDate),
          upload: list[i].studentWorkUploadDate,
          corrected: list[i].studentWorkCorrected,
          score: list[i].studentWorkScore
        })
      }else{
        task.push({
          date: date,
          group: list1
        });
        date = date1
        list1 = []
        i--;
      }
    }
    task.push({
      date: date,
      group: list1
    });
    return task;
  },
  handleDate:function(str) {
    var date = new Date(str);
    return (date.getMonth()+1)+'月'+date.getDate()+'日'
  },
  init:function(){
    var _this = this;
    wx.request({
      url: app.globalData.ip + '/daxuejun/wx/courses/' + _this.data.cid +'/works', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json',
        'authorization': wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(res.data)
        if(res.data.code == 200){
          _this.setData({
            task: _this.handleData(res.data.result)
          })
        }  
      }
    })
  },
  onPullDownRefresh: function(){
    console.log(1);
    this.setData({
      isShow: true
    })
    this.init();
    setTimeout(() => {
      this.setData({
        isShow: false
      })
      wx.stopPullDownRefresh()
    },1000);
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    wx.setNavigationBarTitle({
      title: options.name
    })
    this.setData({
      cid: options.id
    })
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