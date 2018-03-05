(function(hashListener,jQ){
    var path = new pathing();

    function pathing(){
        this.stateConfigs = [];
        this.alternativeRoute = "";
        hashListener(this.stateConfigs,function(page){
            return new Promise(function(resolve,reject){
                jQ.ajax({
                    type:"GET",
                    DataType:"text",
                    url:page,
                    success:function(response){
                       //return resolve(response);
                       var portal = document.getElementsByTagName("div");
                       console.log(portal);
                       for(var i =0; i < portal.length; i++){
                            if(portal[i].getAttribute("portal") !== null){
                                portal[i].innerHTML = response;
                                break;
                            }
                       }
                       //return resolve(portal[0].i);
    
                    }
                })
            })
        });  
    }
    
    var proto = pathing.prototype;
    proto.path = function(config){
        this.stateConfigs.push(config);
        return this;
    }
    proto.show = function(){
        console.log(this.stateConfigs);
    }
    proto.alternative = function(alternativeRoute){
        this.stateConfigs.unshift({url:alternativeRoute});
        return this;
    }
    
    //routing.prototype = proto;
    window.routing = r = path;
})(function(states,loadPath){

 window.addEventListener("hashchange",function(){
        
            var hash= window.location.hash;
            
        for(var i =0;i< states.length;i++){
                if(hash === "#"+states[i].name || hash === "#/"+states[i].name){
                    var page = '',
                    url = '';
                    page = states[i].templateUrl;
                    url = states[i].url;
                }
            //if no state name is not found switch to alternative
                if(i === states.length -1 && page === undefined){
                    
                    url = states[0].url;
                    for(var j=0; j < states.length;j++){
                        if(url === states[j].url){
                            page = states[j].templateUrl;
                            window.location.hash = "/"+states[j].name;
                        }
                    }
                }       
        }
        //the users alternative is not correct then fallback to the first state
        if(page === undefined){
            page = states[1].templateUrl;
            url = states[1].url;
            window.location.hash =  "/"+states[1].name;
        }
        loadPath(page).then(function(response){
            //console.log(response);
        });
    }) 

    window.addEventListener("load",function(){
        var hash = window.location.hash;
        
        for(var i =0;i< states.length;i++){
            if(states[i].url === hash || states[i].url === "/"){
                var page = '',
                    url;
               window.location.hash = "/"+states[i].name;
               page = states[i].templateUrl;
               url = states[i].url;
                break;
            }
            //if no state name is not found switch to alternative
            if(i === states.length -1 && page === undefined){
                //console.log("end having found nothing");
                url = states[0].url;
                for(var j=0; j < states.length;j++){
                    if(url === states[j].url){
                        window.location.hash = "/"+states[j].name;
                        page = states[j].templateUrl;
                    }
                }
            }  
            
        } 
        //the users alternative is not correct then fallback to the first state
        if(page === undefined){
            page = states[1].templateUrl;
            url = states[1].url;
            window.location.hash =  "/"+states[1].name;
        }
        loadPath(page).then(function(response){
            //console.log(response);
        });
    })

    
    
},jQuery)
routing.path({url:"/",templateUrl:"templates/home.html",name:"home"})
       .path({url:"/contact",templateUrl:"templates/contact.html",name:"contact"})
       .path({url:"/about",templateUrl:"templates/about.html",name:"about"})
       .alternative("/about");
//routing.show();