const puppeteer = require('puppeteer');
async function testPageUrls(url){
    console.log(url);
    const result = {};
    let browser = await puppeteer.launch({
        ignoreHTTPSErrors : true
    });
    let page = await browser.newPage();
    const response = await page.goto(url);
    let l = await page.evaluate((() => {
        let linksObject = {};
        let linksArray = [];
        let otherDomainLinks = [];
        let links = document.links;
        console.log(links.length);
        for(let i =0 ; i<links.length; i++){
            if(!links[i].href.includes('javascript') && links[i].href != document.URL && links[i].href.includes(document.location.origin)){
                linksArray.push(links[i].href);
            }
            else if(!links[i].href.includes('javascript') && links[i].href != document.URL){
                otherDomainLinks.push(links[i].href);
            }
        }
        linksArray =  linksArray.filter(function(elem,pos){
            return linksArray.indexOf(elem) == pos;
        });
        linksObject.linksArray = linksArray;
        linksObject.otherDomainLinks = otherDomainLinks;
        return linksObject;
    }));
    let failedUrls = await getInvalidUrls(l.linksArray,browser);
    result.urls = failedUrls;
    result.urls.otherDomainLinks = l.otherDomainLinks;
    browser.close();
    return result;
}

async function getInvalidUrls(urls,browser){
    let urlsResponse = {};
    let failedUrls = [];
    let correctUrls = [];
    for(var i=0; i<urls.length; i++){
        try{
            const page = await browser.newPage();
            const response = await page.goto(urls[i]);
            if(response.status() != 200){
                failedUrls.push(urls[i]);
                console.log(urls[i]+": --> Failed");
            }
            else{
                correctUrls.push(urls[i]);
                console.log(urls[i]+": --> Success");
            }
            await page.close();
        }
        catch(err){
            failedUrls.push(urls[i]);
            console.log(urls[i]+": --> Failed");
        }
    }
    urlsResponse.correctUrls = correctUrls;
    urlsResponse.failedUrls = failedUrls;
    return urlsResponse;
}

async function checkResourcePerformance(url){
    console.log(url);
    let browser = await puppeteer.launch({
        ignoreHTTPSErrors : true
    });
    let page = await browser.newPage();
    await page.goto(url);
    let returnArray = await page.evaluate(() => {
        let returnArray = [];
        let performanceMap = window.performance.getEntriesByType('resource');
        console.log(performanceMap);
        for(var i=0; i<performanceMap.length; i++){
            let responseObj = {};
            responseObj.timeTake = performanceMap[i].duration;
            responseObj.resourceType = performanceMap[i].initiatorType;
            responseObj.resourceUrl = performanceMap[i].name;
            returnArray.push(responseObj);
        }
        return returnArray;
    })
    let response = {};
    response.resourcePerformanceMap = returnArray;
    browser.close();
    return response;
}

module.exports = {
    testPageUrls : testPageUrls,
    checkResourcePerformance : checkResourcePerformance
}