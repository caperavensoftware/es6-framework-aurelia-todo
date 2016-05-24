export default class Ping {
    pingControl(element) {
        let rect = element.getBoundingClientRect();
        console.log(rect.top, rect.right, rect.bottom, rect.left);
        
        let pingContainer = new PingContainer(rect);
        pingContainer.play().then(() => {
           pingContainer.destroy();
           pingContainer = null; 
        });
    }
}

class PingContainer {
    constructor(rect) {
       this.createParentDiv(rect); 
    }
    
    createParentDiv(rect) {
        // add this to animation request
        
        this.parentDiv = document.createElement('div');
        this.parentDiv.style.position = 'absolute';
        this.parentDiv.style.top = rect.top;
        this.parentDiv.style.left = rect.left;
        this.parentDiv.style.width = rect.right - rect.left;
        this.parentDiv.style.height = rect.bottom - rect.top;
        this.parentDiv.style.background = "red";  
        
        document.body.appendChild(this.parentDiv);  
    }
        
    play() {
        return new Promise((resolve) => {
            setTimeout(() => {
               resolve();             
            }, 1000);
        });
    }
    
    destroy() {
        // add this to a anamation request
        
        while (this.parentDiv.firstChild) {
            this.parentDiv.removeChild(this.parentDiv.firstChild);
        }
        
        document.body.removeChild(this.parentDiv);
        this.parentDiv = null;
    }
}