window.mapWidget={getConfiguration:function(){return{}},init:function(){this.$canvas=null,this.markers=[],this.currentInfowin=null},render:function(i){if(this.map&&this.$canvas.is(":visible")){this.bounds=new google.maps.LatLngBounds;var n;for(n=0;n<this.markers.length;n++)this.markers[n].setMap(null);for(n=i.results.hits.length-1;n>=0;n--)this.addMarker(i.results.hits[n]);this.map.fitBounds(this.bounds),this.map.getZoom()>18&&this.map.setZoom(18)}},initMap:function(){if(!this.map){this.$canvas=$("#results-map"),this.map=new google.maps.Map(this.$canvas.get(0),{center:{lat:51.4683508,lng:-.1910273},zoom:12});var i=this;this.map.addListener("click",function(){i.closeInfoWindows()})}},addMarker:function(i){if(i.geo.lat&&i.geo.lng){var n=this,e=["infowin"];i.isToLet||e.push("infowin--unavailable");var s=new google.maps.InfoWindow({content:'<div class="'+e.join(" ")+'">'+(i.image?'<div class="infowin-image"><a href="'+i.url+'" target="_blank"><img src="'+i.image.url+'"></a></div>':"")+'<div class="infowin-info"><div class="infowin-heading"><a href="'+i.url+'">'+i.title+'</a></div><div class="infowin-description">'+i.description+'</div><div class="infowin-link"><a href="'+i.url+'" target="_blank">View Property</a></div></div></div>'}),t=this.getMarkerIcon("#ee3938","#b22929"),a=this.getMarkerIcon("#b4b4b4","#979797"),o=new google.maps.Marker({position:i.geo,map:this.map,icon:i.isToLet?t:a});o.addListener("click",function(){n.closeInfoWindows(),s.open(n.map,o),n.currentInfowin=s}),this.bounds.extend(i.geo),this.markers.push(o)}},closeInfoWindows:function(){this.currentInfowin&&(this.currentInfowin.close(),this.currentInfowin=null)},getMarkerIcon:function(i,n){return{path:"M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30 a 2,2 0 1,1 4,0 2,2 0 1,1 -4,0",fillColor:i,fillOpacity:1,strokeColor:n,strokeWeight:1,scale:1}}},window.hitsPerPage=1e3,window.checkboxTemplate='<div class="facet-item"><label for="{{name}}" class="facet-item__label custom-checkbox"><input type="radio" id="{{name}}" class="custom-checkbox__input"{{#isRefined}} checked{{/isRefined}}><span class="custom-checkbox__indicator"></span><span class="custom-checkbox__text">{{name}}</span></label></div>';