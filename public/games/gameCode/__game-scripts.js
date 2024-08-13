var Base=pc.createScript("base");Base.attributes.add("Runner",{type:"entity",title:"Runner"}),Base.attributes.add("Keeper",{type:"entity",title:"Keeper"}),Base.attributes.add("camera",{type:"entity",title:"Camera"}),Base.attributes.add("Roller",{type:"entity",title:"Roller"}),Base.attributes.add("RollRad",{type:"number",default:400,title:"Road Radius"}),Base.attributes.add("Gravity",{type:"number",default:40,title:"Gravity"}),Base.attributes.add("obsts",{type:"entity",array:!0,title:"Obstacles"}),Base.attributes.add("stars",{type:"entity",array:!0,title:"Stars"}),Base.attributes.add("buses",{type:"entity",array:!0,title:"Buses"}),Base.attributes.add("boosts",{type:"entity",array:!0,title:"Boosters"}),Base.attributes.add("sparks",{type:"entity",array:!0,title:"Sparks"}),Base.attributes.add("SpawnZfirst",{type:"number",default:-50,title:"Spawn First Dist"}),Base.attributes.add("SpawnZ",{type:"number",default:250,title:"Spawn Dist"}),Base.attributes.add("RailsStep",{type:"number",default:4.15,title:"Rails step"}),Base.attributes.add("StarY",{type:"number",default:2,title:"Star Y"}),Base.attributes.add("BoosterY",{type:"number",default:3,title:"Booster Y"}),Base.attributes.add("Menu",{type:"entity",title:"Menu"}),Base.attributes.add("Results",{type:"entity",title:"Results"}),Base.attributes.add("GMenu",{type:"entity",title:"Game Menu"}),Base.attributes.add("Continue",{type:"entity",title:"Continue"}),Base.attributes.add("ScoreText",{type:"entity",title:"Score Text"}),Base.attributes.add("DistText",{type:"entity",title:"Dist Text"}),Base.attributes.add("DistKill",{type:"number",default:20,title:"Dist Kill"}),Base.attributes.add("StarDugaHeight",{type:"number",default:3,title:"Star Duga Height"}),Base.attributes.add("PauseButt",{type:"entity",title:"Pause Button"}),Base.instance=null,Base.prototype.initialize=function(){Base.instance=this,this.app.addTweenManager(),this.app.SpawnZ=this.SpawnZ,this.app.LandscapeFlag=!0,window.innerWidth<window.innerHeight&&(this.app.LandscapeFlag=!1),this.OutLast={obj:null,z_back:0},this.OutObj={obj:null},this.app.innerWidth=window.innerWidth,this.app.innerHeight=window.innerHeight,this.app.data={rails:3,railsStep:this.RailsStep},this.MoveRails=[-this.RailsStep,0,this.RailsStep],this.app.RunFlag=!1,this.app.ScoreCntr=0,this.app.ScoreBest=0,this.app.RollerSpeed=0,this.app.RollRad=this.RollRad,this.app.Gravity=this.Gravity,this.app.HelpFlag=!1,this.app.HelpZs=[],this.Stars=[],this.Obstacles=[],this.Buses=[],this.Boosts=[],this.Sparks=[],this.Chunk=null,this.Chunks=[],this.ChunksIndex=0,this.Nears=[{objs:[],num:0},{objs:[],num:0},{objs:[],num:0}],this.RoadsIndex=0,this.RoadsNum=0,this.ScoreTimeCntr=0,this.SecCntr=0,this.WaitFlag=!1,this.ObstGenRate=1,this.ObstGenRateRnd=1,this.BusGenRate=4,this.BusGenRateRnd=4,this.BusGenRateCntr=5,this.KeysFlag=!1,this.app.keyboard&&(this.app.keyboard.on(pc.EVENT_KEYDOWN,this.onKeyDown,this),this.KeysFlag=!0);var t=this.app.mouse;t&&(t.on(pc.EVENT_MOUSEMOVE,this.onMouseMove,this),t.on(pc.EVENT_MOUSEDOWN,this.onMouseDown,this));var s=this.app.touch;s&&(s.on(pc.EVENT_TOUCHMOVE,this.onTouchMove,this),s.on(pc.EVENT_TOUCHSTART,this.onTouchDown,this)),this.top={obj:null,y:0,ramp:!1,over:!1},this.topGuard={obj:null,y:0,ramp:!1,over:!1},this.app.on("game:play",this.OnPlayButton,this),this.app.on("game:home",this.OnGoHome,this),this.app.on("game:mmenu",this.OnGoGameMenu,this),this.app.on("game:newscore",this.OnScoreText,this),this.app.on("game:restart",this.OnGameRestart,this),this.app.on("game:bumped",this.OnRunnerBumped,this),this.app.on("game:catched",this.OnRunnerBumped,this),this.app.on("tutorial:start",this.OnTutorialStart,this),this.app.on("tutorial:end",this.OnTutorialEnd,this),this.app.on("game:countend",this.OnCountEnd,this),this.app.on("game:paused",this.OnGamePaused,this),this.app.on("game:resumed",this.OnGameResumed,this),this.app.on("game:resume",this.OnGameResume,this),this.app.on("game:starschange",this.OnStarsChange,this),this.app.on("game:continue",this.OnGameContinue,this),this.app.on("game:nocontinue",this.OnGameNoContinue,this)},Base.prototype.postInitialize=function(){this.camera.script.camera.OnScreenChange();for(var t=0;t<this.obsts.length;t++)this.obsts[t].enabled=!1;for(t=0;t<this.stars.length;t++)this.stars[t].enabled=!1;for(t=0;t<this.buses.length;t++)this.buses[t].enabled=!1;for(t=0;t<this.boosts.length;t++)this.boosts[t].enabled=!1;this.roller=this.Roller.script.roller,this.roller.Create(10),this.Levels=this.entity.script.levels,this.setMenuMode()},Base.prototype.Clear=function(){this.ClearObjects(),this.app.ScoreCntr=0,this.ScoreTimeCntr=0,this.app.RunFlag=!1},Base.prototype.ClearObjects=function(){for(var t=0;t<this.Obstacles.length;t++)this.Obstacles[t].script.obst.SetFree();for(t=0;t<this.Stars.length;t++)this.Stars[t].script.star.SetFree();for(t=0;t<this.Buses.length;t++)this.Buses[t].script.bus.SetFree();for(t=0;t<this.Boosts.length;t++)this.Boosts[t].enabled=!1;for(t=0;t<this.app.data.rails;t++)this.Nears[t].num=0},Base.prototype.setMenuMode=function(){this.Clear(),this.Menu.script.menu.Revive(),this.Runner.script.runner.setMenuMode(),this.camera.script.camera.setMenuMode(),this.roller.Revive()},Base.prototype.StartPlayAgain=function(t){this.DieCntr++,this.ClearObjects(),this.GMenu.script.gmenu.Revive(),this.Keeper.script.guard.Revive(),this.Keeper.enabled=!1,this.Runner.script.runner.setSimpleRun(),this.PauseButt.enabled=!0,this.addChunk(this.Levels.getCurrChunk(),this.Runner.script.runner.Z+this.SpawnZfirst/2);for(var s=!0;s;)s=this.checkCurrChunk(this.Runner.script.runner.Z-this.SpawnZ)},Base.prototype.StartPlay=function(){this.DieCntr=0,this.Menu.enabled=!1,this.Results.enabled=!1,this.GMenu.script.gmenu.Revive(),this.camera.script.camera.setMoveLeft(),this.Keeper.script.guard.Revive(),this.Keeper.script.guard.putOnBack(),this.Keeper.script.guard.setToStayMove(),this.Runner.script.runner.OnPlayStart(Game.instance.showTutor),GameAudio.play("whistle"),this.PauseButt.enabled=!0,this.addChunk(this.Levels.prepareLevel(0),this.Runner.script.runner.Z+this.SpawnZfirst);for(var t=!0;t;)t=this.checkCurrChunk(this.Runner.script.runner.Z-this.SpawnZ)},Base.prototype.OnRunnerBumped=function(){for(var t=0;t<this.Stars.length;t++)this.Stars[t].script.star.StopMoving();for(t=0;t<this.Buses.length;t++)this.Buses[t].script.bus.StopMoving();for(t=0;t<this.Boosts.length;t++)this.Boosts[t].script.boost.StopMoving()},Base.prototype.setRolling=function(){this.app.RunFlag=!0},Base.prototype.makeSpark=function(t,s,e,i,r,a,n,o,h,p,u,l,d){for(var c=null,b=0;b<this.Sparks.length;b++)if(!this.Sparks[b].enabled&&this.Sparks[b].script.spark.Type===i){c=this.Sparks[b];break}return null===c&&(c=this.sparks[i].clone(),this.Sparks.push(c)),c.script.spark.CreatePlain(t,s,e,r,a,n,o,h,p,u,l,d),c},Base.prototype.makeStarExpl=function(t,s,e){Game.instance.addStar();for(var i=Math.floor(3+2*Math.random()),r=-30,a=240/(i-1)*.5,n=0;n<i;n++){var o=r+.5*a-a*Math.random(),h=.7+.3*Math.random(),p=6+4*Math.random();this.makeSpark(t,s,e,0,p,.2,.1,o,o,h,h,1,"#FFFF13"),r+=240/(i-1)}},Base.prototype.makeBoostExpl=function(t,s,e,i){for(var r=-30,a=0;a<5;a++){var n=r+6-12*Math.random(),o=1+.5*Math.random(),h=10+5*Math.random();this.makeSpark(t,s,e,1,h,.3,.2,n,n,o,o,1,i),r+=60}},Base.prototype.OnScoreText=function(){this.ScoreText.element.text=this.app.ScoreCntr+""},Base.prototype.addChunk=function(t,s){void 0===this.Chunks[this.ChunksIndex]&&(this.Chunks[this.ChunksIndex]={stats:[],moves:[],statsNum:0,movesNum:0,statsIndex:0,movesIndex:0,objs:[],objsNum:0,length:0}),this.Chunk=this.Chunks[this.ChunksIndex],this.Chunk.objsNum=0,this.Chunk.statsIndex=0,this.Chunk.movesIndex=0,this.Chunk.Z=s,this.Chunk.Z_last=this.Chunk.Z-t.length;for(var e=0;e<t.objs.length;e++)void 0===this.Chunk.objs[e]&&(this.Chunk.objs[e]={obj:null,done:!1}),this.Chunk.objs[e].obj=t.objs[e],this.Chunk.objs[e].done=!1,this.Chunk.objsNum++;this.ChunksIndex++,this.ChunksIndex>3&&(this.ChunksIndex=0)},Base.prototype.checkCurrChunk=function(t){var s,e,i=this.Chunk.Z-t,r=!0;if(i<0)return!1;for(var a=0;a<this.Chunk.objsNum;a++)this.Chunk.objs[a].done||(1==this.Chunk.objs[a].obj.clas?(this.Chunk.objs[a].obj.speed,i>this.Chunk.objs[a].obj.dist&&(this.Chunk.objs[a].done=!0,e=this.addObject(this.Chunk.objs[a].obj,this.Chunk.Z,this.OutObj),r?s=e:e<s&&(s=e),r=!1)):i>this.Chunk.objs[a].obj.dist&&(this.Chunk.objs[a].done=!0,e=this.addObject(this.Chunk.objs[a].obj,this.Chunk.Z),r?s=e:e<s&&(s=e),r=!1));for(a=0;a<this.Chunk.objsNum;a++)if(!this.Chunk.objs[a].done)return!1;return!((i=this.Chunk.Z_last-t)<0)&&(this.addChunk(this.Levels.getNextChunk(),this.Chunk.Z_last),!0)},Base.prototype.checkOnFreeAhead=function(t,s,e){for(var i=0;i<this.Obstacles.length;i++){var r;this.Obstacles[i].enabled&&(r=this.Obstacles[i].script.obst),r.Rail}},Base.prototype.addObject=function(t,s,e){var i,r,a,n=this.Runner.script.runner.Z;switch(t.clas){case 0:var o=this.makeObstacle(this.MoveRails[t.rail],0,s-t.dist,t.rail,t.type);if(o.script.obst.setRoller(this.roller,n-(s-t.dist),this.app.RollRad+o.script.obst.Y0),void 0!==t.stars)for(i=0;i<t.stars.length;i++)this.makeStars(this.MoveRails[t.rail],this.StarY+o.script.obst.RadY,s-t.dist+(t.stars[i].num-1)*t.stars[i].step/2-t.stars[i].shift,t.rail,0,t.stars[i].num,t.stars[i].step,t.stars[i].duga,t.stars[i].dir,0,null,0);return void 0!==t.booster&&Math.random()<t.booster.prob&&this.makeBooster(this.MoveRails[t.rail],this.BoosterY+o.script.obst.RadY,s-t.dist+t.booster.shift,t.rail,t.booster.type,0,0),void 0!==e&&(e.obj=o.script.obst),o.script.obst.Z_backreal;case 1:var h,p=0;if(t.speed>0)p=Math.abs(n-(s-t.dist))/this.app.SpeedRunner*t.speed;var u=s-t.dist-p;if((h=this.makeBus(this.MoveRails[t.rail],0,u,p,t.rail,t.type,t.speed)).script.bus.setRoller(this.roller,n-u,p),void 0!==t.stars)for(i=0;i<t.stars.length;i++)this.makeStars(this.MoveRails[t.rail],this.StarY+h.script.bus.RadY,u+(t.stars[i].num-1)*t.stars[i].step/2-t.stars[i].shift,t.rail,0,t.stars[i].num,t.stars[i].step,t.stars[i].duga,t.stars[i].dir,t.speed,null,p);return void 0!==t.booster&&Math.random()<t.booster.prob&&this.makeBooster(this.MoveRails[t.rail],this.BoosterY+h.script.bus.RadY,u+t.booster.shift,t.rail,t.booster.type,t.speed,p),void 0!==e&&(e.obj=h.script.bus),s-t.dist;case 2:return a=this.makeStars(this.MoveRails[t.rail],this.StarY+t.h,s-t.dist-t.shift,t.rail,t.type,t.num,t.step,t.duga,t.dir,0,t.diag,0),void 0!==e&&(e.obj=a.script.star.Z_back),a.script.star.Z_backreal;case 3:return Math.random()<t.prob?(r=this.makeBooster(this.MoveRails[t.rail],this.BoosterY,s-t.dist,t.rail,t.type,0,0),void 0!==e&&(e.obj=r.script.boost),r.script.boost.Z_backreal):s-t.dist;case 4:return this.Runner.script.runner.addTrigger(t.type,s-t.dist),s-t.dist}return s},Base.prototype.OnPlayButton=function(){this.StartPlay()},Base.prototype.onKeyDown=function(t){if(this.app.RunFlag){var s=!1,e=!1;t.key===pc.KEY_LEFT&&(s=!0),t.key===pc.KEY_RIGHT&&(e=!0),this.Runner.script.runner.onMoveKeyDown(s,e),t.key===pc.KEY_UP&&this.Runner.script.runner.onUpKeyUp(),t.key===pc.KEY_DOWN&&this.Runner.script.runner.onUpKeyDown(),t.event.preventDefault()}},Base.prototype.makeBus=function(t,s,e,i,r,a,n){for(var o=null,h=0;h<this.Buses.length;h++)if(!this.Buses[h].enabled&&this.Buses[h].script.bus.Type==a){o=this.Buses[h];break}return null===o&&((o=this.buses[a].clone()).script.bus.initialize(),this.Buses.push(o)),o.script.bus.Create(t,s,e,i,n,r),o},Base.prototype.makeBooster=function(t,s,e,i,r,a,n){for(var o=null,h=0;h<this.Boosts.length;h++)if(!this.Boosts[h].enabled&&this.Boosts[h].script.boost.Type==r){o=this.Boosts[h];break}null===o&&((o=this.boosts[r].clone()).script.boost.initialize(),this.Boosts.push(o)),o.script.boost.Create(t,s,e,i);var p=this.Runner.script.runner.Z;return o.script.boost.setRoller(this.roller,p-e,n),a>0&&o.script.boost.setMoving(a,n),o},Base.prototype.makeStar=function(t,s,e,i,r,a,n){for(var o=null,h=0;h<this.Stars.length;h++)if(!this.Stars[h].enabled&&this.Stars[h].script.star.Type==r){o=this.Stars[h];break}return null===o&&((o=this.stars[r].clone()).script.star.initialize(),this.Stars.push(o)),o.script.star.Create(t,s,e,i,a),o},Base.prototype.makeStars=function(t,s,e,i,r,a,n,o,h,p,u,l){var d=this.Runner.script.runner.Z,c=null,b=n*(a-1),m=e;0===h&&(m+=b/2),h<0&&(m+=b);for(var R=Math.PI/2,f=i,g=0,y=0;y<a;y++){var B=0;if(typeof o==typeof!0)if(o&&a>1)B=this.StarDugaHeight*Math.abs(Math.cos(((a-1)/2-y)/((a-1)/2)*R));else if("object"==typeof o){var C=y-o.first,S=1;void 0!==o.h&&(S=o.h),y>=o.first&&y<o.first+o.num&&(B=S*this.StarDugaHeight*Math.abs(Math.cos(((C-1)/2-y)/((o.num-1)/2)*R)))}null!==u&&u[g]==y&&(f=u[g+1],g+=2,u.length<=g&&(g-=2)),(c=this.makeStar(this.MoveRails[f],s+B,m-y*n,f,r,30*y,!1)).script.star.setRoller(this.roller,d-(m-y*n),l),p>0&&c.script.star.setMoving(p,l)}return c},Base.prototype.makeObstacle=function(t,s,e,i,r){for(var a=null,n=0;n<this.Obstacles.length;n++)if(!this.Obstacles[n].enabled&&this.Obstacles[n].script.obst.Type==r){a=this.Obstacles[n];break}return null===a&&(a=this.obsts[r].clone(),this.Obstacles.push(a),a.script.obst.initialize()),a.script.obst.Create(t,s,e,i),a},Base.prototype.addRoad=function(){if(this.roads[this.RoadsIndex].script.road.FreeFlag){var t=this.roads[this.RoadsIndex];t.script.road.OnAdded();var s=this.roads[this.LastRoadsIndex];return t.script.road.AttachAt(0,0,s.script.road.Z_far),this.LastRoadsIndex=this.RoadsIndex,this.RoadsIndex++,this.RoadsIndex>=this.roads.length&&(this.RoadsIndex=0),this.RoadZ1=t.script.road.Z_far,t}return null},Base.prototype.onTouchDown=function(t){if(this.app.RunFlag){var s=t.changedTouches[0];this.Runner.script.runner.onMouseDown(s.x,s.y)}},Base.prototype.onTouchMove=function(t){if(this.app.RunFlag){var s=t.changedTouches[0];this.Runner.script.runner.onMouseMove(s.x,s.y,!0)}},Base.prototype.onMouseMove=function(t){this.app.RunFlag&&this.Runner.script.runner.onMouseMove(t.x,t.y,this.app.mouse.isPressed(pc.MOUSEBUTTON_LEFT))},Base.prototype.onMouseDown=function(t){this.app.RunFlag&&this.Runner.script.runner.onMouseDown(t.x,t.y)},Base.prototype.GetStartNeedToContinue=function(){return 0===this.DieCntr?50:1===this.DieCntr?100:2===this.DieCntr?200:1e5},Base.prototype.StopRun=function(){this.Runner.script.runner.TutFlag?this.makeResults():this.GetStartNeedToContinue()<1e4&&this.GetStartNeedToContinue()<=Game.instance.stars?this.Continue.script.uiContinue.Revive(this.GetStartNeedToContinue()):this.makeResults()},Base.prototype.makeResults=function(){js_GS_gameOver(),this.app.RunFlag=!1,this.Keeper.enabled=!1,this.Runner.enabled=!1,FadeScreen.instance.show(.3,0,1,this.SetResults.bind(this)),this.app.ScoreCntr>this.app.ScoreBest&&(this.app.ScoreBest=this.app.ScoreCntr,this.DistText.element.text=this.app.ScoreBest+""),this.app.fire("game:stoprun")},Base.prototype.OnTutorialStart=function(){this.PauseButt.enabled=!1},Base.prototype.OnTutorialEnd=function(){this.PauseButt.enabled=!0},Base.prototype.OnGamePaused=function(){this.PauseButt.enabled=!1},Base.prototype.OnGameResumed=function(){},Base.prototype.OnGameResume=function(){},Base.prototype.OnStarsChange=function(){this.GMenu.script.gmenu.updateStars()},Base.prototype.OnGameContinue=function(){this.StartPlayAgain()},Base.prototype.OnGameNoContinue=function(){this.makeResults()},Base.prototype.OnCountEnd=function(){this.PauseButt.enabled=!0},Base.prototype.OnGameRestart=function(){this.setMenuMode(),this.StartPlay()},Base.prototype.OnGoHome=function(){this.setMenuMode()},Base.prototype.OnGoGameMenu=function(){FadeScreen.instance.show(.3,0,1,this.SetGoGameMenu.bind(this)),this.app.fire("game:stoprun"),this.app.RunFlag=!1},Base.prototype.SetGoGameMenu=function(){this.Runner.enabled=!1,this.Results.enabled=!1,this.Runner.script.runner.setMoveToRail(1),this.GMenu.enabled=!1,this.app.RunFlag=!1,this.setMenuMode()},Base.prototype.SetResults=function(){this.GMenu.enabled=!1,this.Results.script.result.Revive(this.app.ScoreCntr)},Base.prototype.SetWaitPlay=function(t){this.WaitTimeCntr=t,this.WaitFlag=!0},Base.prototype.OnStarCollide=function(t){t.enabled=!1},Base.prototype.removeObj=function(t,s){t.DisableEntity()},Base.prototype.checkRunnerOnCollision=function(t,s){for(var e=this.Runner.script.runner.Y,i=(this.Runner.script.runner.getZfront(),this.Runner.script.runner.getZback(),this.Runner.script.runner.Z0),r=this.Runner.script.runner.RadZ,a=this.Runner.script.runner.RadY,n=0;n<this.Nears[t].num;n++){var o=this.Nears[t].objs[n];if(null!==o&&0===o.CollideType&&(o.updateZ(),Math.abs(i-o.Z)<o.RadZ+r+s)){var h=o.Y+o.RadY-e;if(h>0&&h>.2*a)return!0}}return!1},Base.prototype.checkKeeperCollisionAhead=function(t,s,e){e.ramp=!1,e.jump=!1;for(var i=this.Keeper.script.guard.Z,r=0;r<this.Nears[t].num;r++){var a=this.Nears[t].objs[r];if(null!==a&&0===a.CollideType&&(a.updateZ(),i-s<a.Z-a.RadZ))return a.RampCoeff>0?(e.ramp=!0,!0):(a.RadY<this.Keeper.script.guard.JumpDistMax&&(e.jump=!0),!0)}return!1},Base.prototype.OnObjCollision=function(t,s){this.OnCollide(s,s.Rail),t.removeObj(s)},Base.prototype.CheckCollide=function(t,s){var e,i=this.Runner.script.runner.Y,r=this.Runner.script.runner.getYtop(),a=this.Runner.script.runner.getZfront(),n=(this.Runner.script.runner.Z0,this.Runner.script.runner.getZback(),this.Runner.script.runner.RadY);this.Runner.script.runner.RadZ;switch(t.CollideType){case 0:var o=this.Runner.script.runner.getGroundObj();this.Runner.script.runner.Y_grnd;if(this.top.y=t.getYbyZ(a,this.top),this.top.obj=t,this.top.over=!0,t.isBottomFree()&&this.Runner.script.runner.SlideFlag)return this.Runner.script.runner.updateGround(this.top.y,this.top.obj,!1,!0),!1;if(this.Runner.script.runner.JumpFlag)if(this.top.ramp)this.Runner.script.runner.updateGround(this.top.y,this.top.obj,this.top.ramp,!1);else if((e=t.getYtop()-i)>.3*n){if(o!==this.top.obj)return this.OnCollide(t,s),!0;if(t.TopWalkFlag){if(!(e<.3*n))return this.OnCollide(t,s),!0;this.Runner.script.runner.setYtoGround(t.getYtop(),t)}else{if(!(e<.3*n))return this.OnCollide(t,s),!0;this.Runner.script.runner.setYtoGround(t.getYtop(),t)}}else this.Runner.script.runner.updateGround(this.top.y,this.top.obj,this.top.ramp,!1);else if(this.top.ramp)this.Runner.script.runner.updateGround(this.top.y,this.top.obj,this.top.ramp,!1);else{if(null!==o&&t.TopWalkFlag)return this.Runner.script.runner.updateGround(this.top.y,this.top.obj,this.top.ramp,!1),!1;if((e=t.getYtop()-i)>0){if(o!=this.top.obj)return this.OnCollide(t,s),!0}else this.Runner.script.runner.updateGround(this.top.y,this.top.obj,this.top.ramp,!1)}break;case 1:return!(i>t.getYtop())&&(!(t.getYbott()>r)&&(this.OnCollide(t,s),!0))}return!1},Base.prototype.CheckCollideGuard=function(t,s){var e,i=this.Keeper.script.guard.Y,r=this.Keeper.script.guard.Z,a=(this.Keeper.script.guard.getYtop(),r),n=this.Keeper.script.guard.RadY;this.Keeper.script.guard.RadZ;switch(t.CollideType){case 0:var o=this.Keeper.script.guard.getGroundObj();this.Keeper.script.guard.Y_grnd;if(this.topGuard.y=t.getYbyZ(a,this.topGuard),this.topGuard.obj=t,this.topGuard.over=!0,this.Keeper.script.guard.JumpFlag)if(this.topGuard.ramp)this.Keeper.script.guard.updateGround(this.topGuard.y,this.topGuard.obj,this.topGuard.ramp);else if((e=t.getYtop()-i)>.3*n){if(o!==this.topGuard.obj)return!0;if(t.TopWalkFlag){if(!(e<.3*n))return!0;this.Keeper.script.guard.setYtoGround(t.getYtop(),t)}else{if(!(e<.3*n))return!0;this.Keeper.script.guard.setYtoGround(t.getYtop(),t)}}else this.Keeper.script.guard.updateGround(this.topGuard.y,this.topGuard.obj,this.topGuard.ramp);else if(this.topGuard.ramp)this.Keeper.script.guard.updateGround(this.topGuard.y,this.topGuard.obj,this.topGuard.ramp);else{if(null!==o&&t.TopWalkFlag)return this.Keeper.script.guard.updateGround(this.topGuard.y,this.topGuard.obj,this.topGuard.ramp),!1;if((e=t.getYtop()-i)>0){if(o!=this.topGuard.obj)return!0}else this.Keeper.script.guard.updateGround(this.topGuard.y,this.topGuard.obj,this.topGuard.ramp)}}return!1},Base.prototype.OnCollide=function(t,s){switch(t.Class){case 0:this.Runner.script.runner.setBumped(0);break;case 1:this.Runner.script.runner.setBumped(t.Speed);break;case 2:this.Runner.script.runner.GetStar(),t.updateZ(),this.makeStarExpl(t.X,t.Y,t.Z),this.removeObj(t);break;case 3:this.Runner.script.runner.setBooster(t.Type),t.updateZ(),this.makeBoostExpl(t.X,t.Y,t.Z,"#FFFF13"),this.removeObj(t)}return!0},Base.prototype.getStarsAround=function(t){var s=this.Runner.script.runner.RailIndex-1,e=s+2;s<0&&(s=0,e=1),e>2&&(s=1,e=2);for(var i=t*t,r=this.Runner.script.runner.X,a=this.Runner.script.runner.Y,n=this.Runner.script.runner.Z0,o=s;o<=e;o++)for(var h=0;h<this.Nears[o].num;h++)if(obj=this.Nears[o].objs[h],null!==obj&&obj.CollideFlag){if(2===obj.Class){obj.updateZ();var p=r-obj.X,u=a-obj.Y,l=n-obj.Z;p*p+u*u+l*l<i&&(obj.CollideFlag=!1,this.Runner.script.runner.DoMagnetStar(obj))}1===obj.Class&&obj.checkDistToObjs(r,a,n,i,this.MagnetStarFromBus,this)}},Base.prototype.MagnetStarFromBus=function(t,s){s.CollideFlag=!1,this.Runner.script.runner.DoMagnetStar(s),t.removeObj(s)},Base.prototype.checkTooFars=function(){for(var t=this.Runner.script.runner.Z0+this.DistKill,s=0;s<this.Obstacles.length;s++)this.Obstacles[s].enabled&&this.Obstacles[s].script.obst.Z_back>t&&this.Obstacles[s].script.obst.DisableEntity();for(s=0;s<this.Buses.length;s++)this.Buses[s].enabled&&this.Buses[s].script.bus.Z_back>t&&this.Buses[s].script.bus.DisableEntity();for(s=0;s<this.Stars.length;s++)this.Stars[s].enabled&&this.Stars[s].script.star.Z_back>t&&null===this.Stars[s].script.star.Master&&this.Stars[s].script.star.DisableEntity();for(s=0;s<this.Boosts.length;s++)this.Boosts[s].enabled&&this.Boosts[s].script.boost.Z_back>t&&null===this.Boosts[s].script.boost.Master&&this.Boosts[s].script.boost.DisableEntity()},Base.prototype.checkDeadNears=function(){for(var t=0;t<3;t++)for(var s=0;s<this.Nears[t].num;s++){var e=this.Nears[t].objs[s];null===e||e.isEnabled()||(this.Nears[t].objs[s]=null)}},Base.prototype.setNears=function(){for(var t=this.Runner.script.runner.Z0,s=0;s<3;s++)this.Nears[s].num=0;for(var e=0;e<this.Obstacles.length;e++)this.Obstacles[e].script.obst.CollideFlag&&this.Obstacles[e].enabled&&(this.Obstacles[e].script.obst.updateZ(),this.Obstacles[e].script.obst.Z_back<10&&this.Obstacles[e].script.obst.Z_front-t>-150&&(s=this.Obstacles[e].script.obst.Rail,this.Nears[s].objs[this.Nears[s].num]=this.Obstacles[e].script.obst,this.Nears[s].num++));for(e=0;e<this.Buses.length;e++)this.Buses[e].script.bus.CollideFlag&&this.Buses[e].enabled&&(this.Buses[e].script.bus.updateZ(),this.Buses[e].script.bus.Z_back<10&&this.Buses[e].script.bus.Z_front-t>-150&&(s=this.Buses[e].script.bus.Rail,this.Nears[s].objs[this.Nears[s].num]=this.Buses[e].script.bus,this.Nears[s].num++));for(e=0;e<this.Stars.length;e++)this.Stars[e].script.star.CollideFlag&&this.Stars[e].enabled&&(this.Stars[e].script.star.updateZ(),this.Stars[e].script.star.Z_back<10&&this.Stars[e].script.star.Z-t>-150&&(s=this.Stars[e].script.star.Rail,this.Nears[s].objs[this.Nears[s].num]=this.Stars[e].script.star,this.Nears[s].num++));for(e=0;e<this.Boosts.length;e++)this.Boosts[e].script.boost.CollideFlag&&this.Boosts[e].enabled&&(this.Boosts[e].script.boost.updateZ(),this.Boosts[e].script.boost.Z_back<10&&this.Boosts[e].script.boost.Z-t>-150&&(s=this.Boosts[e].script.boost.Rail,this.Nears[s].objs[this.Nears[s].num]=this.Boosts[e].script.boost,this.Nears[s].num++))},Base.prototype.update=function(t){if(this.app.RunFlag){this.top.over=!1,this.top.ramp=!1;for(var s=this.Runner.script.runner.RailIndex,e=(this.Runner.script.runner.getZfront(),this.Runner.script.runner.getZback(),this.Runner.script.runner.Z0),i=this.Runner.script.runner.RadZ,r=!1,a=0;a<this.Nears[s].num;a++){var n=this.Nears[s].objs[a];null!==n&&n.isEnabled()&&(n.updateZ(),Math.abs(e-n.Z)<n.RadZ+i&&n.CollideFlag&&this.CheckCollide(n,s)&&(r=!0))}r&&this.checkDeadNears(),this.top.over||this.Runner.script.runner.updateGround(0,null,!1,!1),this.ScoreTimeCntr+=t*Game.instance.slomo,this.ScoreTimeCntr>.3&&(this.ScoreTimeCntr=0,this.app.ScoreCntr++,this.ScoreText.element.text=this.app.ScoreCntr+"",js_GS_sendScore(this.app.ScoreCntr)),(this.SecCntr+=t)>.5&&(this.SecCntr=0,null!==this.Chunk&&this.checkCurrChunk(this.Runner.script.runner.Z-this.SpawnZ),this.setNears(),this.checkTooFars(),this.checkDeadNears())}window.scrollTo(0,10),this.setResolution(),this.app.innerWidth===window.innerWidth&&this.app.innerHeight===window.innerHeight||(this.app.innerWidth=window.innerWidth,this.app.innerHeight=window.innerHeight,this.app.fire("screen:changed")),window.innerWidth>window.innerHeight?this.app.LandscapeFlag||(this.app.LandscapeFlag=!0,this.camera.script.camera.OnScreenChange()):this.app.LandscapeFlag&&(this.app.LandscapeFlag=!1,this.camera.script.camera.OnScreenChange())},Base.prototype.setResolution=function(){var t=window.innerWidth,s=window.innerHeight;t<640&&(this.app.setCanvasResolution(pc.RESOLUTION_AUTO,t,s),this.app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW))};var Runner=pc.createScript("runner");Runner.attributes.add("Root",{type:"entity",title:"Root"}),Runner.attributes.add("Roller",{type:"entity",title:"Roller"}),Runner.attributes.add("camera",{type:"entity",title:"Camera"}),Runner.attributes.add("crown",{type:"entity",title:"Crown"}),Runner.attributes.add("Keeper",{type:"entity",title:"Keeper"}),Runner.attributes.add("Y0",{type:"number",default:.5,title:"Y"}),Runner.attributes.add("Speed0",{type:"number",default:40,title:"Speed"}),Runner.attributes.add("SpeedRise",{type:"number",default:10,title:"Speed Rise"}),Runner.attributes.add("SpeedMinCoeff",{type:"number",default:.8,title:"Speed Min Coeff"}),Runner.attributes.add("SpeedDownCoeff",{type:"number",default:.1,title:"Speed Down Coeff"}),Runner.attributes.add("SlideTime",{type:"number",default:1,title:"Slide Time"}),Runner.attributes.add("AngXRotMax",{type:"number",default:30,title:"AngX Rotate"}),Runner.attributes.add("AngYRotMax",{type:"number",default:30,title:"AngY Rotate"}),Runner.attributes.add("AngZRotMax",{type:"number",default:30,title:"AngZ Rotate"}),Runner.attributes.add("JumpSpeedAmp",{type:"number",default:15,title:"Jump Speed"}),Runner.attributes.add("JumpSpeedAmpBoost",{type:"number",default:20,title:"Jump Speed Boost"}),Runner.attributes.add("SpeedDownMin",{type:"number",default:60,title:"Speed Down Min"}),Runner.attributes.add("CrownTime",{type:"number",default:3,title:"Crown Time"}),Runner.attributes.add("CrownRotSpeed",{type:"number",default:180,title:"Crown Speed"}),Runner.attributes.add("MagnetTime",{type:"number",default:5,title:"Magnet Time"}),Runner.attributes.add("JumperTime",{type:"number",default:5,title:"Jumper Time"}),Runner.attributes.add("StarMagnetTime",{type:"number",default:.3,title:"Star Magnet Time"}),Runner.attributes.add("StarGetDist",{type:"number",default:10,title:"Star Get Dist"}),Runner.attributes.add("Tuts",{type:"entity",array:!0,title:"Tutorials"}),Runner.attributes.add("ShiftCatch",{type:"number",array:!0,title:"Shifts Catched"}),Runner.prototype.initialize=function(){this.app.on("game:stoprun",this.OnGameStop,this),this.app.on("game:paused",this.OnAnimPause,this),this.app.on("game:resumed",this.OnAnimOffPause,this),this.app.SpeedRunner=this.Speed0,this.Anims=[{name:"tig_12_no_uhi.json",scale:6,loop:!0,speed:1.4,crown:{scale:.07,x:0,y:.317,z:.217}},{name:"scolgenie_1-10.json",scale:16,loop:!1,speed:1,crown:{scale:.025,x:0,y:.1,z:.09}},{name:"scolgenie_10-20.json",scale:16,loop:!1,speed:1,crown:{scale:.025,x:0,y:.1,z:.09}},{name:"tig_12_no_uhi.json",scale:6,loop:!0,speed:.4,crown:{scale:.07,x:0,y:.317,z:.217}},{name:"stolknovenie6.json",scale:14,loop:!1,speed:1},{name:"zz_PROSTOY4_NO_MORFING_CORRECT_CENTER.json",scale:14,loop:!0,speed:1},{name:"zzzz_siddel_ybegjal_2.json",scale:14,loop:!1,speed:.7},{name:"tiger.json",scale:14,loop:!1,speed:1.35}],this.setAnimStateFast(0),this.AllowedMoves=[!0,!0,!0],this.Triggers=[],this.TriggersFlag=!1,this.TutFlag=!1,this.X=0,this.Y=0,this.Z0=0,this.Z=0,this.X_last=-1,this.Y_last=-1,this.Y_cam=0,this.CamMovingFlag=!1,this.RailsNum=3,this.RailsStep=this.app.data.railsStep,this.Rails=[-this.RailsStep,0,this.RailsStep],this.RailIndex=1,this.RailMoveTime=.3,this.MoveToRailFlag=!1,this.SlideFlag=!1,this.CrownFlag=!1,this.DeadFlag=!1,this.DruggedFlag=!1,this.BackKickFlag=!1,this.StarsGetCntr=0,this.RotYFlag=!1,this.MoveToRailTimeCntr=0,this.SavedPausedSpeed=1;var t=this.entity.model.meshInstances[0].aabb.getMin(),i=this.entity.model.meshInstances[0].aabb.getMax();this.Zmin=t.z,this.Zmax=i.z,this.RadZ=17*Math.abs(this.Zmax-this.Zmin)/2,this.RadY=17*Math.abs(i.y-t.y),this.MagnetY=this.RadY,this.MagnetZ=this.RadZ,this.AngleX=this.entity.getEulerAngles().x,this.AngleY=this.entity.getEulerAngles().y,this.AngleZ=this.entity.getEulerAngles().z,this.AngXRot=0,this.AngYRot=0,this.AngZRot=0,this.Y_grnd=0,this.ObjGrnd=null,this.CrownScale0=this.Anims[0].crown.scale,this.CrownAngleX=this.crown.getEulerAngles().x,this.CrownAngleY=this.crown.getEulerAngles().y,this.CrownAngleZ=this.crown.getEulerAngles().z,this.crown.enabled=!1,this.crownTween=null,this.Stars=[],this.StarsNum=0,this.AllowInputFlag=!0,this.ScalingFlag=!1,this.Base=this.Root.script.base,this.Y0_cam=3.5,this.SpeedCamMin=1,this.CoeffCamSpeed=5,this.VertSpeed=0,this.AllowInputPauseCntr=0,this.setSpeed(this.Speed0),this.StagesFlag=!1},Runner.prototype.OnAnimPause=function(){this.SavedPausedSpeed=this.entity.animation.speed,this.entity.animation.speed=0},Runner.prototype.OnAnimOffPause=function(){this.entity.animation.speed=this.SavedPausedSpeed},Runner.prototype.addTrigger=function(t,i){this.TriggersFlag=!0;for(var e=0;e<this.Triggers.length;e++)if(!this.Triggers[e].active)return this.Triggers[e].act=t,this.Triggers[e].z=i,this.Triggers[e].active=!0,this.Triggers[e];var s={active:!0,z:i,act:t};return this.Triggers.push(s),s},Runner.prototype.setTutorial=function(){this.TutFlag=!0,this.TutStage=0,this.AllowedMoves[0]=!1,this.AllowedMoves[1]=!1,this.AllowedMoves[2]=!1,this.AllowInputFlag=!1},Runner.prototype.OnTutorialEnd=function(t,i){switch(t){case 0:this.setMoveToRail(this.RailIndex+i),this.AllowedMoves[0]=!0,this.AllowInputFlag=!0;break;case 1:this.setJump(),this.AllowedMoves[1]=!0;break;case 2:this.setSlide(),this.StagesFlag=!1,this.AllowedMoves[0]=!0,this.AllowedMoves[1]=!0,this.AllowedMoves[2]=!0,this.TutFlag=!1,Game.instance.tutorCompleted()}},Runner.prototype.Clear=function(){this.Y_cam=0,this.crownTween=null,this.crown.enabled=!1,this.CrownFlag=!1,this.AllowedMoves[0]=!0,this.AllowedMoves[1]=!0,this.AllowedMoves[2]=!0,this.AllowInputFlag=!1,this.SpeedRiseFlag=!1,this.SlideFlag=!1,this.SlidingUnderFlag=!1,this.MoveToRailFlag=!1,this.JumpFlag=!1,this.CamMovingFlag=!1,this.RotYFlag=!1,this.BackKickFlag=!1,this.DruggedFlag=!1,this.DruggedZ=0,this.MoveToRailFlag=!1,this.BoosterFlag=!1,this.MagnetFlag=!1,this.JumperFlag=!1,this.ScalingFlag=!1,this.DeadFlag=!1,this.DruggedFlag=!1,this.BackKickFlag=!1,this.VertSpeed=0,this.StagesFlag=!1,this.TutFlag=!1,this.CatchedFlag=!1,this.ShiftCatchFlag=!1,this.StarsNum=0;for(var t=0;t<this.Stars.length;t++)this.Stars[t]=null;for(this.StarsGetCntr=0,t=0;t<this.Triggers.length;t++)this.Triggers[t].active=!1;this.TriggersFlag=!1,this.RailIndex=1,this.setGround(0,null),this.setToGround(),this.Z=0,this.setPosition(),this.AngXRot=0,this.AngYRot=0,this.AngZRot=0,this.X_last=-1,this.Y_last=-1,this.GravityCoeff=1,this.entity.setEulerAngles(this.AngleX,this.AngleY+this.AngYRot,this.AngleZ)},Runner.prototype.setSimpleRun=function(){this.Clear(),this.Base.setRolling(),this.setAnimStateFast(0),this.setSpeed(this.Speed0),this.AllowInputFlag=!0},Runner.prototype.setMenuMode=function(){this.Clear(),this.AngYRot=90,this.entity.setEulerAngles(this.AngleX,this.AngleY+this.AngYRot,this.AngleZ),this.enabled=!0,this.entity.enabled=!0,this.MenuModeFlag=!0,this.setAnimStateFast(5)},Runner.prototype.setFirstMoveStages=function(){this.WaitStageTimeCntr=-1,this.setAnimState(6),this.setWaitStage(.7,this.OnFirstMoveStages),this.Stage=0,this.StagesFlag=!0},Runner.prototype.OnFirstMoveStages=function(){switch(this.Stage){case 0:this.Base.setRolling(),this.Keeper.script.guard.setFollow(),this.setAnimState(0),this.setRotY(0,.2),this.Stage=1,this.setWaitStage(.7,this.OnFirstMoveStages);break;case 1:this.TutFlag||(this.AllowInputFlag=!0,this.StagesFlag=!1)}},Runner.prototype.setWaitStage=function(t,i){this.WaitStageTimeCntr=t,this.WaitStageFunc=i},Runner.prototype.setRotY=function(t,i){this.RotYTime=i,this.RotYTimeCntr=0,this.AngYRotDest=t,this.AngYRot0=this.AngYRot,this.RotYFlag=!0},Runner.prototype.OnPlayStart=function(t){this.X_last=-1,this.Y_last=-1,this.RailIndex=1,this.setSpeed(this.Speed0*(1-this.SpeedDownCoeff)),this.SpeedRiseFlag=!0,this.CamMovingFlag=!1,this.SlideFlag=!1,this.SlidingUnderFlag=!1,this.MoveToRailFlag=!1,this.JumpFlag=!1,this.CrownFlag=!1,this.StarsNum=0;for(var i=0;i<this.Stars.length;i++)this.Stars[i]=null;this.StarsGetCntr=0,this.BoosterFlag=!1,this.MagnetFlag=!1,this.JumperFlag=!1,this.ScalingFlag=!1,this.DeadFlag=!1,this.DruggedFlag=!1,this.BackKickFlag=!1,this.VertSpeed=0,this.TutFlag=!1,this.CatchedFlag=!1,this.GravityCoeff=1,this.AllowedMoves[0]=!0,this.AllowedMoves[1]=!0,this.AllowedMoves[2]=!0,this.AllowInputFlag=!1,t&&this.setTutorial(),this.setFirstMoveStages()},Runner.prototype.setScaling=function(t,i,e){if(0===i)return this.Scale=t,this.entity.setLocalScale(this.Scale,this.Scale,this.Scale),this.ScaleFuncEnd=e,void(null!==this.ScaleFuncEnd&&void 0!==this.ScaleFuncEnd&&this.ScaleFuncEnd.call(this));this.Scale0=this.Scale,this.ScaleDest=t,this.ScaleTime=i,this.ScaleTimeCntr=0,this.ScaleFuncEnd=e,this.ScalingFlag=!0,this.ScalingCrownFlag=!1},Runner.prototype.setRunAnim=function(){},Runner.prototype.setAnimStateFast=function(t){this.AnimState=t,this.ScalingFlag=!1,this.Scale=this.Anims[this.AnimState].scale,this.entity.animation.play(this.Anims[this.AnimState].name,0),this.entity.setLocalScale(this.Scale,this.Scale,this.Scale),this.entity.animation.speed=this.Anims[this.AnimState].speed,this.entity.animation.loop=this.Anims[this.AnimState].loop,void 0!==this.Anims[this.AnimState].crown&&(this.crown.setLocalScale(this.Anims[this.AnimState].crown.scale,this.Anims[this.AnimState].crown.scale,this.Anims[this.AnimState].crown.scale),this.crown.setLocalPosition(this.Anims[this.AnimState].crown.x,this.Anims[this.AnimState].crown.y,this.Anims[this.AnimState].crown.z))},Runner.prototype.setAnimState=function(t,i){if(this.AnimState!=t){var e=this.AnimState;this.AnimState=t;this.setScaling(this.Anims[this.AnimState].scale,.2,i),this.entity.animation.play(this.Anims[this.AnimState].name,.2),this.entity.animation.speed=this.Anims[this.AnimState].speed,this.Anims[this.AnimState].loop||(this.entity.animation.loop=this.Anims[this.AnimState].loop),this.ScalingCrownFlag=!1,void 0!==this.Anims[this.AnimState].crown?void 0!==this.Anims[e].crown?(null!==this.crownTween&&this.crownTween.stop(),this.crownTween=null,this.ScalingCrownScale0=this.Anims[e].crown.scale,this.ScalingCrownX0=this.Anims[e].crown.x,this.ScalingCrownY0=this.Anims[e].crown.y,this.ScalingCrownZ0=this.Anims[e].crown.z,this.ScalingCrownFlag=!0,this.crown.setLocalScale(this.ScalingCrownScale0,this.ScalingCrownScale0,this.ScalingCrownScale0),this.crown.setLocalPosition(this.ScalingCrownX0,this.ScalingCrownY0,this.ScalingCrownZ0),this.entity.setLocalScale(this.Scale,this.Scale,this.Scale)):(this.crown.setLocalScale(this.Anims[this.AnimState].crown.scale,this.Anims[this.AnimState].crown.scale,this.Anims[this.AnimState].crown.scale),this.crown.setLocalPosition(this.Anims[this.AnimState].crown.x,this.Anims[this.AnimState].crown.y,this.Anims[this.AnimState].crown.z)):this.offCrownFast()}},Runner.prototype.OnGameStop=function(){for(var t=0;t<this.StarsNum;t++)null!==this.Stars[t]&&this.Stars[t].DisableEntity(),this.Stars[t]=null;this.StarsNum=0},Runner.prototype.DoMagnetStar=function(t){for(var i=-1,e=0;e<this.StarsNum;e++)if(null===this.Stars[e]){i=e;break}i<0&&(i=this.StarsNum,this.StarsNum++),this.Stars[i]=t;var s=this.StarMagnetTime/2;t.Rail!==this.RailIndex&&(s=this.StarMagnetTime),t.setMagnet(s,this.RadZ)},Runner.prototype.setBooster=function(t){switch(GameAudio.playEx("booster",1),t){case 0:this.MagnetFlag=!0,this.MagnetTimeCntr=this.MagnetTime,this.BoosterFlag=!0;break;case 1:this.JumperFlag=!0,this.JumperTimeCntr=this.JumperTime,this.BoosterFlag=!0}},Runner.prototype.setSlide=function(){return!this.SlideFlag&&(!this.JumpFlag&&(!this.MoveToRailFlag&&(!this.DeadFlag&&(this.SlideTimeCntr=this.SlideTime,this.SlideFlag=!0,setTimeout(function(){GameAudio.play("slide")},100),this.setAnimState(1),!0))))},Runner.prototype.setCrown=function(){if(this.CrownFlag);else{null!==this.crownTween&&this.crownTween.stop(),this.CrownScale0=1,void 0!==this.Anims[this.AnimState].crown&&(this.CrownScale0=this.Anims[this.AnimState].crown.scale),this.CrownAngleY=0,this.crown.setEulerAngles(this.CrownAngleX,this.CrownAngleY,this.CrownAngleZ),this.crown.setLocalScale(0,0,0),this.crown.enabled=!0,this.CrownFlag=!0;var t={scale:0},i=this;this.crownTween=this.entity.tween(t).to({scale:1},.5,pc.QuadraticOut),this.crownTween.on("update",function(e){i.crown.setLocalScale(i.CrownScale0*t.scale,i.CrownScale0*t.scale,i.CrownScale0*t.scale)}),this.crownTween.on("complete",function(){i.crownTween=null}),GameAudio.playEx("stunned",1),GameAudio.playEx("whistle",pc.math.random(.9,1.1)),this.crownTween.start()}this.CrownTimeCntr=this.CrownTime},Runner.prototype.offCrown=function(){this.CrownFlag=!1,void 0!==this.Anims[this.AnimState].crown&&(this.CrownScale0=this.Anims[this.AnimState].crown.scale);var t={scale:1},i=this;this.crownTween=this.entity.tween(t).to({scale:0},.5,pc.QuadraticIn),this.crownTween.on("update",function(e){i.crown.setLocalScale(i.CrownScale0*t.scale,i.CrownScale0*t.scale,i.CrownScale0*t.scale)}),this.crownTween.on("complete",function(){i.crownTween=null,i.crown.enabled=!1}),this.crownTween.start()},Runner.prototype.offCrownFast=function(){null!==this.crownTween&&this.crownTween.stop(),this.crownTween=null,this.crown.enabled=!1,this.CrownFlag=!1},Runner.prototype.setYtoGround=function(t,i){this.Y=t,this.Y_grnd=t,this.ObjGrnd=i,this.JumpFlag&&this.VertSpeed<=0&&this.OffJump()},Runner.prototype.updateGround=function(t,i,e,s){this.SlidingUnderFlag=s,this.JumpFlag?(this.Y_grnd=t,this.ObjGrnd=i):(e&&(this.Y=t),this.Y_grnd=t,null!==this.ObjGrnd&&null===i&&this.setFall(),this.ObjGrnd=i)},Runner.prototype.getGroundObj=function(){return this.ObjGrnd},Runner.prototype.setGround=function(t,i){this.Y_grnd=t,this.ObjGrnd=i},Runner.prototype.setJump=function(){return!this.JumpFlag&&((!this.SlideFlag||!this.SlidingUnderFlag)&&(!this.DeadFlag&&(!(null!==this.ObjGrnd&&!this.ObjGrnd.JumpableFlag)&&(this.JumperFlag?(GameAudio.play("longjump"),this.VertSpeed=this.JumpSpeedAmpBoost):(GameAudio.play("jump"),this.VertSpeed=this.JumpSpeedAmp),this.setAnimState(3),this.JumpFlag=!0,!0))))},Runner.prototype.OffJump=function(){this.JumpFlag=!1,this.VertSpeed=0,this.SlideFlag||this.DeadFlag||this.setAnimState(0)},Runner.prototype.setFall=function(){if(this.JumpFlag)return!1;this.JumpFlag=!0},Runner.prototype.setFallFast=function(){if(this.GravityCoeff=4,this.VertSpeed=0,this.JumpFlag)return!1;this.JumpFlag=!0},Runner.prototype.getZfront=function(){return this.Z0-this.RadZ},Runner.prototype.getZback=function(){return this.Z0+this.RadZ},Runner.prototype.getYtop=function(){return this.Y+this.RadY},Runner.prototype.checkObst=function(t){var i=t.script.obst.Z_front-(this.Z-this.RadZ);return i>0&&(!(i>this.RadZ)&&t.script.obst.Rail==this.RailIndex)},Runner.prototype.checkStar=function(t){var i=t.script.star.Z_front-(this.Z-this.RadZ);return i>0&&(!(i>this.RadZ)&&t.script.star.Rail==this.RailIndex)},Runner.prototype.setMoveToRail=function(t){return!this.MoveToRailFlag&&(!this.DeadFlag&&(this.RailIndexDest=t,this.RailIndexDest>this.RailIndex?this.MoveRailsDir=1:this.MoveRailsDir=-1,!(this.RailIndexDest<0||this.RailIndexDest>2)&&((!this.TutFlag||!this.Base.checkRunnerOnCollision(this.RailIndexDest,7*this.RadZ))&&(this.MoveToRailX0=this.X,this.MoveToRailDir=1,GameAudio.play("jump"),this.MoveToRailTimeCntr=0,this.MoveOldRailCheckedFlag=!1,this.MoveRailCheckedFlag=!1,this.MoveToRailFlag=!0,!0))))},Runner.prototype.P2EasingInOut=function(t){return(t*=2)<1?.5*t*t:-.5*(--t*(t-2)-1)},Runner.prototype.updateRunnerPosition=function(){this.entity.setPosition(this.X,this.Y+this.Y0,this.Z0)},Runner.prototype.setToGround=function(){this.Y=0,this.entity.setPosition(this.X,this.Y+this.Y0,this.Z0),this.camera.script.camera.DragByRunner(this.X,this.Y_cam,this.Z0)},Runner.prototype.setPosition=function(){this.X=this.Rails[this.RailIndex],this.entity.setPosition(this.X,this.Y+this.Y0,this.Z0),this.camera.script.camera.DragByRunner(this.X,this.Y_cam,this.Z0)},Runner.prototype.DragCamera=function(){this.camera.script.camera.DragByRunner(this.X,this.Y_cam,this.Z0)},Runner.prototype.ShiftZ=function(t){if(this.Z+=t,this.TriggersFlag)for(var i=0;i<this.Triggers.length;i++)this.Triggers[i].active&&(this.Triggers[i].z+=z)},Runner.prototype.onMouseDown=function(t,i){this.X_last=t,this.Y_last=i},Runner.prototype.onMouseMove=function(t,i,e){if(this.AllowInputFlag&&(!this.SlideFlag||!this.SlidingUnderFlag)&&!this.DeadFlag&&e){if(this.X_last<0)return this.X_last=t,void(this.Y_last=i);var s=t-this.X_last,n=i-this.Y_last;if(Math.abs(s)>Math.abs(n)){if(this.MoveToRailFlag)return;if(this.SlideFlag&&this.SlidingUnderFlag)return;if(!1===this.AllowedMoves[0])return;if(Math.abs(s)<50&&Math.abs(s)>0)if(s<0){if(this.RailIndex>0)return this.setMoveToRail(this.RailIndex-1),this.X_last=-1,void(this.Y_last=-1)}else if(this.RailIndex<2)return this.setMoveToRail(this.RailIndex+1),this.X_last=-1,void(this.Y_last=-1);this.X_last=t}else{if(this.JumpFlag||this.SlideFlag)return this.X_last=-1,void(this.Y_last=-1);if(n<0)return this.AllowedMoves[1]&&this.setJump(),this.X_last=-1,void(this.Y_last=-1);n>0&&(this.AllowedMoves[2]&&this.setSlide(),this.X_last=-1,this.Y_last=-1)}this.X_last=t,this.Y_last=i}},Runner.prototype.onMoveKeyDown=function(t,i){this.AllowInputFlag&&(this.SlideFlag&&this.SlidingUnderFlag||this.DeadFlag||this.AllowedMoves[0]&&(this.MoveToRailFlag||t&&i||(t&&this.RailIndex>0&&this.setMoveToRail(this.RailIndex-1),i&&this.RailIndex<2&&this.setMoveToRail(this.RailIndex+1))))},Runner.prototype.onUpKeyUp=function(){this.AllowInputFlag&&(this.JumpFlag||this.DeadFlag||this.SlideFlag&&this.SlidingUnderFlag||this.AllowedMoves[1]&&this.setJump())},Runner.prototype.onUpKeyDown=function(){this.AllowInputFlag&&(this.SlideFlag&&this.SlidingUnderFlag||this.DeadFlag||this.AllowedMoves[2]&&this.setSlide())},Runner.prototype.SlowSpeed=function(){this.Speed-=this.Speed0*this.SpeedDownCoeff,this.Speed<this.Speed0*this.SpeedMinCoeff&&(this.Speed=this.Speed0*this.SpeedMinCoeff),this.setSpeed(this.Speed),this.SpeedRiseFlag=!0},Runner.prototype.GetStar=function(){this.StarsGetCntr++},Runner.prototype.setSpeed=function(t){this.Speed=t,this.app.currSpeedRunner=t,this.app.RollerSpeed=this.Speed/this.app.RollRad*180/Math.PI},Runner.prototype.CheckGuardOnHit=function(){this.Keeper.script.guard.FollowingFlag?(this.AllowInputFlag=!1,this.Keeper.script.guard.setRunToCatch(),this.app.RunFlag=!1,this.updateGround(0,null,!1,!1),0!==this.Y_grnd&&this.setFallFast(),this.setAnimState(1),this.app.fire("game:catched")):(this.Keeper.script.guard.putOnBack(),this.Keeper.script.guard.setFollow())},Runner.prototype.Catched=function(){this.DeadFlag||this.CatchedFlag||(this.CrownFlag&&this.offCrownFast(),this.AllowInputFlag=!1,this.SlideFlag=!1,this.app.RunFlag=!1,GameAudio.play("catch"),this.setAnimState(7),this.updateGround(0,null,!1,!1),this.setFallFast(),this.DeadTimeCntr=2,this.DeadFlag=!0,this.ShiftCatchCoeff=0,this.ShiftCatchSpeed=1,this.ShiftCatchFlag=!0,this.CatchedFlag=!0)},Runner.prototype.setDrugged=function(t){this.DruggedSpeed=t,this.DruggedZ=0,this.DruggedFlag=!0},Runner.prototype.setBumped=function(t){this.DeadFlag||this.CatchedFlag||(this.CrownFlag&&this.offCrownFast(),this.app.fire("game:bumped"),this.AllowInputFlag=!1,this.SlideFlag=!1,this.app.RunFlag=!1,GameAudio.play("hit"),this.setAnimState(4),this.setBackKick(40,.2),this.updateGround(0,null,!1,!1),this.setFallFast(),this.DeadTimeCntr=2,this.DeadFlag=!0)},Runner.prototype.setBackKick=function(t,i){this.DruggedZ=0,this.BackKickSpeed=t,this.BackKickSpeedFade=this.BackKickSpeed/i,this.BackKickFlag=!0},Runner.prototype.OnWeakHit=function(){this.DeadFlag||(this.SlowSpeed(),this.setCrown(),this.CheckGuardOnHit())},Runner.prototype.update=function(t){if(this.MagnetTime=Game.instance.magnetLvl+1,this.JumperTime=Game.instance.bootsLvl+1,t*=Game.instance.slomo,this.StagesFlag&&(this.RotYFlag&&(this.RotYTimeCntr+=t,this.RotYTimeCntr>=this.RotYTime&&(this.RotYFlag=!1,this.RotYTimeCntr=this.RotYTime),i=this.P2EasingInOut(this.RotYTimeCntr/this.RotYTime),this.AngYRot=this.AngYRot0+i*(this.AngYRotDest-this.AngYRot0),this.entity.setEulerAngles(this.AngleX+this.AngXRot,this.AngleY+this.AngYRot,this.AngleZ+this.AngZRot)),this.WaitStageTimeCntr>=0&&(this.WaitStageTimeCntr-=t)<=0&&null!==this.WaitStageFunc&&this.WaitStageFunc.call(this),this.TutFlag&&this.TriggersFlag))for(e=0;e<this.Triggers.length;e++)if(this.Triggers[e].active&&this.Z<this.Triggers[e].z)for(this.Triggers[e].active=!1,this.Triggers[e].act<this.Tuts.length?this.Tuts[this.Triggers[e].act].script.uiTutor.Create():3===this.Triggers[e].act&&(this.AllowedMoves[1]=!1),this.TriggersFlag=!1,s=0;s<this.Triggers.length;s++)this.Triggers[s].active&&(this.TriggersFlag=!0);var i,e,s;if(this.JumpFlag){this.Y+=this.VertSpeed*t,this.VertSpeed-=this.GravityCoeff*this.app.Gravity*t,this.VertSpeed<-this.SpeedDownMin&&(this.VertSpeedMin=-this.SpeedDownMin);var n=this.VertSpeed/this.JumpSpeedAmp;this.AngXRot=-n*this.AngXRotMax,this.Y<=this.Y_grnd&&(this.Y=this.Y_grnd,this.VertSpeed<=0&&this.OffJump()),this.entity.setPosition(this.X,this.Y+this.Y0,this.Z0),this.entity.setEulerAngles(this.AngleX+this.AngXRot,this.AngleY+this.AngYRot,this.AngleZ+this.AngZRot)}else this.AngXRot>0&&(this.AngXRot-=120*t,this.AngXRot<0&&(this.AngXRot=0)),this.AngXRot<0&&(this.AngXRot+=120*t,this.AngXRot>0&&(this.AngXRot=0)),0!==this.AngXRot&&this.entity.setEulerAngles(this.AngleX+this.AngXRot,this.AngleY+this.AngYRot,this.AngleZ+this.AngZRot);if(this.MoveToRailFlag){this.MoveToRailTimeCntr+=t*this.MoveToRailDir,(this.MoveToRailTimeCntr>this.RailMoveTime||this.MoveToRailTimeCntr<0)&&(this.MoveToRailTimeCntr>this.RailMoveTime?this.MoveToRailTimeCntr=this.RailMoveTime:this.MoveToRailTimeCntr=0,this.MoveToRailFlag=!1);var h=(i=this.P2EasingInOut(this.MoveToRailTimeCntr/this.RailMoveTime))/.5;i>.5&&(h=(1-i)/.5),i>.25&&(this.MoveOldRailCheckedFlag||(null!==this.ObjGrnd&&this.ObjGrnd.isWall(this.Z0,this.Y)&&(this.MoveToRailDir=-1,this.TutFlag||this.OnWeakHit()),this.MoveOldRailCheckedFlag=!0)),i>.5&&(this.MoveRailCheckedFlag||(this.Base.checkRunnerOnCollision(this.RailIndexDest,0)?(this.MoveToRailDir=-1,this.TutFlag||this.OnWeakHit()):this.DeadFlag?this.MoveToRailDir=-1:this.RailIndex=this.RailIndexDest,this.MoveRailCheckedFlag=!0)),this.AngYRot=this.MoveRailsDir*this.AngYRotMax*h,this.AngZRot=-this.MoveRailsDir*this.AngZRotMax*h,this.entity.setEulerAngles(this.AngleX+this.AngXRot,this.AngleY+this.AngYRot,this.AngleZ+this.AngZRot),this.X=this.MoveToRailX0+this.MoveRailsDir*this.RailsStep*i,this.entity.setPosition(this.X,this.Y+this.Y0,this.Z0)}if(this.StarsNum>0){var a=!0;for(e=0;e<this.StarsNum;e++)null!==this.Stars[e]&&(this.Stars[e].MagnetTo(this.X,this.Y+this.Y0+this.RadY,this.Z0-this.RadZ,t)&&(this.GetStar(),this.Base.removeObj(this.Stars[e]),this.Stars[e]=null),a=!1);a&&(this.StarsNum=0)}if(this.CrownFlag&&((this.CrownTimeCntr-=t)<0&&this.offCrown(),this.CrownAngleY+=this.CrownRotSpeed*t,this.crown.setEulerAngles(this.CrownAngleX,this.CrownAngleY,this.CrownAngleZ)),this.app.RunFlag?(this.BoosterFlag&&(this.MagnetFlag&&(this.Base.getStarsAround(this.StarGetDist),(this.MagnetTimeCntr-=t)<0&&(this.MagnetFlag=!1,!1===this.JumperFlag&&(this.BoosterFlag=!1))),this.JumperFlag&&(this.JumperTimeCntr-=t)<0&&(this.JumperFlag=!1,!1===this.MagnetFlag&&(this.BoosterFlag=!1))),this.SlideFlag&&(this.SlideTimeCntr-=t)<0&&!this.SlidingUnderFlag&&(this.setAnimState(0),this.SlideFlag=!1),this.SpeedRiseFlag&&(this.Speed+=this.SpeedRise*t,this.Speed>this.Speed0&&(this.Speed=this.Speed0,this.SpeedRiseFlag=!1),this.setSpeed(this.Speed)),this.Y>this.Y0_cam&&!this.CamMovingFlag&&(this.CamMovingFlag=!0),this.Z-=this.Speed*t,this.entity.setPosition(this.X,this.Y+this.Y0,this.Z0),this.camera.script.camera.DragByRunner(this.Rails[1],this.Y_cam,this.Z0)):(this.CatchedFlag&&this.ShiftCatchFlag&&(this.ShiftCatchCoeff+=this.ShiftCatchSpeed*t,this.ShiftCatchCoeff>1&&(this.ShiftCatchCoeff=1,this.ShiftCatchFlag=!1),this.entity.setPosition(this.X+this.ShiftCatch[0]*this.ShiftCatchCoeff,this.Y+this.Y0+this.ShiftCatch[1]*this.ShiftCatchCoeff,this.Z0+this.ShiftCatch[2]*this.ShiftCatchCoeff)),this.BackKickFlag&&(this.DruggedZ+=this.BackKickSpeed*t,this.BackKickSpeed-=this.BackKickSpeedFade*t,this.BackKickSpeed<0&&(this.BackKickFlag=!1),this.entity.setPosition(this.X,this.Y+this.Y0,this.Z0+this.DruggedZ)),this.DruggedFlag&&(this.DruggedZ+=this.DruggedSpeed*t,this.entity.setPosition(this.X,this.Y+this.Y0,this.Z0+this.DruggedZ)),this.DeadFlag&&(this.DeadTimeCntr-=t)<0&&(this.Base.StopRun(),this.DeadFlag=!1)),this.CamMovingFlag&&(this.Y<this.Y0_cam?this.SpeedCam=this.SpeedCamMin:this.SpeedCam=this.SpeedCamMin+Math.abs(this.Y-this.Y_cam-this.Y0_cam)*this.CoeffCamSpeed,this.Y-this.Y_cam<=0&&(this.SpeedCam=-this.SpeedCamMin),this.Y_cam+=this.SpeedCam*t,this.Y_cam>this.Y&&(this.Y_cam=this.Y),this.Y_cam<0&&(this.Y_cam=0,this.CamMovingFlag=!1)),this.ScalingFlag){this.ScaleTimeCntr+=t;var l=this.ScaleTimeCntr/this.ScaleTime;l>=1?(l=1,this.ScalingFlag=!1,this.Scale=this.ScaleDest,this.ScalingCrownFlag&&(this.crown.setLocalScale(this.Anims[this.AnimState].crown.scale*l+(1-l)*this.ScalingCrownScale0,this.Anims[this.AnimState].crown.scale*l+(1-l)*this.ScalingCrownScale0,this.Anims[this.AnimState].crown.scale*l+(1-l)*this.ScalingCrownScale0),this.crown.setLocalPosition(this.Anims[this.AnimState].crown.x*l+(1-l)*this.ScalingCrownX0,this.Anims[this.AnimState].crown.y*l+(1-l)*this.ScalingCrownY0,this.Anims[this.AnimState].crown.z*l+(1-l)*this.ScalingCrownZ0)),this.entity.setLocalScale(this.Scale,this.Scale,this.Scale),this.entity.animation.loop=this.Anims[this.AnimState].loop,void 0!==this.ScaleFuncEnd&&null!==this.ScaleFuncEnd&&this.ScaleFuncEnd.call(this)):(this.Scale=this.Scale0+(this.ScaleDest-this.Scale0)*l,this.ScalingCrownFlag&&(this.crown.setLocalScale(this.Anims[this.AnimState].crown.scale*l+(1-l)*this.ScalingCrownScale0,this.Anims[this.AnimState].crown.scale*l+(1-l)*this.ScalingCrownScale0,this.Anims[this.AnimState].crown.scale*l+(1-l)*this.ScalingCrownScale0),this.crown.setLocalPosition(this.Anims[this.AnimState].crown.x*l+(1-l)*this.ScalingCrownX0,this.Anims[this.AnimState].crown.y*l+(1-l)*this.ScalingCrownY0,this.Anims[this.AnimState].crown.z*l+(1-l)*this.ScalingCrownZ0)),this.entity.setLocalScale(this.Scale,this.Scale,this.Scale))}};var Road=pc.createScript("road");Road.attributes.add("overLap0",{type:"number",default:0,title:"Overlap0"}),Road.attributes.add("overLap1",{type:"number",default:0,title:"Overlap1"}),Road.prototype.initialize=function(){var t;this.Length=0,this.Roads=[],this.Objects=[],this.Builds=[],this.FreeFlag=!0,this.AppearFlag=!1;for(var s=this.entity.children,i=-1,e=-1,a=0;a<s.length;a++){if((t=s[a]).tags.has("scene")){this.Objects.push(t),t.prop={zmin:0,zmax:0,h:0,dist:0};var o=t.model.meshInstances[0].aabb.getMin(),h=t.model.meshInstances[0].aabb.getMax();t.prop.xmin=o.x,t.prop.xmax=h.x,t.prop.h=Math.abs(h.y-o.y),t.prop.zmin=o.z,t.prop.zmax=h.z,t.prop.length=Math.abs(t.prop.zmax-t.prop.zmin),t.prop.radZ=t.prop.length/2,t.prop.angles=t.getEulerAngles()}t.tags.has("way")?(this.Roads.push(t),this.X_shift=t.getLocalPosition().x,i<0?i=a:s[i].prop.zmin>s[a].prop.zmin&&(i=a),e<0?e=a:s[e].prop.zmax<s[a].prop.zmax&&(e=a)):this.Builds.push(t)}for(i>=0&&(this.Length=s[e].prop.zmax-s[i].prop.zmin),a=0;a<this.Roads.length-1;a++)for(var p=a+1;p<this.Roads.length;p++)if(this.Roads[a].prop.zmin<this.Roads[p].prop.zmin){var n=this.Roads[a];this.Roads[a]=this.Roads[p],this.Roads[p]=n}},Road.prototype.AttachAt=function(t,s,i){this.SetAt(t,s,i-this.Roads[0].getLocalPosition().z-this.Roads[0].prop.radZ-this.overLap0)},Road.prototype.SetAt=function(t,s,i){this.X=t-this.X_shift,this.Y=s,this.Z=i,this.entity.setPosition(this.X,this.Y,this.Z);var e=this.Roads.length-1;this.Z_far=this.Z+this.Roads[e].getLocalPosition().z+this.Roads[e].prop.radZ+this.overLap1},Road.prototype.OnAdded=function(t){this.FreeFlag=!1,this.entity.enabled=!0,this.AppearFlag=!1;for(var s=0;s<this.Objects.length;s++)this.Objects[s].enabled=!0},Road.prototype.disableNotSeen=function(t){if(this.entity.enabled){for(var s=0,i=0;i<this.Objects.length;i++)this.Objects[i].enabled&&(s++,this.Objects[i].getPosition().z-this.Objects[i].prop.radZ>t&&(this.Objects[i].enabled=!1,s--));s<=0&&(this.entity.enabled=!1,this.FreeFlag=!0)}},Road.prototype.ShiftZ=function(t){this.entity.enabled&&(this.Z+=t,this.Z_far+=t,this.entity.setPosition(this.X,this.Y,this.Z))},Road.prototype.EnableScene=function(t){for(var s=0;s<this.Objects.length;s++)this.Objects[s].enabled=t},Road.prototype.SetFree=function(){this.entity.enabled=!1,this.FreeFlag=!0},Road.prototype.update=function(t){this.AppearFlag&&this.app.RunFlag};var Obstacle=pc.createScript("obst");Obstacle.attributes.add("Type",{type:"number",default:0,title:"Type"}),Obstacle.attributes.add("Y0",{type:"number",default:0,title:"Y0"}),Obstacle.attributes.add("FrontCoeff",{type:"number",default:1,title:"Front Coeff"}),Obstacle.attributes.add("UpCoeff",{type:"number",default:1,title:"Up Coeff"}),Obstacle.attributes.add("BottomFreeFlag",{type:"boolean",default:!1,title:"Bottom Free"}),Obstacle.attributes.add("TopWalkFlag",{type:"boolean",default:!1,title:"Top Walkable"}),Obstacle.attributes.add("JumpableFlag",{type:"boolean",default:!1,title:"Jumpable"}),Obstacle.attributes.add("RampCoeff",{type:"number",default:0,title:"Ramp Coeff"}),Obstacle.attributes.add("SideWallCoeff",{type:"number",default:0,title:"Side Wall Coeff"}),Obstacle.attributes.add("Speed",{type:"number",default:0,title:"Speed"}),Obstacle.prototype.initialize=function(){this.Quat=new pc.Quat,this.QuatBase=new pc.Quat,this.QuatRot=new pc.Quat;for(var t=this.entity.model.meshInstances[0].aabb.getMin(),e=this.entity.model.meshInstances[0].aabb.getMax(),s=e.z,i=t.z,a=e.y,l=t.y,h=e.x,n=t.x,o=1;o<this.entity.model.meshInstances.length;o++)t=this.entity.model.meshInstances[o].aabb.getMin(),s<(e=this.entity.model.meshInstances[o].aabb.getMax()).z&&(s=e.z),i>t.z&&(i=t.z),a<e.y&&(a=e.y),l>t.y&&(l=t.y),h<e.x&&(h=e.x),n>t.x&&(n=t.x);this.RadZ=this.FrontCoeff*Math.abs(s-i)/2,this.RadY=this.UpCoeff*Math.abs(a-l),this.Objs=[];var r=this.entity.getEulerAngles();this.AngX0=r.x,this.AngY0=r.y,this.AngZ0=r.z,this.QuatBase.setFromEulerAngles(this.AngX0,this.AngY0,this.AngZ0)},Obstacle.prototype.Create=function(t,e,s,i){this.X=t,this.Y=e,this.Z=s,this.Z_real=s,this.Z_backreal=s-this.RadZ,this.Z_frontreal=s+this.RadZ,this.Z_front=this.Z+this.RadZ,this.Z_back=this.Z-this.RadZ,this.Rail=i,this.entity.setPosition(this.X,this.Y,this.Z),this.Next=null,this.Last=null,this.Class=0,this.CollideType=0,this.CollideFlag=!0,this.Master=null,this.entity.enabled=!0,this.shiftX=0,this.shiftY=0,this.shiftZ=0,this.ChildsFlag=!1,this.Objs.length=0,this.FarFlag=!0,this.Roller=null,0===this.Speed?this.enabled=!1:this.enabled=!0},Obstacle.prototype.updateZ=function(){this.Z=this.entity.getPosition().z,this.Z_front=this.Z+this.RadZ,this.Z_back=this.Z-this.RadZ},Obstacle.prototype.setRoller=function(t,e,s){this.Roller=t,this.entity.reparent(this.Roller.entity);var i=e/this.app.RollRad*180/Math.PI;this.RollerAngleX=this.Roller.Angle+i,this.entity.setLocalPosition(this.X,Math.cos(Math.PI*this.RollerAngleX/180)*s,-Math.sin(Math.PI*this.RollerAngleX/180)*s),this.QuatRot.setFromEulerAngles(-this.RollerAngleX,0,0),this.Quat.mul2(this.QuatRot,this.QuatBase),this.entity.setLocalRotation(this.Quat),this.updateZ()},Obstacle.prototype.addObj=function(t,e,s,i){t.setToMaster(this,e,s,i),this.Objs.push(t),t.updateBase(this.X,this.Y,this.Z),this.ChildsFlag=!0},Obstacle.prototype.getYbyZ=function(t,e){return this.RampCoeff>0?(null!==e&&(e.ramp=!0),this.SideWallCoeff>0&&null!==e&&(e.wall=!0),t>this.Z_front-2*this.RadZ*this.RampCoeff?this.Y+this.RadY*Math.abs(t-this.Z_front)/(2*this.RadZ*this.RampCoeff):this.getYtop()):(null!==e&&(e.ramp=!1,e.wall=!1),this.getYtop())},Obstacle.prototype.isWall=function(t,e){return this.SideWallCoeff>0&&(t>this.Z_front-2*this.RadZ*this.SideWallCoeff&&!(e>this.Y+this.RadY))},Obstacle.prototype.isEnabled=function(){return this.entity.enabled},Obstacle.prototype.DisableEntity=function(){if(this.entity.enabled=!1,void 0!==this.Roller&&this.entity.reparent(this.app.root),this.ChildsFlag)for(var t=0;t<this.Objs.length;t++)null!==this.Objs[t]&&this.Objs[t].DisableEntity(),this.Objs[t]=null},Obstacle.prototype.disableNotSeen=function(t){this.entity.enabled&&this.entity.getPosition().z-this.RadZ>t&&this.DisableEntity()},Obstacle.prototype.getYtop=function(){return this.Y+this.RadY},Obstacle.prototype.getYbott=function(){return this.Y},Obstacle.prototype.isBottomFree=function(){return this.BottomFreeFlag},Obstacle.prototype.SetFree=function(){this.entity.enabled=!1},Obstacle.prototype.ShiftZ=function(t){this.entity.enabled&&(this.Z_real+=t,this.Z_frontreal=this.Z_real+this.RadZ,this.Z_backreal=this.Z_real-this.RadZ)},Obstacle.prototype.update=function(t){};var Camera=pc.createScript("camera");Camera.attributes.add("radStay",{type:"number",default:7,title:"Dist stay"}),Camera.attributes.add("angZstay",{type:"number",default:20,title:"Ang Z stay"}),Camera.attributes.add("angYstay",{type:"number",default:90,title:"Ang Y stay"}),Camera.attributes.add("Z0stay",{type:"number",default:2,title:"Z stay"}),Camera.attributes.add("Y0stay",{type:"number",default:1,title:"Y stay"}),Camera.attributes.add("FOVstay",{type:"number",default:40,title:"FOV stay"}),Camera.attributes.add("zLand",{type:"number",default:0,title:"Dist Z Land"}),Camera.attributes.add("radLand",{type:"number",default:30,title:"Rad Land"}),Camera.attributes.add("angLand",{type:"number",default:30,title:"Ang Land"}),Camera.attributes.add("fovLand",{type:"number",default:40,title:"FOV Land"}),Camera.attributes.add("zVert",{type:"number",default:7,title:"Dist Z Vert"}),Camera.attributes.add("radVert",{type:"number",default:25,title:"Rad Vert"}),Camera.attributes.add("angVert",{type:"number",default:35,title:"Ang Vert"}),Camera.attributes.add("fovVert",{type:"number",default:40,title:"FOV Vert"}),Camera.attributes.add("runner",{type:"entity",title:"Runner"}),Camera.prototype.initialize=function(){this.AngX0=this.entity.getEulerAngles().x,this.makeParams(),this.app.on("screen:changed",this.OnScreenChange,this),this.MenuModeFlag=!0,this.AroundFlag=!1,this.frm=[],this.to=[],this.res=[],this.coeffs=[]},Camera.prototype.postInitialize=function(){},Camera.prototype.setMenuMode=function(){this.AroundAng=this.angYstay,this.AroundRad=this.radStay,this.DistX=Math.sin(Math.PI*this.AroundAng/180)*this.AroundRad,this.DistY=this.Y0stay+Math.sin(Math.PI*this.angZstay/180)*this.AroundRad,this.DistZ=Math.cos(Math.PI*this.AroundAng/180)*this.AroundRad,this.entity.setPosition(this.DistX,this.DistY,this.DistZ),this.entity.setEulerAngles(0,this.AroundAng,this.angZstay),this.entity.camera.fov=this.FOVstay,this.MenuModeFlag=!0},Camera.prototype.setRunMode=function(){this.DistX=this.DistX0,this.DistY=this.DistY0,this.DistZ=this.DistZ0,this.entity.camera.fov=this.FOV,this.entity.setPosition(this.DistX,this.DistY,this.DistZ),this.entity.setEulerAngles(this.AngX0,0,0),this.MenuModeFlag=!1},Camera.prototype.setSideMode=function(){this.entity.setEulerAngles(0,90,0),this.entity.setPosition(10,5,0)},Camera.prototype.setTopMode=function(){this.entity.setEulerAngles(-90,0,0),this.entity.setPosition(0,20,0)},Camera.prototype.setBigTween=function(t,i,s,e,a){for(var n=0;n<i.length;n++)this.frm[n]=i[n],this.to[n]=s[n],this.coeffs[n]=1;this.AroundTime=t,this.TweenFunc=e,this.AroundCall=a,this.AroundTimeCntr=0,this.AroundFlag=!0},Camera.prototype.setMoveLeft=function(){var t=window.innerWidth/window.innerHeight,i=1;t<1&&(i=0),t>1&&(i=t),i>1&&(i=1),t>.8&&(t=1),this.setBigTween(.4,[this.DistX,this.DistY,this.DistZ,0,this.AroundAng,this.angZstay,this.FOVstay],[this.DistX,this.DistY,this.DistZ+1.5*i,0,this.AroundAng,this.angZstay,this.FOVstay],this.P2EasingInOut,this.OnAroundEnd0)},Camera.prototype.setMoveToBase=function(){this.setBigTween(1,[this.DistX,this.DistY,this.DistZ,0,this.AroundAng,this.angZstay,this.FOVstay],[this.DistX0,this.DistY0,this.DistZ0,this.AngX0,0,0,this.FOV],this.P2EasingInOut,this.OnAroundEnd2),this.coeffs[4]=1.5;var t=window.innerWidth/window.innerHeight;t<.7&&(this.coeffs[4]=2),t>1.2&&(this.coeffs[4]=1)},Camera.prototype.OnAroundEnd0=function(){window.innerWidth/window.innerHeight<1.2?this.setBigTween(.5,[this.DistX,this.DistY,this.DistZ,0,this.AroundAng,this.angZstay,this.FOVstay],[this.DistX,this.DistY,this.DistZ-1,0,this.AroundAng,this.angZstay,this.FOVstay],this.P2EasingInOut,this.OnAroundEnd1):this.setMoveToBase()},Camera.prototype.OnAroundEnd1=function(){this.setMoveToBase()},Camera.prototype.OnAroundEnd2=function(){this.MenuModeFlag=!1,this.setRunMode(),this.OnScreenChange()},Camera.prototype.makeParams=function(){this.LandscapeFlag=this.app.LandscapeFlag,this.LandscapeFlag?(this.DistZshift=this.zLand,this.RadDist=this.radLand,this.AngDist=this.angLand,this.FOV=this.fovLand):(this.DistZshift=this.zVert,this.RadDist=this.radVert,this.AngDist=this.angVert,this.FOV=this.fovVert),this.DistX0=0,this.DistY0=this.RadDist*Math.sin(Math.PI*this.AngDist/180),this.DistZ0=this.DistZshift+this.RadDist*Math.cos(Math.PI*this.AngDist/180),this.MenuModeFlag?this.entity.camera.fov=this.FOVstay:(this.entity.camera.fov=this.FOV,this.DistX=this.DistX0,this.DistY=this.DistY0,this.DistZ=this.DistZ0)},Camera.prototype.Linear=function(t){return t},Camera.prototype.P2EasingInOut=function(t){return(t*=2)<1?.5*t*t:-.5*(--t*(t-2)-1)},Camera.prototype.OnScreenChange=function(){this.makeParams(),this.runner.script.runner.DragCamera()},Camera.prototype.DragByRunner=function(t,i,s){this.entity.setPosition(t+this.DistX,i+this.DistY,s+this.DistZ)},Camera.prototype.update=function(t){if(this.AroundFlag){this.AroundTimeCntr+=t,this.AroundTimeCntr>=this.AroundTime&&(this.AroundTimeCntr=this.AroundTime,this.AroundFlag=!1);for(var i=this.TweenFunc(this.AroundTimeCntr/this.AroundTime),s=0;s<this.frm.length;s++){var e=this.coeffs[s]*i;e>1&&(e=1),this.res[s]=this.frm[s]+e*(this.to[s]-this.frm[s])}this.DistX=this.res[0],this.DistY=this.res[1],this.DistZ=this.res[2],this.entity.setPosition(this.DistX,this.DistY,this.DistZ),this.entity.setEulerAngles(this.res[3],this.res[4],this.res[5]),this.entity.camera.fov=this.res[6],this.AroundFlag||null!==this.AroundCall&&this.AroundCall.call(this)}};var Star=pc.createScript("star");Star.attributes.add("Root",{type:"entity",title:"Root"}),Star.attributes.add("Type",{type:"number",default:0,title:"Type"}),Star.attributes.add("RotSpeed",{type:"number",default:120,title:"Speed Rotate"}),Star.attributes.add("Runner",{type:"entity",title:"Runner"}),Star.prototype.initialize=function(){this.Quat=new pc.Quat,this.QuatBase=new pc.Quat,this.QuatRot=new pc.Quat;var t=this.entity.model.meshInstances[0].aabb.getMin(),i=this.entity.model.meshInstances[0].aabb.getMax();this.RadMax=Math.abs(t.z-i.z),this.RadMax<Math.abs(t.x-i.x)&&(this.RadMax=Math.abs(t.x-i.x)),this.RadY=Math.abs(t.y-i.y)/2,this.Scale0=this.entity.getLocalScale().x,this.RadMax=this.RadMax/2,this.RadZ=this.RadMax,this.Base=this.Root.script.base},Star.prototype.Create=function(t,i,s,e,h){this.X=t,this.Y=i,this.Z=s,this.Z_real=s,this.Z_backreal=this.Z_real-this.RadZ,this.Z_frontreal=this.Z_real+this.RadZ,this.Rail=e,this.entity.setPosition(this.X,this.Y,this.Z),this.entity.setLocalScale(this.Scale0,this.Scale0,this.Scale0),this.Z_front=this.Z+this.RadMax,this.Z_back=this.Z-this.RadMax,this.Angle=h,this.Next=null,this.Last=null,this.Class=2,this.CollideType=1,this.CollideFlag=!0,this.Master=null,this.shiftX=0,this.shiftY=0,this.shiftZ=0,this.ChildsFlag=!1,this.FarFlag=!0,this.Roller=null,this.MovingFlag=!1,this.entity.enabled=!0},Star.prototype.setMoving=function(t,i){this.MovingSpeed=t,this.MovingAngleSpeed=t/this.app.RollRad*-180/Math.PI,this.MovingFlag=!0,this.DistRunner=Math.abs(this.Z_real+i-this.Runner.script.runner.Z),this.DistRunner0=this.DistRunner},Star.prototype.updateZ=function(){this.Z=this.entity.getPosition().z,this.Z_front=this.Z+this.RadZ,this.Z_back=this.Z-this.RadZ},Star.prototype.setRoller=function(t,i,s){this.Roller=t,this.entity.reparent(this.Roller.entity);var e=i/this.app.RollRad*180/Math.PI;this.AnglePlus=s/this.app.RollRad*180/Math.PI,this.RollerAngleX=this.Roller.Angle+e,this.RollerAngleX0=this.RollerAngleX,this.RollerRad=this.app.RollRad+this.Y,this.RollerAngleX=this.Roller.Angle+e,this.entity.setLocalPosition(this.X,Math.cos(Math.PI*this.RollerAngleX/180)*this.RollerRad,-Math.sin(Math.PI*this.RollerAngleX/180)*this.RollerRad),this.QuatBase.setFromEulerAngles(-this.RollerAngleX,0,0),this.QuatRot.setFromEulerAngles(0,this.Angle,0),this.Quat.mul2(this.QuatBase,this.QuatRot),this.entity.setLocalRotation(this.Quat),this.updateZ()},Star.prototype.getYtop=function(){return this.Y+this.RadY},Star.prototype.getYbott=function(){return this.Y-this.RadY},Star.prototype.isEnabled=function(){return this.entity.enabled},Star.prototype.DisableEntity=function(){this.SetFree(),void 0!==this.Roller&&this.entity.reparent(this.app.root)},Star.prototype.freeFromRoller=function(){void 0!==this.Roller&&this.entity.reparent(this.app.root),this.Roller=null},Star.prototype.ShiftZ=function(t){this.entity.enabled&&(this.Z_real+=t,this.Z_frontreal=this.Z_real+this.RadZ,this.Z_backreal=this.Z_real-this.RadZ)},Star.prototype.disableNotSeen=function(t){this.entity.enabled&&this.entity.getPosition().z-this.RadZ>t&&(this.entity.enabled=!1)},Star.prototype.SetFree=function(){this.entity.enabled=!1},Star.prototype.P2EasingInOut=function(t){return(t*=2)<1?.5*t*t:-.5*(--t*(t-2)-1)},Star.prototype.P2EasingIn=function(t){return t*t},Star.prototype.setToMaster=function(t,i,s,e){this.shiftX=i,this.shiftY=s,this.shiftZ=e,this.Master=t},Star.prototype.updateBase=function(t,i,s){this.X=t+this.shiftX,this.Y=i+this.shiftY,this.Z=s+this.shiftZ,this.entity.setPosition(this.X,this.Y,this.Z)},Star.prototype.setMagnet=function(t,i){this.MagnetTime=t,this.MagnetTimeCntr=t,this.MagnetUpCoeff=1,this.MagnetUpCoeffSpeed=10,this.MagnetUp=0,this.MagnetUpMax=2,this.Y0=this.Y,this.Scale=1,this.DistStarGet=i;var s=this.entity.getPosition();this.freeFromRoller(),this.entity.setPosition(s.x,s.y,s.z),this.Y0=s.y,this.MagnetMoveAlongSpeed=this.app.currSpeedRunner,this.MovingFlag&&(this.MagnetMoveAlongSpeed+=this.MovingSpeed),this.MovingFlag=!1,this.QuatBase.setFromEulerAngles(0,0,0),this.Quat.mul2(this.QuatBase,this.QuatRot),this.entity.setLocalRotation(this.Quat)},Star.prototype.MagnetTo=function(t,i,s,e){var h,a,n,o;if(e*=Game.instance.slomo,this.MagnetUp+=this.MagnetUpCoeffSpeed*e,this.MagnetUp<this.MagnetUpMax)this.Y=this.Y0+this.MagnetUp,this.Z-=this.MagnetMoveAlongSpeed*e,this.entity.setPosition(this.X,this.Y,this.Z),o=(h=this.X-t)*h+(a=this.Y-i)*a+(n=this.Z-s)*n,o=Math.sqrt(o);else{this.MagnetTimeCntr-=e,o=(h=this.X-t)*h+(a=this.Y-i)*a+(n=this.Z-s)*n,(o=Math.sqrt(o))>0&&(h/=o,a/=o,n/=o);var l=this.MagnetTimeCntr/this.MagnetTime;l>.5&&(this.Scale=1-this.Scale0*((l-.5)/.5),this.Scale<.5&&(this.Scale=.5),this.entity.setLocalScale(this.Scale,this.Scale,this.Scale)),this.X=t+l*o*h,this.Y=i+l*o*a,this.Z=s+l*o*n,this.entity.setPosition(this.X,this.Y,this.Z)}return(this.MagnetTimeCntr<=0||o<this.DistStarGet)&&(this.Base.makeStarExpl(this.X,this.Y,this.Z),!0)},Star.prototype.StopMoving=function(){this.MovingFlag=!1},Star.prototype.update=function(t){t*=Game.instance.slomo,this.MovingFlag&&(this.DistRunner-=this.app.currSpeedRunner*t,this.RollerAngleX=this.RollerAngleX0-(1-this.DistRunner/this.DistRunner0)*this.AnglePlus,this.entity.setLocalPosition(this.X,Math.cos(Math.PI*this.RollerAngleX/180)*this.RollerRad,-Math.sin(Math.PI*this.RollerAngleX/180)*this.RollerRad),this.QuatBase.setFromEulerAngles(-this.RollerAngleX,0,0)),this.Angle+=this.RotSpeed*t,this.QuatRot.setFromEulerAngles(0,this.Angle,0),this.Quat.mul2(this.QuatBase,this.QuatRot),this.entity.setLocalRotation(this.Quat)};var Bus=pc.createScript("bus");Bus.attributes.add("Type",{type:"number",default:0,title:"Type"}),Bus.attributes.add("Y0",{type:"number",default:0,title:"Y0"}),Bus.attributes.add("FrontCoeff",{type:"number",default:1,title:"Front Coeff"}),Bus.attributes.add("UpCoeff",{type:"number",default:1,title:"Up Coeff"}),Bus.attributes.add("Speed0",{type:"number",default:50,title:"Speed"}),Bus.attributes.add("TopWalkFlag",{type:"boolean",default:!0,title:"Top Walkable"}),Bus.attributes.add("Runner",{type:"entity",title:"Runner"}),Bus.attributes.add("JumpableFlag",{type:"boolean",default:!0,title:"Jumpable"}),Bus.attributes.add("materials",{type:"asset",assetType:"material",array:!0,title:"Materials"}),Bus.prototype.initialize=function(){this.Quat=new pc.Quat,this.QuatBase=new pc.Quat,this.QuatRot=new pc.Quat;for(var t=this.entity.model.meshInstances[0].aabb.getMin(),s=this.entity.model.meshInstances[0].aabb.getMax(),e=s.z,i=t.z,a=s.y,n=t.y,h=s.x,l=t.x,o=1;o<this.entity.model.meshInstances.length;o++)t=this.entity.model.meshInstances[o].aabb.getMin(),e<(s=this.entity.model.meshInstances[o].aabb.getMax()).z&&(e=s.z),i>t.z&&(i=t.z),a<s.y&&(a=s.y),n>t.y&&(n=t.y),h<s.x&&(h=s.x),l>t.x&&(l=t.x);this.RadX=this.FrontCoeff*Math.abs(h-l)/2,this.RadZ=this.FrontCoeff*Math.abs(e-i)/2,this.RadX>this.RadZ&&(this.RadZ=this.RadX),this.RadY=this.UpCoeff*Math.abs(a-n),this.Objs=[];var r=this.entity.getEulerAngles();this.AngX0=r.x,this.AngY0=r.y,this.AngZ0=r.z,this.QuatBase.setFromEulerAngles(this.AngX0,this.AngY0,this.AngZ0)},Bus.prototype.Create=function(t,s,e,i,a,n){this.X=t,this.Y=s,this.Z=e,this.Z_front=this.Z+this.RadZ,this.Z_back=this.Z-this.RadZ,this.Rail=n,this.entity.setPosition(this.X,this.Y,this.Z),this.DistRunner=Math.abs(e+i-this.Runner.script.runner.Z),this.DistRunner0=this.DistRunner,this.Z_real=e,this.Z_backreal=e-this.RadZ,this.Z_frontreal=e+this.RadZ,this.Next=null,this.Last=null,this.Class=1,this.CollideType=0,this.RampCoeff=0,this.entity.enabled=!0,this.CollideFlag=!0,this.Master=null,this.MovingFlag=!1,this.Speed=a,0===this.Speed?this.enabled=!1:this.enabled=!0,this.Roller=null,this.setMoving(a),this.FarFlag=!0,this.Objs.length=0,this.ChildsFlag=!1,"Bus.json"==this.app.assets.get(this.entity.model.asset).name&&EntityTools.setMaterial(this.entity,Game.instance.busMaterials[0*Math.floor(3*Math.random())])},Bus.prototype.setMoving=function(t){this.MovingSpeed=t,this.MovingAngleSpeed=t/this.app.RollRad*-180/Math.PI,this.MovingFlag=!0},Bus.prototype.updateMovingAngleSpeed=function(){this.MovingAngleSpeed=this.MovingSpeed/this.app.RollRad*-180/Math.PI},Bus.prototype.updateZ=function(){this.Z=this.entity.getPosition().z,this.Z_front=this.Z+this.RadZ,this.Z_back=this.Z-this.RadZ},Bus.prototype.setRoller=function(t,s,e){this.Roller=t,this.entity.reparent(this.Roller.entity),this.RollerRad=this.app.RollRad+this.Y0;var i=s/this.app.RollRad*180/Math.PI;this.AnglePlus=e/this.app.RollRad*180/Math.PI,this.RollerAngleX=this.Roller.Angle+i,this.RollerAngleX0=this.RollerAngleX,this.entity.setLocalPosition(this.X,Math.cos(Math.PI*this.RollerAngleX/180)*this.RollerRad,-Math.sin(Math.PI*this.RollerAngleX/180)*this.RollerRad),this.QuatRot.setFromEulerAngles(-this.RollerAngleX,0,0),this.Quat.mul2(this.QuatRot,this.QuatBase),this.entity.setLocalRotation(this.Quat),this.updateZ()},Bus.prototype.addObj=function(t,s,e,i){t.setToMaster(this,s,e,i),this.Objs.push(t),t.updateBase(this.X,this.Y,this.Z),this.ChildsFlag=!0},Bus.prototype.getYbyZ=function(t,s){return null!==s&&(s.ramp=!1),null!==s&&(s.wall=!1),this.getYtop()},Bus.prototype.isWall=function(t,s){return!1},Bus.prototype.getYtop=function(){return this.Y+this.RadY},Bus.prototype.getYbott=function(){return this.Y},Bus.prototype.isBottomFree=function(){return!1},Bus.prototype.isEnabled=function(){return this.entity.enabled},Bus.prototype.DisableEntity=function(){if(this.entity.enabled=!1,void 0!==this.Roller&&this.entity.reparent(this.app.root),this.ChildsFlag)for(var t=0;t<this.Objs.length;t++)null!==this.Objs[t]&&this.Objs[t].DisableEntity(),this.Objs[t]=null},Bus.prototype.disableNotSeen=function(t){this.entity.enabled&&this.entity.getPosition().z-this.RadZ>t&&this.DisableEntity()},Bus.prototype.SetFree=function(){this.entity.enabled=!1},Bus.prototype.ShiftZ=function(t){this.entity.enabled&&(this.Z_real+=t,this.Z_frontreal=this.Z_real+this.RadZ,this.Z_backreal=this.Z_real-this.RadZ)},Bus.prototype.checkCollisionOfObjs=function(t,s,e){t.Y,t.getYtop(),t.getZfront();for(var i=t.Z,a=(t.getZback(),t.RadY,t.RadZ),n=0;n<this.Objs.length;n++){var h=this.Objs[n];null!==h&&h.CollideFlag&&Math.abs(i-h.Z)<h.RadZ+a&&(s.call(e,this,h),h.CollideFlag=!1)}},Bus.prototype.checkDistToObjs=function(t,s,e,i,a,n){for(var h=0;h<this.Objs.length;h++){var l=this.Objs[h];if(null!==l&&l.CollideFlag){var o=t-l.X,r=s-l.Y,u=e-l.Z;o*o+r*r+u*u<i&&a.call(n,this,l)}}},Bus.prototype.removeObj=function(t){for(var s=0;s<this.Objs.length;s++)if(this.Objs[s]===t)return this.Objs[s]=null,!0;return!1},Bus.prototype.StopMoving=function(){this.MovingFlag=!1},Bus.prototype.update=function(t){this.MovingFlag&&(this.DistRunner-=this.app.currSpeedRunner*t*Game.instance.slomo,this.RollerAngleX=this.RollerAngleX0-(1-this.DistRunner/this.DistRunner0)*this.AnglePlus,this.entity.setLocalPosition(this.X,Math.cos(Math.PI*this.RollerAngleX/180)*this.RollerRad,-Math.sin(Math.PI*this.RollerAngleX/180)*this.RollerRad),this.QuatRot.setFromEulerAngles(-this.RollerAngleX,0,0),this.Quat.mul2(this.QuatRot,this.QuatBase),this.entity.setLocalRotation(this.Quat))};var FullscreenImage=pc.createScript("fullscreenImage");FullscreenImage.getScreenComponentIteration=0,FullscreenImage.getScreenComponent=function(e){return FullscreenImage.getScreenComponentIteration++,FullscreenImage.getScreenComponentIteration>10?null:e.screen?e.screen:FullscreenImage.getScreenComponent(e.parent)},FullscreenImage.prototype.initialize=function(){FullscreenImage.getScreenComponentIteration=0,this.screenComponent=FullscreenImage.getScreenComponent(this.entity),this.updateSize(),window.addEventListener("resize",this.updateSize.bind(this))},FullscreenImage.prototype.updateSize=function(){var e=this.screenComponent.referenceResolution,n=this.screenComponent.scaleBlend,t=window.innerWidth,r=window.innerHeight;this.entity.element.width=pc.math.lerp(e.x,t/r*e.y,n),this.entity.element.height=pc.math.lerp(e.x*r/t,e.y,n)};var FadeScreen=pc.createScript("fadeScreen");FadeScreen.attributes.add("fadeScreenImage",{type:"entity"}),FadeScreen.instance=null,FadeScreen.prototype.initialize=function(){FadeScreen.instance=this,this.fadeTime=1,this.delay=0,this.onlyFadeOut=!1,this.action=null,this.time=0,this.fading=!1,this.state=0,this.fadeScreenImage.element.opacity=0,FadeScreen.instance.show(.9,0,!0,null)},FadeScreen.prototype.start=function(){this.fadeScreenImage.enabled=!0,this.onlyFadeOut?(this.state=2,this.fadeScreenImage.element.opacity=1,this.action&&this.action()):(this.state=1,this.fadeScreenImage.element.opacity=0)},FadeScreen.prototype.update=function(e){if(this.fading){if(this.delay>0)return this.delay-=e,void(this.delay<=0&&this.start());var t;this.time+=e,(t=this.time/this.fadeTime)>=1?(this.time=0,1==this.state?(this.fadeScreenImage.element.opacity=1,this.state=2,this.action&&this.action()):2==this.state&&(this.fadeScreenImage.element.opacity=0,this.fadeScreenImage.enabled=!1,this.state=0,this.fading=!1)):1==this.state?this.fadeScreenImage.element.opacity=t:2==this.state&&(this.fadeScreenImage.element.opacity=1-t)}},FadeScreen.prototype.show=function(e,t,i,a){this.fadeTime=e,this.delay=t,this.onlyFadeOut=i,this.action=a,this.time=0,this.fading=!0,0===this.delay&&this.start()};var Boost=pc.createScript("boost");Boost.attributes.add("prize",{type:"entity",title:"Booster Model"}),Boost.attributes.add("rays",{type:"entity",title:"Rays Sprite"}),Boost.attributes.add("Type",{type:"number",default:0,title:"Type"}),Boost.attributes.add("RotTimeZ",{type:"number",default:1,title:"Speed Time Z"}),Boost.attributes.add("RotAngZ",{type:"number",default:20,title:"Angle Rotate Z"}),Boost.attributes.add("RotTimeY",{type:"number",default:1,title:"Time Rotate Y"}),Boost.attributes.add("RotAngY",{type:"number",default:30,title:"Angle Rotate Y"}),Boost.attributes.add("DribAmp",{type:"number",default:.3,title:"Dribb"}),Boost.attributes.add("DribTime",{type:"number",default:.5,title:"Dribb Time"}),Boost.attributes.add("RaysAngleSpeed",{type:"number",default:120,title:"Rays Speed"}),Boost.attributes.add("Runner",{type:"entity",title:"Runner"}),Boost.prototype.initialize=function(){this.Quat=new pc.Quat,this.QuatBase=new pc.Quat,this.QuatRot=new pc.Quat;var t=this.prize.model.meshInstances[0].aabb.getMin(),i=this.prize.model.meshInstances[0].aabb.getMax();this.RadMax=Math.abs(t.z-i.z),this.RadMax<Math.abs(t.x-i.x)&&(this.RadMax=Math.abs(t.x-i.x)),this.RadMax=this.RadMax/2,this.RadZ=this.RadMax,this.RadY=Math.abs(t.y-i.y),this.Scale0=this.entity.getLocalScale().x},Boost.prototype.Create=function(t,i,e,s){this.X=t,this.Y=i,this.Z=e,this.Z_real=e,this.Z_backreal=this.Z_real-this.RadZ,this.Z_frontreal=this.Z_real+this.RadZ,this.Rail=s,this.entity.setPosition(this.X,this.Y-this.DribAmp/2,this.Z),this.AngleX0=0,this.AngleY0=0-this.RotAngY/2,this.AngleZ0=0-this.RotAngZ/2,this.Z_front=this.Z+this.RadMax,this.Z_back=this.Z-this.RadMax,this.entity.setEulerAngles(this.AngleX0,this.AngleY0,this.AngleZ0),this.RaysAngle=0,this.CoeffAngY=0,this.CoeffAngYSpeed=1/this.RotTimeY,this.CoeffDrib=0,this.CoeffDribSpeed=1/this.DribTime,this.CoeffAngZ=0,this.CoeffAngZSpeed=1/this.RotTimeZ,this.Next=null,this.Last=null,this.Class=3,this.CollideType=1,this.CollideFlag=!0,this.Master=null,this.shiftX=0,this.shiftY=0,this.shiftZ=0,this.ChildsFlag=!1,this.FarFlag=!0,this.Roller=null,this.MovingFlag=!1,this.rays.enabled=!0,this.entity.enabled=!0},Boost.prototype.setMoving=function(t,i){this.MovingSpeed=t,this.MovingAngleSpeed=t/this.app.RollRad*-180/Math.PI,this.MovingFlag=!0,this.DistRunner=Math.abs(this.Z_real+i-this.Runner.script.runner.Z),this.DistRunner0=this.DistRunner},Boost.prototype.updateZ=function(){this.Z=this.entity.getPosition().z,this.Z_front=this.Z+this.RadZ,this.Z_back=this.Z-this.RadZ},Boost.prototype.setRoller=function(t,i,e){this.Roller=t,this.entity.reparent(this.Roller.entity);var s=i/this.app.RollRad*180/Math.PI;this.AnglePlus=e/this.app.RollRad*180/Math.PI,this.RollerAngleX=this.Roller.Angle+s,this.RollerAngleX0=this.RollerAngleX,this.RollerRad=this.app.RollRad+this.Y,this.entity.setLocalPosition(this.X,Math.cos(Math.PI*this.RollerAngleX/180)*this.RollerRad,-Math.sin(Math.PI*this.RollerAngleX/180)*this.RollerRad),this.QuatBase.setFromEulerAngles(-this.RollerAngleX,0,0),this.entity.setLocalRotation(this.QuatBase),this.updateZ()},Boost.prototype.getYtop=function(){return this.Y+this.RadY},Boost.prototype.getYbott=function(){return this.Y-this.RadY},Boost.prototype.isEnabled=function(){return this.entity.enabled},Boost.prototype.DisableEntity=function(){this.entity.enabled=!1,void 0!==this.Roller&&this.entity.reparent(this.app.root)},Boost.prototype.freeFromRoller=function(){void 0!==this.Roller&&this.entity.reparent(this.app.root),this.Roller=null},Boost.prototype.P2EasingInOut=function(t){return(t*=2)<1?.5*t*t:-.5*(--t*(t-2)-1)},Boost.prototype.ShiftZ=function(t){this.entity.enabled&&(this.Z_real+=t,this.Z_frontreal=this.Z_real+this.RadZ,this.Z_backreal=this.Z_real-this.RadZ)},Boost.prototype.disableNotSeen=function(t){this.entity.enabled&&this.entity.getPosition().z-this.RadZ>t&&(this.entity.enabled=!1)},Boost.prototype.SetFree=function(){this.entity.enabled=!1},Boost.prototype.setToMaster=function(t,i,e,s){this.shiftX=i,this.shiftY=e,this.shiftZ=s,this.Master=t},Boost.prototype.updateBase=function(t,i,e){this.X=t+this.shiftX,this.Y=i+this.shiftY,this.Z=e+this.shiftZ,this.entity.setPosition(this.X,this.Y,this.Z)},Boost.prototype.StopMoving=function(){this.MovingFlag=!1},Boost.prototype.update=function(t){t*=Game.instance.slomo,this.MovingFlag&&(this.DistRunner-=this.app.currSpeedRunner*t,this.RollerAngleX=this.RollerAngleX0-(1-this.DistRunner/this.DistRunner0)*this.AnglePlus,this.entity.setLocalPosition(this.X,Math.cos(Math.PI*this.RollerAngleX/180)*this.RollerRad,-Math.sin(Math.PI*this.RollerAngleX/180)*this.RollerRad)),this.CoeffAngY+=this.CoeffAngYSpeed*t,this.CoeffAngY>1&&(this.CoeffAngYSpeed=-this.CoeffAngYSpeed,this.CoeffAngY=1),this.CoeffAngY<0&&(this.CoeffAngYSpeed=-this.CoeffAngYSpeed,this.CoeffAngY=0),this.CoeffAngZ+=this.CoeffAngZSpeed*t,this.CoeffAngZ>1&&(this.CoeffAngZSpeed=-this.CoeffAngZSpeed,this.CoeffAngZ=1),this.CoeffAngZ<0&&(this.CoeffAngZSpeed=-this.CoeffAngZSpeed,this.CoeffAngZ=0),this.prize.setEulerAngles(this.AngleX0,this.AngleY0+this.RotAngY*this.P2EasingInOut(this.CoeffAngY),this.AngleZ0+this.RotAngZ*this.P2EasingInOut(this.CoeffAngZ)),this.CoeffDrib+=this.CoeffDribSpeed*t,this.CoeffDrib>1&&(this.CoeffDribSpeed=-this.CoeffDribSpeed,this.CoeffDrib=1),this.CoeffDrib<0&&(this.CoeffDribSpeed=-this.CoeffDribSpeed,this.CoeffDrib=0),this.prize.setLocalPosition(0,-this.DribAmp/2+this.DribAmp*this.P2EasingInOut(this.CoeffDrib),0),this.RaysAngle+=this.RaysAngleSpeed*t,this.rays.setEulerAngles(0,0,this.RaysAngle)};pc.extend(pc,function(){var t=function(t){this._app=t,this._tweens=[],this._add=[]};t.prototype={add:function(t){return this._add.push(t),t},update:function(t){for(var i=0,e=this._tweens.length;i<e;)this._tweens[i].update(t)?i++:(this._tweens.splice(i,1),e--);this._add.length&&(this._tweens=this._tweens.concat(this._add),this._add.length=0)}};var i=function(t,i,e){pc.events.attach(this),this.manager=i,e&&(this.entity=null),this.time=0,this.complete=!1,this.playing=!1,this.stopped=!0,this.pending=!1,this.target=t,this.duration=0,this._currentDelay=0,this.timeScale=1,this._reverse=!1,this._delay=0,this._yoyo=!1,this._count=0,this._numRepeats=0,this._repeatDelay=0,this._from=!1,this._slerp=!1,this._fromQuat=new pc.Quat,this._toQuat=new pc.Quat,this._quat=new pc.Quat,this.easing=pc.EASE_LINEAR,this._sv={},this._ev={}},e=function(t){var i;return t instanceof pc.Vec2?i={x:t.x,y:t.y}:t instanceof pc.Vec3?i={x:t.x,y:t.y,z:t.z}:t instanceof pc.Vec4?i={x:t.x,y:t.y,z:t.z,w:t.w}:t instanceof pc.Quat?i={x:t.x,y:t.y,z:t.z,w:t.w}:t instanceof pc.Color?(i={r:t.r,g:t.g,b:t.b},void 0!==t.a&&(i.a=t.a)):i=t,i};i.prototype={to:function(t,i,n,s,r,h){return this._properties=e(t),this.duration=i,n&&(this.easing=n),s&&this.delay(s),r&&this.repeat(r),h&&this.yoyo(h),this},from:function(t,i,n,s,r,h){return this._properties=e(t),this.duration=i,n&&(this.easing=n),s&&this.delay(s),r&&this.repeat(r),h&&this.yoyo(h),this._from=!0,this},rotate:function(t,i,n,s,r,h){return this._properties=e(t),this.duration=i,n&&(this.easing=n),s&&this.delay(s),r&&this.repeat(r),h&&this.yoyo(h),this._slerp=!0,this},start:function(){var t,i,e,n;if(this.playing=!0,this.complete=!1,this.stopped=!1,this._count=0,this.pending=this._delay>0,this._reverse&&!this.pending?this.time=this.duration:this.time=0,this._from){for(t in this._properties)this._properties.hasOwnProperty(t)&&(this._sv[t]=this._properties[t],this._ev[t]=this.target[t]);this._slerp&&(this._toQuat.setFromEulerAngles(this.target.x,this.target.y,this.target.z),i=void 0!==this._properties.x?this._properties.x:this.target.x,e=void 0!==this._properties.y?this._properties.y:this.target.y,n=void 0!==this._properties.z?this._properties.z:this.target.z,this._fromQuat.setFromEulerAngles(i,e,n))}else{for(t in this._properties)this._properties.hasOwnProperty(t)&&(this._sv[t]=this.target[t],this._ev[t]=this._properties[t]);this._slerp&&(this._fromQuat.setFromEulerAngles(this.target.x,this.target.y,this.target.z),i=void 0!==this._properties.x?this._properties.x:this.target.x,e=void 0!==this._properties.y?this._properties.y:this.target.y,n=void 0!==this._properties.z?this._properties.z:this.target.z,this._toQuat.setFromEulerAngles(i,e,n))}return this._currentDelay=this._delay,this.manager.add(this),this},pause:function(){this.playing=!1},resume:function(){this.playing=!0},stop:function(){this.playing=!1,this.stopped=!0},delay:function(t){return this._delay=t,this.pending=!0,this},repeat:function(t,i){return this._count=0,this._numRepeats=t,this._repeatDelay=i||0,this},loop:function(t){return t?(this._count=0,this._numRepeats=1/0):this._numRepeats=0,this},yoyo:function(t){return this._yoyo=t,this},reverse:function(){return this._reverse=!this._reverse,this},chain:function(){for(var t=arguments.length;t--;)t>0?arguments[t-1]._chained=arguments[t]:this._chained=arguments[t];return this},update:function(t){if(this.stopped)return!1;if(!this.playing)return!0;if(!this._reverse||this.pending?this.time+=t*this.timeScale:this.time-=t*this.timeScale,this.pending){if(!(this.time>this._currentDelay))return!0;this._reverse?this.time=this.duration-(this.time-this._currentDelay):this.time=this.time-this._currentDelay,this.pending=!1}var i=0;(!this._reverse&&this.time>this.duration||this._reverse&&this.time<0)&&(this._count++,this.complete=!0,this.playing=!1,this._reverse?(i=this.duration-this.time,this.time=0):(i=this.time-this.duration,this.time=this.duration));var e,n,s=this.time/this.duration,r=this.easing(s);for(var h in this._properties)this._properties.hasOwnProperty(h)&&(e=this._sv[h],n=this._ev[h],this.target[h]=e+(n-e)*r);if(this._slerp&&this._quat.slerp(this._fromQuat,this._toQuat,r),this.entity&&(this.entity._dirtifyLocal(),this.element&&this.entity.element&&(this.entity.element[this.element]=this.target),this._slerp&&this.entity.setLocalRotation(this._quat)),this.fire("update",t),this.complete){var a=this._repeat(i);return a?this.fire("loop"):(this.fire("complete",i),this._chained&&this._chained.start()),a}return!0},_repeat:function(t){if(this._count<this._numRepeats){if(this._reverse?this.time=this.duration-t:this.time=t,this.complete=!1,this.playing=!0,this._currentDelay=this._repeatDelay,this.pending=!0,this._yoyo){for(var i in this._properties)tmp=this._sv[i],this._sv[i]=this._ev[i],this._ev[i]=tmp;this._slerp&&(this._quat.copy(this._fromQuat),this._fromQuat.copy(this._toQuat),this._toQuat.copy(this._quat))}return!0}return!1}};var n=function(t){return 1-s(1-t)},s=function(t){return t<1/2.75?7.5625*t*t:t<2/2.75?7.5625*(t-=1.5/2.75)*t+.75:t<2.5/2.75?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375};return{TweenManager:t,Tween:i,Linear:function(t){return t},QuadraticIn:function(t){return t*t},QuadraticOut:function(t){return t*(2-t)},QuadraticInOut:function(t){return(t*=2)<1?.5*t*t:-.5*(--t*(t-2)-1)},CubicIn:function(t){return t*t*t},CubicOut:function(t){return--t*t*t+1},CubicInOut:function(t){return(t*=2)<1?.5*t*t*t:.5*((t-=2)*t*t+2)},QuarticIn:function(t){return t*t*t*t},QuarticOut:function(t){return 1- --t*t*t*t},QuarticInOut:function(t){return(t*=2)<1?.5*t*t*t*t:-.5*((t-=2)*t*t*t-2)},QuinticIn:function(t){return t*t*t*t*t},QuinticOut:function(t){return--t*t*t*t*t+1},QuinticInOut:function(t){return(t*=2)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2)},SineIn:function(t){return 0===t?0:1===t?1:1-Math.cos(t*Math.PI/2)},SineOut:function(t){return 0===t?0:1===t?1:Math.sin(t*Math.PI/2)},SineInOut:function(t){return 0===t?0:1===t?1:.5*(1-Math.cos(Math.PI*t))},ExponentialIn:function(t){return 0===t?0:Math.pow(1024,t-1)},ExponentialOut:function(t){return 1===t?1:1-Math.pow(2,-10*t)},ExponentialInOut:function(t){return 0===t?0:1===t?1:(t*=2)<1?.5*Math.pow(1024,t-1):.5*(2-Math.pow(2,-10*(t-1)))},CircularIn:function(t){return 1-Math.sqrt(1-t*t)},CircularOut:function(t){return Math.sqrt(1- --t*t)},CircularInOut:function(t){return(t*=2)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)},BackIn:function(t){return t*t*(2.70158*t-1.70158)},BackOut:function(t){return--t*t*(2.70158*t+1.70158)+1},BackInOut:function(t){var i=2.5949095;return(t*=2)<1?t*t*((i+1)*t-i)*.5:.5*((t-=2)*t*((i+1)*t+i)+2)},BounceIn:n,BounceOut:s,BounceInOut:function(t){return t<.5?.5*n(2*t):.5*s(2*t-1)+.5},ElasticIn:function(t){var i,e=.1;return 0===t?0:1===t?1:(!e||e<1?(e=1,i=.1):i=.4*Math.asin(1/e)/(2*Math.PI),-e*Math.pow(2,10*(t-=1))*Math.sin((t-i)*(2*Math.PI)/.4))},ElasticOut:function(t){var i,e=.1;return 0===t?0:1===t?1:(!e||e<1?(e=1,i=.1):i=.4*Math.asin(1/e)/(2*Math.PI),e*Math.pow(2,-10*t)*Math.sin((t-i)*(2*Math.PI)/.4)+1)},ElasticInOut:function(t){var i,e=.1;return 0===t?0:1===t?1:(!e||e<1?(e=1,i=.1):i=.4*Math.asin(1/e)/(2*Math.PI),(t*=2)<1?e*Math.pow(2,10*(t-=1))*Math.sin((t-i)*(2*Math.PI)/.4)*-.5:e*Math.pow(2,-10*(t-=1))*Math.sin((t-i)*(2*Math.PI)/.4)*.5+1)}}}()),function(){pc.Application.prototype.addTweenManager=function(){this._tweenManager=new pc.TweenManager(this),this.on("update",function(t){this._tweenManager.update(t)})},pc.Application.prototype.tween=function(t){return new pc.Tween(t,this._tweenManager)},pc.Entity.prototype.tween=function(t,i){var e=this._app.tween(t);return e.entity=this,this.on("destroy",function(){e.stop()}),i&&i.element&&(e.element=i.element),e};var t=pc.Application.getApplication();t&&t.addTweenManager()}();// levels.js
var Levels = pc.createScript('levels');


Levels.attributes.add('Step', { type: 'number',  default: 40, title: "Step" });
Levels.attributes.add('StepBig', { type: 'number',  default: 150, title: "StepBig" });
Levels.attributes.add('StepMin', { type: 'number',  default: 10, title: "Step Min" });
Levels.attributes.add('StarStep', { type: 'number',  default: 6, title: "Star step" });
Levels.attributes.add('StarY', { type: 'number',  default: 2, title: "Star Y" });
Levels.attributes.add('SpeedMover', { type: 'number',  default: 50, title: "Speed Mover" });
Levels.attributes.add('StarAngStep', { type: 'number',  default: 30, title: "Star Ang Step" });
Levels.attributes.add('ObstLens', { type: 'number', array: true, title: 'Obstacles'});
Levels.attributes.add('MoveLens', { type: 'number', array: true, title: 'Movers'});
Levels.attributes.add('JumpDistMax', { type: 'number', default: 30,  title: 'Runner Jump Dist'});
Levels.attributes.add('Models', { type: 'entity', array: true, title: 'Models'});
//Levels.attributes.add('ModelSpan', {  type: 'number', default: 4, title: 'Models Road Span'});

// initialize code called once per entity
Levels.prototype.initialize = function() {
    
    this.Chunks = [];
    this.Levels = [];
    this.Level = null;
    this.LevelIndex = 0;
    
    // obstacles
    this.BARR0 = 0;
    this.TRAMP0 = 1;
    this.BARR1 = 2;
    this.BOCH0 = 3;
    
      // movers
    this.BUS0 = 0;
    this.TAXI0 = 1;
    this.AMB0 = 2;
    
      // stars
    this.STAR = 0;

     // boosters
    this.MAG = 0;
    this.SHOE = 1;
};

Levels.prototype.postInitialize  = function() {
    for(var i=0;i<this.Models.length;i++) {
        if(this.Models[i].script.levmod.Index>=0) {
            this.parseLevel(this.Models[i],this.Models[i].script.levmod.Index);
            this.Models[i].enabled = false;
        }
    }
};

Levels.prototype.prepareLevel  = function(lvl) {
    
    this.Level = this.getLevel(lvl);
    this.LevelIndex = 0;
    this.IndexChunk = this.Level.order[this.LevelIndex];
    this.currChunk = this.getChunk(this.IndexChunk);
    this.lastChunk = null;
    return this.currChunk;
};

Levels.prototype.parseLevel  = function(lvl,numLevel) {
    
    if(this.Chunks[numLevel]!==undefined) 
        return this.Chunks[numLevel];
    
    var chunk = {objs:[],length:0};
    this.Chunks[numLevel] = chunk;
    this.currObjs = chunk.objs;
    this.ID = 0;
    
     // out {len:0,}
    //ModelSpan
     var i,obj,z,dist,rail,dx,type,h,obst,num,shift,dir,duga,step,move,len,stars,stay;
     var xspan = 0;
     var Z0 = 0;
     var Z1 = undefined;
    
    for(i=0;i<lvl.children.length;i++) {
          obj = lvl.children[i];
          if(obj.name==='start') 
              Z0 = obj.getLocalPosition().z;
           if(obj.name==='end') 
              Z1 = obj.getLocalPosition().z;
    }
    
      
    chunk.length = 0;
    if(Z1!==undefined) 
        chunk.length = Math.abs(Z1-Z0); 
     

     for(i=0;i<lvl.children.length;i++) {
       
        obj = lvl.children[i];
         
         if(obj.name==='road') {
          //   var vecMin = obj.model.meshInstances[0].aabb.getMin();
           //  var vecMax = obj.model.meshInstances[0].aabb.getMax();  
            // chunk.length = Math.abs(vecMax.z - vecMin.z);
         //     console.log("parsed length "+chunk.length);
         }
         
         
         
         var clas = -1;
         if(obj.tags.has('obst')) clas = 0;
         if(obj.tags.has('mover')) clas = 1;
         if(obj.tags.has('star')) clas = 2;
         if(obj.tags.has('boost')) clas = 3;
         if(obj.name==='trigger') clas = 4;
         
         
         switch(clas) {
             case 0: // obstacle
                 rail = this.parseRail(obj);
               
                 //if()
                 dist = Math.abs(obj.getLocalPosition().z-Z0);
              
               
                 type = this.parseObstType(obj);
                 obst = this.addObstacle({dist:dist,type:type,rail:rail});
                
                 for(k=0;k<obj.children.length;k++) {
                     if(obj.children[k].tags.has('star')) {
                    
                         type = this.parseStarType(obj.children[k]);
                         num =  obj.children[k].script.starmod.Num;
                         step = obj.children[k].script.starmod.Step;
                         shift = obj.children[k].script.starmod.Shift;
                         duga = obj.children[k].script.starmod.Duga;
                         dir = obj.children[k].script.starmod.Dir;
                       
                         h = obj.children[k].script.starmod.HeightCoeff - 1;
                         
                         if(obj.children[k].script.starmod.DugaNum>0) {
                             duga = {fist:obj.children[k].script.starmod.DugaFirst,
                                    num:obj.children[k].script.starmod.DugaNum};
                         }
                        // parm:  type,num,step,dir,h,duga,shift
                         this.attachStarsToObst(obst,{type:type,num:num,step:step,dir:dir,h:h,duga:duga,shift:shift}); 
                     }
                     
                     if(obj.children[k].tags.has('boost')) {
                          //parm:  type,num,h,shift,
                           type = this.parseBoostType(obj.children[k]);
                           prob =  obj.children[k].script.boostmod.Prob;
                           shift =  obj.children[k].script.boostmod.Shift;
                           this.attachBoosterToObst(obst,{type:type,prob:prob,shift:shift}); 
                     }
                 }
                 break;
             case 1: // mover
                 dist = Math.abs(obj.getLocalPosition().z-Z0);
                 rail = this.parseRail(obj);
                 type = this.parseMoverType(obj);
                 speed = obj.script.movemod.Speed;
                 num = obj.script.movemod.Num;
                 len = this.MoveLens[type];
                 stay = 1; if(obj.script.movemod.Stay)  stay = 0;
                 
                 move = this.addMover({dist:dist,type:type,rail:rail,speed:speed*stay});
                 
                 for(k=1;k<num;k++) 
                     this.addMover({dist:(dist+k*len/2),type:type,rail:rail,speed:speed*stay});
                 
                 for(k=0;k<obj.children.length;k++) {
                     
                     if(obj.children[k].tags.has('mover')) {
                          
                         this.parsedMoverAdd(obj.children[k],
                                             dist+0.5*Math.abs(obj.children[k].getLocalPosition().x),
                                             rail,speed*stay);
                     }
                        
                     if(obj.children[k].tags.has('star')) {
                    
                         type = this.parseStarType(obj.children[k]);
                         num =  obj.children[k].script.starmod.Num;
                         step = obj.children[k].script.starmod.Step;
                         shift = obj.children[k].script.starmod.Shift;
                         duga = obj.children[k].script.starmod.Duga;
                         dir = obj.children[k].script.starmod.Dir;
                    
                         h = obj.children[k].script.starmod.HeightCoeff - 1;
                         
                         if(obj.children[k].script.starmod.DugaNum>0) {
                             duga = {fist:obj.children[k].script.starmod.DugaFirst,
                                    num:obj.children[k].script.starmod.DugaNum};
                         }
                        // parm:  type,num,step,dir,h,duga,shift
              
                         this.attachStarsToMover(move,{type:type,num:num,step:step,dir:dir,h:h,duga:duga,shift:shift}); 
                     }
                     
                     if(obj.children[k].tags.has('boost')) {
                          //parm:  type,num,h,shift,
                           type = this.parseBoostType(obj.children[k]);
                           prob =  obj.children[k].script.boostmod.Prob;
                           shift =  obj.children[k].script.boostmod.Shift;
                           this.attachBoosterToMover(move,{type:type,prob:prob,shift:shift}); 
                     }
                 }                 
                 
                 break;
             case 2:
                 dist = Math.abs(obj.getLocalPosition().z-Z0);
                 
                 rail = this.parseRail(obj);
                 type = this.parseStarType(obj);
                 
                  num =  obj.script.starmod.Num;
                  step = obj.script.starmod.Step;
                  duga = obj.script.starmod.Duga;
                  dir = obj.script.starmod.Dir;
      
                  h = obj.script.starmod.HeightCoeff - 1;
                 
                 if(obj.script.starmod.DugaNum>0) {
                      duga = {fist:obj.script.starmod.DugaFirst,
                              num:obj.script.starmod.DugaNum};
                  }
                 
                 stars = this.addStars({dist:dist,type:type,num:num,step:step,dir:dir,h:h,duga:duga,shift:0,rail:rail});
                 break;
             case 3:
                 dist = Math.abs(obj.getLocalPosition().z-Z0);
                 rail = this.parseRail(obj);
                 type = this.parseBoostType(obj);
                 
                 h =  obj.script.boostmod.HeightCoeff;
                 prob =  obj.script.boostmod.Prob;
                 
                 this.addBooster({dist:dist,rail:rail,type:type,h:h,prob:prob,shift:0});
                 //     var obj = {dist:parm.dist,clas:3,type:parm.type,rail:parm.rail,h:parm.h,len:0,end:parm.dist,id:this.getID()};
                 break;
             case 4:
                 // trigger
               //  console.log("trigger level z  "+obj.getLocalPosition().z);
                 dist = Math.abs(obj.getLocalPosition().z-Z0);
                 type = this.parseTriggerType(obj); 
                 this.addTrigger({dist:dist,type:type});
                 break;
                 
         }
     }
    
     var l = this.getObjectsMaxLength();
     if(l>chunk.length) chunk.length = l;
    
     return chunk;
   // obst = this.addObstacle({dist:dist,type:TRAMP0,rail:1});
     
};


Levels.prototype.parsedMoverAdd  = function(obj,dist0,rail,speed) {
    
               var type = this.parseMoverType(obj);
               var len = this.MoveLens[type];
               var shift;
           
               //  console.log("speed added "+speed);
     
                 var move = this.addMover({dist:dist0,type:type,rail:rail,speed:speed});
                 
                 for(var k=0;k<obj.children.length;k++) {
          
                     if(obj.children[k].tags.has('star')) {
                    
                         var typeStar = this.parseStarType(obj.children[k]);
                         var num =  obj.children[k].script.starmod.Num;
                         var step = obj.children[k].script.starmod.Step;
                         shift = obj.children[k].script.starmod.Shift;
                         var duga = obj.children[k].script.starmod.Duga;
                         var dir = obj.children[k].script.starmod.Dir;
                         var h = obj.children[k].script.starmod.HeightCoeff;
                         
                         if(obj.children[k].script.starmod.DugaNum>0) {
                             duga = {fist:obj.children[k].script.starmod.DugaFirst,
                                    num:obj.children[k].script.starmod.DugaNum};
                         }
                     
                         this.attachStarsToMover(move,{type:typeStar,num:num,step:step,
                                                 dir:dir,h:h,duga:duga,shift:shift}); 
                     }
                     
                     if(obj.children[k].tags.has('boost')) {
                          //parm:  type,num,h,shift,
                           var typeBoost = this.parseBoostType(obj.children[k]);
                           var prob =  obj.children[k].script.boostmod.Prob;
                           shift =  obj.children[k].script.boostmod.Shift;
                           this.attachBoosterToMover(move,{type:typeBoost,prob:prob,shift:shift}); 
                     }
                 }    
    
    return move;                
};


Levels.prototype.parseTriggerType  = function(obj) {
    
    if(obj.tags.has('jump'))  return 1;
    if(obj.tags.has('side'))  return 0;
    if(obj.tags.has('slide'))  return 2;
    if(obj.tags.has('jumpoff'))  return 3;
    return -1;
};

Levels.prototype.parseMoverType  = function(obj) {
    if(obj.name==='bus')  return this.BUS0;
    if(obj.name==='taxi')  return this.TAXI0;
    if(obj.name==='ambulance')  return this.AMB0;
    return 0;
};

Levels.prototype.parseBoostType  = function(obj) {
    if(obj.name==='magnet')  return this.MAG;
    if(obj.name==='shoe')  return this.SHOE;
    return 0;
};

Levels.prototype.parseStarType  = function(obj) {
    if(obj.name==='star')  return this.STAR;
    return 0;
};

Levels.prototype.parseObstType  = function(obj) {
      if(obj.name==='barrier0')  return this.BARR0;
      if(obj.name==='barrier1')  return this.BARR1;
      if(obj.name==='barrels0')  return this.BOCH0;
      if(obj.name==='tramp0')  return this.TRAMP0;
      return 0;
};

Levels.prototype.parseRail  = function(obj) {
    var dx = obj.getLocalPosition().x;
    var rail = 1;
    if(dx<-3) rail = 0;
    if(dx>3) rail = 2;
    return rail;
};

Levels.prototype.getNextChunk  = function() {
    this.LevelIndex++;
    if(this.LevelIndex>=this.Level.order.length) {
         this.LevelIndex = this.Level.loopStartIndex;
        // console.log("next loop "+this.LevelIndex);
    }
    this.IndexChunk = this.Level.order[this.LevelIndex];
    this.lastChunk = this.currChunk;
    this.currChunk = this.getChunk(this.IndexChunk);  
   
    return this.currChunk;
};

Levels.prototype.getCurrChunk  = function() {
    return this.currChunk;
};

Levels.prototype.getLevel  = function(lvl) {
    
                //console.log("getLevel");
                //console.log(Game.instance.showTutor);
    
   // this.parseLevel(this.Models[0]); // TEMP
    //lvl = 0;
    //return this.Levels[0];
    //
    //if(this.Levels[lvl]!==undefined)  return this.Levels[lvl];
    
    var level = {order:[],loopStartIndex:0,index:lvl};
    this.Levels[lvl] = level;
    
    /*switch(lvl) {
        case 0:*/
            level.order =  [200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219,107,105,104,103,102,101,108];
            this.shuffle(level.order);
    
            if (Game.instance.showTutor)
            {
                //level.order =  [1,2,3,200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219];//[1,2,3,107,105,104,103,102,101,108];
                //
                level.order.unshift(1,2,3);
                level.loopStartIndex = 2;
            } else
            {
                //level.order =  [200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219];//[1,2,107,106,107,106,107,105,104,103,102,101,108];//0,4,2,1,4,1];
                
               // level.order.sort(() => Math.random() - 0.5);
                
                level.loopStartIndex = 0;
            }
                
          //  break;
    //}  
    return level;
};

Levels.prototype.shuffle = function(array) {
  array.sort(() => Math.random() - 0.5);
};

Levels.prototype.getChunk  = function(n) {
    
   if(this.Chunks[n]!==undefined) 
        return this.Chunks[n];
    
    var BARR0 = this.BARR0;
    var TRAMP0 = this.TRAMP0;
    var BARR1 = this.BARR1;
    var BOCH0 = this.BOCH0;
    
    var BUS0 =  this.BUS0;
    var TAXI0 = this.TAXI0;
    var AMB0 =  this.AMB0;
    
    var STAR = this.STAR;

    var MAG = this.MAG;
    var SHOE = this.SHOE;
    
    var dist,obst,move,stars,min,tax,bus,barr,amb,stay;
        
    var chunk = {objs:[],length:0};
    this.Chunks[n] = chunk;
    this.currObjs = chunk.objs;
    this.ID = 0;
   
    var DistAdd = 0;
   
    switch(n) {
           
            
        case 100:
            dist = this.Step/2;
            stars = this.addStars({dist:dist,num:8,dir:1,rail:0,diag:[2,1, 3,2, 5,1, 6,0]});
            obst = this.addObstacle({dist:(this.fromStars(stars,1,0,0)),type:BARR0,rail:1});
            this.addObstacle({dist:(this.fromStars(stars,1,0,0)),type:BARR0,rail:0});
            
            dist += this.Step;
            stars = this.addStars({dist:dist,num:6,dir:1,rail:1,diag:[2,2, 4,1]});
            obst = this.addObstacle({dist:(this.fromStars(stars,1,0,0)),type:BARR0,rail:0}); 
            dist = obst.dist + this.StepMin;
        
            break;
        case 101:
            dist = this.Step;
            move = this.addMover({dist:dist,type:BUS0,rail:1,speed:0});
            move = this.addMover({dist:dist,type:AMB0,rail:2,speed:0});
            stars = this.addStars({dist:(dist+this.Step),num:4,rail:2});
            this.addStars({dist:(dist+this.Step+stars.len),num:4,rail:1});
            dist += 0.8*this.Step;
            this.addMover({dist:dist,type:AMB0,rail:0});
            
            dist +=  this.StepBig;
            move = this.addMover({dist:dist-2*this.Step,type:BUS0,rail:1,speed:0});
            move = this.addMover({dist:(move.dist-move.len),type:BUS0,rail:2,speed:0});
            
            obst = this.addObstacle({dist:dist,type:TRAMP0,rail:0});
            dist += obst.len/2;
            move = this.addMover({dist:dist,type:BUS0,speed:0,rail:0});
            dist = move.dist + move.len/2;
            
            move = this.addMover({dist:dist,type:BUS0,speed:0,rail:1});
            this.attachStarsToMover(move,{num:3,step:0.8}); 
            dist = move.dist +  move.len/2;
            move = this.addMover({dist:dist,type:BUS0,speed:0,rail:1});
            this.attachStarsToMover(move,{num:3,step:0.8}); 
            
        
            obst = this.addObstacle({dist:dist+this.StepMin,type:BARR0,rail:2});
            this.addStars({dist:obst.dist,num:3,dir:0,duga:true,rail:2});
            
           // this.fromMover(move,1,this.MoveLens[BUS0]/2)
            break;
        case 102:
            dist = this.Step; 
            
            obst = this.addObstacle({dist:dist,type:TRAMP0,rail:1});
            move = this.addMover({dist:dist+obst.len/2,type:BUS0,speed:0,rail:1});
            this.attachStarsToMover(move,{num:3,step:0.8}); 
            this.addMover({dist:move.dist,type:BUS0,speed:0,rail:0});
           
            obst = this.addObstacle({dist:move.dist,type:BARR0,rail:2});
            this.addStars({dist:obst.dist,num:3,dir:0,duga:true,rail:2});
            
            dist += (this.JumpDistMax + move.len/2); 
            move = this.addMover({dist:dist,type:BUS0,speed:0,rail:1});
            this.attachStarsToMover(move,{num:3,step:0.8}); 
            obst = this.addObstacle({dist:move.dist+move.len/2,type:BARR0,rail:0});
            this.addStars({dist:obst.dist,num:3,dir:0,duga:true,rail:0});
          
            dist +=  (this.JumpDistMax + move.len/2);  
            bus = this.addMover({dist:dist,type:BUS0,speed:0,rail:1});
            this.attachStarsToMover(bus,{num:3,step:0.8}); 
            tax = this.addMover({dist:dist,type:TAXI0,speed:0,cent:true,rail:2});
           // this.attachStarsToMover(tax,{num:1,step:0.8}); 
            
            dist +=  this.Step;//bus.len + this.StepMin; console.log("dist "+dist);
            obst = this.addObstacle({dist:dist,type:BOCH0,rail:0});
            this.addStars({dist:obst.dist,num:5,dir:0,duga:true,rail:0}); 
            
            break;
        case 103:
            dist = this.Step; 
            this.addMover({dist:dist,type:AMB0,speed:0,rail:2});
            obst = this.addObstacle({dist:dist,type:TRAMP0,rail:0});
            bus = this.addMover({dist:dist+obst.len/2,type:BUS0,speed:0,rail:0});
            bus = this.addMover({dist:bus.dist+bus.len/2,type:BUS0,speed:0,rail:0});
            
           // this.addStars({dist:bus.dist+this.Step,num:6,dir:0,duga:true,rail:0});
            this.addObstacle({dist:bus.dist+this.Step,type:BOCH0,rail:0});
            
            dist = bus.dist + bus.len/2 + this.JumpDistMax/2;
            bus = this.addMover({dist:dist,type:BUS0,rail:1});
            bus = this.addMover({dist:bus.dist+0.1*bus.len/2,type:BUS0,rail:1});
            this.attachStarsToMover(bus,{num:3,step:0.8}); 
            bus = this.addMover({dist:bus.dist+0*bus.len/2,type:BUS0,rail:1});
            this.attachStarsToMover(bus,{num:3,step:0.8}); 
            bus = this.addMover({dist:bus.dist+0*bus.len/2,type:BUS0,rail:1});
            this.attachStarsToMover(bus,{num:3,step:0.8}); 
            
            dist = bus.dist + bus.len;
            bus = this.addMover({dist:dist,type:BUS0,speed:0,rail:2});
            bus = this.addMover({dist:bus.dist+bus.len/2,type:BUS0,speed:0,rail:2});
            this.attachStarsToMover(bus,{num:7,step:0.8,duga:true}); 
            bus = this.addMover({dist:bus.dist+bus.len/2,type:BUS0,speed:0,rail:2});
            
            dist = bus.dist + this.JumpDistMax/2;
            bus = this.addMover({dist:dist,type:BUS0,rail:1});
            bus = this.addMover({dist:bus.dist+0*bus.len/2,type:BUS0,rail:1});
            this.attachStarsToMover(bus,{num:3,step:0.8}); 
            bus = this.addMover({dist:bus.dist+0*bus.len/2,type:BUS0,rail:1});
            this.attachStarsToMover(bus,{num:3,step:0.8}); 
            bus = this.addMover({dist:bus.dist+0*bus.len/2,type:BUS0,rail:1});
            this.attachStarsToMover(bus,{num:3,step:0.8}); 
            
            dist = bus.dist;
            bus = this.addMover({dist:dist,type:BUS0,speed:0,rail:2});
            bus = this.addMover({dist:bus.dist+bus.len/2,type:BUS0,speed:0,rail:2});
            
            dist = bus.dist + this.Step;
            this.addObstacle({dist:bus.dist+this.Step,type:BOCH0,rail:0});
            this.addStars({dist:bus.dist+this.Step,num:8,duga:true,dir:0,rail:0});
            
            dist += this.Step;
            bus = this.addMover({dist:dist,type:AMB0,speed:0,rail:1});
            
            
            break;
        case 104:
            dist = this.Step; 
            stars = this.addStars({dist:dist,num:3,dir:1,rail:2});
            obst = this.addObstacle({dist:stars.end+this.StarStep,type:BARR0,rail:2});
           
            dist += 1.3*this.Step;
            stars = this.addStars({dist:dist,num:3,dir:1,rail:1});
            obst = this.addObstacle({dist:stars.end+this.StarStep,type:BARR1,rail:1});
            
            dist = obst.dist + this.Step;
            obst = this.addObstacle({dist:dist,type:TRAMP0,rail:1});
            bus = this.addMover({dist:obst.end,type:BUS0,speed:0,rail:1});
            this.addMover({dist:obst.end,type:AMB0,speed:0,rail:0});
            
            dist = bus.dist + 0.5*this.JumpDistMax;
            bus = this.addMover({dist:dist,type:BUS0,rail:2});
            bus = this.addMover({dist:bus.dist,type:BUS0,rail:2});
            this.attachStarsToMover(bus,{num:5,step:0.8,shift:bus.len/2}); 
            bus = this.addMover({dist:bus.dist,type:BUS0,rail:2});
            bus = this.addMover({dist:bus.dist,type:BUS0,rail:2});
           
           // obst = this.addObstacle({dist:dist+2*bus.len,type:BARR1,rail:1});
            stay =  this.addMover({dist:dist+bus.len,type:AMB0,speed:0,rail:0});
            stay =  this.addMover({dist:stay.end,type:AMB0,speed:0,rail:0});
            
            dist = bus.dist + 0.3*this.JumpDistMax;
            bus = this.addMover({dist:dist,type:BUS0,rail:1});
            this.attachStarsToMover(bus,{num:3,step:0.8,shift:bus.len/2}); 
            bus = this.addMover({dist:bus.dist,type:BUS0,rail:1});
            obst = this.addObstacle({dist:dist+2*bus.len,type:BOCH0,rail:0});
            
            dist = bus.dist + this.JumpDistMax;
             bus = this.addMover({dist:dist,type:TAXI0,rail:2});
             this.attachStarsToMover(bus,{num:1,step:0.8,shift:0}); 
            
            dist += 0.5*this.StepBig;     
            stars = this.addStars({dist:dist,num:5,dir:0,duga:true,rail:1});
            obst = this.addObstacle({dist:stars.dist,type:BARR0,rail:1});
            
            obst = this.addObstacle({dist:stars.end+this.Step/2,type:BOCH0,rail:2});
            stars = this.addStars({dist:obst.dist,num:5,dir:0,duga:true,rail:2});
           
            
            stay = this.addMover({dist:dist-this.StepMin,type:BUS0,speed:0,rail:0});
            stay = this.addMover({dist:stay.end,type:BUS0,speed:0,rail:0});
            
         
            break;
            
        case 105:
            dist = this.Step; 
            obst = this.addObstacle({dist:dist,type:BARR0,rail:1});
            this.attachBoosterToObst(obst,{type:MAG}); 
            
            
            dist += this.Step;
            obst = this.addObstacle({dist:dist,type:TRAMP0,rail:2});
            this.addMover({dist:obst.end,type:BUS0,speed:0,rail:2});
            
            stay = this.addMover({dist:obst.end+this.JumpDistMax/2,type:BUS0,speed:0,rail:1});
            stay = this.addMover({dist:stay.end,type:BUS0,speed:0,rail:1});
            this.attachStarsToMover(stay,{num:3,step:0.8,shift:0}); 
            stay = this.addMover({dist:stay.end,type:BUS0,speed:0,rail:1});
           
            dist = stay.end - 2*stay.len;
            stars = this.addStars({dist:dist,num:6,dir:1,duga:false,rail:0});
            stars = this.addStars({dist:dist,num:6,dir:1,duga:false,rail:2});
            
            dist  = stay.end + 1.5*this.Step;
            obst = this.addObstacle({dist:dist,type:BARR1,rail:1});
            stars = this.addStars({dist:obst.dist,num:4,dir:0,duga:false,rail:1});
            stars = this.addStars({dist:obst.dist,num:4,dir:0,duga:false,rail:0});
            stars = this.addStars({dist:obst.dist,num:4,dir:0,duga:false,rail:2});
            
            
            dist =  stars.end + this.Step;
            bus = this.addMover({dist:dist,type:TAXI0,rail:1});
            this.attachStarsToMover(bus,{num:1,step:0.8,shift:0}); 
            bus = this.addMover({dist:bus.dist,type:TAXI0,rail:1});
            this.attachStarsToMover(bus,{num:1,step:0.8,shift:0}); 
            
            dist += this.Step;
            obst = this.addObstacle({dist:dist,type:TRAMP0,rail:0});
            this.addMover({dist:obst.end,type:BUS0,speed:0,rail:0});
            
            dist += this.JumpDistMax;
            stay = this.addMover({dist:dist,type:BUS0,speed:0,rail:0});
            this.attachStarsToMover(stay,{num:2,step:0.8,shift:0}); 
            stay = this.addMover({dist:stay.end,type:BUS0,speed:0,rail:0});
            
            dist = stay.dist + 0.5*this.JumpDistMax;
            stay = this.addMover({dist:dist,type:AMB0,speed:0,rail:0});
            this.attachStarsToMover(stay,{num:2,step:0.8,shift:0}); 
            
            dist =  stay.end + this.StepMin; 
            obst = this.addObstacle({dist:dist,type:BARR0,rail:1});
            stay = this.addMover({dist:obst.end,type:BUS0,speed:0,rail:2});
            
            break;
            
        case 106:
            dist = this.Step; 
            obst = this.addObstacle({dist:dist,type:BARR0,rail:1});
            this.attachBoosterToObst(obst,{type:SHOE}); 
            
            dist+=1.2*this.Step;
            stay = this.addMover({dist:dist,type:BUS0,speed:0,rail:0});
            stay = this.addMover({dist:stay.end,type:BUS0,speed:0,rail:0});
            
            this.addObstacle({dist:dist+stay.len/2,type:BARR1,rail:1});
            
            stay = this.addMover({dist:dist,type:BUS0,speed:0,rail:2});
            stay = this.addMover({dist:stay.end,type:BUS0,speed:0,rail:2});
            stay = this.addMover({dist:stay.end,type:BUS0,speed:0,rail:2});
            this.attachStarsToMover(stay,{num:5,step:0.8,shift:-0.25}); 
             
            dist+=this.Step;
            stay = this.addMover({dist:dist,type:BUS0,speed:0,rail:1});
            stay = this.addMover({dist:stay.end,type:BUS0,speed:0,rail:1});
            stay = this.addMover({dist:stay.end,type:BUS0,speed:0,rail:1});
            this.attachStarsToMover(stay,{num:3,step:0.8,shift:-0.25}); 
            
            dist = stay.end;
          //  stay = this.addMover({dist:dist-stay.len/2,type:BUS0,speed:0,rail:0});
           // stay = this.addMover({dist:stay.end,type:BUS0,speed:0,rail:0});
          //  stay = this.addMover({dist:stay.end,type:BUS0,speed:0,rail:0});
            
            this.addObstacle({dist:dist-stay.len/2,type:BARR0,rail:2});
            
            dist += 1.2*this.JumpDistMax;
            bus = this.addMover({dist:dist,type:BUS0,rail:2});
            this.attachStarsToMover(bus,{num:2,step:0.8,shift:0}); 
            bus = this.addMover({dist:bus.dist,type:BUS0,rail:2});
            this.attachStarsToMover(bus,{num:2,step:0.8,shift:0}); 
            
            
            dist = bus.end + this.Step;
            
            stay = this.addMover({dist:dist,type:AMB0,speed:0,rail:0});
            stay = this.addMover({dist:stay.end,type:AMB0,speed:0,rail:0});
            
            obst = this.addObstacle({dist:dist,type:BARR0,rail:1});
            stars = this.addStars({dist:obst.dist,num:5,dir:0,duga:true,rail:1});
            
            dist = stars.end + this.Step;
            stars = this.addStars({dist:dist,num:5,dir:1,duga:true,rail:2});
            obst = this.addObstacle({dist:stars.cent,type:BARR0,rail:2});
            break;
            
        case 107:
            dist = this.Step; 
            stay = this.addMover({dist:dist,type:BUS0,speed:0,rail:0});
            this.addMover({dist:stay.end,type:BUS0,speed:0,rail:0});
            
            obst = this.addObstacle({dist:dist,type:TRAMP0,front:true,rail:1});
            stay = this.addMover({dist:obst.end,type:BUS0,speed:0,rail:1});
          //  stay = this.addMover({dist:stay.end,type:BUS0,speed:0,rail:1});
        //    stay = this.addMover({dist:stay.end,type:BUS0,speed:0,rail:1});
            
            this.addMover({dist:dist+this.StepMin,type:BUS0,speed:0,rail:2});
            
            dist = stay.end + 0.7*this.JumpDistMax;
            bus = this.addMover({dist:dist,type:BUS0,rail:1});
            bus = this.addMover({dist:bus.dist,type:BUS0,rail:1});
            this.attachBoosterToMover(bus,{type:MAG,shift:0});
            bus = this.addMover({dist:bus.dist,type:BUS0,rail:1});
            
            dist = bus.end + 0.5*this.JumpDistMax;
            bus = this.addMover({dist:dist,type:BUS0,rail:1});
            bus = this.addMover({dist:bus.dist,type:BUS0,rail:1});
            this.attachStarsToMover(bus,{num:3,step:0.8,duga:false,shift:0}); 
            bus = this.addMover({dist:bus.dist,type:BUS0,rail:1});
            
            dist += bus.len;
            obst = this.addObstacle({dist:dist,type:BARR0,rail:0});
            stars = this.addStars({dist:obst.dist+2*this.StarStep,num:5,dir:1,duga:false,rail:0});
            stars = this.addStars({dist:obst.dist+2*this.StarStep,num:5,dir:1,duga:false,rail:2});
            
            dist = bus.end + 2*this.Step;
            obst = this.addObstacle({dist:dist,type:BARR1,rail:1});
            stars = this.addStars({dist:obst.dist,num:5,dir:1,duga:false,rail:0});
            stars = this.addStars({dist:obst.dist,num:5,dir:1,duga:false,rail:2});
            
            dist  += 1.3*this.Step;
            stay = this.addMover({dist:dist,type:BUS0,speed:0,rail:1});
            obst = this.addObstacle({dist:dist,type:BARR0,rail:0});
            obst = this.addObstacle({dist:dist,type:BOCH0,rail:2});
            stars = this.addStars({dist:obst.dist+this.StarStep,num:3,dir:1,duga:false,rail:2});
            
            break;
            
        case 108:
            dist = this.Step; 
            stars = this.addStars({dist:dist,num:9,dir:1,duga:false,step:1.2,rail:1,diag:[3,0,6,1]});
            obst = this.addObstacle({dist:stars.cent,type:BOCH0,rail:1});
            stay = this.addMover({dist:stars.cent+this.StepMin,type:AMB0,speed:0,rail:2});
            
            dist = stars.end + this.Step/2;
            obst = this.addObstacle({dist:dist,type:BARR0,rail:1});
            this.attachBoosterToObst(obst,{type:MAG});
            
            dist  =  obst.dist + this.Step;
            stars = this.addStars({dist:dist,num:4,dir:1,duga:false,rail:1});
            
            stay = this.addMover({dist:dist,type:BUS0,speed:0,rail:0});
            stay = this.addMover({dist:stay.end,type:BUS0,speed:0,rail:0});
            this.attachStarsToMover(stay,{num:5,step:0.8,shift:0}); 
            stay = this.addMover({dist:stay.end,type:BUS0,speed:0,rail:0});
            this.addObstacle({dist:stars.cent,type:BOCH0,rail:2});
        
            
            dist = stay.end + this.Step;
            obst = this.addObstacle({dist:dist,type:TRAMP0,rail:1});
            this.addMover({dist:dist+this.StepMin,type:AMB0,speed:0,rail:2});
            
            dist = obst.end + 0.7*this.JumpDistMax;
            bus = this.addMover({dist:dist,type:BUS0,rail:1});
            bus = this.addMover({dist:bus.dist,type:BUS0,rail:1});
            bus = this.addMover({dist:bus.dist,type:BUS0,rail:1});
            
            stars = this.addStars({dist:bus.dist-bus.len,num:4,dir:0,duga:false,rail:0});
            stars = this.addStars({dist:bus.dist-bus.len,num:4,dir:0,duga:false,rail:2});
            
            dist = bus.end + this.JumpDistMax;
            bus = this.addMover({dist:dist,type:TAXI0,rail:1});
            bus = this.addMover({dist:bus.end,type:TAXI0,rail:1});
            stars = this.addStars({dist:bus.dist-bus.len,num:3,dir:0,duga:false,rail:0});
            stars = this.addStars({dist:bus.dist-bus.len,num:3,dir:0,duga:false,rail:2});
            
            dist = bus.end + this.JumpDistMax;
            obst = this.addObstacle({dist:dist,type:TRAMP0,rail:0});
            stay = this.addMover({dist:obst.end,type:BUS0,speed:0,rail:0});
            
            dist = stay.end + this.JumpDistMax;
            bus = this.addMover({dist:dist,type:BUS0,rail:1});
            bus = this.addMover({dist:bus.dist,type:BUS0,rail:1});
            bus = this.addMover({dist:bus.dist,type:BUS0,rail:1});
            bus = this.addMover({dist:bus.dist,type:BUS0,rail:1});
            
            dist = bus.end;
            stay = this.addMover({dist:dist,type:BUS0,speed:0,rail:2});
            stay = this.addMover({dist:stay.end,type:BUS0,speed:0,rail:2});
            this.attachStarsToMover(stay,{num:5,step:0.8,shift:0}); 
            stay = this.addMover({dist:stay.end,type:BUS0,speed:0,rail:2});
            
            dist = stay.end;
            bus = this.addMover({dist:dist,type:TAXI0,rail:1});
            bus = this.addMover({dist:bus.dist,type:TAXI0,rail:1});
            
            dist = bus.end;
            stars = this.addStars({dist:dist,num:5,dir:1,duga:true,rail:0});
            obst = this.addObstacle({dist:stars.cent,type:BARR0,rail:0});
            
            dist = stars.end + this.Step;
            stay = this.addMover({dist:dist,type:AMB0,speed:0,rail:0});
            stay = this.addMover({dist:dist,type:AMB0,speed:0,rail:2});
            
            obst = this.addObstacle({dist:stay.end+this.Step,type:BARR0,rail:0});
            
            break;
        
        case 109:
            dist = this.Step; 
            
            obst = this.addObstacle({dist:dist,type:TRAMP0,rail:0});
            
            bus = this.addMover({dist:dist,type:BUS0,rail:1});
            bus = this.addMover({dist:bus.dist,type:BUS0,rail:1});
            bus = this.addMover({dist:bus.dist,type:BUS0,rail:1});
            
            dist+=this.Step;
                        obst = this.addObstacle({dist:dist,type:BARR0,rail:0});
            dist+=this.Step;
                        obst = this.addObstacle({dist:dist,type:BARR0,rail:0});
            dist+=this.Step;
                        obst = this.addObstacle({dist:dist,type:BARR0,rail:0});
            dist+=this.Step;
                        obst = this.addObstacle({dist:dist,type:BARR0,rail:0});
            dist+=this.Step;
                        obst = this.addObstacle({dist:dist,type:BARR0,rail:0});
            dist+=this.Step;
                        obst = this.addObstacle({dist:dist,type:BARR0,rail:0});
            dist+=this.Step;
                        obst = this.addObstacle({dist:dist,type:BARR0,rail:0});
            dist+=this.Step;
                        obst = this.addObstacle({dist:dist,type:BARR0,rail:0});
            dist+=this.Step;
                        obst = this.addObstacle({dist:dist,type:BARR0,rail:0});
            dist+=this.Step;
                        obst = this.addObstacle({dist:dist,type:BARR0,rail:0});
            dist+=this.Step;
                        obst = this.addObstacle({dist:dist,type:BARR0,rail:0});
            dist+=this.Step;
                        obst = this.addObstacle({dist:dist,type:BARR0,rail:0});
            dist+=this.Step;
                        obst = this.addObstacle({dist:dist,type:BARR0,rail:0});
            dist+=this.Step;
                        obst = this.addObstacle({dist:dist,type:BARR0,rail:0});
            dist+=this.Step;
                        obst = this.addObstacle({dist:dist,type:BARR0,rail:0});
            dist+=this.Step;
                        obst = this.addObstacle({dist:dist,type:BARR0,rail:0});
            dist+=this.Step;
                        obst = this.addObstacle({dist:dist,type:TRAMP0,rail:0});
            
            bus = this.addMover({dist:dist,type:BUS0,rail:1});
            bus = this.addMover({dist:bus.dist,type:BUS0,rail:1});
            bus = this.addMover({dist:bus.dist,type:BUS0,rail:1});
        
            dist = bus.end + this.Step;
            obst = this.addObstacle({dist:dist,type:BARR0,rail:2});
            dist+=this.Step;
                        obst = this.addObstacle({dist:dist,type:BARR0,rail:2});
            dist+=this.Step;
                        obst = this.addObstacle({dist:dist,type:BARR0,rail:2});
            dist+=this.Step;
                        obst = this.addObstacle({dist:dist,type:BARR0,rail:2});
            dist+=this.Step;
            
            break;
            
       /* case 0:
            dist = this.Step;
       
            
            stars = this.addStars({dist:dist,num:6,dir:1,rail:1,diag:[2,2, 4,1]});
            obst = this.addObstacle({dist:(this.fromStars(stars,1,0,0)),type:BARR0,rail:1});
            
            dist += 2*this.Step;
            obst = this.addObstacle({dist:dist,type:BARR0,rail:0});
            //this.attachStarsToObst(obst,{type:STAR,num:5,dir:0,duga:true}); 
            this.addStars({dist:dist,num:5,dir:0,duga:true,rail:0});
            
            dist += this.Step;
            obst = this.addObstacle({dist:dist,type:BOCH0,rail:1});
            this.attachBoosterToObst(obst,{type:MAG}); 
            obst = this.addObstacle({dist:dist,type:BOCH0,rail:0});
            this.addStars({dist:(this.fromObst(obst,-1,-this.StarStep)),num:5,dir:-1,rail:0});
            
            dist += this.Step;
            stars = this.addStars({dist:dist,num:5,rail:0});
         
            obst = this.addObstacle({dist:(this.fromStars(stars,1,this.StarStep,1)),type:BARR0,rail:0});
            
             move = this.addMover({dist:dist,type:TAXI0,rail:2});
            this.attachStarsToMover(move,{num:2}); 
            this.addMoverToMover(move,{dist:80,type:TAXI0,rail:2});
            dist += this.Step;
        
            this.addObstacle({dist:dist,type:BARR0,rail:1});
            dist += this.Step/2;
            this.addBooster({dist:dist,type:0,rail:0});
            dist += this.Step;
            this.addStars({dist:dist,num:3,duga:false,rail:1});
            dist += this.Step;
            this.addObstacle({dist:dist,type:BARR1,rail:1});
            dist += 2*this.Step;
            this.addObstacle({dist:dist,type:BARR0,rail:0});
            
            break;
         case 1:
            dist = this.Step*2;
            obst = this.addObstacle({dist:dist,type:BOCH0,rail:1});
            this.attachStarsToObst(obst,{type:STAR,num:1}); 
            dist += this.Step;
            obst = this.addObstacle({dist:dist,type:BARR0,rail:0});
            this.attachBoosterToObst(obst,{type:MAG}); 
            dist += this.Step;
            this.addStars({dist:dist,angStep:30,num:5,type:0,rail:1});
            
            move = this.addMover({dist:dist,type:TAXI0,rail:2});
            this.attachStarsToMover(move,{type:0,num:1,step:1,angstep:this.StarAngStep}); 
            
            dist += this.Step;
            this.addObstacle({dist:dist,type:BARR0,rail:0});
            this.addObstacle({dist:dist,type:BARR1,rail:1});
            dist += this.Step;
            this.addStars({dist:dist,angStep:30,num:5,type:0,rail:0});
            dist += 2*this.Step;
            this.addObstacle({dist:dist,type:BARR0,rail:0});
            dist += 2*this.Step;
            this.addObstacle({dist:dist,type:BARR0,rail:1});
            dist += this.Step/2;
            this.addBooster({dist:dist,type:1,rail:0});
            break;     
         case 2:
            dist = this.Step*2;
            obst = this.addObstacle({dist:dist,type:BOCH0,rail:2});
            this.attachStarsToObst(obst,{type:STAR,num:1}); 
            dist += this.Step;
            this.addStars({dist:dist,angStep:30,num:5,type:0,rail:0});
            dist += this.Step;
            obst = this.addObstacle({dist:dist,type:TRAMP0,rail:0});
            dist += this.ObstLens[obst.type]/2 + this.MoveLens[BUS0]/2;
            move = this.addMover({dist:dist,type:BUS0,speed:0,rail:0});
            
  
            move = this.addMover({dist:dist,type:BUS0,rail:1});
            this.attachStarsToMover(move,{type:0,num:2,step:1,angstep:this.StarAngStep}); 
            this.addMoverToMover(move,{dist:25,type:BUS0,rail:1});
            this.addMoverToMover(move,{dist:50,type:BUS0,rail:1});
            
            
            dist += this.Step;
            this.addObstacle({dist:dist,type:BARR0,rail:0});
            this.addObstacle({dist:dist,type:BARR0,rail:2});
            dist += 2*this.Step;
            this.addObstacle({dist:dist,type:1,rail:0});
            this.addStars({dist:dist,angStep:30,num:5,type:0,rail:1});
            dist += 2*this.Step;
            this.addObstacle({dist:dist,type:BARR0,rail:2});
            dist += this.Step/2;
            this.addBooster({dist:dist,type:1,rail:0});
            break; 
        case 3:
            dist = this.Step;
            move = this.addMover({dist:dist,type:BUS0,rail:0});
            this.attachStarsToMover(move,{type:0,num:2,step:1,angstep:this.StarAngStep}); 
            dist += this.Step;
            move = this.addMover({dist:dist,type:BUS0,rail:2});
            dist += this.Step;
            move = this.addMover({dist:dist,type:TAXI0,rail:1});
            this.attachStarsToMover(move,{type:0,num:1,step:1,angstep:this.StarAngStep}); 
            dist += 3*this.Step;
            move = this.addMover({dist:dist,type:TAXI0,rail:1});
             dist += 1*this.Step;
            move = this.addMover({dist:dist,type:TAXI0,rail:0});
            dist += 2*this.Step;
            move = this.addMover({dist:dist,type:TAXI0,rail:2});
            this.attachStarsToMover(move,{type:0,num:1,step:1,angstep:this.StarAngStep}); 
            break;
        case 4:
            dist = 0; 
           this.addBooster({dist:dist,type:0,rail:1});
            dist += this.Step;

            this.addObstacle({dist:dist,type:BARR0,rail:0});
            obst = this.addObstacle({dist:dist,type:TRAMP0,rail:1});
            this.addMover({dist:dist+this.Step*0.7,type:BUS0,rail:0,speed:0});
            dist += this.Step;
            obst = this.addObstacle({dist:dist,type:TRAMP0,rail:1});
            dist += this.Step;
            obst = this.addObstacle({dist:dist,type:TRAMP0,rail:1});           
            dist += this.Step;    
            
            var d = 2*this.Step;
            move = this.addMover({dist:d,type:BUS0,rail:2});
            this.attachStarsToMover(move,{num:3,step:1}); 
            move = this.addMover({dist:(d+10),type:BUS0,rail:2});
            this.attachStarsToMover(move,{num:3,step:1}); 
            move = this.addMover({dist:(d+20),type:BUS0,rail:2});
            this.attachStarsToMover(move,{num:3,step:1}); 
            move = this.addMover({dist:(d+30),type:BUS0,rail:2});
            this.attachStarsToMover(move,{num:3,step:1}); 
            
            break;
        case 5:
             dist = this.Step;
            this.addObstacle({dist:dist,type:BARR0,rail:1});
             dist += this.Step;
                        this.addObstacle({dist:dist,type:BARR0,rail:1});
             dist += this.Step;
                        this.addObstacle({dist:dist,type:BARR0,rail:1});
             dist += this.Step;
                        this.addObstacle({dist:dist,type:BARR0,rail:1});
             dist += this.Step;
                        this.addObstacle({dist:dist,type:BARR0,rail:1});
             dist += this.Step;
                        this.addObstacle({dist:dist,type:BARR0,rail:1});
             dist += this.Step;
                        this.addObstacle({dist:dist,type:BARR0,rail:1});
             dist += this.Step;
                        this.addObstacle({dist:dist,type:BARR0,rail:1});
             dist += this.Step;
                        this.addObstacle({dist:dist,type:BARR0,rail:1});
             dist += this.Step;
            
            d = this.Step*2;
            move = this.addMover({dist:d,type:BUS0,rail:2});
            this.attachStarsToMover(move,{type:0,num:3,step:1,angstep:this.StarAngStep}); 
            move = this.addMover({dist:this.fromMover(move,1,this.MoveLens[BUS0]/2),type:BUS0,rail:2});
            this.attachStarsToMover(move,{type:0,num:3,step:1,angstep:this.StarAngStep}); 
            move = this.addMover({dist:(d+2*this.MoveLens[BUS0]),type:BUS0,rail:2});
            this.attachStarsToMover(move,{type:0,num:3,step:1,angstep:this.StarAngStep}); 
            move = this.addMover({dist:(d+3*this.MoveLens[BUS0]),type:BUS0,rail:2});
            this.attachStarsToMover(move,{type:0,num:3,step:1,angstep:this.StarAngStep});  
            
            break;
        case 6:
            dist = this.Step*2;
            this.addStars({dist:dist,angStep:30,num:5,type:0,rail:1});
            this.addBooster({dist:dist,type:0,rail:2});
            
            dist += this.Step*2;
            obst = this.addObstacle({dist:dist,type:BARR0,rail:1});
            dist += this.Step;
            obst = this.addObstacle({dist:dist,type:BARR0,rail:0});
            dist += this.Step;
            this.addObstacle({dist:dist,type:BARR0,rail:0});
            this.addObstacle({dist:dist,type:BARR0,rail:1});
            dist += 2*this.Step;
            this.addObstacle({dist:dist,type:BARR0,rail:0});
            dist += 2*this.Step;
            this.addObstacle({dist:dist,type:BARR0,rail:1});
            break; */
    }
    
  //  console.log("level: " + n.toString());
    
    
    chunk.length = this.getObjectsMaxLength() + DistAdd;
    
    console.log("chunk.length  "+chunk.length);
    
    return chunk;
};


Levels.prototype.getID  = function() {
    this.ID++;
    return this.ID-1;
};

Levels.prototype.getID  = function() {
    this.ID++;
    return this.ID-1;
};

Levels.prototype.addObstacle = function(parm) {
    //parm:  dist,type,rail
      var d = parm.dist;
      if(parm.front!==undefined && parm.front)  d += this.ObstLens[parm.type]/2;
      if(parm.back!==undefined && parm.back)  d -= this.ObstLens[parm.type]/2;
      var end = d +   this.ObstLens[parm.type]/2;
    
      var obj = {dist:d,clas:0,type:parm.type,rail:parm.rail,len:this.ObstLens[parm.type],end:end,id:this.getID()};
      this.currObjs.push(obj);
      return obj;
};

/*
Levels.prototype.appendObst = function(papa,parm) {
    //parm:  dist,type
      var d = parm.dist + papa.dist;
      var obj = {dist:d,clas:0,type:parm.type,rail:papa.rail,len:this.ObstLens[parm.type],id:this.getID()};
      this.currObjs.push(obj);
      return obj;
}; */

Levels.prototype.attachStarsToObst  = function(papa,parm) {
     //parm:  type,num,step,dir,h,duga,shift
      if(papa.stars===undefined) papa.stars = [];
    
      var type = 0; if(parm.type!==undefined) type = parm.type;
      var step = this.StarStep;
      if(parm.step!==undefined) step = parm.step*this.StarStep;
    
      var dir = 1; if(parm.dir!==undefined) dir = parm.dir;
      var h = 0; if(parm.h!==undefined) h = parm.h;
      var duga = false; if(parm.duga!==undefined) duga = parm.duga; 
      var len = (parm.num-1)*step;
      var shift = 0; if(parm.shift!==undefined) shift = 0.5*this.ObstLens[papa.type]*parm.shift;
    
      papa.stars.push({type:type,num:parm.num,step:step,ang:parm.ang,shift:shift,
                       h:h,dir:dir,duga:duga,len:len});
      return  papa.stars;
};

Levels.prototype.attachBoosterToObst  = function(papa,parm) {
     //parm:  type,num,h,shift,
      var prob = 1;  if(parm.prob!==undefined) prob = parm.prob;
      var shift = 0; if(parm.shift!==undefined) shift = 0.5*this.ObstLens[papa.type]*parm.shift;
      
      papa.booster = {type:parm.type,h:parm.h,shift:shift,len:0,prob:prob};
      return  papa.booster;
};

Levels.prototype.addStars = function(parm) {
    //parm:  dist,num, angstep, type,rail
      var type = 0; if(parm.type!==undefined) type = parm.type;
      var step = this.StarStep;
      if(parm.step!==undefined) step = parm.step*this.StarStep;
      var dir = 1; if(parm.dir!==undefined) dir = parm.dir;
      var h = 0; if(parm.h!==undefined) h = parm.h;
      var duga = null; if(parm.duga!==undefined) duga = parm.duga; 
      var diag = false; if(parm.diag!==undefined)  diag = parm.diag;
      var len = (parm.num-1)*step;
      
      var end = parm.dist + len;
      if(dir===0) end = parm.dist + len/2;
      if(dir<0)  end = parm.dist;
    
      var cent =   parm.dist + len/2;
      if(dir===0) end = parm.dist - len/2;
      if(dir<0)  end = parm.dist + len/2;
    
      var obj = {dist:parm.dist,clas:2,type:type,num:parm.num,rail:parm.rail,
                 angstep:0,h:h,step:step,duga:duga,dir:dir,diag:diag,len:len,
                 end:end,cent:cent,shift:0,id:this.getID()};
      this.currObjs.push(obj);
      return obj;
};

Levels.prototype.fillStars = function(parm) {
   
      var step = this.StarStep;
      if(parm.step!==undefined) step = parm.step*this.StarStep;
      var num =  Math.ceil(parm.len/step);
      if(num===0)  num = 1;
      parm.num = num;
      return this.addStars(parm);
};

Levels.prototype.fromStars  = function(stars,dir,add,radCoeff) {
    var dist = stars.dist;
    
    if(stars.dir>0) dist = stars.dist + stars.num*stars.step/2;
    if(stars.dir<0) dist = stars.dist - stars.num*stars.step/2; 
    
    return dist + radCoeff*dir*stars.num*stars.step/2 + add;
};

Levels.prototype.setDuga = function(parm,duga) {
    //  example duga{first:1,num:5,h:1}
    var stars = this.addStars(parm);
    stars.duga = duga;
    return stars;
};

Levels.prototype.getStarsDist = function(stars) {
    if(stars.dir===1) return stars.num*stars.step;
    if(stars.dir===0) return stars.num*stars.step/2;
    return stars.step/2;
};

/*
Levels.prototype.appendStar = function(papa,parm) {
    // parm:  dist,type,num,h,ang
      var d = parm.dist + papa.dist;
      var obj = {clas:2,dist:d,type:parm.type,rail:papa.rail,ang:parm.ang,h:parm.h,diag:null,id:this.getID()};
      this.currObjs.push(obj);
      return obj;
}; */


Levels.prototype.addMover  = function(parm) {
      //parm:  dist,type,rail
      var d = parm.dist + this.MoveLens[parm.type]/2;
      if(parm.cent!==undefined && parm.cent)  d -= this.MoveLens[parm.type]/2;
      if(parm.back!==undefined && parm.back)  d += this.MoveLens[parm.type]/2;
      var end = d + this.MoveLens[parm.type]/2;
    
      var speed = this.SpeedMover; if(parm.speed!==undefined) speed = this.SpeedMover*parm.speed;
      var dist = d;// + speed*(this.app.SpawnZ/this.app.SpeedRunner);
      var obj = {clas:1,dist:dist,type:parm.type,rail:parm.rail,speed:speed,len:this.MoveLens[parm.type],end:end,id:this.getID()};
      this.currObjs.push(obj);
      return obj;
};

/*
Levels.prototype.addMoverToMover  = function(papa,parm) {
      //parm:  dist,type,rail
      var speed = this.SpeedMover; if(parm.speed!==undefined) speed = parm.speed;
      var d = parm.dist + papa.dist;
      if(papa.movers===undefined) papa.movers = [];
      var obj = {clas:1,dist:d,type:parm.type,rail:parm.rail,speed:speed,id:this.getID()};
      papa.movers.push(obj);
      return obj;
}; */

/*
Levels.prototype.appendMover = function(papa,parm) {
    //parm:  dist,type
      var speed = this.SpeedMover; if(parm.speed!==undefined) speed = parm.speed;
      var d = parm.dist + papa.dist;
      var obj = {dist:d,clas:1,type:parm.type,rail:papa.rail,speed:speed,mid:this.getID()};
      this.currObjs.push(obj);
      return obj;
}; */

Levels.prototype.addBooster = function(parm) {
    //parm:  dist,type,rail
      var prob = 1;  if(parm.prob!==undefined) prob = parm.prob;
      var shift = 0; if(parm.shift!==undefined) shift = parm.shift;
      var obj = {dist:parm.dist,clas:3,type:parm.type,rail:parm.rail,h:parm.h,len:0,end:parm.dist,prob:prob,shift:shift,id:this.getID()};
      this.currObjs.push(obj);
      return obj;
};

Levels.prototype.addTrigger = function(parm) {
    //parm:  dist,type,rail
      var obj = {dist:parm.dist,clas:4,type:parm.type,len:0,rail:0};
      this.currObjs.push(obj);
      return obj;
};

Levels.prototype.getObjectsMaxLength = function() {
    if(this.currObjs.length===0)  return 0;
    var max = this.currObjs[0].dist + this.currObjs[0].len/2;
    for(var i=1;i<this.currObjs.length;i++) 
        if((this.currObjs[i].dist+this.currObjs[i].len/2)>max) 
            max = this.currObjs[i].dist + this.currObjs[i].len/2;
    return max;
};

Levels.prototype.attachStarsToMover  = function(papa,parm) {
     //parm:  type,num,step,angstep
      if(papa.stars===undefined) papa.stars = [];
      var type = 0; if(parm.type!==undefined) type = parm.type;
      var step = this.StarStep;
      if(parm.step!==undefined) step = parm.step*this.StarStep;
    
      var dir = 1; if(parm.dir!==undefined) dir = parm.dir;
      var h = 0; if(parm.h!==undefined) h = parm.h;
      var duga = false; if(parm.duga!==undefined) duga = parm.duga; 
      var len = (parm.num-1)*step;
      var shift = 0; if(parm.shift!==undefined) shift = 0.5*this.MoveLens[papa.type]*parm.shift;
   
      papa.stars.push({type:type,num:parm.num,step:step,angstep:parm.angstep,h:h,
                       shift:shift,duga:duga,dir:dir,len:len,diag:null});
      return  papa.stars;
};


Levels.prototype.attachBoosterToMover  = function(papa,parm) {
      var prob = 1;  if(parm.prob!==undefined) prob = parm.prob;
      var shift = 0; if(parm.shift!==undefined) shift = 0.5*this.MoveLens[papa.type]*parm.shift;
      papa.booster = {type:parm.type,h:parm.h,shift:shift,prob:prob};
      return  papa.booster;
};

Levels.prototype.fromObst  = function(obst,dir,add) {
    return obst.dist + this.ObstLens[obst.type]*dir/2 + add;
};

Levels.prototype.fromMover  = function(move,dir,add) {
    return move.dist + this.MoveLens[move.type]*dir/2 + add;
};


var Butt=pc.createScript("butt");Butt.attributes.add("hoverAsset",{type:"asset",assetType:"texture"}),Butt.attributes.add("activeAsset",{type:"asset",assetType:"texture"}),Butt.prototype.initialize=function(){this.originalTexture=this.entity.element.textureAsset,this.hovered=!1,this.entity.element.on("mouseenter",this.onEnter,this),this.entity.element.on("mousedown",this.onPress,this),this.entity.element.on("mouseup",this.onRelease,this),this.entity.element.on("mouseleave",this.onLeave,this),this.entity.element.on("touchstart",this.onPress,this),this.entity.element.on("touchend",this.onRelease,this),this.CallBack=null,this.CallBackContex=null},Butt.prototype.setCallBack=function(t,e){this.CallBack=t,this.CallBackContex=e},Butt.prototype.onEnter=function(t){this.hovered=!0,t.element.textureAsset=this.hoverAsset,document.body.style.cursor="pointer"},Butt.prototype.onLeave=function(t){this.hovered=!1,t.element.textureAsset=this.originalTexture,document.body.style.cursor="default"},Butt.prototype.onPress=function(t){t.element.textureAsset=this.activeAsset,null!==this.CallBack&&this.CallBack.call(this.CallBackContex)},Butt.prototype.onRelease=function(t){t.element.textureAsset=this.hovered?this.hoverAsset:this.originalTexture};var Menu=pc.createScript("menu");Menu.attributes.add("buttPlay",{type:"entity",title:"Button Play"}),Menu.attributes.add("best",{type:"entity",title:"Best"}),Menu.attributes.add("finger",{type:"entity"}),Menu.prototype.initialize=function(){this.State=0,js_GS_gameReady(),this.finger.tween(this.finger.getLocalScale()).to(new pc.Vec3(1.15,1.15,1.15),1.5,pc.SineInOut).loop(!0).yoyo(!0).start(),this.onEnable(),this.on("enable",this.onEnable,this)},Menu.prototype.onEnable=function(){Base.instance.GMenu.enabled=!1},Menu.prototype.Revive=function(){this.State=0,this.entity.enabled=!0},Menu.prototype.postInitialize=function(){},Menu.prototype.OnButtPlay=function(){0===this.State&&(this.app.fire("game:play"),this.State=1)},Menu.prototype.update=function(t){this.best.element.text=this.app.ScoreBest.toString()};var Result=pc.createScript("result");Result.attributes.add("buttClose",{type:"entity",title:"Button Close"}),Result.attributes.add("ScoreText",{type:"entity",title:"Score Text"}),Result.attributes.add("BestText",{type:"entity",title:"Best Text"}),Result.attributes.add("ContAnim",{type:"entity",title:"ContAnim"}),Result.instance=null,Result.prototype.initialize=function(){Result.instance=this,this.ContAnim.tween(this.ContAnim.getLocalScale()).to(new pc.Vec3(1.1,1.1,1.1),1.65,pc.CubicInOut).loop(!0).yoyo(!0).start(),this.onEnable(),this.on("enable",this.onEnable,this)},Result.prototype.onEnable=function(){js_GS_levelCompleted(0)},Result.prototype.postInitialize=function(){},Result.prototype.Revive=function(t){this.entity.enabled=!0,this.State=0,this.ScoreText.element.text=t+""},Result.prototype.OnButtClose=function(){0===this.State&&(Game.instance.saveGame(),this.app.fire("game:mmenu"),this.State=1)},Result.prototype.update=function(t){this.BestText.element.text=this.app.ScoreBest.toString()};var Gmenu=pc.createScript("gmenu");Gmenu.attributes.add("buttBack",{type:"entity",title:"Button Back"}),Gmenu.attributes.add("ScoreText",{type:"entity",title:"Score Text"}),Gmenu.attributes.add("DistText",{type:"entity",title:"Dist Text"}),Gmenu.attributes.add("stars",{type:"entity",title:"stars"}),Gmenu.prototype.initialize=function(){},Gmenu.prototype.postInitialize=function(){},Gmenu.prototype.setScreen=function(){this.buttBack.setLocalPosition(this.app.innerWidth/2-100,this.app.innerHeight/2-50,0),this.DistText.setLocalPosition(-this.app.innerWidth/2+100,this.app.innerHeight/2-50,0),this.ScoreText.setLocalPosition(0,this.app.innerHeight/2-100,0)},Gmenu.prototype.Revive=function(){this.entity.enabled=!0,this.State=0,this.Score=0,this.Dist=0,this.ScoreText.element.text=this.Score+""},Gmenu.prototype.OnButtBack=function(){0===this.State&&(this.app.fire("game:mmenu"),this.State=1)},Gmenu.prototype.updateStars=function(){this.stars.element.text=Game.instance.stars.toString()},Gmenu.prototype.update=function(t){this.stars.element.text=Game.instance.stars.toString()};var Roller=pc.createScript("roller");Roller.attributes.add("Builds",{type:"entity",array:!0,title:"Buildings"}),Roller.attributes.add("RoadBase",{type:"entity",title:"Road Base"}),Roller.attributes.add("ConcreteBase",{type:"entity",title:"Concrete Base"}),Roller.attributes.add("ConcreteDown",{type:"number",default:.3,title:"Concrete Down"}),Roller.attributes.add("BuildsDown",{type:"number",default:1,title:"Buildings Down"}),Roller.attributes.add("Z_dead",{type:"number",default:15,title:"Z dead"}),Roller.attributes.add("AngDead",{type:"number",default:20,title:"Angle Dead"}),Roller.attributes.add("RoadCoeff",{type:"number",default:.99,title:"Road Coeff"}),Roller.attributes.add("AngRoadMax",{type:"number",default:20,title:"Angle Road Max"}),Roller.attributes.add("AngBuildMax",{type:"number",default:30,title:"Angle Build Max"}),Roller.attributes.add("Z_far",{type:"number",default:-300,title:"Z seen"}),Roller.prototype.initialize=function(){},Roller.prototype.Create=function(t){for(var s=0;s<this.Builds.length;s++)this.Builds[s].reparent(this.entity),this.Builds[s].enabled=!1;this.SecCntr=0,this.Roads=[],this.Concrets=[],this.Rad=this.app.RollRad,this.RadConcrete=this.app.RollRad-this.ConcreteDown,this.RadBuilds=this.app.RollRad-this.BuildsDown,this.Angle0=t,this.Angle=this.Angle0,this.entity.setEulerAngles(this.Angle,0,0),this.entity.setPosition(0,-this.Rad,0);var i=this.RoadBase.model.meshInstances[0].aabb.getMin(),e=this.RoadBase.model.meshInstances[0].aabb.getMax();this.RoadLength=this.RoadCoeff*Math.abs(e.z-i.z),this.AngStepRoad=180*Math.asin(this.RoadLength/this.Rad)/Math.PI,this.RadAttach=Math.cos(Math.PI*this.AngStepRoad/180)*this.Rad;for(var a=0;Math.abs(a)<this.AngRoadMax;){var d=this.RoadBase.clone(),l=this.ConcreteBase.clone();this.entity.addChild(d),this.entity.addChild(l),this.Roads.push(d),this.Concrets.push(l),d.setLocalPosition(0,Math.cos(Math.PI*a/180)*this.Rad,-Math.sin(Math.PI*a/180)*this.Rad),d.setLocalEulerAngles(-a,0,0),l.setLocalPosition(0,Math.cos(Math.PI*a/180)*this.RadConcrete,-Math.sin(Math.PI*a/180)*this.RadConcrete),l.setLocalEulerAngles(-a,0,0),a+=this.AngStepRoad,d.enabled=!0,l.enabled=!0}for(s=0;s<this.Builds.length;s++)this.Builds[s].script.build.doBend(this.Rad);this.Revive()},Roller.prototype.Revive=function(){this.Angle=this.Angle0,this.entity.setEulerAngles(this.Angle,0,0),this.entity.enabled=!0,this.RoadBase.enabled=!1,this.ConcreteBase.enabled=!1;for(var t=0,s=0;s<this.Roads.length;s++){var i=this.Roads[s];i.setLocalPosition(0,Math.cos(Math.PI*t/180)*this.Rad,-Math.sin(Math.PI*t/180)*this.Rad),i.setLocalEulerAngles(-t,0,0);var e=this.Concrets[s];e.setLocalPosition(0,Math.cos(Math.PI*t/180)*this.RadConcrete,-Math.sin(Math.PI*t/180)*this.RadConcrete),e.setLocalEulerAngles(-t,0,0),t+=this.AngStepRoad}for(this.RoadIndex=0,this.AngleRoadLast=t-this.AngStepRoad,s=0;s<this.Builds.length;s++)this.Builds[s].enabled=!1;Math.abs(this.Angle/this.AngStepRoad);for(this.entity.setPosition(0,-this.Rad,0),this.BuildIndex=0,t=0,this.BuildFirstIndex=0,this.BuildLastIndex=-1,s=0;s<this.Builds.length;s++)if(t<this.AngBuildMax){if(this.BuildLastIndex<0)this.Builds[s].setLocalPosition(0,Math.cos(Math.PI*t/180)*this.RadBuilds,-Math.sin(Math.PI*t/180)*this.RadBuilds),this.Builds[s].script.build.setLocalAngle(t);else{var a=this.Builds[this.BuildLastIndex].script.build.AngleLocal+this.Builds[this.BuildLastIndex].script.build.BendAngle;this.Builds[s].setLocalPosition(0,Math.cos(Math.PI*a/180)*this.RadBuilds,-Math.sin(Math.PI*a/180)*this.RadBuilds),this.Builds[s].script.build.setLocalAngle(a)}t+=this.Builds[s].script.build.BendAngle,this.Builds[s].enabled=!0,this.BuildLastIndex=s,this.Builds[s].script.build.HideTooFarObjects(this.Z_far)}this.AngleBuildsCntr=t,this.AngleBuildHeadCntr=this.Builds[this.BuildFirstIndex].script.build.BendAngle,this.SecCntr=1},Roller.prototype.addObj=function(t,s,i){t.setRoller(this.entity,s,i)},Roller.prototype.update=function(t){if(t*=Game.instance.slomo,this.app.RunFlag){if(this.Angle+=this.app.RollerSpeed*t,this.Angle>360&&(this.Angle-=360),this.entity.setEulerAngles(this.Angle,0,0),this.AngleBuildHeadCntr-=this.app.RollerSpeed*t,this.AngleBuildHeadCntr<=0&&(this.Builds[this.BuildFirstIndex].enabled=!1,this.BuildFirstIndex++,this.BuildFirstIndex>=this.Builds.length&&(this.BuildFirstIndex=1),this.AngleBuildHeadCntr+=this.Builds[this.BuildFirstIndex].script.build.BendAngle),this.AngleBuildsCntr-=this.app.RollerSpeed*t,this.AngleBuildsCntr<this.AngBuildMax){var s=this.Builds[this.BuildLastIndex].script.build.AngleLocal+this.Builds[this.BuildLastIndex].script.build.BendAngle;this.BuildLastIndex++,this.BuildLastIndex>=this.Builds.length&&(this.BuildLastIndex=1),this.Builds[this.BuildLastIndex].setLocalPosition(0,Math.cos(Math.PI*s/180)*this.RadBuilds,-Math.sin(Math.PI*s/180)*this.RadBuilds),this.Builds[this.BuildLastIndex].script.build.setLocalAngle(s),this.AngleBuildsCntr+=this.Builds[this.BuildLastIndex].script.build.BendAngle,this.Builds[this.BuildLastIndex].enabled=!0,this.Builds[this.BuildLastIndex].script.build.HideTooFarObjects(this.Z_far)}if(this.Roads[this.RoadIndex].getPosition().z>this.Z_dead&&(this.AngleRoadLast+=this.AngStepRoad,this.Roads[this.RoadIndex].setLocalPosition(0,Math.cos(Math.PI*this.AngleRoadLast/180)*this.Rad,-Math.sin(Math.PI*this.AngleRoadLast/180)*this.Rad),this.Roads[this.RoadIndex].setLocalEulerAngles(-this.AngleRoadLast,0,0),this.Concrets[this.RoadIndex].setLocalPosition(0,Math.cos(Math.PI*this.AngleRoadLast/180)*this.RadConcrete,-Math.sin(Math.PI*this.AngleRoadLast/180)*this.RadConcrete),this.Concrets[this.RoadIndex].setLocalEulerAngles(-this.AngleRoadLast,0,0),this.AngleRoadLast>360&&(this.AngleRoadLast-=360),this.RoadIndex++,this.RoadIndex>=this.Roads.length&&(this.RoadIndex=0)),(this.SecCntr-=t)<0){this.SecCntr=.5;for(var i=0;i<this.Builds.length;i++)this.Builds[i].enabled&&this.Builds[i].script.build.HideTooFarObjects(this.Z_far)}}};var Build=pc.createScript("build");Build.prototype.initialize=function(){var t;this.Quat=new pc.Quat,this.Quat2=new pc.Quat,this.Vec3=new pc.Vec3(0,0,0),this.Length=0,this.LengthMax=0,this.FreeFlag=!0,this.BendAngle=0,this.BendedFlag=!1,this.SkewedFlag=!1,void 0!==this.entity.model&&(this.entity.model.meshInstances[0].visible=!1);for(var e=this.entity.children,i=-1,o=-1,n=0;n<e.length;n++){(t=e[n]).prop={zfront:0,zback:0,h:0,dist:0};var a=this.getZdistOfEntity(t);t.prop.z=t.getLocalPosition().z,t.prop.radZ=a/2,t.prop.zback=t.prop.z-t.prop.radZ,t.prop.zfront=t.prop.z+t.prop.radZ,t.prop.angles=t.getEulerAngles(),t.prop.active=!0,0===a&&(t.prop.active=!1),i<0?i=n:e[i].prop.zback>e[n].prop.zback&&(i=n),o<0?o=n:e[o].prop.zfront<e[n].prop.zfront&&(o=n)}i>=0&&(this.Length=Math.abs(e[o].prop.zfront-e[i].prop.zback))},Build.prototype.getZdistOfEntity=function(t){var e,i,o,n=0;if(void 0!==t.model)for(o=0;o<t.model.meshInstances.length;o++)e=t.model.meshInstances[o].aabb.getMin(),i=t.model.meshInstances[o].aabb.getMax(),Math.abs(i.z-e.z)>n&&(n=Math.abs(i.z-e.z));if(void 0!==t.children)for(o=0;o<t.children.length;o++)if(void 0!==t.children[o].model&&null!==t.children[o].model.meshInstances)for(var a=0;a<t.children[o].model.meshInstances.length;a++)e=t.children[o].model.meshInstances[a].aabb.getMin(),i=t.children[o].model.meshInstances[a].aabb.getMax(),Math.abs(i.z-e.z)>n&&(n=Math.abs(i.z-e.z));return n},Build.prototype.HideTooFarObjects=function(t){for(var e,i=this.entity.children,o=0;o<i.length;o++)void 0!==(e=i[o]).model&&e.prop.active&&(e.getPosition().z+e.prop.radZ>t?e.model.show():e.model.hide())},Build.prototype.setLocalAngle=function(t){this.AngleLocal=t,this.AngleLocal<0&&(this.AngleLocal+=360),this.AngleLocal>360&&(this.AngleLocal-=360),this.entity.setLocalEulerAngles(-this.AngleLocal,0,0)},Build.prototype.doSkew=function(t){this.SkewedFlag||(this.SkewedFlag=!0)},Build.prototype.doBend=function(t){if(!this.BendedFlag){for(var e,i=this.entity.children,o=0;o<i.length;o++){var n=180*(e=i[o]).getLocalPosition().z/t/Math.PI,a=e.getLocalPosition().x,s=-t+t*Math.cos(Math.PI*n/180),l=t*Math.sin(Math.PI*n/180),h=e.getLocalEulerAngles();this.Quat.setFromEulerAngles(n,0,0),this.Quat2.setFromEulerAngles(0,h.y,0),this.Quat.mul(this.Quat2),e.setLocalRotation(this.Quat),e.setLocalPosition(a,s,l)}this.BendAngle=180*this.Length/t/Math.PI,this.BendedFlag=!0}};var Guard=pc.createScript("guard");Guard.attributes.add("Root",{type:"entity",title:"Root"}),Guard.attributes.add("Runner",{type:"entity",title:"Runner"}),Guard.attributes.add("Catch",{type:"entity",title:"catch"}),Guard.attributes.add("Z0",{type:"number",default:18,title:"Z0"}),Guard.attributes.add("Z1",{type:"number",default:10,title:"Z1"}),Guard.attributes.add("Z2",{type:"number",default:4.5,title:"Z2"}),Guard.attributes.add("Z_appear",{type:"number",default:10,title:"Z Appear"}),Guard.attributes.add("Z_stay",{type:"number",default:4,title:"Z stay"}),Guard.attributes.add("DistAheadJump",{type:"number",default:7,title:"Dist ahead jump"}),Guard.attributes.add("JumpDistMax",{type:"number",default:3,title:"Jump Max"}),Guard.attributes.add("SpeedUpAmp",{type:"number",default:20,title:"Speed Up"}),Guard.attributes.add("SpeedBackAmp",{type:"number",default:5,title:"Speed Back"}),Guard.attributes.add("FollowTime",{type:"number",default:13,title:"Follow Time"}),Guard.attributes.add("LineChangePause",{type:"number",default:.25,title:"Line Change Pause"}),Guard.attributes.add("Y0",{type:"number",default:.5,title:"Y"}),Guard.attributes.add("AngYRotMax",{type:"number",default:30,title:"AngY Rotate"}),Guard.attributes.add("AngZRotMax",{type:"number",default:30,title:"AngZ Rotate"}),Guard.attributes.add("JumpSpeedAmp",{type:"number",default:15,title:"Jump Speed"}),Guard.attributes.add("SpeedDownMin",{type:"number",default:40,title:"Speed Down Min"}),Guard.prototype.initialize=function(){this.app.on("game:stoprun",this.OnGameStop,this),this.app.on("game:bumped",this.OnRunnerBumped,this),this.app.on("game:paused",this.OnAnimPause,this),this.app.on("game:resumed",this.OnAnimOffPause,this),this.Anims=[{name:"zookeper_Running_na_ots.json",scale:16,loop:!0,speed:1},{name:"zookeper_Running_na_ots.json",scale:16,loop:!1,speed:.4},{name:"zookeper_Running_na_ots.json",scale:16,loop:!0,speed:1},{name:"zookeper_Running_na_ots.json",scale:16,loop:!0,speed:.4}],this.setAnimStateFast(0),this.CatchAnim="catch-anim.json",this.X=0,this.Y=0,this.Z=0,this.X_last=-1,this.Y_last=-1,this.SavedPausedSpeed=1,this.Ahead={flag:!1,jump:!1,ramp:!1},this.RailsNum=3,this.RailsStep=this.app.data.railsStep,this.Rails=[-this.RailsStep,0,this.RailsStep],this.RailIndex=1,this.RailMoveTime=.65,this.MoveToRailFlag=!1,this.MoveToRailTimeCntr=0,this.JumpFlag=!1,this.RunModel=this.entity.model;var t=this.entity.model.meshInstances[0].aabb.getMin(),i=this.entity.model.meshInstances[0].aabb.getMax();this.Zmin=t.z,this.Zmax=i.z,this.RadZ=Math.abs(this.Zmax-this.Zmin)/2,this.RadY=Math.abs(i.y-t.y),this.AngleX=this.entity.getEulerAngles().x,this.AngleY=this.entity.getEulerAngles().y,this.AngleZ=this.entity.getEulerAngles().z,this.AngYRot=0,this.AngZRot=0,this.Y_grnd=0,this.ObjGrnd=null,this.FollowingFlag=!1,this.MovingBackFlag=!1,this.MovingFlag=!1,this.ScalingFlag=!1,this.Base=this.Root.script.base,this.entity.enabled=!1},Guard.prototype.Revive=function(){this.X_last=-1,this.Y_last=-1,this.X=0,this.Y=0,this.Z=0,this.RailIndex=1,this.setPosition(this.Z0),this.entity.setEulerAngles(this.AngleX,this.AngleY,this.AngleZ),this.MoveToRailFlag=!1,this.JumpFlag=!1,this.FollowingFlag=!1,this.ScalingFlag=!1,this.MovingBackFlag=!1,this.AngYRot=0,this.AngZRot=0,this.Catch.enabled=!1,this.RunModel.show(),this.setGround(0,null),this.entity.enabled=!0,this.setAnimStateFast(0)},Guard.prototype.OnAnimPause=function(){this.SavedPausedSpeed=this.entity.animation.speed,this.entity.animation.speed=0},Guard.prototype.OnAnimOffPause=function(){this.entity.animation.speed=this.SavedPausedSpeed},Guard.prototype.setToStayMove=function(){this.setPosition(this.Z_appear),this.entity.setEulerAngles(this.AngleX,this.AngleY,this.AngleZ),this.setMoving(this.Z_stay,this.OnStayReach,.4)},Guard.prototype.OnStayReach=function(){},Guard.prototype.putOnBack=function(){this.X=0,this.Y=0,this.Z=0,this.setRail(this.Runner.script.runner.RailIndex),this.entity.enabled=!0,this.setPosition(this.Z0),this.setAnimState(0)},Guard.prototype.setFollow=function(t){this.LineChangePauseCntr=this.LineChangePause,this.RunToCatchFlag=!1,this.MovingBackFlag=!1;var i=t;void 0===t&&(i=1),this.setMoving(this.Z1,null,i),this.FollowTimeCntr=this.FollowTime,this.FollowingFlag=!0},Guard.prototype.setMoving=function(t,i,e){this.Z_dest=t,this.OnReachZ=i;var s=e;void 0===s&&(s=1),this.Z>=this.Z_dest?this.Speed=-this.SpeedUpAmp*s:this.Speed=this.SpeedBackAmp*s,this.MovingFlag=!0},Guard.prototype.OnBackReach=function(){this.FollowingFlag=!1,this.entity.enabled=!1,this.MovingBackFlag=!1},Guard.prototype.setMoveBack=function(t){var i=t;void 0===i&&(i=1),this.MovingBackFlag&&i<this.MovingBackCoeff||(this.FollowTimeCntr=2,this.setMoving(this.Z0,this.OnBackReach,i),this.MovingBackCoeff=i,this.MovingBackFlag=!0)},Guard.prototype.setRunToCatch=function(){this.MovingBackFlag=!1,this.FollowTimeCntr=100,this.RunToCatchFlag=!0,this.setMoving(this.Z2,this.OnRunnerReach,1)},Guard.prototype.OnRunnerReach=function(){this.Catch.enabled=!0,this.RunModel.hide(),this.Catch.animation.play(this.CatchAnim,0),this.Runner.script.runner.Catched()},Guard.prototype.setScaling=function(t,i,e){if(0===i)return this.Scale=t,this.entity.setLocalScale(this.Scale,this.Scale,this.Scale),this.ScaleFuncEnd=e,void(null!==this.ScaleFuncEnd&&void 0!==this.ScaleFuncEnd&&this.ScaleFuncEnd.call(this));this.Scale0=this.Scale,this.ScaleDest=t,this.ScaleTime=i,this.ScaleTimeCntr=0,this.ScaleFuncEnd=e,this.ScalingFlag=!0},Guard.prototype.setRunAnim=function(){},Guard.prototype.setAnimStateFast=function(t){this.AnimState=t,this.Scale=this.Anims[this.AnimState].scale,this.entity.animation.play(this.Anims[this.AnimState].name,0),this.entity.setLocalScale(this.Anims[this.AnimState].scale,this.Anims[this.AnimState].scale,this.Anims[this.AnimState].scale),this.entity.animation.speed=this.Anims[this.AnimState].speed,this.entity.animation.loop=this.Anims[this.AnimState].loop},Guard.prototype.setAnimState=function(t,i){if(this.AnimState!=t){this.AnimState=t;this.setScaling(this.Anims[this.AnimState].scale,.2,i),this.entity.animation.play(this.Anims[this.AnimState].name,.2),this.entity.animation.speed=this.Anims[this.AnimState].speed,this.Anims[this.AnimState].loop||(this.entity.animation.loop=this.Anims[this.AnimState].loop)}},Guard.prototype.OnGameStop=function(){this.entity.enabled=!1,this.FollowingFlag=!1},Guard.prototype.setYtoGround=function(t,i){this.Y=t,this.Y_grnd=t,this.ObjGrnd=i,this.JumpFlag&&this.OffJump()},Guard.prototype.updateGround=function(t,i,e){this.JumpFlag?(this.Y_grnd=t,this.ObjGrnd=i):(e&&(this.Y=t),this.Y_grnd=t,null!==this.ObjGrnd&&null===i&&this.setFall(),this.ObjGrnd=i)},Guard.prototype.getGroundObj=function(){return this.ObjGrnd},Guard.prototype.setGround=function(t,i){this.Y_grnd=t,this.ObjGrnd=i},Guard.prototype.setJump=function(){return!this.JumpFlag&&(!this.MoveToRailFlag&&(this.VertSpeed=this.JumpSpeedAmp,this.setAnimState(2),this.JumpFlag=!0,!0))},Guard.prototype.OffJump=function(){this.JumpFlag=!1,this.setAnimState(0)},Guard.prototype.setFall=function(){if(this.JumpFlag)return!1;this.VertSpeed=0,this.JumpFlag=!0},Guard.prototype.getZfront=function(){return this.Z-this.RadZ},Guard.prototype.getZback=function(){return this.Z+this.RadZ},Guard.prototype.getYtop=function(){return this.Y+this.RadY},Guard.prototype.setMoveToRail=function(t){this.MoveToRailFlag||(this.RailIndexDest=t,this.RailIndexDest>this.RailIndex?this.MoveRailsDir=1:this.MoveRailsDir=-1,this.MoveToRailX0=this.X,this.MoveToRailDir=1,this.MoveToRailTimeCntr=0,this.MoveRailCheckedFlag=!1,this.MoveToRailFlag=!0)},Guard.prototype.P2EasingInOut=function(t){return(t*=2)<1?.5*t*t:-.5*(--t*(t-2)-1)},Guard.prototype.P2EasingOut=function(t){return t*(2-t)},Guard.prototype.P2EasingIn=function(t){return t*t},Guard.prototype.setPosition=function(t){this.X=this.Rails[this.RailIndex],this.Z=t,this.entity.setPosition(this.X,this.Y+this.Y0,this.Z)},Guard.prototype.setRail=function(t){this.RailIndex=t,this.X=this.Rails[this.RailIndex],this.entity.setPosition(this.X,this.Y+this.Y0,this.Z)},Guard.prototype.OnRunnerBumped=function(){this.FollowingFlag&&this.setMoveBack(5),this.FollowingFlag=!1},Guard.prototype.update=function(t){if(this.JumpFlag){this.Y+=this.VertSpeed*t*Game.instance.slomo,this.VertSpeed-=this.app.Gravity*t*Game.instance.slomo,this.VertSpeed<-this.SpeedDownMin&&(this.VertSpeedMin=-this.SpeedDownMin);this.VertSpeed,this.JumpSpeedAmp;this.Y<=this.Y_grnd&&(this.Y=this.Y_grnd,this.OffJump())}if(this.MoveToRailFlag){this.MoveToRailTimeCntr+=t*this.MoveToRailDir*Game.instance.slomo,(this.MoveToRailTimeCntr>this.RailMoveTime||this.MoveToRailTimeCntr<0)&&(this.MoveToRailTimeCntr>this.RailMoveTime?this.MoveToRailTimeCntr=this.RailMoveTime:this.MoveToRailTimeCntr=0,this.MoveToRailFlag=!1);var i=this.P2EasingInOut(this.MoveToRailTimeCntr/this.RailMoveTime),e=i/.5;i>.5&&(e=(1-i)/.5),i>.5&&(this.MoveRailCheckedFlag||(this.RailIndex=this.RailIndexDest,this.MoveRailCheckedFlag=!0)),this.AngYRot=this.MoveRailsDir*this.AngYRotMax*e,this.AngZRot=-this.MoveRailsDir*this.AngZRotMax*e,this.entity.setEulerAngles(this.AngleX,this.AngleY+this.AngYRot,this.AngleZ+this.AngZRot),this.X=this.MoveToRailX0+this.MoveRailsDir*this.RailsStep*i}if(this.MovingFlag&&!this.JumpFlag&&(this.Z+=this.Speed*t*Game.instance.slomo,(this.Z>this.Z_dest&&this.Speed>0||this.Z<this.Z_dest&&this.Speed<0)&&(this.Z=this.Z_dest,this.MovingFlag=!1,null!==this.OnReachZ&&this.OnReachZ.call(this))),this.entity.setPosition(this.X,this.Y+this.Y0,this.Z),this.FollowingFlag&&((this.FollowTimeCntr-=t*Game.instance.slomo)<=0?this.setMoveBack(1):(this.RailIndex===this.Runner.script.runner.RailIndex||this.MovingBackFlag||this.MoveToRailFlag||(this.LineChangePauseCntr-=t*Game.instance.slomo)<0&&this.Runner.script.runner.RailIndex>=0&&this.Runner.script.runner.RailIndex<=2&&(this.setMoveToRail(this.Runner.script.runner.RailIndex),this.LineChangePauseCntr=this.LineChangePause),this.RunToCatchFlag||this.JumpFlag||this.MoveToRailFlag||!this.Base.checkKeeperCollisionAhead(this.RailIndex,this.DistAheadJump,this.Ahead)||(this.Ahead.ramp?this.setMoveBack(5):this.Ahead.jump?this.setJump():this.setMoveBack(5)))),this.ScalingFlag){this.ScaleTimeCntr+=t*Game.instance.slomo;var s=this.ScaleTimeCntr/this.ScaleTime;s>=1?(s=1,this.ScalingFlag=!1,this.Scale=this.ScaleDest,this.entity.setLocalScale(this.Scale,this.Scale,this.Scale),this.entity.animation.loop=this.Anims[this.AnimState].loop,void 0!==this.ScaleFuncEnd&&null!==this.ScaleFuncEnd&&this.ScaleFuncEnd.call(this)):(this.Scale=this.Scale0+(this.ScaleDest-this.Scale0)*s,this.entity.setLocalScale(this.Scale,this.Scale,this.Scale))}};var Spark=pc.createScript("spark");Spark.attributes.add("Type",{type:"number",default:0,title:"Type"}),Spark.prototype.initialize=function(){},Spark.prototype.CreatePlain=function(t,i,e,s,h,a,p,n,r,o,l,y){this.X=t,this.Y=i,this.Z=e,this.entity.setPosition(this.X,this.Y,this.Z),this.entity.setEulerAngles(0,0,p),this.entity.setLocalScale(r,o,1),this.SpeedX=s*Math.cos(Math.PI*n/180),this.SpeedY=s*Math.sin(Math.PI*n/180),this.TimeCntr=h,this.TimeFade=a,this.State=0,this.setColor(y),this.Alpha=l,this.entity.sprite.opacity=this.Alpha,this.entity.enabled=!0},Spark.prototype.setColor=function(t){this.entity.sprite.color.fromString(t)},Spark.prototype.update=function(t){if(this.X+=this.SpeedX*t,this.Y+=this.SpeedY*t,this.entity.setPosition(this.X,this.Y,this.Z),this.TimeCntr-=t,this.TimeCntr<=0){if(this.TimeFade<=0)return void(this.entity.enabled=!1);this.AlphaSpeed=this.Alpha/this.TimeFade,this.State=1}if(1===this.State){if(this.Alpha-=this.AlphaSpeed*t,this.Alpha<0)return void(this.entity.enabled=!1);this.entity.sprite.opacity=this.Alpha}};var hidden,visibilityChange,UiPause=pc.createScript("uiPause");function handleVisibilityChange(){(document[hidden]||"visible"!=document.visibilityState)&&trySetOnPause()}function trySetOnPause(){Game.instance.uiContinue.enabled||Game.instance.uiInterface.enabled&&(Game.instance.uiPause.enabled||(Game.instance.uiPause.enabled=!0))}UiPause.attributes.add("popup",{type:"entity"}),UiPause.attributes.add("CountText",{type:"entity",title:"Count Text"}),UiPause.attributes.add("CountTimeRate",{type:"number",default:.5,title:"Count Time Rate"}),UiPause.attributes.add("CountTimeScaling",{type:"number",default:.25,title:"Count Time Scaling"}),UiPause.attributes.add("Counts",{type:"number",default:3,title:"Counts"}),UiPause.prototype.initialize=function(){this.onEnable(),this.on("enable",this.onEnable,this),this.ScaleCountText=this.CountText.getLocalScale().x,void 0!==document.hidden?(hidden="hidden",visibilityChange="visibilitychange"):void 0!==document.msHidden?(hidden="msHidden",visibilityChange="msvisibilitychange"):void 0!==document.webkitHidden&&(hidden="webkitHidden",visibilityChange="webkitvisibilitychange"),void 0===document.addEventListener||void 0===hidden?console.log("This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API."):document.addEventListener(visibilityChange,handleVisibilityChange,!1),this.close(),Game.instance.uiPause.enabled=!1},UiPause.prototype.onEnable=function(){console.log("pause on"),this.CountText.enabled=!1,this.CountingFlag=!1,this.popup.enabled=!0,Game.instance.pause(),this.popup.setLocalScale(0,0,0),this.popup.tween(this.popup.getLocalScale()).to(new pc.Vec3(1,1,1),.65,pc.BackOut).loop(!1).yoyo(!1).start()},UiPause.prototype.OnResumeClicked=function(){this.setCountDown(),this.popup.tween(this.popup.getLocalScale()).to(new pc.Vec3(0,0,0),.4,pc.BackIn).loop(!1).yoyo(!1).start()},UiPause.prototype.close=function(){this.popup.tween(this.popup.getLocalScale()).to(new pc.Vec3(0,0,0),.4,pc.BackIn).loop(!1).yoyo(!1).on("complete",this.OnClose.bind(this)).start()},UiPause.prototype.OnClose=function(){Game.instance.uiPause.enabled=!1,Game.instance.continue()},UiPause.prototype.OnCounted=function(){this.CountText.enabled=!1,Game.instance.uiPause.enabled=!1,Game.instance.continue(),this.app.fire("game:countend"),this.app.fire("game:resume")},UiPause.prototype.setCountDown=function(){this.CountCntr=this.Counts,this.CountTimeCntr=this.CountTimeRate+.25,this.CountText.setLocalScale(this.ScaleCountText/3,this.ScaleCountText/3,this.ScaleCountText/3),this.CountText.enabled=!0,this.CountText.element.text=this.CountCntr+"",this.CountingFlag=!0,this.CountText.tween(this.CountText.getLocalScale()).to(new pc.Vec3(this.ScaleCountText,this.ScaleCountText,this.ScaleCountText),this.CountTimeScaling+.25,pc.BackOut).loop(!1).yoyo(!1).on("complete",this.CountCallBack.bind(this)).start(),this.CountState=2},UiPause.prototype.CountCallBack=function(){switch(this.CountState){case 0:this.CountText.tween(this.CountText.getLocalScale()).to(new pc.Vec3(this.ScaleCountText/3,this.ScaleCountText/3,this.ScaleCountText/3),this.CountTimeScaling,pc.BackIn).loop(!1).yoyo(!1).on("complete",this.CountCallBack.bind(this)).start(),this.CountState=1;break;case 1:this.CountText.tween(this.CountText.getLocalScale()).to(new pc.Vec3(this.ScaleCountText,this.ScaleCountText,this.ScaleCountText),this.CountTimeScaling,pc.BackOut).loop(!1).yoyo(!1).on("complete",this.CountCallBack.bind(this)).start(),this.CountText.element.text=this.CountCntr+"",this.CountState=2}},UiPause.prototype.update=function(t){this.CountingFlag&&(this.CountTimeCntr-=t,this.CountTimeCntr<=0&&(this.CountTimeCntr=this.CountTimeRate,this.CountCntr--,this.CountCntr<=0?(this.CountingFlag=!1,this.CountText.tween(this.CountText.getLocalScale()).to(new pc.Vec3(0,0,0),2*this.CountTimeScaling,pc.BackIn).loop(!1).yoyo(!1).on("complete",this.OnCounted.bind(this)).start()):(this.CountState=0,this.CountText.tween(this.CountText.getLocalScale()).to(new pc.Vec3(this.ScaleCountText/3,this.ScaleCountText/3,this.ScaleCountText/3),this.CountTimeScaling,pc.BackIn).loop(!1).yoyo(!1).on("complete",this.CountCallBack.bind(this)).start())))};var GameAudio=pc.createScript("gameAudio");GameAudio.instance=null,GameAudio.mute=!1,GameAudio.gsMute=!1,GameAudio.loopStep=0,GameAudio.appBlurred=!1,GameAudio.prototype.update=function(e){document.hasFocus(),GameAudio.loopStep>0&&(GameAudio.loopStep+=1,js_isMobileOrTablet()?GameAudio.loopStep>=10&&(GameAudio.loopStep=-1,GameAudio.instance.snd.play("loopSound")):(GameAudio.loopStep=-1,GameAudio.instance.snd.play("loopSound")));var o=!GAMESNACKS.isAudioEnabled();o!=GameAudio.gsMute&&(GameAudio.gsMute=o,GameAudio.switch(GameAudio.gsMute))},GameAudio.prototype.initialize=function(){GameAudio.instance=this,this.snd=this.entity.sound,GameAudio.gsMute=!GAMESNACKS.isAudioEnabled(),GameAudio.mute=GameAudio.gsMute,GameAudio.switch(GameAudio.mute);this.snd.slot("loopSound");this.app.on("input:mousepress",this.onMousePress)},GameAudio.prototype.onMousePress=function(){0===GameAudio.loopStep&&(GameAudio.loopStep=1)},GameAudio.switch=function(e){GameAudio.mute=e,GameAudio.instance.snd.enabled=!GameAudio.mute},GameAudio.play=function(e){(GAMESNACKS.isAudioEnabled()&&!0,GameAudio.instance)&&(GameAudio.instance.snd.slot(e).pitch=1,GameAudio.instance.snd.play(e))},GameAudio.playEx=function(e,o){(GAMESNACKS.isAudioEnabled()&&!0,GameAudio.instance)&&(GameAudio.instance.snd.slot(e).pitch=o,GameAudio.instance.snd.play(e))};var MyButton=pc.createScript("myButton");MyButton.attributes.add("startScale",{type:"number",default:1}),MyButton.attributes.add("animScaleKoef",{type:"number",default:.2}),MyButton.attributes.add("clickable",{type:"boolean",default:!0}),MyButton.attributes.add("actionName",{type:"string",default:"type name of action"}),MyButton.prototype.onClick=function(){switch(this.actionName){case"shopBuyBoots":Game.instance.upgradeBoost("boots");break;case"shopBuyStars":Game.instance.upgradeBoost("stars");break;case"shopBuyMagnet":Game.instance.upgradeBoost("magnet");break;case"shopOpen":Uipopup.open("shop",!0),Base.instance.Menu.enabled=!1;break;case"shopClose":Uipopup.close("shop"),setTimeout(function(){Base.instance.Menu.enabled=!0},400);break;case"yesSpendCoins":UiContinue.instance.OnYesButtClick(),GameAudio.play("life"),FadeScreen.instance.show(.5,0,0,function(){Game.instance.ContinueGame()});break;case"noSpendCoins":UiContinue.instance.OnNoButtClick();break;case"resultContinue":Result.instance.OnButtClose();break;case"restart":FadeScreen.instance.show(.5,0,0,function(){Game.instance.RestartGame(),js_GS_sendScore(0)});break;case"home":FadeScreen.instance.show(.5,0,0,function(){this.app.fire("game:home"),Game.instance.GoHome()});break;case"pause":console.log("pause on 0"),Game.instance.uiPause.enabled=!0;break;case"resume":Game.instance.uiPause.script.uiPause.OnResumeClicked();break;case"gameoverContinue":FadeScreen.instance.show(.5,0,0,function(){Game.instance.gotoMainMenu()});break;case"soundButton":GameAudio.switch(!GameAudio.mute);break;case"startGame":this.app.fire("game:play"),js_GS_sendScore(0);break;case"boosts":break;default:return 0}},MyButton.prototype.initialize=function(){this.animScaling=!0,this.mouseDown=!1,this.pressScaleX=1,this.pressScaleY=1,this.pressScaleXVel=0,this.entity.element.on("mousedown",this.onMouseDown,this),this.entity.element.on("mouseleave",this.onMouseLeave,this),this.entity.element.on("mouseup",this.onMouseUp,this),this.entity.element.on("touchstart",this.onMouseDown,this),this.entity.element.on("touchend",this.onMouseUp,this)},MyButton.prototype.onMouseUp=function(){this.mouseDown&&(this.mouseDown=!1,this.onClick())},MyButton.prototype.onMouseDown=function(){1!=FadeScreen.instance.state&&(Game.instance.BH5&&"buyhtml5Contact"!=this.actionName||this.clickable&&(GameAudio.play("button"),this.mouseDown=!0))},MyButton.prototype.onMouseLeave=function(){this.mouseDown=!1},MyButton.prototype.postUpdate=function(e){MyButton.justPressed=!1},MyButton.prototype.update=function(e){this.animScaling?(this.mouseDown?(this.pressScaleX>1-this.animScaleKoef&&(this.pressScaleX=pc.math.lerp(this.pressScaleX,1-this.animScaleKoef,.5)),this.pressScaleY=this.pressScaleX):(this.pressScaleXVel+=20*(1-this.pressScaleX),this.pressScaleXVel*=.7,this.pressScaleX+=this.pressScaleXVel*e,this.pressScaleY=this.pressScaleX),this.entity.setLocalScale(this.pressScaleX*this.startScale,this.pressScaleY*this.startScale,1)):this.entity.setLocalScale(this.startScale,this.startScale,this.startScale)};var SoundButton=pc.createScript("soundButton");SoundButton.attributes.add("noSound",{type:"entity"}),SoundButton.prototype.initialize=function(){this.app.on("app:soundchanged",this.onSoundChange,this),this.onEnable(),this.on("enable",this.onEnable,this)},SoundButton.prototype.onSoundChange=function(n){this.noSound.enabled=n},SoundButton.prototype.update=function(n){this.noSound.enabled=GameAudio.mute},SoundButton.prototype.onEnable=function(){this.onSoundChange(GameAudio.mute)};var Game=pc.createScript("game");Game.attributes.add("uiPause",{type:"entity"}),Game.attributes.add("uiInterface",{type:"entity"}),Game.attributes.add("uiContinue",{type:"entity"}),Game.attributes.add("busMaterials",{type:"asset",assetType:"material",array:!0,title:"Materials"}),Game.instance=null,Game.prototype.initialize=function(){Game.instance=this,this.showTutor=!1,this.stars=0,this.slomo=1,this.pauseCntr=0,this.magnetLvl=0,this.bootsLvl=0,this.starsLvl=0,this.loadGame()},Game.prototype.upgradeBoost=function(t){var e;if("magnet"==t&&(lvl=this.magnetLvl,e=this.getBoostPrice(t,lvl),lvl<5)){if(this.stars<e)return 1;this.magnetLvl++,this.wasteStars(e),GameAudio.play("shopbuy"),this.saveGame()}if("boots"==t&&(lvl=this.bootsLvl,e=this.getBoostPrice(t,lvl),lvl<5)){if(this.stars<e)return 1;this.bootsLvl++,this.wasteStars(e),GameAudio.play("shopbuy"),this.saveGame()}if("stars"==t&&(lvl=this.starsLvl,e=this.getBoostPrice(t,lvl),lvl<5)){if(this.stars<e)return 1;this.starsLvl++,this.wasteStars(e),GameAudio.play("shopbuy"),this.saveGame()}},Game.lvlPrices=[100,500,1e3,1500,2500,5e3],Game.prototype.getBoostPrice=function(t,e){return"magnet"==t?Game.lvlPrices[this.magnetLvl]:"boots"==t?Game.lvlPrices[this.bootsLvl]:"stars"==t?Game.lvlPrices[this.starsLvl]:void 0},Game.prototype.addStar=function(){this.stars+=this.starsLvl+1,this.app.fire("game:starschange"),GameAudio.playEx("star",.76)},Game.prototype.wasteStars=function(t){this.stars-=t,this.app.fire("game:starschange")},Game.prototype.tutorCompleted=function(){this.showTutor=!1},Game.prototype.start=function(){Base.instance.StartPlay()},Game.prototype.pause=function(){this.pauseFlag||(this.pauseCntr++,this.pauseFlag=!0,this.slomo=0,this.app.fire("game:paused"))},Game.prototype.continue=function(){this.pauseFlag=!1,this.pauseCntr--,this.pauseCntr>0||(this.slomo=1,this.app.fire("game:resumed"))},Game.prototype.SetTutorial=function(){this.pauseCntr++,this.slomo=0,this.app.fire("game:paused")},Game.prototype.OffTutorial=function(){this.pauseCntr--,this.pauseCntr>0||(this.slomo=1,this.app.fire("game:resumed"))},Game.prototype.SetContinueWnd=function(){this.pauseCntr++,this.slomo=0,this.app.fire("game:paused")},Game.prototype.OffContinueWnd=function(){this.pauseCntr--,this.pauseCntr>0||(this.slomo=1,this.app.fire("game:resumed"))},Game.prototype.ContinueGame=function(){this.OffContinueWnd(),UiContinue.instance.CloseFast(),this.app.fire("game:continue")},Game.prototype.NotContinueGame=function(){this.OffContinueWnd()},Game.prototype.RestartGame=function(){this.continue(),this.uiPause.enabled=!1,js_GS_gameOver(),this.app.fire("game:restart")},Game.prototype.GoHome=function(){this.continue(),this.uiPause.enabled=!1,js_GS_gameOver(),this.app.fire("game:home")},Game.prototype.revive=function(){},Game.prototype.update=function(t){},Game.prototype.loadGame=function(){Savefile.addKey("bestScore",0),Savefile.addKey("stars",0),Savefile.addKey("magnetLvl",0),Savefile.addKey("bootsLvl",0),Savefile.addKey("starsLvl",0),Savefile.addKey("showTutor",1),Savefile.load(),this.stars=Savefile.get("stars"),this.magnetLvl=Savefile.get("magnetLvl"),this.bootsLvl=Savefile.get("bootsLvl"),this.starsLvl=Savefile.get("starsLvl"),this.app.ScoreBest=Savefile.get("bestScore"),Savefile.get("showTutor")>0?this.showTutor=!0:this.showTutor=!1},Game.prototype.saveGame=function(){Savefile.set("bestScore",this.app.ScoreBest),Savefile.set("stars",this.stars),Savefile.set("magnetLvl",this.magnetLvl),Savefile.set("bootsLvl",this.bootsLvl),Savefile.set("starsLvl",this.starsLvl),this.showTutor?Savefile.set("showTutor",1):Savefile.set("showTutor",0)};var TextIcon=pc.createScript("textIcon");TextIcon.attributes.add("iconSide",{type:"number",default:1,enum:[{left:1},{right:2}]}),TextIcon.attributes.add("icon",{type:"entity"}),TextIcon.attributes.add("spacing",{type:"number",default:20,title:"icon spacing"}),TextIcon.prototype.initialize=function(){},TextIcon.prototype.update=function(t){var e=0;e=1===this.iconSide?-(this.spacing+.5*this.entity.element.textWidth):this.spacing+.5*this.entity.element.textWidth,this.icon.setLocalPosition(e,0,0)};pc.extend(pc,function(){var t=function(t){this._app=t,this._tweens=[],this._add=[]};t.prototype={add:function(t){return this._add.push(t),t},update:function(t){for(var i=0,e=this._tweens.length;i<e;)this._tweens[i].update(t)?i++:(this._tweens.splice(i,1),e--);this._add.length&&(this._tweens=this._tweens.concat(this._add),this._add.length=0)}};var i=function(t,i,e){pc.events.attach(this),this.manager=i,e&&(this.entity=null),this.time=0,this.complete=!1,this.playing=!1,this.stopped=!0,this.pending=!1,this.target=t,this.duration=0,this._currentDelay=0,this.timeScale=1,this._reverse=!1,this._delay=0,this._yoyo=!1,this._count=0,this._numRepeats=0,this._repeatDelay=0,this._from=!1,this._slerp=!1,this._fromQuat=new pc.Quat,this._toQuat=new pc.Quat,this._quat=new pc.Quat,this.easing=pc.EASE_LINEAR,this._sv={},this._ev={}},e=function(t){var i;return t instanceof pc.Vec2?i={x:t.x,y:t.y}:t instanceof pc.Vec3?i={x:t.x,y:t.y,z:t.z}:t instanceof pc.Vec4?i={x:t.x,y:t.y,z:t.z,w:t.w}:t instanceof pc.Quat?i={x:t.x,y:t.y,z:t.z,w:t.w}:t instanceof pc.Color?(i={r:t.r,g:t.g,b:t.b},void 0!==t.a&&(i.a=t.a)):i=t,i};i.prototype={to:function(t,i,n,s,r,h){return this._properties=e(t),this.duration=i,n&&(this.easing=n),s&&this.delay(s),r&&this.repeat(r),h&&this.yoyo(h),this},from:function(t,i,n,s,r,h){return this._properties=e(t),this.duration=i,n&&(this.easing=n),s&&this.delay(s),r&&this.repeat(r),h&&this.yoyo(h),this._from=!0,this},rotate:function(t,i,n,s,r,h){return this._properties=e(t),this.duration=i,n&&(this.easing=n),s&&this.delay(s),r&&this.repeat(r),h&&this.yoyo(h),this._slerp=!0,this},start:function(){var t,i,e,n;if(this.playing=!0,this.complete=!1,this.stopped=!1,this._count=0,this.pending=this._delay>0,this._reverse&&!this.pending?this.time=this.duration:this.time=0,this._from){for(t in this._properties)this._properties.hasOwnProperty(t)&&(this._sv[t]=this._properties[t],this._ev[t]=this.target[t]);this._slerp&&(this._toQuat.setFromEulerAngles(this.target.x,this.target.y,this.target.z),i=void 0!==this._properties.x?this._properties.x:this.target.x,e=void 0!==this._properties.y?this._properties.y:this.target.y,n=void 0!==this._properties.z?this._properties.z:this.target.z,this._fromQuat.setFromEulerAngles(i,e,n))}else{for(t in this._properties)this._properties.hasOwnProperty(t)&&(this._sv[t]=this.target[t],this._ev[t]=this._properties[t]);this._slerp&&(this._fromQuat.setFromEulerAngles(this.target.x,this.target.y,this.target.z),i=void 0!==this._properties.x?this._properties.x:this.target.x,e=void 0!==this._properties.y?this._properties.y:this.target.y,n=void 0!==this._properties.z?this._properties.z:this.target.z,this._toQuat.setFromEulerAngles(i,e,n))}return this._currentDelay=this._delay,this.manager.add(this),this},pause:function(){this.playing=!1},resume:function(){this.playing=!0},stop:function(){this.playing=!1,this.stopped=!0},delay:function(t){return this._delay=t,this.pending=!0,this},repeat:function(t,i){return this._count=0,this._numRepeats=t,this._repeatDelay=i||0,this},loop:function(t){return t?(this._count=0,this._numRepeats=1/0):this._numRepeats=0,this},yoyo:function(t){return this._yoyo=t,this},reverse:function(){return this._reverse=!this._reverse,this},chain:function(){for(var t=arguments.length;t--;)t>0?arguments[t-1]._chained=arguments[t]:this._chained=arguments[t];return this},update:function(t){if(this.stopped)return!1;if(!this.playing)return!0;if(!this._reverse||this.pending?this.time+=t*this.timeScale:this.time-=t*this.timeScale,this.pending){if(!(this.time>this._currentDelay))return!0;this._reverse?this.time=this.duration-(this.time-this._currentDelay):this.time=this.time-this._currentDelay,this.pending=!1}var i=0;(!this._reverse&&this.time>this.duration||this._reverse&&this.time<0)&&(this._count++,this.complete=!0,this.playing=!1,this._reverse?(i=this.duration-this.time,this.time=0):(i=this.time-this.duration,this.time=this.duration));var e,n,s=this.time/this.duration,r=this.easing(s);for(var h in this._properties)this._properties.hasOwnProperty(h)&&(e=this._sv[h],n=this._ev[h],this.target[h]=e+(n-e)*r);if(this._slerp&&this._quat.slerp(this._fromQuat,this._toQuat,r),this.entity&&(this.entity._dirtifyLocal(),this.element&&this.entity.element&&(this.entity.element[this.element]=this.target),this._slerp&&this.entity.setLocalRotation(this._quat)),this.fire("update",t),this.complete){var a=this._repeat(i);return a?this.fire("loop"):(this.fire("complete",i),this._chained&&this._chained.start()),a}return!0},_repeat:function(t){if(this._count<this._numRepeats){if(this._reverse?this.time=this.duration-t:this.time=t,this.complete=!1,this.playing=!0,this._currentDelay=this._repeatDelay,this.pending=!0,this._yoyo){for(var i in this._properties)tmp=this._sv[i],this._sv[i]=this._ev[i],this._ev[i]=tmp;this._slerp&&(this._quat.copy(this._fromQuat),this._fromQuat.copy(this._toQuat),this._toQuat.copy(this._quat))}return!0}return!1}};var n=function(t){return 1-s(1-t)},s=function(t){return t<1/2.75?7.5625*t*t:t<2/2.75?7.5625*(t-=1.5/2.75)*t+.75:t<2.5/2.75?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375};return{TweenManager:t,Tween:i,Linear:function(t){return t},QuadraticIn:function(t){return t*t},QuadraticOut:function(t){return t*(2-t)},QuadraticInOut:function(t){return(t*=2)<1?.5*t*t:-.5*(--t*(t-2)-1)},CubicIn:function(t){return t*t*t},CubicOut:function(t){return--t*t*t+1},CubicInOut:function(t){return(t*=2)<1?.5*t*t*t:.5*((t-=2)*t*t+2)},QuarticIn:function(t){return t*t*t*t},QuarticOut:function(t){return 1- --t*t*t*t},QuarticInOut:function(t){return(t*=2)<1?.5*t*t*t*t:-.5*((t-=2)*t*t*t-2)},QuinticIn:function(t){return t*t*t*t*t},QuinticOut:function(t){return--t*t*t*t*t+1},QuinticInOut:function(t){return(t*=2)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2)},SineIn:function(t){return 0===t?0:1===t?1:1-Math.cos(t*Math.PI/2)},SineOut:function(t){return 0===t?0:1===t?1:Math.sin(t*Math.PI/2)},SineInOut:function(t){return 0===t?0:1===t?1:.5*(1-Math.cos(Math.PI*t))},ExponentialIn:function(t){return 0===t?0:Math.pow(1024,t-1)},ExponentialOut:function(t){return 1===t?1:1-Math.pow(2,-10*t)},ExponentialInOut:function(t){return 0===t?0:1===t?1:(t*=2)<1?.5*Math.pow(1024,t-1):.5*(2-Math.pow(2,-10*(t-1)))},CircularIn:function(t){return 1-Math.sqrt(1-t*t)},CircularOut:function(t){return Math.sqrt(1- --t*t)},CircularInOut:function(t){return(t*=2)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)},BackIn:function(t){return t*t*(2.70158*t-1.70158)},BackOut:function(t){return--t*t*(2.70158*t+1.70158)+1},BackInOut:function(t){var i=2.5949095;return(t*=2)<1?t*t*((i+1)*t-i)*.5:.5*((t-=2)*t*((i+1)*t+i)+2)},BounceIn:n,BounceOut:s,BounceInOut:function(t){return t<.5?.5*n(2*t):.5*s(2*t-1)+.5},ElasticIn:function(t){var i,e=.1;return 0===t?0:1===t?1:(!e||e<1?(e=1,i=.1):i=.4*Math.asin(1/e)/(2*Math.PI),-e*Math.pow(2,10*(t-=1))*Math.sin((t-i)*(2*Math.PI)/.4))},ElasticOut:function(t){var i,e=.1;return 0===t?0:1===t?1:(!e||e<1?(e=1,i=.1):i=.4*Math.asin(1/e)/(2*Math.PI),e*Math.pow(2,-10*t)*Math.sin((t-i)*(2*Math.PI)/.4)+1)},ElasticInOut:function(t){var i,e=.1;return 0===t?0:1===t?1:(!e||e<1?(e=1,i=.1):i=.4*Math.asin(1/e)/(2*Math.PI),(t*=2)<1?e*Math.pow(2,10*(t-=1))*Math.sin((t-i)*(2*Math.PI)/.4)*-.5:e*Math.pow(2,-10*(t-=1))*Math.sin((t-i)*(2*Math.PI)/.4)*.5+1)}}}()),function(){pc.Application.prototype.addTweenManager=function(){this._tweenManager=new pc.TweenManager(this),this.on("update",function(t){this._tweenManager.update(t)})},pc.Application.prototype.tween=function(t){return new pc.Tween(t,this._tweenManager)},pc.Entity.prototype.tween=function(t,i){var e=this._app.tween(t);return e.entity=this,this.on("destroy",function(){e.stop()}),i&&i.element&&(e.element=i.element),e};var t=pc.Application.getApplication();t&&t.addTweenManager()}();var Starmod=pc.createScript("starmod");Starmod.attributes.add("Num",{type:"number",default:3,title:"Num"}),Starmod.attributes.add("Step",{type:"number",default:1,title:"Step"}),Starmod.attributes.add("Duga",{type:"boolean",default:!1,title:"Duga"}),Starmod.attributes.add("Center",{type:"boolean",default:!1,title:"Center"}),Starmod.attributes.add("Dir",{type:"number",default:1,title:"Direction"}),Starmod.attributes.add("HeightCoeff",{type:"number",default:1,title:"Y coeff"}),Starmod.attributes.add("DugaFirst",{type:"number",default:0,title:"Duga Start"}),Starmod.attributes.add("DugaNum",{type:"number",default:0,title:"Duga Length"}),Starmod.attributes.add("Shift",{type:"number",default:0,title:"Z shift"}),Starmod.prototype.initialize=function(){};var Levmod=pc.createScript("levmod");Levmod.attributes.add("Index",{type:"number",default:0,title:"Index"}),Levmod.prototype.initialize=function(){};var Movemod=pc.createScript("movemod");Movemod.attributes.add("Num",{type:"number",default:1,title:"Num"}),Movemod.attributes.add("Speed",{type:"number",default:1,title:"Speed"}),Movemod.attributes.add("Stay",{type:"boolean",default:!1,title:"Stay"}),Movemod.prototype.initialize=function(){};var Boostmod=pc.createScript("boostmod");Boostmod.attributes.add("HeightCoeff",{type:"number",default:1,title:"Y coeff"}),Boostmod.attributes.add("Prob",{type:"number",default:1,title:"Probability"}),Boostmod.attributes.add("Shift",{type:"number",default:0,title:"Z shift"}),Boostmod.prototype.initialize=function(){};var UiTutor=pc.createScript("uiTutor");UiTutor.attributes.add("finger",{type:"entity",title:"finger"}),UiTutor.attributes.add("tutorPageID",{type:"number",default:0,title:"tutorPageID"}),UiTutor.attributes.add("Runner",{type:"entity",title:"Runner"}),UiTutor.prototype.initialize=function(){},UiTutor.prototype.Create=function(){this.entity.enabled=!0,this.finger.enabled=!0;var t=this.finger,e=t.getLocalPosition();0===this.tutorPageID?t.tween(e).to(new pc.Vec3(-e.x,e.y,e.z),3,pc.SineInOut).loop(!0).yoyo(!0).start():1===this.tutorPageID?t.tween(e).to(new pc.Vec3(e.x,e.y+250,e.z),2,pc.SineInOut).loop(!0).yoyo(!1).start():2===this.tutorPageID&&t.tween(e).to(new pc.Vec3(e.x,e.y-200,e.z),2,pc.SineInOut).loop(!0).yoyo(!1).start(),this.X_last=-1,this.Y_last=-1,this.Direction=0,this.CommandFlag=!0,this.ClosedFlag=!1;var i=this.app.mouse;i&&(i.on(pc.EVENT_MOUSEMOVE,this.onMouseMove,this),i.on(pc.EVENT_MOUSEDOWN,this.onMouseDown,this));var o=this.app.touch;o&&(o.on(pc.EVENT_TOUCHMOVE,this.onTouchMove,this),o.on(pc.EVENT_TOUCHSTART,this.onTouchDown,this)),this.app.keyboard&&this.app.keyboard.on(pc.EVENT_KEYDOWN,this.onKeyDown,this),this.app.on("game:mmenu",this.OnGameOut,this),this.app.on("game:restart",this.OnGameOut,this),this.app.on("game:home",this.OnGameOut,this),this.app.fire("tutorial:start"),Game.instance.SetTutorial()},UiTutor.prototype.OnGameOut=function(t){this.entity.enabled&&(this.CommandFlag=!1,this.close())},UiTutor.prototype.onKeyDown=function(t){if(!this.ClosedFlag){var e=!1,i=!1;if(t.key===pc.KEY_LEFT&&(e=!0),t.key===pc.KEY_RIGHT&&(i=!0),0===this.tutorPageID){if(e)return t.event.preventDefault(),this.Direction=-1,void this.close();if(i)return t.event.preventDefault(),this.Direction=1,void this.close()}return t.key===pc.KEY_UP&&1===this.tutorPageID?(t.event.preventDefault(),void this.close()):t.key===pc.KEY_DOWN&&2===this.tutorPageID?(t.event.preventDefault(),void this.close()):void t.event.preventDefault()}},UiTutor.prototype.onMouseDown=function(t){Game.instance.pauseFlag||this.app.mouse.isPressed(pc.MOUSEBUTTON_LEFT)&&this.OnDown(t.x,t.y)},UiTutor.prototype.onMouseMove=function(t){Game.instance.pauseFlag||this.app.mouse.isPressed(pc.MOUSEBUTTON_LEFT)&&this.OnMove(t.x,t.y)},UiTutor.prototype.onTouchMove=function(t){if(!Game.instance.pauseFlag){var e=t.changedTouches[0];this.OnMove(e.x,e.y)}},UiTutor.prototype.onTouchDown=function(t){if(!Game.instance.pauseFlag){var e=t.changedTouches[0];this.OnDown(e.x,e.y)}},UiTutor.prototype.OnDown=function(t,e){this.ClosedFlag||(this.X_last=t,this.Y_last=e)},UiTutor.prototype.OnMove=function(t,e){if(!this.ClosedFlag){if(this.X_last<0)return this.X_last=t,void(this.Y_last=e);var i=t-this.X_last,o=e-this.Y_last;Math.abs(i)>Math.abs(o)?(Math.abs(i)>10&&(i<0?0===this.tutorPageID&&(this.Direction=-1,this.close()):0===this.tutorPageID&&(this.Direction=1,this.close())),this.X_last=t):o<0?1===this.tutorPageID&&this.close():o>0&&2===this.tutorPageID&&this.close(),this.X_last=t,this.Y_last=e}},UiTutor.prototype.close=function(){if(!this.ClosedFlag){this.ClosedFlag=!0;var t=this.app.mouse;t&&(t.off(pc.EVENT_MOUSEMOVE,this.onMouseMove,this),t.off(pc.EVENT_MOUSEDOWN,this.onMouseDown,this));var e=this.app.touch;e&&(e.off(pc.EVENT_TOUCHMOVE,this.onTouchMove,this),e.off(pc.EVENT_TOUCHSTART,this.onTouchDown,this)),this.finger.enabled=!1,this.entity.enabled=!1,this.CommandFlag&&this.Runner.script.runner.OnTutorialEnd(this.tutorPageID,this.Direction),this.app.off("game:mmenu",this.OnGameOut,this),this.app.off("game:restart",this.OnGameOut,this),this.app.off("game:home",this.OnGameOut,this),this.app.fire("tutorial:end"),Game.instance.OffTutorial()}},UiTutor.prototype.update=function(t){};var EntityTools=pc.createScript("entityTools");EntityTools.reparent=function(t,e){var o=t.getPosition().clone(),n=t.getRotation().clone(),a=t.getScale().clone();t.reparent(e),t.setPosition(o),t.setRotation(n),t.setLocalScale(a)},EntityTools.createParentAtPoint=function(t,e,o){var n=new pc.Entity;return o.addChild(n),n.setPosition(e),EntityTools.reparent(t,n),n},EntityTools.setTexture=function(t,e){for(var o=e.resource,n=t.model.meshInstances,a=0;a<n.length;++a){var i=n[a];i.material.diffuseMap=o,i.material.update()}},EntityTools.setMaterial=function(t,e){var o=e.resource;t.model.meshInstances[0].material=o,t.model.meshInstances[0].material.update()};var EntityTools=pc.createScript("entityTools");EntityTools.reparent=function(t,e){var o=t.getPosition().clone(),n=t.getRotation().clone(),a=t.getScale().clone();t.reparent(e),t.setPosition(o),t.setRotation(n),t.setLocalScale(a)},EntityTools.createParentAtPoint=function(t,e,o){var n=new pc.Entity;return o.addChild(n),n.setPosition(e),EntityTools.reparent(t,n),n},EntityTools.setTexture=function(t,e){for(var o=e.resource,n=t.model.meshInstances,a=0;a<n.length;++a){var r=n[a];r.material.diffuseMap=o,r.material.update()}},EntityTools.setMaterial=function(t,e){for(var o=e.resource,n=t.model.meshInstances,a=0;a<n.length;++a){var r=n[a];r.material=o,r.material.update()}};var UiContinue=pc.createScript("uiContinue");UiContinue.attributes.add("Popup",{type:"entity",title:"Popup"}),UiContinue.attributes.add("CoinsText",{type:"entity",title:"Coins"}),UiContinue.attributes.add("YesButt",{type:"entity",title:"Yes Button"}),UiContinue.attributes.add("YesAnim",{type:"entity",title:"Yes Button"}),UiContinue.instance=null,UiContinue.prototype.initialize=function(){UiContinue.instance=this,this.YesAnim.tween(this.YesAnim.getLocalScale()).to(new pc.Vec3(1.1,1.1,1.1),1.65,pc.BounceOut).loop(!0).yoyo(!0).start()},UiContinue.prototype.Revive=function(t){UiContinue.instance=this,this.entity.enabled=!0,this.Popup.setLocalScale(0,0,0),this.ResultCode=-1,this.CoinsNum=t,this.CoinsText.element.text=this.CoinsNum+"",this.Popup.tween(this.Popup.getLocalScale()).to(new pc.Vec3(1,1,1),.65,pc.BackOut).loop(!1).yoyo(!1).on("complete",this.OnPopup.bind(this)).start(),this.enabled=!1,this.State=0,Game.instance.SetContinueWnd()},UiContinue.prototype.OnPopup=function(){this.State=1},UiContinue.prototype.OnYesButtClick=function(){1===this.State&&(Game.instance.wasteStars(this.CoinsNum),this.State=2,this.ResultCode=0)},UiContinue.prototype.OnNoButtClick=function(){1===this.State&&(this.State=2,this.ResultCode=1,this.Close())},UiContinue.prototype.Close=function(){this.Popup.tween(this.Popup.getLocalScale()).to(new pc.Vec3(0,0,0),.5,pc.BackOut).loop(!1).yoyo(!1).on("complete",this.OnClose.bind(this)).start()},UiContinue.prototype.CloseFast=function(){this.entity.enabled=!1},UiContinue.prototype.OnClose=function(){this.entity.enabled=!1,Game.instance.OffContinueWnd(),this.ResultCode,1===this.ResultCode&&this.app.fire("game:nocontinue")};var Uipopup=pc.createScript("uipopup");Uipopup.attributes.add("fader",{type:"entity"}),Uipopup.attributes.add("name",{type:"string",default:"Popup Name"}),Uipopup.popups=[],Uipopup.STATE_OPENING=1,Uipopup.STATE_OPENED=2,Uipopup.STATE_CLOSING=3,Uipopup.STATE_CLOSED=4,Uipopup.prototype.initialize=function(){Uipopup.popups.push(this),this.entity.enabled=!1,this.state=Uipopup.STATE_CLOSED},Uipopup.open=function(p,t){for(var i,e=0;e<Uipopup.popups.length;e++)(i=Uipopup.popups[e]).name==p?i.open():t&&i.close()},Uipopup.close=function(p){for(var t,i=0;i<Uipopup.popups.length;i++)(t=Uipopup.popups[i]).name==p&&t.close()},Uipopup.prototype.open=function(){this.state==Uipopup.STATE_CLOSED&&(this.fader&&(this.fader.enabled=!0),this.state=Uipopup.STATE_OPENING,this.entity.setLocalScale(0,0,0),this.entity.enabled=!0,this.entity.tween(this.entity.getLocalScale()).to(new pc.Vec3(1,1,1),1,pc.BackOut).loop(!1).yoyo(!1).on("complete",function(){this.state=Uipopup.STATE_OPENED}.bind(this)).start())},Uipopup.prototype.close=function(){this.state!=Uipopup.STATE_OPENED&&this.state!=Uipopup.STATE_OPENING||(this.state=Uipopup.STATE_CLOSING,this.entity.tween(this.entity.getLocalScale()).to(new pc.Vec3(0,0,0),1,pc.BackIn).loop(!1).yoyo(!1).on("complete",function(){if(this.fader){for(var p,t=!1,i=0;i<Uipopup.popups.length;i++)(p=Uipopup.popups[i]).state!=Uipopup.STATE_OPENED&&p.state!=Uipopup.STATE_OPENING||p.fader==this.fader&&(t=!0);t||(this.fader.enabled=!1)}this.state=Uipopup.STATE_CLOSED,this.entity.enabled=!1}.bind(this)).start())},Uipopup.prototype.update=function(p){this.state!=Uipopup.STATE_OPENED&&this.state!=Uipopup.STATE_OPENING||this.fader&&(this.fader.enabled=!0)};var UiiconsProgress=pc.createScript("uiiconsProgress");UiiconsProgress.attributes.add("iconFull",{type:"entity"}),UiiconsProgress.attributes.add("iconEmpty",{type:"entity"}),UiiconsProgress.attributes.add("count",{type:"number",default:3}),UiiconsProgress.attributes.add("spacing",{type:"number",default:50}),UiiconsProgress.prototype.initialize=function(){if(this.initialized)return 1;var i;this.initialized=!0,this.iconsFull=[],this.iconsEmpty=[],this.iconFull.enabled=!1,this.iconEmpty.enabled=!1;for(var t=0;t<this.count;t++)(i=this.iconFull.clone()).setLocalPosition(this.spacing*t,0,0),this.entity.addChild(i),i.enabled=!0,this.iconsFull.push(i),(i=this.iconEmpty.clone()).setLocalPosition(this.spacing*t,0,0),this.entity.addChild(i),i.enabled=!1,this.iconsEmpty.push(i)},UiiconsProgress.prototype.fillIcons=function(i,t){for(var s=0;s<this.count;s++)this.iconsFull[s].enabled=s>=i&&s<i+t,this.iconsEmpty[s].enabled=!this.iconsFull[s].enabled},UiiconsProgress.prototype.update=function(i){};var UishopField=pc.createScript("uishopField");UishopField.attributes.add("type",{type:"string"}),UishopField.attributes.add("caption",{type:"entity"}),UishopField.attributes.add("desc",{type:"entity"}),UishopField.attributes.add("progressIcons",{type:"entity"}),UishopField.attributes.add("price",{type:"entity"}),UishopField.attributes.add("buybut",{type:"entity"}),UishopField.attributes.add("lockedbut",{type:"entity"}),UishopField.attributes.add("butmax",{type:"entity"}),UishopField.prototype.initialize=function(){this.whiteColor=(new pc.Color).fromString("FFFFFF"),this.redColor=(new pc.Color).fromString("FF2A2A"),this.onEnable(),this.entity.on("enable",this.onEnable,this)},UishopField.prototype.onEnable=function(){this.progressScr=this.progressIcons.script.uiiconsProgress,this.progressScr.initialize(),"magnet"==this.type&&(this.caption.element.text="MAGNET"),"boots"==this.type&&(this.caption.element.text="BOOTS"),"stars"==this.type&&(this.caption.element.text="MORE STARS"),this.updateValue()},UishopField.prototype.updateValue=function(){var t=Game.instance.getBoostPrice(this.type),e=3;"magnet"==this.type&&(this.desc.element.text="MAGNET COINS FOR "+(Game.instance.magnetLvl+2).toString()+" S",e=Game.instance.magnetLvl),"boots"==this.type&&(this.desc.element.text="JUMP HIGHER FOR "+(Game.instance.bootsLvl+2).toString()+" S",e=Game.instance.bootsLvl),"stars"==this.type&&(this.desc.element.text="ALL STARS X "+(Game.instance.starsLvl+2).toString(),e=Game.instance.starsLvl),this.progressScr.fillIcons(0,e),this.price.element.text=t.toString(),e>=5?(this.desc.element.text="MAXIMUM LEVEL!",this.price.enabled=!1,this.butmax.enabled=!0,this.lockedbut.enabled=!1,this.buybut.enabled=!1):(this.price.enabled=!0,this.butmax.enabled=!1,t<=Game.instance.stars?(this.price.element.color=this.whiteColor,this.buybut.enabled=!0):(this.price.element.color=this.redColor,this.buybut.enabled=!1),this.lockedbut.enabled=!this.buybut.enabled)},UishopField.prototype.update=function(t){this.updateValue()};var StarsCounter=pc.createScript("starsCounter");StarsCounter.attributes.add("totalNumber",{type:"boolean",default:!0}),StarsCounter.prototype.initialize=function(){this.curr=0,this.target=0,this.speed=1e3,this.totalNumber&&(this.curr=Game.instance.stars,this.target=this.curr)},StarsCounter.prototype.setCount=function(t,r){t>=0&&(this.curr=t),this.target=r},StarsCounter.prototype.update=function(t){this.totalNumber&&(this.target=Game.instance.stars),this.curr<this.target?(this.curr+=this.speed*t,this.curr>=this.target&&(this.curr=this.target)):this.curr>this.target&&(this.curr-=this.speed*t,this.curr<=this.target&&(this.curr=this.target)),this.entity.element.text=Math.round(this.curr).toString()};var Input=pc.createScript("input");function js_isIE(){var o=window.navigator.userAgent;return/MSIE|Trident/.test(o)}function js_isMobileOrTablet(){var o,t=!1;o=navigator.userAgent||navigator.vendor||window.opera,(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(o)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(o.substr(0,4)))&&(t=!0);var e=navigator.maxTouchPoints||"ontouchstart"in document.documentElement,n=void 0!==window.orientation;return t||(e||n)}Input.prevMouseX=0,Input.prevMouseY=0,Input.mouseDown=!1,Input.mouseDownPrev=!1,Input.mouseX=0,Input.mouseY=0,Input.mousePressed=!1,Input.prototype.postUpdate=function(o){Input.mousePressed=!1},Input.prototype.update=function(o){if(!1===Input.mouseDown&&!0===Input.mouseDownPrev&&(Input.mousePressed=!0,this.app.fire("input:mousepress")),!0===Input.mouseDown&&!0===Input.mouseDownPrev&&(Input.mouseX!=Input.prevMouseX||Input.mouseY!=Input.prevMouseY)){var t=Input.mouseX-Input.prevMouseX,e=Input.mouseY-Input.prevMouseY;this.app.fire("input:mouseswipe",t,e,o)}Input.prevMouseX=Input.mouseX,Input.prevMouseY=Input.mouseY,Input.mouseDownPrev=Input.mouseDown},Input.prototype.initialize=function(){this.app.touch&&(this.app.touch.on(pc.EVENT_TOUCHEND,this._onTouchEnd,this),this.app.touch.on(pc.EVENT_TOUCHSTART,this._onTouchStart,this),this.app.touch.on(pc.EVENT_TOUCHMOVE,this._onTouchMove,this)),this.app.mouse.on(pc.EVENT_MOUSEDOWN,this._onMouseDown,this),this.app.mouse.on(pc.EVENT_MOUSEUP,this._onMouseUp,this),this.app.mouse.on(pc.EVENT_MOUSEMOVE,this._onMouseMove,this)},Input.prototype._onTouchMove=function(o){var t=o.changedTouches[0];o.event.preventDefault(),Input.mouseX=t.x,Input.mouseY=t.y},Input.prototype._onTouchStart=function(o){var t=o.changedTouches[0];o.event.preventDefault(),Input.mouseX=t.x,Input.mouseY=t.y,Input.mouseDown=!0},Input.prototype._onTouchEnd=function(o){var t=o.changedTouches[0];o.event.preventDefault(),Input.mouseX=t.x,Input.mouseY=t.y,Input.mouseDown=!1},Input.prototype._onMouseMove=function(o){Input.mouseX=o.x,Input.mouseY=o.y},Input.prototype._onMouseDown=function(o){Input.mouseX=o.x,Input.mouseY=o.y,Input.mouseDown=!0},Input.prototype._onMouseUp=function(o){Input.mouseX=o.x,Input.mouseY=o.y,Input.mouseDown=!1};var Savefile=pc.createScript("savefile");Savefile.resetOnLoad=!1,Savefile.name="TigerRun3DSave",Savefile.autoSave=!0,Savefile.data={},Savefile.defData={},Savefile.addKey=function(e,a){Savefile.data[e]=a,Savefile.defData[e]=a},Savefile.reset=function(){for(var e in Savefile.data)Savefile.data[e]=Savefile.defData[e];Savefile.autoSave&&Savefile.save()},Savefile.load=function(){if(Savefile.resetOnLoad)Savefile.reset();else for(var e in Savefile.data)Savefile.data[e]=Savefile.cookieLoad(Savefile.name+e,Savefile.defData[e])},Savefile.save=function(){for(var e in Savefile.data)Savefile.cookieSave(Savefile.name+e,Savefile.data[e])},Savefile.get=function(e){if(e in Savefile.data)return Savefile.data[e];console.log("Savefile.get() - keyname doesn't exist: '"+e+"'")},Savefile.set=function(e,a){e in Savefile.data?Savefile.data[e]=a:(Savefile.addKey(e,a),console.log("Savefile.set() - keyname doesn't exist, new keyname added '"+e+"'")),Savefile.autoSave&&Savefile.cookieSave(Savefile.name+e,a)},Savefile.cookieSave=function(e,a){Savefile.setCookie(e,a.toString(),100)},Savefile.cookieLoad=function(e,a){var i=Savefile.getCookie(e);return i?Number(i):a},Savefile.setCookie=function(e,a,i){var f="";if(i){var t=new Date;t.setTime(t.getTime()+24*i*60*60*1e3),f="; expires="+t.toUTCString()}document.cookie=e+"="+(a||"")+f+"; path=/"},Savefile.getCookie=function(e){for(var a=e+"=",i=document.cookie.split(";"),f=0;f<i.length;f++){for(var t=i[f];" "==t.charAt(0);)t=t.substring(1,t.length);if(0===t.indexOf(a))return t.substring(a.length,t.length)}return null},Savefile.eraseCookie=function(e){document.cookie=e+"=; Max-Age=-99999999;"};var js_GS_gameIsReady=!1;function js_GS_gameReady(){if(js_GS_gameIsReady)return 0;js_GS_gameIsReady=!0,GAMESNACKS.gameReady(),console.log("GAMESNACKS : game ready!")}function js_GS_levelCompleted(e){GAMESNACKS.levelComplete(e),console.log("GAMESNACKS : level complete "+e.toString())}function js_GS_sendScore(e){GAMESNACKS.sendScore(e),console.log("GAMESNACKS : score sent "+e.toString())}function js_GS_gameOver(){GAMESNACKS.gameOver(),console.log("GAMESNACKS : game over")}var audioEnabled=!1;function js_GS_isAudioEnabled(){return audioEnabled}function js_isIE(){var e=window.navigator.userAgent;return/MSIE|Trident/.test(e)}function js_isMobileOrTablet(){var e,o=!1;e=navigator.userAgent||navigator.vendor||window.opera,(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(e)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0,4)))&&(o=!0);var a=navigator.maxTouchPoints||"ontouchstart"in document.documentElement,i=void 0!==window.orientation;return o||(a||i)}