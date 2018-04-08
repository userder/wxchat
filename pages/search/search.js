// pages/search/search.js
const app = getApp();
var common = require('../../utils/common.js');
var inputTimeout = null,
inputText = '';//输入框的文字搜索
Page({
  data: {
    focus: false,
    searchinput: '',//搜索框的内容
    havelist: false,
    searchList: '',
    allList: [],//根据输入框输入结果显示出来的列表
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.allbrands();
  },
  allbrands:function(){
    var that =this;
    wx.showNavigationBarLoading();
    wx.request({
      url: common.getWholeUrl('/qqd/brands'),
      method: 'GET',
      success:function(res){
        var arr = res.data;
        if(res.statusCode==200){
          that.setData({
            allList: arr,
            focus: true
          })
        } else if (res.statusCode == 204) {
          that.showmodel('暂无数据展示~');
        } else if (res.statusCode == 400) {
          that.showmodel(res.data)
        } else {
          that.showmodel('服务器开小差了，请稍后再试');
        }
      },
      fail:function(){
        that.showmodel('服务器开小差了，请稍后再试');
      },
      complete:function(){
        wx.hideNavigationBarLoading();
      }
    })
  },
  bindinput:function(e){//输入框实时输入
    var that = this;
    var text = e.detail.value;
    var list = that.data.allList
    var len = list.length;
    var arr = [];
    if(text==''){
      that.setData({
        havelist: false
      })
      return false;
    }else{
      for (var i = 0; i < len; i++) {
        //如果字符串中不包含目标字符会返回-1
        if (list[i].brandName.indexOf(text) >= 0) {
          arr.push(list[i]);
        }
      }
      if(arr!=''){
        that.setData({
          havelist: true,
          searchList: arr
        })
      }
    }
  },
  clear:function(){//删除
    inputText = '';
    this.setData({
      searchinput: '',
      havelist: false
    })
  },
  searchTxt:function(e){//点击搜索列表中的文字
    var searchTxt = e.currentTarget.dataset.id;
    wx.setStorage({
      key: 'searchTxt',
      data: searchTxt,
      success: function (res) {
        wx.switchTab({
          url: '/pages/index/index',
        })
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
  
  },
  showmodel: function (text) {
    var that = this;
    wx.showModal({
      title: '温馨提示',
      content: text,
      showCancel: false,
      confirmText: '知道了',
      confirmColor: '#4182FF',
      success:function(){
        wx.navigateBack({
          
        })
      }
    })
  }
})