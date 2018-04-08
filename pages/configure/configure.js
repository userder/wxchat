// pages/configure/configure.js
var common = require('../../utils/common.js');
var carId = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    config: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    carId = options.carId;
    that.config(carId);
  },
  config: function (carId) {//车辆配置
    var that = this;
    wx.showNavigationBarLoading();
    wx.request({
      url: common.getWholeUrl('/qqd/cars/config/' + carId),
      method: 'GET',
      success: function (res) {
        if (res.statusCode == 200) {
          that.setData({
            config: res.data
          })
        } else if (res.statusCode == 204){
          that.showmodel('暂无数据展示')
        } else if (res.statusCode == 400) {
          that.showmodel(res.data)
        } else if (res.statusCode == 401) {
          that.showmodel('您没有登录，没有权限访问本页面')
        } else {
          that.showmodel('服务器开小差了，请稍后再试')
        }
      },
      fail: function () {
        that.showmodel('服务器开小差了，请稍后再试')
      },
      complete: function () {
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.config(carId);
  },
  showmodel: function (text) {
    var that = this;
    wx.showModal({
      title: '温馨提示',
      content: text,
      showCancel: false,
      confirmText: '知道了',
      confirmColor: '#4182FF',
    })
  }
})