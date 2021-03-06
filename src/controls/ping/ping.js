/*
    JHR:
    The first time ping is used, initialize it so that it lives as a singleton and stays in the dom.
    The next time ping is used, it will not cost dom time because it is already in the dom, it will just use the existing dom for the new location
*/

import 'TweenMax';

export default class Ping {
    pingControl(element, options) {
        let rect = element.getBoundingClientRect();
        
        if (!this.pingContainer) {
            this.pingContainer = new PingContainer();            
        }
                
        this.pingContainer.play(rect, options).then(() => {
           this.pingContainer.destroy();
        });
    }
}

class PingContainer {   
    constructor() {
       this.namespace = 'http://www.w3.org/2000/svg';
       this.createParent(); 
    }
    
    createParent() {
        if (!this.parent) {
            this.createParentSvg();
            this.createCircleSvg();

            document.body.appendChild(this.parent);                  
        }
    }
    
    setLocation(rect, color) {
        return new Promise(function(resolve){
            requestAnimationFrame(() => {                               
                let parentWidth = rect.right - rect.left;
                let parentHeight = rect.bottom - rect.top;
                
                this.parent.style.top = rect.top;
                this.parent.style.left = rect.left;
                this.parent.style.zIndex = 100000;
                this.parent.setAttributeNS(null, 'width', `${parentWidth}px`);
                this.parent.setAttributeNS(null, 'height', `${parentHeight}px`);
                
                this.circle.setAttributeNS(null, 'cx', parentWidth / 2);
                this.circle.setAttributeNS(null, 'cy', parentHeight / 2);
                this.circle.setAttributeNS(null, 'r', 0);    
                this.circle.setAttributeNS(null, 'opacity', 1); 
                this.circle.setAttributeNS(null, 'fill', color);
                
                this.animationRadius = parentWidth;
                this.parent.style.visibility = "visible";
                
                resolve();            
            });            
        }.bind(this));
    }
    
    createParentSvg() {
        this.parent = document.createElementNS(this.namespace, 'svg');            
        this.parent.style.position = 'absolute';
        this.parent.id = "pingRect";        
    }
    
    createCircleSvg() {
        this.circle = document.createElementNS(this.namespace, 'circle');         
        this.parent.appendChild(this.circle);        
    }
        
    play(rect, options) {
        if (this.tween && window.TweenMax.isTweening()) {
            window.TweenMax.killAll();
            this.tween = null;
        }
        
        let color = "#1fbcd2";
        let easeFunction = Power4.easeOut;
        
        if (options) {
            if (options.color) {
                color = options.color;                
            }
            
            if (options.ease) {
                easeFunction = options.ease;
            }
        }        
                
        return new Promise(function(resolve) {            
            this.setLocation(rect, color).then(() => {
                let animationDetails = {
                    attr: {
                        opacity: 0,
                        r: this.animationRadius
                    },
                    ease: easeFunction,
                    onComplete: resolve
                };
                
                this.tween = window.TweenMax.to(this.circle, 1, animationDetails);
            });
        }.bind(this));        
    }
    
    destroy() {
        this.tween = null;       
        requestAnimationFrame(() => {     
            this.parent.style.visibility = "collapse";
        });
    }
}