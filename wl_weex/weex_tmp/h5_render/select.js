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
/***/ function(module, exports) {

	;__weex_define__("@weex-component/bd86354fc6613273065914c285fc4b88", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	    __weex_require__('@weex-module/weex-components');
	    var stream = __weex_require__('@weex-module/stream')
	    var eventModule = __weex_require__('@weex-module/event');

	    __weex_module__.exports = {
	        data: function () {return {
	            hostU:'',
	            wifiU:'',
	            urls:'',
	            lks:'',
	            clist:[],
	            citylist:[],
	            platform:'',
	            seleheight:'',
	            isapp:true,
	            hascity:false,
	            cityname:'',
	            isandriod:'/wl_weex/build/index.html?page=wifi.js',
	            closeimg:'',
	            borders:'1px'
	        }},
	        created: function() {
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
	                vm.getData();
	                vm.closeimg = vm.hostU+'/wl_weex/images/selectclose.png'
	                vm.$getConfig(function (config) {
	                    var env = config.env;
	                    vm.seleheight = env.deviceHeight+45;
	                    vm.platform = env.platform.toLowerCase();
	                    if(vm.platform == 'web'){
	                        vm.borders="2px"
	                        vm.isapp=false;
	                        var scale = env.scale;
	                        var deviceWidth = env.deviceWidth / scale;
	                        vm.navBarHeight = 64.0 * 750.0 / deviceWidth;
	                    }
	                }.bind(this));    
	                // if(vm.platform == 'web'){
	                //     var ua = navigator.userAgent.toLowerCase(); 
	                //     if ((/android/).test(ua)) {
	                //         stream.fetch({
	                //             url: vm.hostU+'/MshopApi/User/get_online_userid',
	                //             type: 'json',
	                //             method: 'GET'
	                //         }, function (res) {
	                //             if (res.data.msg=='success'){
	                //                 vm.channel_uid = res.data.data.uid;
	                //             }else{
	                //                 vm.channel_uid = '';
	                //             }
	                //         },function(response){
	                //             vm.channel_uid = '';
	                //         })
	                //         vm.isandriod = vm.wifiU+'/package/index?channel_client=weixin&channel=uroaming&channel_uid='+vm.channel_uid
	                //     }  
	                // }
	            // },function(response){
	                
	            // })
	            
	        },
	        methods: {
	            getData:function(){
	                var vm = this;
	                stream.fetch({
	                    url: vm.hostU+'/MshopApi/Fun/area_list?parent_id=0',
	                    type: 'json',
	                    method: 'GET'
	                }, function (res) {   
	                    if(typeof res == 'string'){
	                        res = JSON.parse(res);
	                    }
	                    var res_data = res.data; 
	                    if(typeof res_data == 'string'){
	                        res_data = JSON.parse(res_data);
	                    }
	                    if (res_data.msg=='success'){
	                        if (res_data.code == 0){
	                            vm.clist = res_data.data.area_list;
	                        }
	                    }
	                },function(response){
	                    
	                })
	            },
	            gotoIndex: function(e) {
	                var vm = this;
	                var parentid = e.target.attr.parentid;
	                var havecity = e.target.attr.havecity;
	                vm.cityname = e.target.attr.cityname;
	                var cityurl = ''
	                if (havecity == 1){
	                    if (vm.platform !='web'){
	                        eventModule.showTabbar(false)
	                    }
	                    vm.hascity = !vm.hascity;
	                    stream.fetch({
	                        url: vm.hostU+'/MshopApi/Fun/area_list?parent_id='+parentid,
	                        type: 'json',
	                        method: 'GET'
	                    }, function (res) {   
	                        if(typeof res == 'string'){
	                            res = JSON.parse(res);
	                        }
	                        var res_data = res.data; 
	                        if(typeof res_data == 'string'){
	                            res_data = JSON.parse(res_data);
	                        }
	                        if (res_data.msg=='success'){
	                            if (res_data.code == 0){
	                                vm.citylist = res_data.data.area_list;
	                            }
	                        }
	                    },function(response){
	                        
	                    })
	                }else{
	                    vm.lks = '?'
	                    vm.urls = vm.hostU+'/wl_weex/build/index.js'      
	                    if(vm.platform == 'web'){
	                        vm.lks = '&'
	                        vm.urls = vm.hostU+'/wl_weex/build/index.html?page=index.js';
	                    }
	                    cityurl = vm.urls +vm.lks+ 'parent_id=' + parentid;
	                    var params = {
	                        'url': cityurl,
	                        'animated' : 'true',
	                    }
	                    if(vm.platform == 'android'){
	                        var loginModule = __weex_require__('@weex-module/login');
	                        loginModule.openURL(params.url,false)
	                    }else{
	                        vm.$call('navigator','push',params, function () {});
	                    }
	                }
	                
	            },
	            gotocity:function(e){
	                var vm = this;
	                if (vm.platform !='web'){
	                    eventModule.showTabbar(true)
	                }
	                var parentid = e.target.attr.parentid;
	                vm.lks = '?'
	                vm.urls = vm.hostU+'/wl_weex/build/index.js'      
	                if(vm.platform == 'web'){
	                    vm.lks = '&'
	                    vm.urls = vm.hostU+'/wl_weex/build/index.html?page=index.js';
	                }
	                cityurl = vm.urls +vm.lks+ 'parent_id=' + parentid;
	                var params = {
	                    'url': cityurl,
	                    'animated' : 'true',
	                }
	                if(vm.platform == 'android'){
	                    var loginModule = __weex_require__('@weex-module/login');
	                    loginModule.openURL(params.url,false)
	                }else{
	                    vm.$call('navigator','push',params, function () {});
	                }
	                vm.hascity=!vm.hascity;
	            },
	            cityclose:function(){
	                if (this.platform !='web'){
	                    eventModule.showTabbar(true)
	                }
	                this.hascity=!this.hascity;
	            }
	        }
	    }

	;__weex_module__.exports.template = __weex_module__.exports.template || {}
	;Object.assign(__weex_module__.exports.template, {
	  "type": "scroller",
	  "classList": [
	    "main"
	  ],
	  "children": [
	    {
	      "type": "container",
	      "classList": [
	        "sel-cell"
	      ],
	      "repeat": function () {return this.clist},
	      "children": [
	        {
	          "type": "div",
	          "classList": [
	            "countryDiv"
	          ],
	          "events": {
	            "click": "gotoIndex"
	          },
	          "attr": {
	            "cityname": function () {return this.name},
	            "parentid": function () {return this.id},
	            "havecity": function () {return this.have_city}
	          },
	          "children": [
	            {
	              "type": "image",
	              "classList": [
	                "sel-img"
	              ],
	              "attr": {
	                "src": function () {return this.img}
	              }
	            },
	            {
	              "type": "div",
	              "classList": [
	                "sel-pos"
	              ]
	            },
	            {
	              "type": "text",
	              "classList": [
	                "sel-ch"
	              ],
	              "attr": {
	                "value": function () {return this.name}
	              }
	            },
	            {
	              "type": "text",
	              "classList": [
	                "sel-en"
	              ],
	              "attr": {
	                "value": function () {return this.en_name}
	              }
	            }
	          ]
	        }
	      ]
	    },
	    {
	      "type": "div",
	      "style": {
	        "height": 98
	      },
	      "shown": function () {return this.isapp}
	    },
	    {
	      "type": "div",
	      "classList": [
	        "outerfix"
	      ],
	      "shown": function () {return this.hascity},
	      "children": [
	        {
	          "type": "scroller",
	          "classList": [
	            "seletop"
	          ]
	        }
	      ]
	    },
	    {
	      "type": "div",
	      "classList": [
	        "selectbox"
	      ],
	      "shown": function () {return this.hascity},
	      "style": {
	        "height": function () {return this.seleheight}
	      },
	      "children": [
	        {
	          "type": "div",
	          "classList": [
	            "seclose"
	          ],
	          "children": [
	            {
	              "type": "image",
	              "classList": [
	                "secloseimg"
	              ],
	              "attr": {
	                "src": function () {return this.closeimg}
	              },
	              "events": {
	                "click": "cityclose"
	              }
	            }
	          ]
	        },
	        {
	          "type": "div",
	          "classList": [
	            "countryse"
	          ],
	          "children": [
	            {
	              "type": "text",
	              "classList": [
	                "countrytext"
	              ],
	              "attr": {
	                "value": function () {return this.cityname}
	              }
	            },
	            {
	              "type": "text",
	              "classList": [
	                "citytext"
	              ],
	              "attr": {
	                "value": "请选择城市"
	              }
	            }
	          ]
	        },
	        {
	          "type": "scroller",
	          "classList": [
	            "selemain"
	          ],
	          "children": [
	            {
	              "type": "div",
	              "classList": [
	                "selecell"
	              ],
	              "events": {
	                "click": "gotocity"
	              },
	              "attr": {
	                "parentid": function () {return this.id}
	              },
	              "repeat": function () {return this.citylist},
	              "style": {
	                "borderBottomWidth": function () {return this.borders}
	              },
	              "children": [
	                {
	                  "type": "div",
	                  "classList": [
	                    "sele_name"
	                  ],
	                  "children": [
	                    {
	                      "type": "text",
	                      "classList": [
	                        "sele_namet"
	                      ],
	                      "attr": {
	                        "value": function () {return this.name}
	                      }
	                    }
	                  ]
	                },
	                {
	                  "type": "div",
	                  "classList": [
	                    "sele_enname"
	                  ],
	                  "children": [
	                    {
	                      "type": "text",
	                      "classList": [
	                        "sele_ennamet"
	                      ],
	                      "attr": {
	                        "value": function () {return this.en_name}
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
	})
	;__weex_module__.exports.style = __weex_module__.exports.style || {}
	;Object.assign(__weex_module__.exports.style, {
	  "main": {
	    "fontFamily": "\"微软雅黑\", \"Microsoft yahei\"",
	    "backgroundColor": "#e4ecef"
	  },
	  "countryDiv": {
	    "width": 750,
	    "height": 422,
	    "alignItems": "center",
	    "justifyContent": "center",
	    "overflow": "hidden",
	    "position": "relative"
	  },
	  "sel-cell": {
	    "width": 750
	  },
	  "sel-img": {
	    "width": 750,
	    "height": 422,
	    "position": "absolute",
	    "left": 0,
	    "top": 0
	  },
	  "sel-pos": {
	    "backgroundColor": "rgba(0,0,0,0.2)",
	    "width": 750,
	    "height": 422,
	    "position": "absolute",
	    "left": 0,
	    "top": 0
	  },
	  "sel-ch": {
	    "color": "#fefefe",
	    "textAlign": "center",
	    "paddingBottom": 18,
	    "fontSize": 48
	  },
	  "sel-en": {
	    "color": "#fefefe",
	    "textAlign": "center",
	    "fontSize": 32,
	    "opacity": 0.7
	  },
	  "refresh-view": {
	    "width": 750,
	    "flexDirection": "row"
	  },
	  "refresh-arrow": {
	    "fontSize": 25,
	    "color": "#eeeeee",
	    "marginLeft": 36
	  },
	  "webtab": {
	    "backgroundColor": "#ffffff",
	    "opacity": 0.95,
	    "width": 750,
	    "height": 97,
	    "borderTop": "1 solid #dddddd",
	    "position": "fixed",
	    "bottom": 0,
	    "left": 0,
	    "flexDirection": "row",
	    "zIndex": 1
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
	  "outerf": {
	    "width": 750,
	    "height": 1334
	  },
	  "outerfix": {
	    "backgroundColor": "rgba(0,0,0,0.8)",
	    "width": 750,
	    "height": 1334,
	    "position": "fixed",
	    "left": 0,
	    "top": 0,
	    "zIndex": 999
	  },
	  "selectbox": {
	    "width": 750,
	    "position": "fixed",
	    "left": 0,
	    "top": 70,
	    "zIndex": 999,
	    "alignItems": "center"
	  },
	  "seclose": {
	    "width": 666
	  },
	  "secloseimg": {
	    "width": 40,
	    "height": 40,
	    "marginLeft": 620
	  },
	  "countrytext": {
	    "width": 666,
	    "fontSize": 60,
	    "color": "#ffffff",
	    "fontFamily": "\"微软雅黑\", \"Microsoft yahei\"",
	    "textAlign": "center",
	    "height": 76,
	    "marginTop": 8
	  },
	  "citytext": {
	    "width": 666,
	    "fontSize": 28,
	    "color": "#ffffff",
	    "fontWeight": "bold",
	    "fontFamily": "\"微软雅黑\", \"Microsoft yahei\"",
	    "opacity": 0.6,
	    "textAlign": "center",
	    "height": 48
	  },
	  "seletop": {
	    "width": 750,
	    "height": 1334
	  },
	  "selemain": {
	    "width": 666,
	    "height": 870,
	    "marginTop": 40,
	    "borderRadius": 17,
	    "borderStyle": "solid",
	    "borderWidth": 2,
	    "borderColor": "#aeabac",
	    "backgroundColor": "rgba(255,255,255,0.2)"
	  },
	  "selecell": {
	    "flexDirection": "row",
	    "width": 632,
	    "height": 100,
	    "borderStyle": "solid",
	    "borderBottomWidth": 2,
	    "borderColor": "#aeabac",
	    "marginLeft": 18
	  },
	  "sele_name": {
	    "flex": 1,
	    "alignItems": "flex-start",
	    "justifyContent": "center"
	  },
	  "sele_enname": {
	    "flex": 1,
	    "alignItems": "flex-end",
	    "justifyContent": "center"
	  },
	  "sele_namet": {
	    "fontSize": 32,
	    "color": "#ffffff",
	    "fontFamily": "\"微软雅黑\", \"Microsoft yahei\""
	  },
	  "sele_ennamet": {
	    "fontSize": 32,
	    "color": "#ffffff",
	    "fontFamily": "\"微软雅黑\", \"Microsoft yahei\""
	  }
	})
	})
	;__weex_bootstrap__("@weex-component/bd86354fc6613273065914c285fc4b88", {
	  "transformerVersion": "0.3.1"
	},undefined)

/***/ }
/******/ ]);