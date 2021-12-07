(this["webpackJsonpnhl-visualizer"]=this["webpackJsonpnhl-visualizer"]||[]).push([[0],{102:function(e,a,t){},104:function(e,a,t){},123:function(e,a,t){},125:function(e,a,t){},131:function(e,a,t){"use strict";t.r(a);var s=t(0),n=t.n(s),r=t(20),c=t.n(r),o=(t(102),t(22)),i=t(7),l=t.n(i),d=t(26),m=t(154),u=(t(104),t(43)),h=t.n(u),g=["GOAL","SHOT","MISSED_SHOT","BLOCKED_SHOT"],j=function(){var e=Object(d.a)(l.a.mark((function e(a){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e,t){var s="https://statsapi.web.nhl.com/api/v1/schedule?startDate=".concat(a,"&endDate=").concat(a);h.a.get(s).then((function(s){if(s.data.dates&&1===s.data.dates.length){var n=[];return s.data.dates[0].games.forEach((function(e){var a=e.gamePk,t=e.teams.home.team.id,s=e.teams.away.team.id,r=e.teams.away.score,c={gamePk:a,homeTeamID:t,homeTeamScore:e.teams.home.score,awayTeamID:s,awayTeamScore:r,homeTeamName:e.teams.home.team.name,awayTeamName:e.teams.away.team.name};n.push(c)})),e({date:a,games:n})}return t(null)})).catch((function(){return t(null)}))})));case 1:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),y=function(){var e=Object(d.a)(l.a.mark((function e(a){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e,t){var s="https://statsapi.web.nhl.com/api/v1/game/".concat(a,"/feed/live");h.a.get(s).then((function(t){var s=t.data.liveData.plays.scoringPlays,n=t.data.liveData.plays.playsByPeriod,r=n[2].endIndex,c=n[1].startIndex,o=n[1].endIndex,i=t.data.gameData.teams.home.id,l=t.data.gameData.teams.away.id,d={home:0,away:0},m=[];t.data.liveData.plays.allPlays.forEach((function(e){if(g.includes(e.result.eventTypeId)&&e.about.eventIdx<=r){var a,t=e.about.eventIdx;if(c<=t&&t<=o)a={x:-parseInt(e.coordinates.x),y:-parseInt(e.coordinates.y)};else a=e.coordinates;var s=e.result.eventTypeId,n=e.team.id,l=[];e.players.forEach((function(e){var a={id:e.player.id,fullName:e.player.fullName,playerType:e.playerType};l.push(a)}));var u={teamID:n,coordinates:a,eventIDx:t,eventTypeID:s,players:l};"MISSED_SHOT"===u.eventTypeID&&(u.teamID===i?d.home+=1:d.away+=1),m.push(u)}}));var u=t.data.liveData.boxscore.teams.home.teamStats.teamSkaterStats,h=u.goals,j=u.blocked,y=u.shots,p=t.data.liveData.linescore.periods[0].home.rinkSide,v=t.data.liveData.boxscore.teams.home.goalies,b=[];v.forEach((function(e){var a="ID".concat(e),s=t.data.liveData.boxscore.teams.home.players[a],n={id:s.person.id,saves:s.stats.goalieStats.saves,shots:s.stats.goalieStats.shots,savePercentage:s.stats.goalieStats.savePercentage};b.push(n)}));var f={startingRinkSide:p,id:i,goals:h,shots:y,blocks:j,goalies:b,missed:d.home},x=t.data.liveData.boxscore.teams.away.teamStats.teamSkaterStats,O=x.goals,S=x.blocked,w=x.shots,D=t.data.liveData.linescore.periods[0].away.rinkSide,T=t.data.liveData.boxscore.teams.away.goalies,N=[];T.forEach((function(e){var a="ID".concat(e),s=t.data.liveData.boxscore.teams.away.players[a],n={id:s.person.id,saves:s.stats.goalieStats.saves,shots:s.stats.goalieStats.shots,savePercentage:s.stats.goalieStats.savePercentage};N.push(n)}));var k={startingRinkSide:D,id:l,goals:O,shots:w,blocks:S,goalies:N,missed:d.away};return e({gamePK:a,scoringPlays:s,periodPlays:n,allPlays:m,homeStats:f,awayStats:k})})).catch((function(){return t(null)}))})));case 1:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),p=t(44),v=(t(123),t(1)),b=function(e){var a=Object(s.useRef)(null),t=["SHOT","GOAL"],n="blue",r=168;Object(s.useEffect)((function(){return console.log("props: ",e.data),null!=e.data&&c(),function(){console.log("component dismounting")}}),[]);var c=function(){var e=p.b(a.current).append("div").classed("svg-container",!0).append("svg").attr("preserveAspectRatio","xMinYMin meet").attr("viewBox","0 0 ".concat(410," ").concat(178)).classed("svg-content-responsive",!0);g(e,198,0,r,"red"),y(e,200,84,30,"red"),j(e,22.6,80,8,12,"blue"),j(e,371,80,8,12,"blue"),g(e,22,6,156,"red"),g(e,378,6,156,"red"),g(e,144,0,r,"blue"),g(e,252,0,r,"blue"),h(e,r,400),o(e),d(e)},o=function(a){e.data.scoringPlays.forEach((function(t){var s=e.data.allPlays.find((function(e){return e.eventIDx===t}));if(null!=s&&null!=a){var r=s.teamID===e.data.homeStats.id?"red":n,c=u(s.coordinates);y(a,c.x,c.y,2,r,r)}}))},i=function(e,a,t,s){for(var n=[],r=e;r<a;r++)for(var c=t;c<s;c++)n.push([8*r,8*c,0]);return n},l=function(e){return p.a().domain([0,4]).range(["transparent",e])},d=function(a){var s=i(0,25,0,21),r=i(25,50,0,21);e.data.allPlays.forEach((function(a){if(t.includes(a.eventTypeID)){var n=u(a.coordinates);!function(e,a){for(var t=0;t<e.length;t++)a.x>=e[t][0]&&a.x<e[t][0]+8&&a.y>=e[t][1]&&a.y<e[t][1]+8&&e[t][2]++}(a.teamID===e.data.homeStats.id?r:s,n)}}));var c=l("red"),o=l(n),d=a.append("g");m(a,r,c),m(d,s,o)},m=function(e,a,t){e.selectAll("rect").data(a).enter().append("rect").attr("rx",6).attr("ry",6).attr("x",(function(e){return e[0]})).attr("y",(function(e){return e[1]})).attr("width",8).attr("height",8).attr("fill",(function(e){return t(e[2])})).attr("opacity",.8)},u=function(a){var t=e.data.homeStats.startingRinkSide;return a.x=2*a.x,a.y=2*a.y,"right"===t&&(a.x=-a.x,a.y=-a.y),{x:a.x+200,y:a.y+84}},h=function(e,a,t){e.append("rect").attr("rx",45).attr("ry",45).attr("x",0).attr("y",0).attr("height",a).attr("width",t).style("opacity",1).style("stroke","black").style("fill","none").style("stroke-width","black")},g=function(e,a,t,s,n){e.append("rect").attr("x",a).attr("y",t).attr("height",s).attr("width","2").style("fill",n)},j=function(e,a,t,s,n,r){e.append("rect").attr("x",a).attr("y",t).attr("width",s).attr("height",n).attr("stroke",r).style("stroke-width",.5).attr("fill","#89CFF0")},y=function(e,a,t,s,n,r){e.append("circle").attr("cx",a).attr("cy",t).style("stroke-width",.5).attr("r",s).attr("stroke",n).attr("fill",r||"transparent")};return Object(v.jsxs)("div",{children:[Object(v.jsx)("h5",{children:"Goals & Shot Distribution"}),Object(v.jsx)("div",{className:"shot-visualizer-div",ref:a})]})},f=t(159),x=t(162),O=t(156),S=t(157),w=t(160),D=t(161),T=t(158),N=(t(125),function(e){var a=function(e){var a=0,t=0;if(1===e.homeStats.goalies.length)a=e.homeStats.goalies[0].savePercentage;else{var s=0;e.homeStats.goalies.forEach((function(e){s+=e.savePercentage})),a=s/e.homeStats.goalies.length}1===e.awayStats.goalies.length?t=e.awayStats.goalies[0].savePercentage:(s=0,e.awayStats.goalies.forEach((function(e){s+=e.savePercentage})),t=s/e.awayStats.goalies.length);return{home:Math.round(100*a)/100,away:Math.round(100*t)/100}}(e),t=function(e){var a=100*Math.round(e.homeStats.goals/e.homeStats.shots),t=100*Math.round(e.awayStats.goals/e.awayStats.shots);return{home:Math.round(100*a)/100,away:Math.round(100*t)/100}}(e);return{home:a.home+t.home,away:a.away+t.away}}),k=function(e){var a=function(a){var t=function(e){var a=e.homeStats.shots+e.homeStats.missed+e.awayStats.blocks,t=a/(a+(e.awayStats.shots+e.awayStats.missed+e.homeStats.blocks))*100;return{home:t=Math.round(100*t)/100,away:Math.round(100*(100-t))/100}}(e.gameDetails),s=N(e.gameDetails);return{name:a?e.gameData.homeTeamName:e.gameData.awayTeamName,shots:a?e.gameDetails.homeStats.shots:e.gameDetails.awayStats.shots,corsi:a?t.home:t.away,pdo:a?s.home:s.away}},t=[a(!0),a(!1)];return Object(v.jsxs)("div",{className:"table-div",children:[Object(v.jsx)("h5",{children:"Advanced Stats"}),Object(v.jsx)(S.a,{component:T.a,children:Object(v.jsxs)(f.a,{"aria-label":"simple table",children:[Object(v.jsx)(w.a,{children:Object(v.jsxs)(D.a,{children:[Object(v.jsx)(O.a,{align:"center",children:"Team"}),Object(v.jsx)(O.a,{align:"center",children:"Shots"}),Object(v.jsx)(O.a,{align:"center",children:"Corsi"}),Object(v.jsx)(O.a,{align:"center",children:"PDO"})]})}),Object(v.jsx)(x.a,{children:t.map((function(e){return Object(v.jsxs)(D.a,{sx:{"&:last-child td, &:last-child th":{border:0}},children:[Object(v.jsx)(O.a,{align:"center",component:"th",scope:"row",children:e.name}),Object(v.jsx)(O.a,{align:"center",children:e.shots}),Object(v.jsx)(O.a,{align:"center",children:e.corsi}),Object(v.jsx)(O.a,{align:"center",children:e.pdo})]},e.name)}))})]})})]})},I=function(){var e=function(){var e=Object(d.a)(l.a.mark((function e(a){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y(a).then((function(e){M(e)}));case 2:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),a=new Date((new Date).getTime()-864e5),t="https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/",n=Object(s.useState)(a),r=Object(o.a)(n,2),c=r[0],i=r[1],u=Object(s.useState)(null),h=Object(o.a)(u,2),g=h[0],p=h[1],f=Object(s.useState)(0),x=Object(o.a)(f,2),O=x[0],S=x[1],w=Object(s.useState)(null),D=Object(o.a)(w,2),T=D[0],N=D[1],I=Object(s.useState)(null),P=Object(o.a)(I,2),E=P[0],M=P[1],C=function(){var e=Object(d.a)(l.a.mark((function e(){var a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=c.toISOString().split("T")[0],e.next=3,j(a).then((function(e){p(e)}));case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();Object(s.useEffect)((function(){0!==O&&e(O)}),[O]),Object(s.useEffect)((function(){C()}),[]),Object(s.useEffect)((function(){C()}),[c]);return Object(v.jsxs)("div",{className:"App",children:[Object(v.jsx)("h1",{children:"NHL Scoring Visualizer"}),Object(v.jsx)("p",{children:"Pick a game and see some interesting scoring stats."}),Object(v.jsxs)("div",{className:"day-selector",children:[Object(v.jsx)("div",{className:"day-selector-btn",onClick:function(){var e=new Date(c.getTime()-864e5);i(e)},children:"Previous Day"}),Object(v.jsx)("div",{className:"date-display",children:Object(v.jsx)("p",{children:"".concat(["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][c.getDay()],", ").concat(["January","February","March","April","May","June","July","August","September","October","November","December"][c.getMonth()]," ").concat(c.getDate())})}),Object(v.jsx)("div",{className:"day-selector-btn"+(c.setHours(0,0,0,0)===a.setHours(0,0,0,0)?" hide":""),onClick:function(){var e=new Date(c.getTime()+864e5);i(e)},children:"Next Day"})]}),g&&g.games.map((function(e,a){return Object(v.jsx)("div",{className:"card level-3",onClick:function(){N(e),S(e.gamePk)},children:Object(v.jsxs)("div",{className:"teams",children:[Object(v.jsxs)("div",{className:"team-display",children:[Object(v.jsx)("img",{alt:"away team logo",src:"".concat(t).concat(e.awayTeamID,".svg"),className:"scorebug-logo"}),Object(v.jsx)("p",{className:"team-name",children:e.awayTeamName})]}),Object(v.jsx)("div",{className:"score",children:Object(v.jsxs)("p",{children:[e.awayTeamScore," - ",e.homeTeamScore," "]})}),Object(v.jsxs)("div",{className:"team-display",children:[Object(v.jsx)("img",{alt:"home team logo",src:"".concat(t).concat(e.homeTeamID,".svg"),className:"scorebug-logo"}),Object(v.jsx)("p",{className:"team-name",children:e.homeTeamName})]})]})},a)})),0!==O&&E&&T&&Object(v.jsx)(m.a,{open:0!==O,onClose:function(){M(null),S(0)},children:Object(v.jsxs)("div",{className:"modal card",children:[Object(v.jsxs)("div",{className:"teams",children:[Object(v.jsxs)("div",{className:"team-display",children:[Object(v.jsx)("img",{alt:"away team logo",src:"".concat(t).concat(T.awayTeamID,".svg"),className:"scorebug-logo"}),Object(v.jsx)("p",{className:"team-name",children:T.awayTeamName})]}),Object(v.jsx)("div",{className:"score",children:Object(v.jsxs)("p",{children:[T.awayTeamScore," - ",T.homeTeamScore," "]})}),Object(v.jsxs)("div",{className:"team-display",children:[Object(v.jsx)("img",{alt:"home team logo",src:"".concat(t).concat(T.homeTeamID,".svg"),className:"scorebug-logo"}),Object(v.jsx)("p",{className:"team-name",children:T.homeTeamName})]})]}),Object(v.jsx)(b,{data:E}),Object(v.jsx)(k,{gameDetails:E,gameData:T})]})}),Object(v.jsx)("div",{className:"footer",children:Object(v.jsx)("p",{children:"Made by Eric Tran using public data available through the NHL API."})})]})},P=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,163)).then((function(a){var t=a.getCLS,s=a.getFID,n=a.getFCP,r=a.getLCP,c=a.getTTFB;t(e),s(e),n(e),r(e),c(e)}))};c.a.render(Object(v.jsx)(n.a.StrictMode,{children:Object(v.jsx)(I,{})}),document.getElementById("root")),P()}},[[131,1,2]]]);
//# sourceMappingURL=main.91a8e4ba.chunk.js.map