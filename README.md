# web crawler
A web crawler for a code challenge.


To start run `node server`.

Lauch a web browser to `http://localhost:8081/crawl`.

Will crawl the urls in the crawl.json and fill out and submit the forms that are set.

## The crawl.json
The configs are done in the `crawl.json`.
```
"sites": [
        {
            "url": "http://testing-ground.scraping.pro/login",
            "origin": "http://testing-ground.scraping.pro",
            "forms": [
                {
                    "inputs": {
                        "usr": "admin",
                        "pwd": "12345"
                    },
                    "result": {
                        "element": "h3",
                        "attr": "class"
                    }
                }
            ]
        }
    ]
```

First node is the sites level. It is a list of urls to crawl.

It has a `url` child with a value of the url.  
Another child is the `origin`. It would be the main url that will be added to all of the forms actions.  
The `forms` child holds a list of forms to be filled out. Well it would if it would be improved.  
The `forms` has a child `inputs` which is a list of key: value of the html elements to submit with the form.  
The `forms` has a child `result` which is a object. 
This object has a `element` property with the value being the element to parse from the post response. 
It also has a `attr` property which is what attribute to log. 

Currently the log is "{attr value} response {element value} of the post response.