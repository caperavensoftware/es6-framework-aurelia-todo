/*jshint strict: false */
// https://www.npmjs.com/package/xmldom

import through from 'through2';
import gutil from 'gulp-util';
import xml from 'xmldom';
import path from 'path';

const DomParser = xml.DOMParser;
const PluginError = gutil.PluginError;
const File = gutil.File;

class SvgConcat {
    constructor() {
        this.images = [];
    }
    
    add(file, contents) {
        let fileName = file.split('.')[0];
        let content = this.getSvgContent(String(contents));
        
        this.images.push({
            name: fileName,
            data: content
        });
    }
    
    getSvgContent(svgString) {       
        let doc = new DomParser().parseFromString(svgString);
        
        let styleElement = doc.getElementsByTagName("svg");
        
        if (!styleElement) {
            throw "no style element found";
        }
        
        if (!styleElement[0].hasChildNodes) {
            throw "svg is empty";
        }
        
        let childNodes = styleElement[0].childNodes;
        
        let result = "";        

        for (let i = 0; i < childNodes.length; i++) {
            let childNode = childNodes[i];
            if (childNode.tagName !== undefined) {
                if (childNode.hasAttribute('style')) {
                    childNode.removeAttribute('style');
                }
                
                if (childNode.hasAttribute('fill')) {
                    childNode.removeAttribute('fill');
                }

                result += String(childNode);
            }
        }            
                       
        return result;        
    }
    
    getContent() {
        return JSON.stringify({
            images: this.images
        });
    }
}

module.exports = function(file) {
   if (!file) {
       throw new PluginError('svg-json', 'Missing file option for svg-json');
   }    

   let concat = null;     
   
   function bufferContents(file, enc, cb) {
       if (file.isNull()) {
           cb();
           return;
       }
       
       if (!concat) {
           concat = new SvgConcat();
       }
       
       concat.add(file.relative, file.contents);
       
       cb();       
   }
   
   function endStream(cb) {
       let joinedFile = new File(file);
       joinedFile.path = `./${file}`;
       let stringResult = concat.getContent();

       joinedFile.contents = new Buffer(stringResult);
              
       this.push(joinedFile);
       cb();
   }
   
   return through.obj(bufferContents, endStream);
};