(this.webpackJsonpdashboard=this.webpackJsonpdashboard||[]).push([[0],{20:function(e,t,a){e.exports=a(42)},42:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),l=a(18),o=a.n(l),c=a(2),i=a(3),r=a(4),d=a(5),u=function(e){Object(d.a)(a,e);var t=Object(r.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,s=new Array(n),l=0;l<n;l++)s[l]=arguments[l];return(e=t.call.apply(t,[this].concat(s))).state={sidebarLinks:[{id:1,title:"Dashboard",href:"#",icon:"zmdi-home"},{id:2,title:"Website",href:"#",icon:"zmdi-view-compact"},{id:3,title:"Visitors",href:"#",icon:"zmdi-mouse"},{id:4,title:"Reviews",href:"#",icon:"zmdi-star"},{id:5,title:"Listings",href:"#",icon:"zmdi-format-list-bulleted"},{id:6,title:"Appointments",href:"#",icon:"zmdi-calendar"},{id:7,title:"Settings",href:"#",icon:"zmdi-settings"}]},e}return Object(i.a)(a,[{key:"render",value:function(){return s.a.createElement("div",{className:"sidebar"},s.a.createElement("header",null,s.a.createElement("a",{href:"#"},"GROWTH PLUG")),s.a.createElement("ul",{className:"nav"},this.state.sidebarLinks.map((function(e){return s.a.createElement("li",{key:e.id},s.a.createElement("a",{href:e.href},s.a.createElement("i",{className:"zmdi "+e.icon})," ",e.title))}))))}}]),a}(s.a.Component),m=function(e){Object(d.a)(a,e);var t=Object(r.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(i.a)(a,[{key:"render",value:function(){return s.a.createElement("nav",{className:"navbar navbar-default"},s.a.createElement("div",{className:"container-fluid"},s.a.createElement("ul",{className:"nav navbar-nav navbar-right"},s.a.createElement("li",null,s.a.createElement("select",{name:"location",className:"location"},s.a.createElement("option",{value:"San Jose, CA"},"San Jose, CA"),s.a.createElement("option",{value:"Kochi"},"Kochi"))),s.a.createElement("li",null,s.a.createElement("a",{href:"/logout"},"Logout")))))}}]),a}(s.a.Component),h=a(8),g=a(19),p=a(6),f=a(7),b=a.n(f),E=function(e){var t=e.handleSave,a=e.handleClose,n=e.show,l=e.children,o=n?"modal display-block":"modal display-none";return s.a.createElement("div",{className:o},s.a.createElement("section",{className:"modal-main"},l,s.a.createElement("button",{className:"close-button",onClick:a},"X"),s.a.createElement("button",{onClick:t},"Save Changes")))},v=function(e){Object(d.a)(a,e);var t=Object(r.a)(a);function a(){var e;return Object(c.a)(this,a),(e=t.call(this)).showModal=function(){e.setState({showModal:!0})},e.hideModal=function(){e.setState({showModal:!1})},e.state={facebookPage_name:"",facebookPage_address:"",facebookPage_phone:"",showModal:!1,updatingListingIndex:-1,listings:[{id:1,icon:"zmdi-google-plus",source:"Google",name:"ABC Dental",address:"2101 California St",phone:"111.111.1111",rating:"3/5",listed:!0,status:!0},{id:2,icon:"zmdi-globe",source:"Yelp",name:"ABC Dental",address:"2101 California St",phone:"111.111.1111",rating:"2/5",listed:!1,status:!1},{id:3,icon:"zmdi-yahoo",source:"Yahoo!",name:"ABC Dental",address:"2101 California St",phone:"111.111.1111",rating:"3/5",listed:!1,status:!1}]},e.commonChange=e.commonChange.bind(Object(p.a)(e)),e.saveChanges=e.saveChanges.bind(Object(p.a)(e)),e}return Object(i.a)(a,[{key:"commonChange",value:function(e){this.setState(Object(g.a)({},e.target.name,e.target.value))}},{key:"saveChanges",value:function(e){var t=this,a=this.state.listings[this.state.updatingListingIndex];b.a.post("https://graph.facebook.com/".concat(a.id),null,{params:{phone:this.state.facebookPage_phone,single_line_address:this.state.facebookPage_address,access_token:a.access_token}}).then((function(e){console.log("Sucessful",e),alert("Changes have been saved successfully!"),t.hideModal()})).catch((function(e){return alert("Some error occured"),console.log("Some error occured",e)})),a.phone=this.state.facebookPage_phone,a.address=this.state.facebookPage_address,this.state.facebookPage_address="",this.state.facebookPage_phone=""}},{key:"getCookieValue",value:function(e){var t=document.cookie.match("(^|;)\\s*"+e+"\\s*=\\s*([^;]+)");return t?t.pop():""}},{key:"getLongLivedUserToken",value:function(){var e="https://graph.facebook.com/oauth/access_token?grant_type=fb_exchange_token&client_id=".concat("2665949620330798","&client_secret=").concat("de251b9fe220d30867ac3c62666a1df3","&fb_exchange_token=").concat(this.getCookieValue("access_token"));b.a.get(e).then((function(e){return console.log(e.data)}))}},{key:"getUserManagedPages",value:function(){var e=this,t=this.getCookieValue("access_token"),a=this.getCookieValue("uid");b.a.get("https://graph.facebook.com/".concat(a,"/accounts?access_token=").concat(t)).then((function(t){Object(h.a)(t.data.data).forEach((function(t){b.a.get("https://graph.facebook.com/".concat(t.id,"?fields=name,about,emails,website,single_line_address,is_published,phone&access_token=").concat(t.access_token)).then((function(a){var n={id:t.id,access_token:t.access_token,icon:"zmdi-facebook",source:"Facebook",name:t.name,address:a.data.single_line_address||"-",phone:a.data.phone||"-",rating:"-",listed:a.data.is_published,status:!0};e.setState((function(e){return{listings:[].concat(Object(h.a)(e.listings),[n])}}))})).catch((function(e){return console.log(e)}))}))})).catch((function(e){alert("Some error occured in initial page listing. Check console for more details"),console.log("Error from getUserManagedPages() \n",e)}))}},{key:"updatePageMetaData",value:function(e){var t=this;console.log("Update Page called on ",e);for(var a=0;a<this.state.listings.length;++a)if(e==this.state.listings[a].id){this.setState({updatingListingIndex:a},(function(){console.log(t.state.updatingListingIndex,"updatinglistinginexfromstate"),console.log("##",t.state.listings[t.state.updatingListingIndex])}));break}this.showModal()}},{key:"defaultModalValues",value:function(){var e=this.state.updatingListingIndex>-1,t=this.state.updatingListingIndex;return{name:e?this.state.listings[t].name:"",address:e?this.state.listings[t].address:"",phone:e?this.state.listings[t].phone:""}}},{key:"componentDidMount",value:function(){this.getUserManagedPages()}},{key:"render",value:function(){var e=this;return s.a.createElement("div",{className:"container-fluid"},s.a.createElement("div",{className:"listings table-responsive"},s.a.createElement("div",{className:"text-center",style:{background:"#EEF5F4",padding:"1px 0px"}},s.a.createElement("h3",null,"Listings")),s.a.createElement(E,{show:this.state.showModal,handleSave:this.saveChanges,handleClose:this.hideModal},s.a.createElement("h2",null,"Update Page Details"),s.a.createElement("p",null,"All values will be overwritten"),s.a.createElement("label",{htmlFor:"phone"},"Phone: "),s.a.createElement("input",{type:"text",name:"facebookPage_phone",id:"phone",placeholder:this.defaultModalValues().phone,onChange:this.commonChange}),s.a.createElement("br",null),s.a.createElement("label",{htmlFor:"address"},"Single Line Address: "),s.a.createElement("input",{type:"text",name:"facebookPage_address",id:"address",placeholder:this.defaultModalValues().address,onChange:this.commonChange}),s.a.createElement("br",null)),s.a.createElement("table",{className:"table"},s.a.createElement("thead",null,s.a.createElement("tr",null,s.a.createElement("th",null),s.a.createElement("th",null,"Source"),s.a.createElement("th",null,"Name"),s.a.createElement("th",null,"Address"),s.a.createElement("th",null,"Phone"),s.a.createElement("th",null,"Rating"),s.a.createElement("th",null,"Listed"),s.a.createElement("th",null,"Status"),s.a.createElement("th",null,"Action"))),s.a.createElement("tbody",null,this.state.listings.map((function(t){return s.a.createElement("tr",{key:t.id},s.a.createElement("td",null,s.a.createElement("i",{className:"zmdi "+t.icon})),s.a.createElement("td",null,t.source),!t.status&&Math.random()>=.5?s.a.createElement("td",{className:"red"},t.name):s.a.createElement("td",null,t.name),!t.status&&Math.random()>=.5?s.a.createElement("td",{className:"red"},t.address):s.a.createElement("td",null,t.address),!t.status&&Math.random()>=.5?s.a.createElement("td",{className:"red"},t.phone):s.a.createElement("td",null,t.phone),!t.status&&Math.random()>=.5?s.a.createElement("td",{className:"red"},t.rating):s.a.createElement("td",null,t.rating),s.a.createElement("td",null,t.listed?"Yes":"No"),s.a.createElement("td",null,t.status?"\u2714\ufe0f":"\u274c"),s.a.createElement("td",null,"Facebook"===t.source?s.a.createElement("button",{className:"listing-update",onClick:function(a){return e.updatePageMetaData(t.id)}},"Update"):""))}))))))}}]),a}(s.a.Component),k=function(e){Object(d.a)(a,e);var t=Object(r.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(i.a)(a,[{key:"render",value:function(){return s.a.createElement("div",{className:"content"},s.a.createElement(m,null),s.a.createElement(v,null))}}]),a}(s.a.Component),C=function(e){Object(d.a)(a,e);var t=Object(r.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(i.a)(a,[{key:"render",value:function(){return s.a.createElement("div",{id:"viewport"},s.a.createElement(u,null),s.a.createElement(k,null))}}]),a}(s.a.Component);o.a.render(s.a.createElement(C,null),document.getElementById("root"))}},[[20,1,2]]]);
//# sourceMappingURL=main.e2a83fac.chunk.js.map