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
        await page.waitForSelector('#hnmain > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(2) > td.subtext > a:nth-child(6)') //selector for num of comments on main page of hackernews 

        //create a new variable called comments
        //  which makes a new array called nodeList whih selects all the comment links from hackernews 
        var comments = await page.evaluate(() => {
            var nodeList = new Array();
            var n = 2
            for (i = 0; i<=30; i++){
                nodeList[i] = document.querySelector('#hnmain > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(' +n+ ') > td.subtext > a:nth-child(6)'); 
                n += 3; 
            }
        //create a new variable called dataArray which is an array 
        //  it iterates from 0 to the the end of the nodeList (which stores all the links)
        //  if the post has no comments, print in the dataArray "null"
        //  if the post has comments, then also print in the dataArray, but show the comment number and the full link 
            var dataArray = new Array(); 
            for (k =0; k<nodeList.length-1; k++){
                if (nodeList[k]== null || nodeList[k].innerText.trim()=="discuss"){
                    dataArray[k] = {
                        commentNumber: "null",
                        link: "null",
                    };
                }
                else {
                    dataArray[k] = {
                    counter: k, 
                    commentNumber: nodeList[k].innerText.trim(),
                    link: nodeList[k].getAttribute("href"),
                    };
                }
            }

            return dataArray;
        }); 

        //click on each page and on each page wait for the selector that loads how many comments are on the page 
        //loop through an interator of the length of comments and each time collect the next comments 

        // #\32 0706719 > td > table > tbody > tr > td.default > div.comment <- selector for each of the comments 
        // #\32 0706799 > td > table > tbody > tr > td.default > div.comment 
        // #\32 0706750 > td > table > tbody > tr > td.default > div.comment
        // #\32 0706836 > td > table > tbody > tr > td.default > div.comment
        // #\32 0706722 > td > table > tbody > tr > td.default > div.comment

        // #\32 0706719 > td > table > tbody > tr > td.default > div.comment > span
        // #\32 0706719 > td > table > tbody > tr > td.default > div.comment > span > p
        // #\32 0706799 > td > table > tbody > tr > td.default > div.comment > span 

        // #\32 0706719 > td > table > tbody > tr > td.default
        // #\32 0706799 > td > table > tbody > tr > td.default 
        // #\32 0706750 > td > table > tbody > tr > td.default

        for (j=0; j<comments.length-1; j++){ //click each 
            await page.goto('https://news.ycombinator.com/' +comments[j].link, {waitUntil: "networkidle2"}); 
            var commtext = await page.waitForSelector('#hnmain > tbody > tr:nth-child(3) > td > table.fatitem > tbody > tr:nth-child(2) > td.subtext > a:nth-child(9)'); //number of comments at the top of the comment page 
            const text = page.evaluate(() => document.querySelector('.commtext c00').innerText); 
            // for (a=0; a<commentloop.length-1; a++){

            // }
        }
        
        // for (j=0; j<comments.length-1; j++){
        //     const found = await page.evaluate(() => window.find("biomes"));
        //     await page.goto('https://news.ycombinator.com/' +comments[j].link, {waitUntil: "networkidle2"}); 
        //     if (found == false){
        //         console.log()
        //     }
        //     else {
        //         console.log('https://news.ycombinator.com/' + comments[j].link + '---->' + found)
        //     }
        // }

        fs.writeFile("commentList.json", JSON.stringify(comments), function(err) {
            if (err) throw err; 
            console.log("Saved!"); 
        });
        
        await browser.close();
        
    } catch (error){
        console.log('error', error); 
    }
}) (); 

for (j=0; j<comments.length-1; j++){ //click each 
    await page.goto('https://news.ycombinator.com/' +comments[j].link, {waitUntil: "networkidle2"}); 
    var commtext = await page.waitForSelector('#hnmain > tbody > tr:nth-child(3) > td > table.fatitem > tbody > tr:nth-child(2) > td.subtext > a:nth-child(9)'); //number of comments at the top of the comment page 
    const text = page.evaluate(() => document.querySelector('.commtext c00').innerText); 
    // for (a=0; a<commentloop.length-1; a++){

    // }
}

(async () => {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        headless: false
    }); 
    var commentlinks = await 


    // Create an array of all the number of comments 
    // for each element of the array, go through and iterate through and take the body text  
    
})