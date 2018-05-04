// pages/homework/homework.js
const qiniuUploader = require("./qiniuUploader-min");
var app = getApp()
Page({
  data:{
    wid: '',
    workItem: [],
    list: []
  },
  back: function () {
    setTimeout(() => {
      wx.navigateBack({
        delta: 1
      })
    }, 600)
  },
  chooseImage: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    wx.chooseImage({
      count: (9 - that.data.workItem[index].images.length), // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(index) 
        var list = res.tempFilePaths;          
        for(var i = 0; i < list.length; i++)     
          that.data.workItem[index].images.push(list[i]);
        that.setData({
          workItem: that.data.workItem
        })
      }
    })
  },
  previewImage: function (e) {
    var current = e.currentTarget.dataset.src
    var index = e.currentTarget.dataset.id
    wx.previewImage({
      current: current,
      urls: this.data.workItem[index].images
    })
  },
  delImage: function (e) {
    var i = e.currentTarget.dataset.id;
    var j = e.currentTarget.dataset.index;
    this.data.workItem[i].images.splice(j,1);
    this.setData({
      workItem: this.data.workItem
    })
  },
  remark:function(e){
    // var img = e.currentTarget.dataset.img;
    var qid = e.currentTarget.dataset.qid;
    wx.navigateTo({
      url: '../remark/remark?wid=' + this.data.wid + '&qid=' + qid
    })
  },
  filterImages:function() {
    var list = this.data.workItem
    for(var i = 0; i < list.length; i++){
      if(list[i].images.length == 0)
        return true
    }
    return false
  },
  handup:function(){
    if(this.filterImages()){
      wx.showModal({ 
        title: '提示',
        content: '请先完成所有题目的上传！',
        showCancel: false
      })
    }else {
      var data = this.data.workItem
      for(var i = 0; i < data.length; i++){
        this.uploadImages(data[i].images, data[i].qid)
      }
      var _this = this;
      wx.request({
        url: app.globalData.ip + '/daxuejun/wx/courses/' + _this.data.wid.substring(0, 8) + '/works',
        data: {
          studentWorkUploadDate: new Date(),
          work: {
            workId: _this.data.wid
          }
        },
        method: 'PUT',
        header: {
          'authorization': wx.getStorageSync('token')
        },
        success: function (res) {
          wx.showToast({
            title: '上传成功~',
            success: _this.back(),
            duration: 600
          })
        }
      })
    }
  },
  uploadImage: function (images, qid) {
    var _this = this;
    wx.request({
      url: app.globalData.ip + '/daxuejun/wx/courses/' + _this.data.wid.substring(0, 8) + '/works/' + _this.data.wid + '/workItems',
      data: {
        studentWorkItemUrl: images.join(","),
        studentWorkItemUploadDate: new Date(),
        workItem: {
          workItemId: qid
        }
      },
      method: 'PUT',
      header: {
        'authorization': wx.getStorageSync('token')
      },
      success: function (res) {
        console.log('OK');
      }
    })
  },
  uploadImages:function(images, qid){
    var _this = this;
    wx.request({
      url: app.globalData.ip + '/daxuejun/wx/upToken',
      header: {
        'authorization': wx.getStorageSync('token')
      },
      success: function (res) {
        var token = res.data.result;
        var upload = [];                  
        for (var i = 0; i < images.length; i++) {
          qiniuUploader.upload(images[i], (response) => {
            console.log(response.key); 
            upload.push('http://oqhp0xd70.bkt.clouddn.com/' + response.key)
            // _this.data.list.push({
            //   images: upload
            // }) 
            // console.log(_this.data.list[i]);
          }, (error) => {
            console.log('error: ' + error);
          }, {
            uploadURL: 'https://up.qbox.me',
            domain: 'oqhp0xd70.bkt.clouddn.com',
            uptoken: token
          })
          // _this.setData({
          //   list: _this.data.list
          // })
        }
        setTimeout(()=>{
          wx.request({
            url: app.globalData.ip + '/daxuejun/wx/courses/' + _this.data.wid.substring(0, 8) + '/works/' + _this.data.wid + '/workItems',
            data: {
              studentWorkItemUrl: upload.join(","),
              // studentWorkItemUrl: _this.data.list.join(","),
              studentWorkItemUploadDate: new Date(),
              workItem: {
                workItemId: qid
              }
            },
            method: 'PUT',
            header: {
              'authorization': wx.getStorageSync('token')
            },
            success: function (res) {
              console.log(_this.data.list);
            }
          })
        },1000);
      }
    })
  },
  handleData:function(data){
    var list = []
    for(var i = 0; i < data.length; i++){
      list.push({
        qid: data[i].workItem.workItemId,
        images: data[i].studentWorkItemUrl == null ? [] : data[i].studentWorkItemUrl.split(","),
        score: data[i].studentWorkItemScore
      })
    }
    return list
  },
  init:function(){
    var _this = this;
    wx.request({
      url: app.globalData.ip + '/daxuejun/wx/courses/' + _this.data.wid.substring(0,8)+'/works/'+_this.data.wid+'/workItems',
      header: {
        'content-type': 'application/json',
        'authorization': wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(res.data)
        if(res.data.code == 200){
          _this.setData({
            workItem: _this.handleData(res.data.result),
            corrected: res.data.result[0].updateDate
          })
        }
      }
    })
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    wx.setNavigationBarTitle({
      title: options.name
    })
    this.setData({
      wid: options.id
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