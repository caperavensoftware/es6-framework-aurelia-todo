import * as icons from './icons.json!json';

export class SvgStore {
    findItemByName(name) {
        let icon = icons.images.find((image) => {
            return image.name === name;
        });     
        
        return icon;   
    }    
}