//index.js
//获取应用实例
const app = getApp();
var common = require('../../utils/common.js');
var loadLint = true;//限制滚动到底部多次触发网络请求
var pageNum = 1 , total = 0, allNum = 0;//页数，列表总的数组长度，总页数
var haveSearch = false;//搜索后的页面数据展示
var brandName = '';//搜索品牌名字
var brandId = '';//搜索品牌ID
var searchpageNum = 1; var searchtotal = 0, searchallNum = 0;//搜索标签后的页数，列表总的数组长度，总页数
Page({
  data: {
    search: false, searchTxt:'',//搜索标签是否显示，搜索的文字
    carList: [], searchcarList: [],//默认列表，搜索后的列表
    loadding: false, loadComplete: false,//底部的正在载入更多的显示，我是有底线的文字
  },
  onLoad: function () {
    var that = this;
    wx.getStorage({
      key: 'searchTxt',
      success: function(res) {
        haveSearch = true;
      },
      fail:function(){
        that.carList();
      }
    })
    if (haveSearch){
      that.searchLabel();
    }else{
      return false;
    }
  },

  onShow:function(){
    var that = this;
    that.searchLabel();//显示搜索的标签
  },
  onShareAppMessage:function(){
    return {
      title: '购车超低首付',
      path: '/pages/index/index'
    }
  },
  onPullDownRefresh: function () {//下拉刷新
    var that = this;
    if (haveSearch){
      that.searchLabel();
    }else{
      that.carList();
    }
  },
  onReachBottom:function(){//上拉加载更多
    var that = this;
    if (loadLint){//下拉触底限制，防止短时间时间内触发多次
      loadLint = false;
      if(haveSearch){//判断是否是有搜索标签
        searchpageNum++;
        console.log("searchpageNum:" + searchpageNum + ';searchallNum:' + searchallNum)
        that.setData({
          loadding: true
        })
        if (searchpageNum > searchallNum) {
          that.setData({
            loadComplete: true,//我是有底线的
          })
          return false;
        } else {
          searchnextPage(searchpageNum)
        }
        function searchnextPage(searchpageNum) {
          wx.request({
            url: common.getWholeUrl('/qqd/cars/brand/' + brandId, { pageNum: searchpageNum, pageSize: 50 }),
            method: 'GET',
            success: function (res) {
              total = res.data.total;
              var list = res.data.carList;
              var allList = that.data.carList.concat(list);
              console.log(allList)
              that.setData({
                searchcarList: allList
              })
            },
            complete: function () {
              loadLint = true;
              that.setData({
                loadding: false
              })
            }
          })
        }
      }else{
        pageNum++;
        console.log("pageNum:" + pageNum + ';allNum:' + allNum)
        that.setData({
          loadding: true
        })
        if (pageNum > allNum) {
          that.setData({
            loadComplete: true,//我是有底线的
          })
          return false;
        } else {
          nextPage(pageNum)
        }
        function nextPage(pageNum) {
          wx.request({
            url: common.getWholeUrl('/qqd/cars', { pageNum: pageNum, pageSize: 15 }),
            method: 'GET',
            success: function (res) {
              total = res.data.total;
              var list = res.data.carList;
              var allList = that.data.carList.concat(list);
              that.setData({
                carList: allList
              })
            },
            complete: function () {
              loadLint = true;
              that.setData({
                loadding: false
              })
            }
          })
        }
      }

    }else{
      return false;
    }
    
  },
  search:function(){
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  clearSearch:function(){//删除搜索标签
    var that = this;
    that.setData({
      search: false,
      loadding: false, 
      loadComplete: false,
    })
    wx.removeStorage({
      key: 'searchTxt',
      success:function(){
        wx.setNavigationBarTitle({
          title: '气球计划',
        })
        that.carList();
      }
    })
  },
  searchLabel:function(){//显示搜索的标签
    var that = this;
    wx.getStorage({//判断是否有搜索缓存
      key: 'searchTxt',
      success: function (res) {
        if (res.data != '' && res.data != undefined) {
          haveSearch = true;
          brandName = res.data.brandName;
          brandId = res.data.brandId;
          wx.setNavigationBarTitle({
            title: brandName,
          })
          that.setData({
            loadding: false,
            loadComplete: false,
            search: true,
            searchTxt: brandName
          })
          that.brandList(brandName, brandId)
        }else{
          return false;
        }
      },
      fail:function(){
        return false;
      }
    })
  },
  carList: function () {//首页汽车默认展示
    var that = this;
    haveSearch = false;
    that.setData({
      loadding: false,
      loadComplete: false,
    })
    wx.showLoading({
      title: '正在加载...',
    })
    wx.showNavigationBarLoading();
    wx.request({
      url: common.getWholeUrl('/qqd/cars', { pageNum: 1, pageSize: 15}),
      method: 'GET',
      success: function (res) {
        console.log(res)
        if (res.statusCode == 200) {
          total = res.data.total;
          allNum = Math.ceil(total / 15);
          pageNum = 1;
          loadLint = true;
          that.setData({
            carList: res.data.carList,
          })
        }else if(res.statusCode==204){
          that.showmodel('暂无数据展示');
        }else if (res.statusCode == 400) {
          that.showmodel(res.data)
        } else {
          that.showmodel('服务器开小差了，请稍后再试');
        }
      },
      fail: function (res) {
        that.showmodel('服务器开小差了，请稍后再试');
      },
      complete: function () {
        wx.stopPullDownRefresh();
        wx.hideNavigationBarLoading();
        wx.hideLoading();
      }
    })
  },
  brandList: function (brandName,brandId){
    var that = this;
    wx.showNavigationBarLoading();
    // wx.showLoading({
    //   title: '加载中...',
    // })
    wx.request({
      url: common.getWholeUrl('/qqd/cars/brand/' + brandId, { pageNum: 1, pageSize: 50 }),
      method: 'GET',
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200) {
          searchtotal = res.data.total;
          searchallNum = Math.ceil(total / 50);
          searchpageNum = 1;
          loadLint = true;
          that.setData({
            searchcarList: res.data.carList,
          })
        } else if(res.statusCode==204) {
          that.setData({
            searchcarList: '',
          })
          that.showmodel('暂无' + brandName + '的车辆展示~');
        }else if(res.statusCode==400){
          that.showmodel(res.data)
        }else{
          that.showmodel('服务器开小差了，请稍后再试');
        }
      },
      fail: function () {
        that.showmodel('服务器开小差了，请稍后再试');
      },
      complete: function () {
        wx.hideNavigationBarLoading();
        // wx.hideLoading();
        wx.stopPullDownRefresh();
      }
    })
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
