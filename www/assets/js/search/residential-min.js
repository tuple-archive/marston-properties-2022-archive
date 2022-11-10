window.searchBase={hitsPerPage:1e3,checkboxTemplate:'<div class="facet-item"><label for="{{name}}" class="facet-item__label custom-checkbox"><input type="radio" id="{{name}}" class="custom-checkbox__input"{{#isRefined}} checked{{/isRefined}}><span class="custom-checkbox__indicator"></span><span class="custom-checkbox__text">{{name}}</span></label></div>'},window.searchBase.mapWidget={getConfiguration:function(){return{}},init:function(){this.$canvas=null,this.markers=[],this.currentInfowin=null},render:function(e){if(this.map&&this.$canvas.is(":visible")){this.bounds=new google.maps.LatLngBounds;var t;for(t=0;t<this.markers.length;t++)this.markers[t].setMap(null);for(t=e.results.hits.length-1;t>=0;t--)this.addMarker(e.results.hits[t]);this.map.fitBounds(this.bounds),this.map.getZoom()>18&&this.map.setZoom(18)}},initMap:function(){if(!this.map){this.$canvas=$("#results-map"),this.map=new google.maps.Map(this.$canvas.get(0),{center:{lat:51.4683508,lng:-.1910273},zoom:12});var e=this;this.map.addListener("click",function(){e.closeInfoWindows()})}},addMarker:function(e){if(e.geo.lat&&e.geo.lng){var t=this,i=["infowin"];e.isToLet||i.push("infowin--unavailable");var a=new google.maps.InfoWindow({content:'<div class="'+i.join(" ")+'">'+(e.image?'<div class="infowin-image"><a href="'+e.url+'" target="_blank"><img src="'+e.image+'"></a></div>':"")+'<div class="infowin-info"><div class="infowin-heading"><a href="'+e.url+'">'+e.title+'</a></div><div class="infowin-description">'+e.description+'</div><div class="infowin-link"><a href="'+e.url+'" target="_blank">'+(e.isToLet?"View full details":"Contact us")+"</a></div></div></div>"}),s=this.getMarkerIcon("#ee3938","#b22929"),n=this.getMarkerIcon("#b4b4b4","#979797"),r={lat:e.geo.lat+this.getRandomInt(-1e-4,1e-4),lng:e.geo.lng+this.getRandomInt(-1e-4,1e-4)},o=new google.maps.Marker({position:r,map:this.map,icon:e.isToLet?s:n,zIndex:e.order});o.addListener("click",function(){t.closeInfoWindows(),a.open(t.map,o),t.currentInfowin=a}),this.bounds.extend(r),this.markers.push(o)}},closeInfoWindows:function(){this.currentInfowin&&(this.currentInfowin.close(),this.currentInfowin=null)},getMarkerIcon:function(e,t){return{path:"M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30 a 2,2 0 1,1 4,0 2,2 0 1,1 -4,0",fillColor:e,fillOpacity:1,strokeColor:t,strokeWeight:1,scale:1}},getRandomInt:function(e,t){return Math.random()*(t-e)+e}},function($){var e=window.searchBase.hitsPerPage,t=window.searchBase.checkboxTemplate,i=instantsearch({appId:appConfig.searchAppId,apiKey:appConfig.searchApiKey,indexName:appConfig.searchIndexPrefix+"_residentialproperties",urlSync:!1,searchParameters:{facetsRefinements:{enabled:[!0]},facets:["isToLet"]}});i.addWidget(instantsearch.widgets.refinementList({container:"#filter-bedrooms",attributeName:"bedrooms.label",sortBy:function(e,t){return"studio"===e.name.toLowerCase()?-1e3:e.name-t.name},templates:{header:"Bedrooms",item:t}})),i.addWidget(instantsearch.widgets.refinementList({container:"#filter-prices",attributeName:"priceRanges.label",sortBy:function(e,t){var i=/^£([0-9]),?([0-9]+)?.*/;return e.name.replace(i,"$1$2")-t.name.replace(i,"$1$2")},templates:{header:"Price (PCM)",item:t}})),i.addWidget(instantsearch.widgets.refinementList({container:"#filter-locations",attributeName:"locations.title",templates:{header:"Locations",item:t}})),i.addWidget(instantsearch.widgets.refinementList({container:"#filter-types",attributeName:"types.title",templates:{header:"Types",item:t}}));var a=$("#template-hits-item").html();i.addWidget(instantsearch.widgets.hits({container:"#results-list",hitsPerPage:e,templates:{item:a}})),i.addWidget(window.searchBase.mapWidget),i.start();var s=$(".results"),n=function(){s.hasClass("results--map")?(window.searchBase.mapWidget.initMap(),i.helper.setQueryParameter("hitsPerPage",e).removeFacetRefinement("isToLet").search()):i.helper.setQueryParameter("hitsPerPage",1e3).addFacetRefinement("isToLet",!0).search()};n(),$(".results-nav-toggle").click(function(){s.toggleClass("results--list results--map"),n()})}(window.jQuery);
