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

2. Get Performance of all the resources in the WebPage:
       ``` Request Type: GET
        Request path: /getPerformanceMap
        QueryParameter: url
        QueryValue: Complete URL with the protocol
        Response: 
                {
                  "resourcePerformanceMap":[
                    {
                      "timeTake" : duration taken for loading the resource,
                      "resourceType": "Type of resource => js/script/img",
                      "resourceUrl" : "Location from where resource is being loaded"
                    }
                  ]
                }```
