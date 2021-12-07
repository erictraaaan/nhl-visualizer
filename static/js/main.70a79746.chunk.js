(this["webpackJsonpnhl-visualizer"]=this["webpackJsonpnhl-visualizer"]||[]).push([[0],{102:function(t,e,a){"use strict";a.r(e);var n=a(0),s=a.n(n),r=a(4),o=a.n(r),c=(a(78),a(8)),i=a(2),l=a.n(i),u=a(7),d=a(107),h=(a(80),function(t){var e=t.homeStats.shots+t.homeStats.missed+t.awayStats.blocks,a=e/(e+(t.awayStats.shots+t.awayStats.missed+t.homeStats.blocks))*100;return{home:a=Math.round(100*a)/100,away:Math.round(100*(100-a))/100}}),m=function(t){var e=function(t){var e=0,a=0;if(1==t.homeStats.goalies.length)e=t.homeStats.goalies[0].savePercentage;else{var n=0;t.homeStats.goalies.forEach((function(t){n+=t.savePercentage})),e=n/t.homeStats.goalies.length}1==t.awayStats.goalies.length?a=t.awayStats.goalies[0].savePercentage:(n=0,t.awayStats.goalies.forEach((function(t){n+=t.savePercentage})),a=n/t.awayStats.goalies.length);return{home:Math.round(100*e)/100,away:Math.round(100*a)/100}}(t),a=function(t){var e=100*Math.round(t.homeStats.goals/t.homeStats.shots),a=100*Math.round(t.awayStats.goals/t.awayStats.shots);return{home:Math.round(100*e)/100,away:Math.round(100*a)/100}}(t);return{home:e.home+a.home,away:e.away+a.away}},y=a(22),f=a.n(y),p=["GOAL","SHOT","MISSED_SHOT","BLOCKED_SHOT"],v=function(){var t=Object(u.a)(l.a.mark((function t(e){return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",new Promise((function(t,a){var n="https://statsapi.web.nhl.com/api/v1/schedule?startDate=".concat(e,"&endDate=").concat(e);f.a.get(n).then((function(n){if(console.log("raw: ",n),n.data.dates&&1===n.data.dates.length){var s=[];n.data.dates[0].games.forEach((function(t){var e=t.gamePk,a=t.teams.home.team.id,n=t.teams.away.team.id,r=t.teams.away.score,o={gamePk:e,homeTeamID:a,homeTeamScore:t.teams.home.score,awayTeamID:n,awayTeamScore:r,homeTeamName:t.teams.home.team.name,awayTeamName:t.teams.away.team.name};s.push(o)}));var r={date:e,games:s};return console.log("output: ",r),t(r)}return a(null)})).catch((function(){return a(null)}))})));case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),g=function(){var t=Object(u.a)(l.a.mark((function t(e){return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",new Promise((function(t,a){var n="https://statsapi.web.nhl.com/api/v1/game/".concat(e,"/feed/live");f.a.get(n).then((function(a){console.log("raw: ",a);var n=a.data.liveData.plays.scoringPlays,s=a.data.liveData.plays.playsByPeriod,r=s[2].endIndex,o=s[1].startIndex,c=s[1].endIndex,i=a.data.gameData.teams.home.id,l=a.data.gameData.teams.away.id,u={home:0,away:0},d=[];a.data.liveData.plays.allPlays.forEach((function(t){if(p.includes(t.result.eventTypeId)&&t.about.eventIdx<=r){var e,a=t.about.eventIdx;if(o<=a&&a<=c)e={x:-parseInt(t.coordinates.x),y:-parseInt(t.coordinates.y)};else e=t.coordinates;var n=t.result.eventTypeId,s=t.team.id,l=[];t.players.forEach((function(t){var e={id:t.player.id,fullName:t.player.fullName,playerType:t.playerType};l.push(e)}));var h={teamID:s,coordinates:e,eventIDx:a,eventTypeID:n,players:l};"MISSED_SHOT"===h.eventTypeID&&(h.teamID===i?u.home+=1:u.away+=1),d.push(h)}}));var h=a.data.liveData.boxscore.teams.home.teamStats.teamSkaterStats,m=h.goals,y=h.blocked,f=h.shots,v=a.data.liveData.linescore.periods[0].home.rinkSide,g=a.data.liveData.boxscore.teams.home.goalies,b=[];g.forEach((function(t){var e="ID".concat(t),n=a.data.liveData.boxscore.teams.home.players[e],s={id:n.person.id,saves:n.stats.goalieStats.saves,shots:n.stats.goalieStats.shots,savePercentage:n.stats.goalieStats.savePercentage};b.push(s)}));var j={startingRinkSide:v,id:i,goals:m,shots:f,blocks:y,goalies:b,missed:u.home},w=a.data.liveData.boxscore.teams.away.teamStats.teamSkaterStats,S=w.goals,x=w.blocked,O=w.shots,D=a.data.liveData.linescore.periods[0].away.rinkSide,T=a.data.liveData.boxscore.teams.away.goalies,k=[];T.forEach((function(t){var e="ID".concat(t),n=a.data.liveData.boxscore.teams.away.players[e],s={id:n.person.id,saves:n.stats.goalieStats.saves,shots:n.stats.goalieStats.shots,savePercentage:n.stats.goalieStats.savePercentage};k.push(s)}));var I={startingRinkSide:D,id:l,goals:S,shots:O,blocks:x,goalies:k,missed:u.away},P={gamePK:e,scoringPlays:n,periodPlays:s,allPlays:d,homeStats:j,awayStats:I};return console.log("details: ",P),t(P)})).catch((function(){return a(null)}))})));case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),b=a(18),j=a(1),w=function(t){var e=Object(n.useRef)(null),a=["SHOT","GOAL"],s="blue",r=168;Object(n.useEffect)((function(){null!=t.data&&c()}),[]),Object(n.useEffect)((function(){o(),null!=t.data&&c()}),[t]);var o=function(){b.b("svg").remove()},c=function(){var t=b.b(e.current).append("svg").attr("width",410).attr("height",178);f(t,198,0,r,"red"),v(t,200,84,30,"red"),p(t,22.6,80,8,12,"blue"),p(t,371,80,8,12,"blue"),f(t,22,6,156,"red"),f(t,378,6,156,"red"),f(t,144,0,r,"blue"),f(t,252,0,r,"blue"),y(t,r,400),i(t),d(t)},i=function(e){t.data.scoringPlays.forEach((function(a){var n=t.data.allPlays.find((function(t){return t.eventIDx===a}));if(null!=n&&null!=e){var r=n.teamID==t.data.homeStats.id?"red":s,o=m(n.coordinates);v(e,o.x,o.y,2,r,r)}}))},l=function(t,e,a,n){for(var s=[],r=t;r<e;r++)for(var o=a;o<n;o++)s.push([8*r,8*o,0]);return s},u=function(t){return b.a().domain([0,4]).range(["transparent",t])},d=function(e){var n=l(0,25,0,21),r=l(25,50,0,21);t.data.allPlays.forEach((function(e){if(a.includes(e.eventTypeID)){var s=m(e.coordinates);!function(t,e){for(var a=0;a<t.length;a++)e.x>=t[a][0]&&e.x<t[a][0]+8&&e.y>=t[a][1]&&e.y<t[a][1]+8&&t[a][2]++}(e.teamID==t.data.homeStats.id?r:n,s)}}));var o=u("red"),c=u(s),i=e.append("g");h(e,r,o),h(i,n,c)},h=function(t,e,a){t.selectAll("rect").data(e).enter().append("rect").attr("rx",6).attr("ry",6).attr("x",(function(t){return t[0]})).attr("y",(function(t){return t[1]})).attr("width",8).attr("height",8).attr("fill",(function(t){return a(t[2])})).attr("opacity",.8)},m=function(e){var a=t.data.homeStats.startingRinkSide;return e.x=2*e.x,e.y=2*e.y,"right"==a&&(e.x=-e.x,e.y=-e.y),{x:e.x+200,y:e.y+84}},y=function(t,e,a){t.append("rect").attr("rx",45).attr("ry",45).attr("x",0).attr("y",0).attr("height",e).attr("width",a).style("opacity",1).style("stroke","black").style("fill","none").style("stroke-width","black")},f=function(t,e,a,n,s){t.append("rect").attr("x",e).attr("y",a).attr("height",n).attr("width","2").style("fill",s)},p=function(t,e,a,n,s,r){t.append("rect").attr("x",e).attr("y",a).attr("width",n).attr("height",s).attr("stroke",r).style("stroke-width",.5).attr("fill","#89CFF0")},v=function(t,e,a,n,s,r){t.append("circle").attr("cx",e).attr("cy",a).style("stroke-width",.5).attr("r",n).attr("stroke",s).attr("fill",r||"transparent")};return Object(j.jsx)("div",{className:"shot-visualizer-div",ref:e})},S=function(){var t=function(){var t=Object(u.a)(l.a.mark((function t(e){return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,g(e).then((function(t){C(t)}));case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),e=new Date,a="https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/",s=Object(n.useState)(new Date),r=Object(c.a)(s,2),o=r[0],i=r[1],y=Object(n.useState)(null),f=Object(c.a)(y,2),p=f[0],b=f[1],S=Object(n.useState)(0),x=Object(c.a)(S,2),O=x[0],D=x[1],T=Object(n.useState)(null),k=Object(c.a)(T,2),I=k[0],P=k[1],N=Object(n.useState)(null),E=Object(c.a)(N,2),M=E[0],C=E[1],H=function(){var t=Object(u.a)(l.a.mark((function t(){var e;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=o.toISOString().split("T")[0],t.next=3,v(e).then((function(t){b(t)}));case 3:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();Object(n.useEffect)((function(){0!==O&&t(O)}),[O]),Object(n.useEffect)((function(){H()}),[]),Object(n.useEffect)((function(){H()}),[o]);return Object(j.jsxs)("div",{className:"App",children:[Object(j.jsx)("h1",{children:"NHL Scoring Visualizer"}),Object(j.jsx)("p",{children:"Pick a game and see some interesting scoring stats."}),Object(j.jsxs)("div",{className:"day-selector",children:[Object(j.jsx)("button",{className:"day-selector-btn",onClick:function(){var t=new Date(o.getTime()-864e5);i(t)},children:"Previous Day"}),Object(j.jsx)("p",{children:"".concat(["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][o.getDay()],", ").concat(["January","February","March","April","May","June","July","August","September","October","November","December"][o.getMonth()]," ").concat(o.getDate())}),Object(j.jsx)("button",{className:"day-selector-btn"+(o.setHours(0,0,0,0)==e.setHours(0,0,0,0)?" hide":""),onClick:function(){var t=new Date(o.getTime()+864e5);i(t)},children:"Next Day"})]}),p&&p.games.map((function(t,e){return Object(j.jsxs)("div",{className:"card level-3",onClick:function(){P(t),D(t.gamePk)},children:[Object(j.jsx)("img",{src:"".concat(a).concat(t.awayTeamID,".svg"),className:"scorebug-logo"}),Object(j.jsxs)("h5",{children:[t.awayTeamName," vs ",t.homeTeamName]}),Object(j.jsx)("img",{src:"".concat(a).concat(t.homeTeamID,".svg"),className:"scorebug-logo"}),Object(j.jsxs)("p",{children:[t.awayTeamScore," - ",t.homeTeamScore," "]})]},e)})),0!==O&&M&&I&&Object(j.jsx)(d.a,{open:0!==O,onClose:function(){D(0)},children:Object(j.jsxs)("div",{className:"modal card",children:[Object(j.jsxs)("p",{children:[I.awayTeamName," vs. ",I.homeTeamName]}),Object(j.jsxs)("p",{children:[I.awayTeamScore," - ",I.homeTeamScore]}),Object(j.jsxs)("p",{children:["Home Corsi: ",h(M).home,"%"]}),Object(j.jsxs)("p",{children:["Away Corsi: ",h(M).away,"%"]}),Object(j.jsxs)("p",{children:["Home PDO: ",m(M).home]}),Object(j.jsxs)("p",{children:["Away PDO: ",m(M).away]}),Object(j.jsx)(w,{data:M})]})}),Object(j.jsx)("div",{className:"footer",children:Object(j.jsx)("p",{children:"Made by Eric Tran using public data available through the NHL API."})})]})},x=function(t){t&&t instanceof Function&&a.e(3).then(a.bind(null,108)).then((function(e){var a=e.getCLS,n=e.getFID,s=e.getFCP,r=e.getLCP,o=e.getTTFB;a(t),n(t),s(t),r(t),o(t)}))};o.a.render(Object(j.jsx)(s.a.StrictMode,{children:Object(j.jsx)(S,{})}),document.getElementById("root")),x()},78:function(t,e,a){},80:function(t,e,a){}},[[102,1,2]]]);
//# sourceMappingURL=main.70a79746.chunk.js.map