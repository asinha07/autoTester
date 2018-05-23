# autoTester
APIs to test web pages

List of APIs:

1. Get <a> tags in the WebPage:
       ``` Request Type: GET
        Request path: /getUrls
        QueryParameter: url
        QueryValue: Complete URL with the protocol
        Response: 
                {
                  "urls":{
                    "correctUrls":[],
                    "failedUrls":[],
                    "otherDomainLinks":[]
                   }
                }```
