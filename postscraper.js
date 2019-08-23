const puppeteer = require ("puppeteer"); 
var fs = require("fs"); 

( async () => {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        headless: false
    }); 
    try{
        var page = await browser.newPage();
        await page.goto('https://news.ycombinator.com/', {waitUntil: "networkidle2"}); 
        await page.waitForSelector('td.subtext');
        await page.waitForSelector('#hnmain > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(2) > td.subtext > a:nth-child(6)')

        var comments = await page.evaluate(() => {
            var nodeList = new Array();
            var n = 2
            for (i = 0; i<=30; i++){
                nodeList[i] = document.querySelector('#hnmain > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(' +n+ ') > td.subtext > a:nth-child(6)'); 
                n += 3; 
            }
            return nodeList
        });

        for(v = 0; v < comments.length-1; v++){
            await page.goto(`https://news.ycombinator.com/` + comments[v].link, {waitUntil: "networkidle2"});
            const match = await page.evaluate(() => window.find("bots"));
            if (match == true){
              console.log(`https://news.ycombinator.com/` + comments[v].link + ' --> ' + match);
            }
            else{
              //console.log();
            }
          }

        fs.writeFile("commentList2.json", JSON.stringify(comments), function(err) {
            if (err) throw err; 
            console.log("Saved!"); 
        });
        
        await browser.close();
        
    } catch (error){
        console.log('error', error); 
    }
}) (); 