/*jshint strict: false */

import through from 'through2';
import gutil from 'gulp-util';
import xml from 'xmldom';

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
        // https://www.npmjs.com/package/xmldom
        console.log(doc);
        
        return svgString;        
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
       
       console.log(concat.getContent());
       cb();       
   }
   
   function endStream(cb) {
       cb();
   }
   
   return through.obj(bufferContents, endStream);
};