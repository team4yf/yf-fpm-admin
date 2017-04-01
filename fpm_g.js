var nunjucks = require('nunjucks');
var _ = require('lodash');
var async = require('async');
var path = require('path');
var fs = require('fs');

var arguments = process.argv.splice(2);
var name = arguments[0];
var data = {name: _.upperFirst(name)};
console.log(data);
async.auto({
  'mkdir': function(callback){
    var dir = path.join('src', 'comps', name);
    fs.mkdir( dir, function(err){
      callback(err, dir );
    })
  },
  'templates': async.apply(fs.readdir, 'src_template'), 
  'render': ['templates', function(rst, callback){
    var codes = [];
    async.each(rst.templates, 
      function(file, cb){
        fs.readFile(path.join('src_template', file), 'utf8', function(err, content){
          if(err){
            cb(err);
            return;
          }
          var code = nunjucks.renderString(content, data);
          codes.push({file: file, code: code});
          cb(null);
        })
      }, 
      function(err){
        console.log(err)
        callback(err, codes);
      })
  }],
  'write':['mkdir', 'render', function(rst, callback){
    var dir = rst.mkdir;
    console.log(dir);
    var codes = rst.render;
    async.each(codes, 
      function(code, cb){
        fs.writeFile(path.join(dir, code.file), code.code, cb)
      },
      callback)
  }], function(err, results){
    console.log(err);
    console.log(results);
  }

})

