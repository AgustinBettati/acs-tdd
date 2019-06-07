(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{71:function(e,t,a){e.exports=a(91)},76:function(e,t,a){},89:function(e,t,a){},90:function(e,t,a){},91:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(9),o=a.n(i),l=(a(76),a(32)),c=a(17),s=a(33),u=a(34),d=a(39),m=a(35),f=a(40),h=a(11),p="http://localhost:4326/api",E=function(e){var t={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)};return fetch("http://localhost:4326/api/course",t)},v=function(e){var t="".concat(p,"/course"),a={method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)};return fetch(t,a)},b=a(133),k=a(135),C=a(151),g=a(136),j=a(149),w=a(137),N=a(138),O=a(140),S=a(139),y=a(143),T=function(e){function t(){var e,a;Object(s.a)(this,t);for(var r=arguments.length,i=new Array(r),o=0;o<r;o++)i[o]=arguments[o];return(a=Object(d.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(i)))).state={fields:{name:"",description:"",platform:"",link:"",id:""},showPassword:!1,errors:{name:!1,description:!1,platform:!1,link:!1},isNew:!0,isEditing:!0,isCreating:!1,isDeleteModalOpen:!1},a.redirect=function(){a.setState({redirect:"/"})},a.handleResponse=function(e){if(404===e.status)throw Error("Course not created");return e.json()},a.setCourse=function(e){a.setState({fields:e,isNew:!1,isEditing:!1}),a.mapCourse()},a.mapCourse=function(){var e=a.state.course;if(e){var t=e.name,n=e.description,r=e.id,i=e.platform,o=e.link;a.setState(Object(c.a)({},a.state,{fields:Object(c.a)({},a.state.fields,{name:t,description:n,platform:i,link:o,id:r})}))}},a.handleChange=function(e){return function(t){a.setState(Object(c.a)({},a.state,{fields:Object(c.a)({},a.state.fields,Object(l.a)({},e,t.target.value))}))}},a.handleSubmit=function(){a.validateAll()&&(a.state.isNew?E(a.state.fields).then(function(){return a.setState({redirect:"/home"})}):v(a.state.fields).then(function(){return a.setState({redirect:"/"})}))},a.validateAll=function(){var e={},t=Object.keys(a.state.fields).map(function(t){var n=a.validate(t,a.state.fields[t]);return e[t]=!n,n}).reduce(a.checkBooleans,!0);return a.setState(Object(c.a)({},a.state,{errors:e})),t},a.checkBooleans=function(e,t){return e&&t},a.validate=function(e,t){return"link"!==e||a.validateLink(t)},a.validateLink=function(e){return!!/^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/.test(e)},a.getHeader=function(){return a.state.isNew?"Create course":"Edit course"},a.renderTitle=function(){var e=a.state.isNew;return n.createElement("div",null,!e&&n.createElement("div",{className:"delete-button"},n.createElement(b.a,{variant:"contained",color:"secondary"},"Delete")))},a}return Object(f.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){this.setState({isNew:!0})}},{key:"render",value:function(){var e=this.state,t=e.fields,a=e.errors,r=e.isCreating,i=e.redirect;return i?n.createElement(h.a,{to:i}):r?n.createElement("div",null,n.createElement(k.a,null)):n.createElement(g.a,{component:"main",maxWidth:"xs"},n.createElement(C.a,null),n.createElement("div",{className:"paper center-content"},n.createElement(w.a,{container:!0,direction:"row"},n.createElement(w.a,{item:!0,direction:"column"}),n.createElement(w.a,{item:!0,direction:"column"},n.createElement(N.a,{className:"new-course"},n.createElement(w.a,{container:!0},n.createElement(w.a,{item:!0,direction:"row"},n.createElement(S.a,{className:"center-content",title:this.getHeader()})),n.createElement(w.a,{item:!0,direction:"row"},n.createElement(O.a,null,n.createElement("form",{className:"form"},n.createElement(j.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,label:"Name",name:"name",id:"course-name",value:t.name,error:a.name,onChange:this.handleChange("name")}),n.createElement(j.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,label:"Description",name:"description",id:"course-description",value:t.description,error:a.description,onChange:this.handleChange("description")}),n.createElement(j.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,label:"Platform",name:"platform",id:"course-platform",value:t.platform,error:a.platform,onChange:this.handleChange("platform")}),n.createElement(j.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,label:"Link",name:"link",id:"course-link",value:t.link,error:a.link,onChange:this.handleChange("link")})))),n.createElement(w.a,{item:!0,direction:"row"},n.createElement(y.a,null,n.createElement(b.a,{variant:"contained",color:"primary",id:"submit-button",className:"save-button",onClick:this.handleSubmit},"Save")))))),n.createElement(w.a,{item:!0,direction:"column"}))))}}]),t}(n.Component),A=Object(h.f)(T);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var z=a(66),D=a(144),P=a(145),q=a(152),L=a(146),x=a(147),B=a(148),W=a(53),M=a(89),F=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(d.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={courses:[]},a.handleResponse=function(e){if(200!==e.status)throw Error("Error fetching admins");return e.json()},a.receiveCourses=function(e){a.setState({courses:e})},a}return Object(f.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){fetch("http://localhost:4326/api/course",{method:"GET"}).then(this.handleResponse).then(this.receiveCourses)}},{key:"handleEditCourse",value:function(e){this.setState({redirect:"/update/"+e})}},{key:"render",value:function(){var e=this,t=this.state,a=t.courses,r=t.redirect;return r?n.createElement(h.a,{to:r}):n.createElement("div",{className:"paper"},n.createElement(W.a,{className:M["Table-title"],color:"textPrimary"},"Home"),n.createElement(W.a,{className:M["Table-title"],color:"textPrimary"},"Courses table"),n.createElement("table",null,n.createElement(D.a,null,n.createElement(P.a,null,n.createElement(q.a,null,"Name"),n.createElement(q.a,null,"Platform"),n.createElement(q.a,null,"Link"),n.createElement(q.a,null))),n.createElement(L.a,null,a.map(function(t){return n.createElement(P.a,{key:t.id},n.createElement(q.a,null,t.name),n.createElement(q.a,null,t.platform),n.createElement(q.a,null,t.link),n.createElement(q.a,null,n.createElement(x.a,{onClick:function(){return e.handleEditCourse(t.id)}},n.createElement(B.a,null,"edit_icon"))))}))))}}]),t}(n.Component),H=Object(h.f)(F),J=a(142),R=a(153),$=a(141),G=a(90),I=function(e){function t(){var e,a;Object(s.a)(this,t);for(var r=arguments.length,i=new Array(r),o=0;o<r;o++)i[o]=arguments[o];return(a=Object(d.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(i)))).state={fields:{name:"",description:"",platform:"",link:"",id:""},showPassword:!1,errors:{name:!1,description:!1,platform:!1,link:!1},isNew:!1,isEditing:!0,isCreating:!1,isDeleteModalOpen:!1},a.redirect=function(){a.setState({redirect:"/"})},a.handleResponse=function(e){if(404===e.status)throw Error("Course not created");return e.json()},a.setCourse=function(e){a.setState({fields:e,isNew:!1,isEditing:!1}),a.mapCourse()},a.mapCourse=function(){var e=a.state.course;if(e){var t=e.name,n=e.description,r=e.id,i=e.platform,o=e.link;a.setState(Object(c.a)({},a.state,{fields:Object(c.a)({},a.state.fields,{name:t,description:n,platform:i,link:o,id:r})}))}},a.handleChange=function(e){return function(t){"id"===e&&(console.log(t.target.value),console.log(e),a.obtainCourseAndSetState(t.target.value)),a.setState(Object(c.a)({},a.state,{fields:Object(c.a)({},a.state.fields,Object(l.a)({},e,t.target.value))}))}},a.handleSubmit=function(){a.validateAll()&&v(a.state.fields).then(function(){return a.setState({redirect:"/home"})})},a.validateAll=function(){var e={},t=Object.keys(a.state.fields).map(function(t){var n=a.validate(t,a.state.fields[t]);return e[t]=!n,n}).reduce(a.checkBooleans,!0);return a.setState(Object(c.a)({},a.state,{errors:e})),t},a.checkBooleans=function(e,t){return e&&t},a.validate=function(e,t){return"link"!==e||a.validateLink(t)},a.validateLink=function(e){return!!/^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/.test(e)},a.getHeader=function(){return a.state.isNew?"Create course":"Edit course"},a.renderTitle=function(){var e=a.state.isNew;return n.createElement("div",null,!e&&n.createElement("div",{className:G.deleteButtonDiv},n.createElement(b.a,{variant:"contained",color:"secondary"},"DELETE")))},a}return Object(f.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){var e=this.props.match;e.params.id&&this.obtainCourseAndSetState(e.params.id)}},{key:"obtainCourseAndSetState",value:function(e){var t=this;(function(e){var t="".concat(p,"/course/").concat(e);return fetch(t,{method:"GET",headers:{"Content-Type":"application/json"}})})(e).then(function(e){e.json().then(function(e){t.setState(Object(c.a)({},t.state,{fields:Object(c.a)({},t.state.fields,{name:e.name,description:e.description,platform:e.platform,link:e.link,id:e.id})}))}).catch(function(){console.log("not found")})})}},{key:"render",value:function(){var e=this.state,t=e.fields,a=e.errors,r=e.isCreating,i=e.redirect;return i?n.createElement(h.a,{to:i}):r?n.createElement("div",null,n.createElement(k.a,null)):n.createElement("div",{className:G.NewCourse},n.createElement(W.a,{className:G["New-course-title"],color:"textSecondary"},"Edit course"),n.createElement(N.a,{className:G["New-course-box"]},n.createElement(O.a,null,n.createElement("form",{className:G["New-course-form"]},n.createElement(J.a,{className:G["course-form-control"],error:a.name},n.createElement(R.a,{required:!0,htmlFor:"admin-name"},"Name"),n.createElement($.a,{id:"course-name",value:t.name,onChange:this.handleChange("name"),placeholder:"previousName"})),n.createElement(J.a,{className:G["course-form-control"],error:a.description},n.createElement(R.a,{required:!0,htmlFor:"course-description"},"Description"),n.createElement($.a,{id:"course-description",value:t.description,onChange:this.handleChange("description")})),n.createElement(J.a,{className:G["course-form-control"],error:a.platform},n.createElement(R.a,{required:!0,htmlFor:"course-platform"},"Platform"),n.createElement($.a,{id:"course-platform",value:t.platform,onChange:this.handleChange("platform")})),n.createElement(J.a,{className:G["course-form-control"],error:a.link},n.createElement(R.a,{required:!0,htmlFor:"course-link"},"Link"),n.createElement($.a,{id:"course-link",value:t.link,onChange:this.handleChange("link")})))),n.createElement(y.a,null,n.createElement("div",{className:G.buttonContainer},n.createElement(b.a,{variant:"contained",color:"primary",className:G["create-admin-button"],onClick:this.handleSubmit},"SAVE")))))}}]),t}(n.Component),U=Object(h.f)(I);o.a.render(r.a.createElement(function(){return r.a.createElement(z.a,null,r.a.createElement(h.b,{path:"/home",component:H}),r.a.createElement(h.b,{path:"/course",component:A}),r.a.createElement(h.b,{path:"/update/:id",component:U}))},null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[71,1,2]]]);
//# sourceMappingURL=main.76dfb3fc.chunk.js.map