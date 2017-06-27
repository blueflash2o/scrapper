var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var jsonfile = require('jsonfile');
var app = express();

app.get('/crawl', function (req, res) {

    var crawl = "crawl.json";
    jsonfile.readFile(crawl, function (err, obj) {
        obj.sites.forEach(function (element) {
            request(element.url, function (error, response, html) {
                fillform(html, element);

            });
        }, this);
    });
    res.send('Check your console!');
})

app.listen('8081')

console.log('Listen on port 8081');

exports = module.exports = app;

function fillform(html, site) {
    //console.log(site);
    request.debug = true;
    var $ = cheerio.load(html);
    var origin = site.origin;
    site.forms.forEach(function (form) {
        console.log(form);
        var postAction = $('form').attr('action');
        var url = `${origin}/${postAction}`;
        // var formData = new FormData();
        // form.inputs.forEach(function(input){
        //     formData.append(input.id, input.value);
        // });
        request.post({ url: url, form: form.inputs }, function optionalCallback(err, httpResponse, body) {
            if (err) {
                return console.error('upload failed:', err);
            }
            //console.log('Upload successful!  Server responded with:', body);
            scrapper(body, form);
        });
    })
    console.log($('form').attr('action'));
    var forms = $('forms');
    //console.log(forms);
}

function scrapper(html, form) {
    var $ = cheerio.load(html);
    var h3 = $('h3');
    var rc = h3.attr("class");
    console.log(`${h3.attr("class")} response ${h3.text()}`);
    // if(rc == 'success'){
    //     console.log(`success response ${h3.text()}`);
    // } else if( rc == 'error'){
    //     console.log(`error response ${h3.text()}`);
    // }
}