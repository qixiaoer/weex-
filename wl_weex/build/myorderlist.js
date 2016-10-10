/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	;__weex_define__("@weex-component/7470e9aa792139d3f51616bbac18273a", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	__webpack_require__(1);
	var stream = __weex_require__('@weex-module/stream')
	   __weex_module__.exports = {
	    data: function () {return {
	      hostU:'',
	      wifiU:'',
	      leftimg:'',
	      tipbg:'',
	      telimg:'',
	      noddimg:'',
	      orderList: [],
	      token:'',
	      channel_uid:'',
	      istel:true,
	      isapp:true,
	      no_order:false,
	      isandriod:'/wl_weex/build/index.html?page=wifi.js'
	     }},
	     ready:function () {
	            var vm = this;
	            vm.hostU = 'http://dev.ms.vipwifi.com';
	            vm.wifiU = 'http://dev.vipwifi.com';
	            // stream.fetch({
	            //     url: 'http://dev.ms.vipwifi.com/wl_weex/build/host.json',
	            //     type: 'json',
	            //     method: 'GET'
	            // }, function (res) {
	            //     if(typeof res == 'string'){
	            //         res = JSON.parse(res);
	            //     }
	            //     var res_data = res.data; 
	            //     if(typeof res_data == 'string'){
	            //         res_data = JSON.parse(res_data);
	            //     }
	            //     vm.hostU = res_data.hosturl;
	            //     vm.wifiU = res_data.wifiurl;
	                vm.leftimg = vm.hostU+'/wl_weex/images/left-rowbg.png';
	                vm.tipbg = vm.hostU+'/wl_weex/images/tip-bg.png';
	                vm.telimg = vm.hostU+'/wl_weex/images/telphone.png';
	                vm.noddimg = vm.hostU+'/wl_weex/images/wu-dingd-bg.png';
	                vm.$getConfig(function (config) {
	                    var env = config.env;
	                    vm.wifiheight = env.deviceHeight;
	                    vm.platform = env.platform.toLowerCase();
	                    if (vm.platform == 'ios'){
	                        var scale = env.scale;
	                        var deviceWidth = env.deviceWidth / scale;
	                        vm.navBarHeight = 64.0 * 750.0 / deviceWidth;
	                    }
	                }.bind(this));
	                if(vm.platform == 'web'){
	                  vm.isapp = false;
	                    stream.fetch({
	                        url: vm.hostU+'/MshopApi/User/get_online_userid',
	                        type: 'json',
	                        method: 'GET'
	                    }, function (res) {
	                        if (res.data.msg=='success'){
	                            vm.channel_uid = res.data.data.uid;
	                            vm.token = res.data.data.access_token;
	                        }else{
	                            vm.channel_uid = '';
	                        }
	                    },function(response){
	                        vm.channel_uid = '';
	                    })
	                    var ua = navigator.userAgent.toLowerCase(); 
	                    // if ((/android/).test(ua)) {
	                    //     vm.isandriod = vm.wifiU+'/package/index?channel_client=weixin&channel=uroaming&channel_uid='+vm.channel_uid
	                    // }
	                    stream.fetch({
	                        url: vm.hostU+'/MshopApi/Adsorder/order_list',
	                        type:'json',
	                        headers:{"ACCESS-TOKEN":vm.token},
	                        method: 'GET'
	                        }, function (res) {
	                       if(typeof res == 'string'){
	                        res = JSON.parse(res);
	                       }
	                       var res_data = res.data;
	                       if(typeof res_data === 'string'){
	                         res_data = JSON.parse(res_data);
	                       }
	                       if (res_data.msg=='success'){
	                         vm.orderList = res_data.data;
	                       }
	                       if (res_data.data=='') {
	                        vm.no_order=true;
	                       }

	                    },function(response){

	                  })
	                }
	                else{
	                    var eventModule = __weex_require__('@weex-module/event');
	                    var loginModule = __weex_require__('@weex-module/login');
	                    eventModule.openURL('url',function(ret) {
	                        if (ret.userid!=''){
	                            vm.channel_uid = ret.userid;
	                            vm.token = ret.token;
	                            stream.fetch({
	                                url: vm.hostU+'/MshopApi/Adsorder/order_list',
	                                type:'json',
	                                headers:{"ACCESS-TOKEN":vm.token},
	                                method: 'GET'
	                                }, function (res) {
	                               if(typeof res == 'string'){
	                                res = JSON.parse(res);
	                               }
	                               var res_data = res.data;
	                               if(typeof res_data === 'string'){
	                                 res_data = JSON.parse(res_data);
	                               }
	                               if (res_data.msg=='success'){
	                                 vm.orderList = res_data.data;
	                                // vm.tel=res_data.data.mch_phone;

	                               }
	                               if (res_data.data=='') {
	                                vm.no_order=true;
	                               }

	                            },function(response){

	                          })
	                        }else{
	                            loginModule.openURL('http://login.js',false);
	                        }
	                    })
	                }
	            // },function(response){
	                
	            // })
	            
	            this.$on('naviBar.leftItem.click',function(e){
	                this.pop()
	            });
	        },
	        methods: {
	            pop: function() {
	                    var vm = this;
	                    var params = {
	                      'animated' : 'true',
	                    }
	                    vm.$call('navigator','pop',params, function () {});
	              },
	              telphone:function(e){
	                var eventModule = __weex_require__('@weex-module/event');
	                eventModule.sendTelphone(e.target.attr.tels);
	              }
	        }
	    }
	   

	;__weex_module__.exports.template = __weex_module__.exports.template || {}
	;Object.assign(__weex_module__.exports.template, {
	  "type": "wxc-navpage",
	  "attr": {
	    "dataRole": "none",
	    "backgroundColor": "#ffffff",
	    "height": "128",
	    "title": "我的订单",
	    "titleColor": "#051b28",
	    "leftItemSrc": function () {return this.leftimg}
	  },
	  "children": [
	    {
	      "type": "list",
	      "classList": [
	        "list",
	        "page-scroll"
	      ],
	      "children": [
	        {
	          "type": "cell",
	          "append": "tree",
	          "classList": [
	            "cell"
	          ],
	          "repeat": function () {return this.orderList},
	          "children": [
	            {
	              "type": "div",
	              "classList": [
	                "shopDiv"
	              ],
	              "children": [
	                {
	                  "type": "div",
	                  "classList": [
	                    "shopHeader"
	                  ],
	                  "children": [
	                    {
	                      "type": "image",
	                      "attr": {
	                        "src": function () {return this.tipbg}
	                      },
	                      "classList": [
	                        "tit-img"
	                      ]
	                    },
	                    {
	                      "type": "text",
	                      "classList": [
	                        "tittop"
	                      ],
	                      "attr": {
	                        "value": function () {return this.order_title}
	                      }
	                    }
	                  ]
	                },
	                {
	                  "type": "div",
	                  "classList": [
	                    "shopBody"
	                  ],
	                  "style": {
	                    "flexDirection": "column"
	                  },
	                  "children": [
	                    {
	                      "type": "div",
	                      "classList": [
	                        "info"
	                      ],
	                      "children": [
	                        {
	                          "type": "div",
	                          "classList": [
	                            "shopstart"
	                          ],
	                          "children": [
	                            {
	                              "type": "text",
	                              "classList": [
	                                "txt"
	                              ],
	                              "attr": {
	                                "value": function () {return '交易平台:  ' + (this.mch_name)}
	                              }
	                            },
	                            {
	                              "type": "image",
	                              "attr": {
	                                "src": function () {return this.telimg},
	                                "tels": function () {return this.mch_phone}
	                              },
	                              "classList": [
	                                "img-f"
	                              ],
	                              "events": {
	                                "click": "telphone"
	                              }
	                            }
	                          ]
	                        },
	                        {
	                          "type": "text",
	                          "classList": [
	                            "txt"
	                          ],
	                          "attr": {
	                            "value": function () {return '商户单号:  ' + (this.mch_order_number)}
	                          }
	                        },
	                        {
	                          "type": "text",
	                          "classList": [
	                            "txt"
	                          ],
	                          "attr": {
	                            "value": function () {return '交易时间:  ' + (this.mch_order_time)}
	                          }
	                        },
	                        {
	                          "type": "text",
	                          "classList": [
	                            "txt"
	                          ],
	                          "attr": {
	                            "value": function () {return '交易数量:  ' + (this.product_num)}
	                          }
	                        },
	                        {
	                          "type": "div",
	                          "classList": [
	                            "shopFooter"
	                          ],
	                          "children": [
	                            {
	                              "type": "text",
	                              "classList": [
	                                "shopLikeText"
	                              ],
	                              "attr": {
	                                "value": "共计:"
	                              }
	                            },
	                            {
	                              "type": "text",
	                              "classList": [
	                                "shopCommentText"
	                              ],
	                              "attr": {
	                                "value": "¥"
	                              }
	                            },
	                            {
	                              "type": "text",
	                              "classList": [
	                                "shopLookText"
	                              ],
	                              "attr": {
	                                "value": function () {return (this.mch_order_amount) + '元'}
	                              }
	                            }
	                          ]
	                        }
	                      ]
	                    }
	                  ]
	                }
	              ]
	            }
	          ]
	        }
	      ]
	    },
	    {
	      "type": "div",
	      "classList": [
	        "logoContainer"
	      ],
	      "shown": function () {return this.no_order},
	      "children": [
	        {
	          "type": "image",
	          "classList": [
	            "logo"
	          ],
	          "attr": {
	            "src": function () {return this.noddimg}
	          }
	        },
	        {
	          "type": "text",
	          "classList": [
	            "desc"
	          ],
	          "attr": {
	            "value": "您还没有相关订单"
	          }
	        },
	        {
	          "type": "text",
	          "classList": [
	            "desct"
	          ],
	          "attr": {
	            "value": "去下一单试试吧"
	          }
	        }
	      ]
	    },
	    {
	      "type": "div",
	      "style": {
	        "height": 97
	      },
	      "shown": function () {return this.isapp}
	    }
	  ]
	})
	;__weex_module__.exports.style = __weex_module__.exports.style || {}
	;Object.assign(__weex_module__.exports.style, {
	  "page-scroll": {
	    "position": "absolute",
	    "top": 0,
	    "left": 0,
	    "right": 0,
	    "bottom": 0,
	    "fontFamily": "\"微软雅黑\", \"Microsoft yahei\""
	  },
	  "list-wrap": {
	    "background": "#f2f2f2",
	    "overflow": "hidden"
	  },
	  "txt": {
	    "fontSize": 24,
	    "height": 45,
	    "lineHeight": 45,
	    "color": "#999999"
	  },
	  "img-f": {
	    "width": 25,
	    "height": 25,
	    "marginTop": 8,
	    "marginLeft": 84
	  },
	  "info": {
	    "paddingTop": 30,
	    "paddingBottom": 30
	  },
	  "redtit": {
	    "color": "#FF0000",
	    "fontSize": 30
	  },
	  "shopCommentText": {
	    "fontSize": 18,
	    "color": "#fe4c4c",
	    "marginTop": 10
	  },
	  "shopLookText": {
	    "fontSize": 30,
	    "color": "#fe4c4c",
	    "marginRight": 3
	  },
	  "v-list": {},
	  "shopFooter": {
	    "flexDirection": "row",
	    "width": 610,
	    "marginTop": 10,
	    "marginLeft": 10,
	    "justifyContent": "flex-end"
	  },
	  "shopstart": {
	    "flexDirection": "row",
	    "width": 610,
	    "marginTop": 10,
	    "justifyContent": "flex-start"
	  },
	  "shopHeader": {
	    "flexDirection": "row",
	    "width": 610,
	    "marginTop": 10,
	    "justifyContent": "flex-start",
	    "borderStyle": "solid",
	    "borderBottomWidth": 1,
	    "borderBottomColor": "#dddddd",
	    "background": "#fff",
	    "fontSize": 32,
	    "color": "#333333",
	    "fontWeight": "bold"
	  },
	  "shopLikeText": {
	    "color": "#999999",
	    "fontSize": 18,
	    "marginRight": 8,
	    "marginTop": 10
	  },
	  "tetright": {
	    "textAlign": "right",
	    "fontSize": 18,
	    "color": "#999999",
	    "minWidth": 100
	  },
	  "spanred": {
	    "color": "#fe4c4c",
	    "fontSize": 30
	  },
	  "list": {
	    "flexDirection": "column",
	    "overflow": "hidden",
	    "width": 750,
	    "backgroundColor": "#f2f2f2"
	  },
	  "shopDiv": {
	    "flexDirection": "column",
	    "width": 700,
	    "marginLeft": 25,
	    "marginRight": 25,
	    "marginBottom": 30,
	    "marginTop": 10,
	    "borderStyle": "solid",
	    "borderWidth": 1,
	    "borderColor": "#dddddd",
	    "background": "#fff",
	    "borderBottomLeftRadius": 10,
	    "borderBottomRightRadius": 10,
	    "borderTopLeftRadius": 10,
	    "borderTopRightRadius": 10,
	    "backgroundColor": "#ffffff",
	    "paddingLeft": 42,
	    "paddingRight": 42
	  },
	  "tittop": {
	    "fontSize": 32,
	    "color": "#333333",
	    "fontWeight": "bold",
	    "paddingTop": 20,
	    "paddingBottom": 24
	  },
	  "tit-img": {
	    "width": 20,
	    "height": 23,
	    "marginTop": 30,
	    "marginRight": 34
	  },
	  "webtab": {
	    "backgroundColor": "#ffffff",
	    "opacity": 0.95,
	    "width": 750,
	    "height": 97,
	    "borderTop": "1px solid #dddddd",
	    "position": "fixed",
	    "bottom": 0,
	    "left": 0,
	    "flexDirection": "row"
	  },
	  "muddtab": {
	    "width": 48,
	    "height": 47,
	    "marginLeft": 100,
	    "marginTop": 14
	  },
	  "webflex": {
	    "flex": 1
	  },
	  "muddtext": {
	    "textAlign": "center",
	    "fontSize": 20,
	    "color": "#cdcdd4",
	    "fontFamily": "\"微软雅黑\", \"Microsoft yahei\"",
	    "height": 36,
	    "lineHeight": 36
	  },
	  "muddcur": {
	    "color": "#ff4a46"
	  },
	  "logoContainer": {
	    "width": 750,
	    "height": 300,
	    "paddingTop": 30,
	    "paddingBottom": 30,
	    "alignItems": "center",
	    "justifyContent": "center",
	    "marginTop": 100
	  },
	  "logo": {
	    "width": 133,
	    "height": 133
	  },
	  "desc": {
	    "marginTop": 20,
	    "fontSize": 32,
	    "color": "#333333"
	  },
	  "desct": {
	    "marginTop": 20,
	    "fontSize": 28,
	    "color": "#999999"
	  }
	})
	})
	;__weex_bootstrap__("@weex-component/7470e9aa792139d3f51616bbac18273a", {
	  "transformerVersion": "0.3.1"
	},undefined)

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(2);
	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(5);
	__webpack_require__(6);
	__webpack_require__(7);
	__webpack_require__(8);
	__webpack_require__(9);
	__webpack_require__(10);
	__webpack_require__(11);
	__webpack_require__(12);


/***/ },
/* 2 */
/***/ function(module, exports) {

	;__weex_define__("@weex-component/wxc-button", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	  __weex_module__.exports = {
	    data: function () {return {
	      type: 'default',
	      size: 'large',
	      value: ''
	    }},
	    methods: {
	    }
	  }

	;__weex_module__.exports.template = __weex_module__.exports.template || {}
	;Object.assign(__weex_module__.exports.template, {
	  "type": "div",
	  "classList": function () {return ['btn', 'btn-' + (this.type), 'btn-sz-' + (this.size)]},
	  "children": [
	    {
	      "type": "text",
	      "classList": function () {return ['btn-txt', 'btn-txt-' + (this.type), 'btn-txt-sz-' + (this.size)]},
	      "attr": {
	        "value": function () {return this.value}
	      }
	    }
	  ]
	})
	;__weex_module__.exports.style = __weex_module__.exports.style || {}
	;Object.assign(__weex_module__.exports.style, {
	  "btn": {
	    "marginBottom": 0,
	    "alignItems": "center",
	    "justifyContent": "center",
	    "borderWidth": 1,
	    "borderStyle": "solid",
	    "borderColor": "#333333"
	  },
	  "btn-default": {
	    "color": "rgb(51,51,51)"
	  },
	  "btn-primary": {
	    "backgroundColor": "rgb(40,96,144)",
	    "borderColor": "rgb(40,96,144)"
	  },
	  "btn-success": {
	    "backgroundColor": "rgb(92,184,92)",
	    "borderColor": "rgb(76,174,76)"
	  },
	  "btn-info": {
	    "backgroundColor": "rgb(91,192,222)",
	    "borderColor": "rgb(70,184,218)"
	  },
	  "btn-warning": {
	    "backgroundColor": "rgb(240,173,78)",
	    "borderColor": "rgb(238,162,54)"
	  },
	  "btn-danger": {
	    "backgroundColor": "rgb(217,83,79)",
	    "borderColor": "rgb(212,63,58)"
	  },
	  "btn-link": {
	    "borderColor": "rgba(0,0,0,0)",
	    "borderRadius": 0
	  },
	  "btn-txt-default": {
	    "color": "rgb(51,51,51)"
	  },
	  "btn-txt-primary": {
	    "color": "rgb(255,255,255)"
	  },
	  "btn-txt-success": {
	    "color": "rgb(255,255,255)"
	  },
	  "btn-txt-info": {
	    "color": "rgb(255,255,255)"
	  },
	  "btn-txt-warning": {
	    "color": "rgb(255,255,255)"
	  },
	  "btn-txt-danger": {
	    "color": "rgb(255,255,255)"
	  },
	  "btn-txt-link": {
	    "color": "rgb(51,122,183)"
	  },
	  "btn-sz-large": {
	    "width": 300,
	    "height": 100,
	    "paddingTop": 25,
	    "paddingBottom": 25,
	    "paddingLeft": 40,
	    "paddingRight": 40,
	    "borderRadius": 15
	  },
	  "btn-sz-middle": {
	    "width": 240,
	    "height": 80,
	    "paddingTop": 15,
	    "paddingBottom": 15,
	    "paddingLeft": 30,
	    "paddingRight": 30,
	    "borderRadius": 10
	  },
	  "btn-sz-small": {
	    "width": 170,
	    "height": 60,
	    "paddingTop": 12,
	    "paddingBottom": 12,
	    "paddingLeft": 25,
	    "paddingRight": 25,
	    "borderRadius": 7
	  },
	  "btn-txt-sz-large": {
	    "fontSize": 45
	  },
	  "btn-txt-sz-middle": {
	    "fontSize": 35
	  },
	  "btn-txt-sz-small": {
	    "fontSize": 30
	  }
	})
	})

/***/ },
/* 3 */
/***/ function(module, exports) {

	;__weex_define__("@weex-component/wxc-hn", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	  __weex_module__.exports = {
	    data: function () {return {
	      level: 1,
	      value: ''
	    }},
	    methods: {}
	  }

	;__weex_module__.exports.template = __weex_module__.exports.template || {}
	;Object.assign(__weex_module__.exports.template, {
	  "type": "div",
	  "classList": function () {return ['h' + (this.level)]},
	  "style": {
	    "justifyContent": "center"
	  },
	  "children": [
	    {
	      "type": "text",
	      "classList": function () {return ['txt-h' + (this.level)]},
	      "attr": {
	        "value": function () {return this.value}
	      }
	    }
	  ]
	})
	;__weex_module__.exports.style = __weex_module__.exports.style || {}
	;Object.assign(__weex_module__.exports.style, {
	  "h1": {
	    "height": 110,
	    "paddingTop": 20,
	    "paddingBottom": 20
	  },
	  "h2": {
	    "height": 110,
	    "paddingTop": 20,
	    "paddingBottom": 20
	  },
	  "h3": {
	    "height": 110,
	    "paddingTop": 20,
	    "paddingBottom": 20
	  },
	  "txt-h1": {
	    "fontSize": 70
	  },
	  "txt-h2": {
	    "fontSize": 52
	  },
	  "txt-h3": {
	    "fontSize": 42
	  }
	})
	})

/***/ },
/* 4 */
/***/ function(module, exports) {

	;__weex_define__("@weex-component/wxc-list-item", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	  __weex_module__.exports = {
	    data: function () {return {
	      bgColor: '#ffffff'
	    }},
	    methods: {
	      touchstart: function() {
	        // FIXME android touch
	        // TODO adaptive opposite bgColor
	//        this.bgColor = '#e6e6e6';
	      },
	      touchend: function() {
	        // FIXME android touchend not triggered
	//        this.bgColor = '#ffffff';
	      }
	    }
	  }

	;__weex_module__.exports.template = __weex_module__.exports.template || {}
	;Object.assign(__weex_module__.exports.template, {
	  "type": "div",
	  "classList": [
	    "item"
	  ],
	  "events": {
	    "touchstart": "touchstart",
	    "touchend": "touchend"
	  },
	  "style": {
	    "backgroundColor": function () {return this.bgColor}
	  },
	  "children": [
	    {
	      "type": "content"
	    }
	  ]
	})
	;__weex_module__.exports.style = __weex_module__.exports.style || {}
	;Object.assign(__weex_module__.exports.style, {
	  "item": {
	    "paddingTop": 25,
	    "paddingBottom": 25,
	    "paddingLeft": 35,
	    "paddingRight": 35,
	    "height": 160,
	    "justifyContent": "center",
	    "borderBottomWidth": 1,
	    "borderColor": "#dddddd"
	  }
	})
	})

/***/ },
/* 5 */
/***/ function(module, exports) {

	;__weex_define__("@weex-component/wxc-panel", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	  __weex_module__.exports = {
	    data: function () {return {
	      type: 'default',
	      title: '',
	      paddingBody: 20,
	      paddingHead: 20,
	      dataClass: '', // FIXME transfer class
	      border: 0
	    }},
	    ready: function() {
	    }
	  }

	;__weex_module__.exports.template = __weex_module__.exports.template || {}
	;Object.assign(__weex_module__.exports.template, {
	  "type": "div",
	  "classList": function () {return ['panel', 'panel-' + (this.type)]},
	  "style": {
	    "borderWidth": function () {return this.border}
	  },
	  "children": [
	    {
	      "type": "text",
	      "classList": function () {return ['panel-header', 'panel-header-' + (this.type)]},
	      "style": {
	        "paddingTop": function () {return this.paddingHead},
	        "paddingBottom": function () {return this.paddingHead},
	        "paddingLeft": function () {return this.paddingHead*1.5},
	        "paddingRight": function () {return this.paddingHead*1.5}
	      },
	      "attr": {
	        "value": function () {return this.title}
	      }
	    },
	    {
	      "type": "div",
	      "classList": function () {return ['panel-body', 'panel-body-' + (this.type)]},
	      "style": {
	        "paddingTop": function () {return this.paddingBody},
	        "paddingBottom": function () {return this.paddingBody},
	        "paddingLeft": function () {return this.paddingBody*1.5},
	        "paddingRight": function () {return this.paddingBody*1.5}
	      },
	      "children": [
	        {
	          "type": "content"
	        }
	      ]
	    }
	  ]
	})
	;__weex_module__.exports.style = __weex_module__.exports.style || {}
	;Object.assign(__weex_module__.exports.style, {
	  "panel": {
	    "marginBottom": 20,
	    "backgroundColor": "#ffffff",
	    "borderColor": "#dddddd",
	    "borderWidth": 1
	  },
	  "panel-primary": {
	    "borderColor": "rgb(40,96,144)"
	  },
	  "panel-success": {
	    "borderColor": "rgb(76,174,76)"
	  },
	  "panel-info": {
	    "borderColor": "rgb(70,184,218)"
	  },
	  "panel-warning": {
	    "borderColor": "rgb(238,162,54)"
	  },
	  "panel-danger": {
	    "borderColor": "rgb(212,63,58)"
	  },
	  "panel-header": {
	    "backgroundColor": "#f5f5f5",
	    "fontSize": 40,
	    "color": "#333333"
	  },
	  "panel-header-primary": {
	    "backgroundColor": "rgb(40,96,144)",
	    "color": "#ffffff"
	  },
	  "panel-header-success": {
	    "backgroundColor": "rgb(92,184,92)",
	    "color": "#ffffff"
	  },
	  "panel-header-info": {
	    "backgroundColor": "rgb(91,192,222)",
	    "color": "#ffffff"
	  },
	  "panel-header-warning": {
	    "backgroundColor": "rgb(240,173,78)",
	    "color": "#ffffff"
	  },
	  "panel-header-danger": {
	    "backgroundColor": "rgb(217,83,79)",
	    "color": "#ffffff"
	  },
	  "panel-body": {}
	})
	})

/***/ },
/* 6 */
/***/ function(module, exports) {

	;__weex_define__("@weex-component/wxc-tip", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	  __weex_module__.exports = {
	    data: function () {return {
	      type: 'success',
	      value: ''
	    }}
	  }

	;__weex_module__.exports.template = __weex_module__.exports.template || {}
	;Object.assign(__weex_module__.exports.template, {
	  "type": "div",
	  "classList": function () {return ['tip', 'tip-' + (this.type)]},
	  "children": [
	    {
	      "type": "text",
	      "classList": function () {return ['tip-txt', 'tip-txt-' + (this.type)]},
	      "attr": {
	        "value": function () {return this.value}
	      }
	    }
	  ]
	})
	;__weex_module__.exports.style = __weex_module__.exports.style || {}
	;Object.assign(__weex_module__.exports.style, {
	  "tip": {
	    "paddingLeft": 36,
	    "paddingRight": 36,
	    "paddingTop": 36,
	    "paddingBottom": 36,
	    "borderRadius": 10
	  },
	  "tip-txt": {
	    "fontSize": 28
	  },
	  "tip-success": {
	    "backgroundColor": "#dff0d8",
	    "borderColor": "#d6e9c6"
	  },
	  "tip-txt-success": {
	    "color": "#3c763d"
	  },
	  "tip-info": {
	    "backgroundColor": "#d9edf7",
	    "borderColor": "#bce8f1"
	  },
	  "tip-txt-info": {
	    "color": "#31708f"
	  },
	  "tip-warning": {
	    "backgroundColor": "#fcf8e3",
	    "borderColor": "#faebcc"
	  },
	  "tip-txt-warning": {
	    "color": "#8a6d3b"
	  },
	  "tip-danger": {
	    "backgroundColor": "#f2dede",
	    "borderColor": "#ebccd1"
	  },
	  "tip-txt-danger": {
	    "color": "#a94442"
	  }
	})
	})

/***/ },
/* 7 */
/***/ function(module, exports) {

	;__weex_define__("@weex-component/wxc-countdown", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	__weex_module__.exports = {
	    data: function () {return {
	        now: 0,
	        remain: 0,
	        time: {
	            elapse: 0,
	            D: '0',
	            DD: '0',
	            h: '0',
	            hh: '00',
	            H: '0',
	            HH: '0',
	            m: '0',
	            mm: '00',
	            M: '0',
	            MM: '0',
	            s: '0',
	            ss: '00',
	            S: '0',
	            SS: '0'
	        },
	        outofview: false
	    }},
	    ready: function() {
	        if (this.remain <= 0) {
	            return;
	        }
	        // this.isWeb = this.$getConfig().env.platform === 'Web';
	        this.now = Date.now();
	        this.nextTick();
	    },
	    methods: {
	        nextTick: function() {
	            if (this.outofview) {
	                setTimeout(this.nextTick.bind(this), 1000);
	            } else {
	                this.time.elapse = parseInt((Date.now() - this.now) / 1000);

	                if (this.calc()) {
	                    this.$emit('tick', Object.assign({}, this.time));
	                    setTimeout(this.nextTick.bind(this), 1000);
	                } else {
	                    this.$emit('alarm', Object.assign({}, this.time));
	                }
	                this._app.updateActions(); 
	            }
	        },
	        format: function(str) {
	            if (str.length >= 2) {
	                return str;
	            } else {
	                return '0' + str;
	            }
	        },
	        calc: function() {
	            var remain = this.remain - this.time.elapse;
	            if (remain < 0) {
	                remain = 0;
	            }
	            this.time.D = String(parseInt(remain / 86400));
	            this.time.DD = this.format(this.time.D);
	            this.time.h = String(parseInt((remain - parseInt(this.time.D) * 86400) / 3600));
	            this.time.hh = this.format(this.time.h);
	            this.time.H = String(parseInt(remain / 3600));
	            this.time.HH = this.format(this.time.H);
	            this.time.m = String(parseInt((remain - parseInt(this.time.H) * 3600) / 60));
	            this.time.mm = this.format(this.time.m);
	            this.time.M = String(parseInt(remain / 60));
	            this.time.MM = this.format(this.time.M);
	            this.time.s = String(remain - parseInt(this.time.M) * 60);
	            this.time.ss = this.format(this.time.s);
	            this.time.S = String(remain);
	            this.time.SS = this.format(this.time.S);
	            // console.log(remain, this.D, this.h, this.hh, this.H, this.HH, this.m, this.MM, this.s, this.ss, this.S, this.SS);
	            return remain > 0;
	        },
	        appeared: function() {
	            this.outofview = false;
	        },
	        disappeared: function() {
	            this.outofview = true;
	        }
	    }
	}

	;__weex_module__.exports.template = __weex_module__.exports.template || {}
	;Object.assign(__weex_module__.exports.template, {
	  "type": "div",
	  "style": {
	    "overflow": "hidden",
	    "flexDirection": "row"
	  },
	  "events": {
	    "appear": "appeared",
	    "disappear": "disappeared"
	  },
	  "children": [
	    {
	      "type": "content"
	    }
	  ]
	})
	;__weex_module__.exports.style = __weex_module__.exports.style || {}
	;Object.assign(__weex_module__.exports.style, {
	  "wrap": {
	    "overflow": "hidden"
	  }
	})
	})

/***/ },
/* 8 */
/***/ function(module, exports) {

	;__weex_define__("@weex-component/wxc-marquee", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	__weex_module__.exports = {
	    data: function () {return {
	        step: 0,
	        count: 0,
	        index: 1,
	        duration: 0,
	        interval: 0,
	        outofview: false
	    }},
	    ready: function () {
	        if (this.interval > 0
	                && this.step > 0
	                && this.duration > 0) {
	            this.nextTick();    
	        }
	    },
	    methods: {
	        nextTick: function() {
	            var self = this;
	            if (this.outofview) {
	                setTimeout(self.nextTick.bind(self), self.interval);
	            } else {
	                setTimeout(function() {
	                    self.animation(self.nextTick.bind(self));
	                }, self.interval);
	            }
	        },
	        animation: function(cb) {
	            var self = this;
	            var offset = -self.step * self.index;
	            var $animation = __weex_require__('@weex-module/animation');
	            $animation.transition(this.$el('anim'), {
	              styles: {
	                transform: 'translateY(' + String(offset) + 'px) translateZ(0)'
	              },
	              timingFunction: 'ease',
	              duration: self.duration
	            }, function() {
	                self.index = (self.index + 1) % (self.count);
	                self.$emit('change', {
	                    index: self.index,
	                    count: self.count
	                });
	                cb && cb();
	            });
	        },
	        appeared: function() {
	            this.outofview = false;
	        },
	        disappeared: function() {
	            this.outofview = true;
	        }
	    }
	}

	;__weex_module__.exports.template = __weex_module__.exports.template || {}
	;Object.assign(__weex_module__.exports.template, {
	  "type": "div",
	  "classList": [
	    "wrap"
	  ],
	  "events": {
	    "appear": "appeared",
	    "disappear": "disappeared"
	  },
	  "children": [
	    {
	      "type": "div",
	      "id": "anim",
	      "classList": [
	        "anim"
	      ],
	      "children": [
	        {
	          "type": "content"
	        }
	      ]
	    }
	  ]
	})
	;__weex_module__.exports.style = __weex_module__.exports.style || {}
	;Object.assign(__weex_module__.exports.style, {
	  "wrap": {
	    "overflow": "hidden",
	    "position": "relative"
	  },
	  "anim": {
	    "flexDirection": "column",
	    "position": "absolute",
	    "transform": "translateY(0) translateZ(0)"
	  }
	})
	})

/***/ },
/* 9 */
/***/ function(module, exports) {

	;__weex_define__("@weex-component/wxc-navbar", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	    __weex_module__.exports = {
	        data: function () {return {
	          dataRole: 'navbar',

	          //导航条背景色
	          backgroundColor: 'black',

	          //导航条高度
	          height: 88,

	          //导航条标题 
	          title: "",

	          //导航条标题颜色
	          titleColor: 'black',

	          //右侧按钮图片
	          rightItemSrc: '',

	          //右侧按钮标题
	          rightItemTitle: '',

	          //右侧按钮标题颜色
	          rightItemColor: 'black',

	          //左侧按钮图片
	          leftItemSrc: '',

	          //左侧按钮标题
	          leftItemTitle: '',

	          //左侧按钮颜色
	          leftItemColor: 'black',
	        }},
	        methods: {
	          onclickrightitem: function (e) {
	            this.$dispatch('naviBar.rightItem.click', {});
	          },
	          onclickleftitem: function (e) {
	            this.$dispatch('naviBar.leftItem.click', {});
	          }
	        }
	    }

	;__weex_module__.exports.template = __weex_module__.exports.template || {}
	;Object.assign(__weex_module__.exports.template, {
	  "type": "div",
	  "classList": [
	    "container"
	  ],
	  "style": {
	    "height": function () {return this.height},
	    "backgroundColor": function () {return this.backgroundColor}
	  },
	  "attr": {
	    "dataRole": function () {return this.dataRole}
	  },
	  "children": [
	    {
	      "type": "text",
	      "classList": [
	        "right-text"
	      ],
	      "style": {
	        "color": function () {return this.rightItemColor}
	      },
	      "attr": {
	        "naviItemPosition": "right",
	        "value": function () {return this.rightItemTitle}
	      },
	      "shown": function () {return !this.rightItemSrc},
	      "events": {
	        "click": "onclickrightitem"
	      }
	    },
	    {
	      "type": "image",
	      "classList": [
	        "right-image"
	      ],
	      "attr": {
	        "naviItemPosition": "right",
	        "src": function () {return this.rightItemSrc}
	      },
	      "shown": function () {return this.rightItemSrc},
	      "events": {
	        "click": "onclickrightitem"
	      }
	    },
	    {
	      "type": "text",
	      "classList": [
	        "left-text"
	      ],
	      "style": {
	        "color": function () {return this.leftItemColor}
	      },
	      "attr": {
	        "naviItemPosition": "left",
	        "value": function () {return this.leftItemTitle}
	      },
	      "shown": function () {return !this.leftItemSrc},
	      "events": {
	        "click": "onclickleftitem"
	      }
	    },
	    {
	      "type": "image",
	      "classList": [
	        "left-image"
	      ],
	      "attr": {
	        "naviItemPosition": "left",
	        "src": function () {return this.leftItemSrc},
	        "resize": "contain"
	      },
	      "shown": function () {return this.leftItemSrc},
	      "events": {
	        "click": "onclickleftitem"
	      }
	    },
	    {
	      "type": "text",
	      "classList": [
	        "center-text"
	      ],
	      "style": {
	        "color": function () {return this.titleColor}
	      },
	      "attr": {
	        "naviItemPosition": "center",
	        "value": function () {return this.title}
	      }
	    }
	  ]
	})
	;__weex_module__.exports.style = __weex_module__.exports.style || {}
	;Object.assign(__weex_module__.exports.style, {
	  "container": {
	    "flexDirection": "row",
	    "position": "fixed",
	    "top": 0,
	    "left": 0,
	    "right": 0,
	    "width": 750
	  },
	  "right-text": {
	    "position": "absolute",
	    "bottom": 28,
	    "right": 32,
	    "textAlign": "right",
	    "fontSize": 40,
	    "fontFamily": "\"微软雅黑\", \"Microsoft yahei\""
	  },
	  "left-text": {
	    "position": "absolute",
	    "bottom": 28,
	    "left": 32,
	    "textAlign": "left",
	    "fontSize": 40,
	    "fontFamily": "\"微软雅黑\", \"Microsoft yahei\""
	  },
	  "center-text": {
	    "position": "absolute",
	    "width": 500,
	    "bottom": 21,
	    "left": 125,
	    "textAlign": "center",
	    "fontSize": 40,
	    "fontWeight": "bold",
	    "fontFamily": "\"微软雅黑\", \"Microsoft yahei\""
	  },
	  "left-image": {
	    "position": "absolute",
	    "bottom": 24,
	    "left": 32,
	    "width": 43,
	    "height": 43
	  },
	  "right-image": {
	    "position": "absolute",
	    "bottom": 20,
	    "right": 28,
	    "width": 50,
	    "height": 50
	  }
	})
	})

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	;__weex_define__("@weex-component/wxc-navpage", [], function(__weex_require__, __weex_exports__, __weex_module__){
	__webpack_require__(9);

	;
	    __weex_module__.exports = {
	        data: function () {return {
	          dataRole: 'navbar',
	          backgroundColor: 'black',
	          height: 88,
	          title: "",
	          titleColor: 'black',
	          rightItemSrc: '',
	          rightItemTitle: '',
	          rightItemColor: 'black',
	          leftItemSrc: '',
	          leftItemTitle: '',
	          leftItemColor: 'black',
	        }}
	    }

	;__weex_module__.exports.template = __weex_module__.exports.template || {}
	;Object.assign(__weex_module__.exports.template, {
	  "type": "div",
	  "classList": [
	    "wrapper"
	  ],
	  "children": [
	    {
	      "type": "wxc-navbar",
	      "attr": {
	        "dataRole": function () {return this.dataRole},
	        "height": function () {return this.height},
	        "backgroundColor": function () {return this.backgroundColor},
	        "title": function () {return this.title},
	        "titleColor": function () {return this.titleColor},
	        "leftItemSrc": function () {return this.leftItemSrc},
	        "leftItemTitle": function () {return this.leftItemTitle},
	        "leftItemColor": function () {return this.leftItemColor},
	        "rightItemSrc": function () {return this.rightItemSrc},
	        "rightItemTitle": function () {return this.rightItemTitle},
	        "rightItemColor": function () {return this.rightItemColor}
	      }
	    },
	    {
	      "type": "div",
	      "classList": [
	        "wrapper"
	      ],
	      "style": {
	        "marginTop": function () {return this.height}
	      },
	      "children": [
	        {
	          "type": "content"
	        }
	      ]
	    }
	  ]
	})
	;__weex_module__.exports.style = __weex_module__.exports.style || {}
	;Object.assign(__weex_module__.exports.style, {
	  "wrapper": {
	    "position": "absolute",
	    "top": 0,
	    "left": 0,
	    "right": 0,
	    "bottom": 0,
	    "width": 750
	  }
	})
	})

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	;__weex_define__("@weex-component/wxc-tabbar", [], function(__weex_require__, __weex_exports__, __weex_module__){
	__webpack_require__(12);

	;
	    __weex_module__.exports = {
	        data: function () {return {
	          tabItems: [ ],
	          selectedIndex: 0,
	          selectedColor: '#ff4a46',
	          unselectedColor: '#cdcdd4',
	        }},
	        created: function () {
	          this.selected(this.selectedIndex);

	          this.$on('tabItem.onClick',function(e){
	            var detail= e.detail;
	            this.selectedIndex = detail.index;
	            this.selected(detail.index);

	            var params = {
	              index: detail.index
	            };
	            this.$dispatch('tabBar.onClick', params);
	          });
	        },
	        methods: {
	            selected: function(index) {
	              for(var i = 0; i < this.tabItems.length; i++) {
	                var tabItem = this.tabItems[i];
	                if(i == index){
	                  tabItem.icon = tabItem.selectedImage;
	                  tabItem.titleColor = this.selectedColor;
	                  tabItem.visibility = 'visible';
	                }
	                else {
	                  tabItem.icon = tabItem.image;
	                  tabItem.titleColor = this.unselectedColor;
	                  tabItem.visibility = 'hidden';
	                }
	              }
	            },  
	        }
	    }

	;__weex_module__.exports.template = __weex_module__.exports.template || {}
	;Object.assign(__weex_module__.exports.template, {
	  "type": "div",
	  "classList": [
	    "wrapper"
	  ],
	  "children": [
	    {
	      "type": "embed",
	      "classList": [
	        "content"
	      ],
	      "style": {
	        "visibility": function () {return this.visibility}
	      },
	      "repeat": function () {return this.tabItems},
	      "attr": {
	        "src": function () {return this.src},
	        "type": "weex"
	      }
	    },
	    {
	      "type": "div",
	      "classList": [
	        "tabbar"
	      ],
	      "append": "tree",
	      "children": [
	        {
	          "type": "wxc-tabitem",
	          "repeat": function () {return this.tabItems},
	          "attr": {
	            "index": function () {return this.index},
	            "icon": function () {return this.icon},
	            "title": function () {return this.title},
	            "titleColor": function () {return this.titleColor}
	          }
	        }
	      ]
	    }
	  ]
	})
	;__weex_module__.exports.style = __weex_module__.exports.style || {}
	;Object.assign(__weex_module__.exports.style, {
	  "wrapper": {
	    "width": 750,
	    "position": "absolute",
	    "top": 0,
	    "left": 0,
	    "right": 0,
	    "bottom": 0
	  },
	  "content": {
	    "position": "absolute",
	    "top": 0,
	    "left": 0,
	    "right": 0,
	    "bottom": 0,
	    "marginTop": 0,
	    "marginBottom": 97
	  },
	  "tabbar": {
	    "flexDirection": "row",
	    "position": "fixed",
	    "bottom": 0,
	    "left": 0,
	    "right": 0,
	    "height": 97
	  }
	})
	})

/***/ },
/* 12 */
/***/ function(module, exports) {

	;__weex_define__("@weex-component/wxc-tabitem", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	    __weex_module__.exports = {
	        data: function () {return {
	          index: 0,
	          title: '',
	          titleColor: '#cdcdd4',
	          icon: '',
	          backgroundColor: '#ffffff',
	        }},
	        methods: {
	          onclickitem: function (e) {
	            var vm = this;
	            var params = {
	              index: vm.index
	            };
	            vm.$dispatch('tabItem.onClick', params);
	          }
	        }
	    }

	;__weex_module__.exports.template = __weex_module__.exports.template || {}
	;Object.assign(__weex_module__.exports.template, {
	  "type": "div",
	  "classList": [
	    "container"
	  ],
	  "style": {
	    "backgroundColor": function () {return this.backgroundColor}
	  },
	  "events": {
	    "click": "onclickitem"
	  },
	  "children": [
	    {
	      "type": "image",
	      "classList": [
	        "tab-icon"
	      ],
	      "attr": {
	        "src": function () {return this.icon}
	      }
	    },
	    {
	      "type": "text",
	      "classList": [
	        "tab-text"
	      ],
	      "style": {
	        "color": function () {return this.titleColor}
	      },
	      "attr": {
	        "value": function () {return this.title}
	      }
	    }
	  ]
	})
	;__weex_module__.exports.style = __weex_module__.exports.style || {}
	;Object.assign(__weex_module__.exports.style, {
	  "container": {
	    "flex": 1,
	    "flexDirection": "column",
	    "alignItems": "center",
	    "justifyContent": "center",
	    "height": 97,
	    "borderTop": "1px solid #dddddd"
	  },
	  "top-line": {
	    "position": "absolute",
	    "top": 0,
	    "left": 0,
	    "right": 0,
	    "height": 2
	  },
	  "tab-icon": {
	    "marginTop": 10,
	    "width": 48,
	    "height": 48
	  },
	  "tab-text": {
	    "textAlign": "center",
	    "fontSize": 20,
	    "color": "#cdcdd4",
	    "fontFamily": "\"微软雅黑\", \"Microsoft yahei\""
	  }
	})
	})

/***/ }
/******/ ]);