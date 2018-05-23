const puppeteer = require('puppeteer');
async function testLvpPage(url){
    console.log(url);
    const result = {};
    let browser = await puppeteer.launch();
    let page = await browser.newPage();
    await page.setViewport({width: 1200, height: 900});
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

module.exports = {
    testLvpPage : testLvpPage
}