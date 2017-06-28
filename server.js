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

app.listen('8081');

console.log('Listen for port 8081');

exports = module.exports = app;

/**
 * fill out a given form with the object data.
 * @param {*} html the html form 
 * @param {*} site the site data that holds forms.
 */
function fillform(html, site) {
    var $ = cheerio.load(html);
    var origin = site.origin;
    site.forms.forEach(function (form) {
        var postAction = $('form').attr('action');
        var url = `${origin}/${postAction}`;
        request.post({ url: url, form: form.inputs }, function optionalCallback(err, httpResponse, body) {
            if (err) {
                return console.error('upload failed:', err);
            }
            scrapper(body, form);
        });
    })
}

/**
 * Scrap html and pull out data. Logs h3 attributes
 * @param {*} html the html to scrape
 * @param {*} form a form that would have the needed data.
 */
function scrapper(html, form) {
    var $ = cheerio.load(html);
    var result = form.result;
    var element = $(result.element);
    var attr = element.attr(result.attr);
    console.log(`${attr} response ${element.text()}`);
}