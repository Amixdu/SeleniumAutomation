const {Builder, Key, By, ChromeOptions} = require("selenium-webdriver");
var points = 0;


async function testHtmlOpen (){ 
    let driver = new Builder().forBrowser("chrome").build();
    await driver.get("D:\\Projects\\Selenium\\Test\\index.html");
    // await driver.findElement(By.name("q")).sendKeys("Hello", Key.RETURN);
};


// function to test initial birthday prompt
async function testBirthdayClick (){ 
    let driver2 = new Builder().forBrowser("chrome").build();
    await driver2.get("D:\\Projects\\Selenium\\Test\\index.html");
    await driver2.findElement(By.id("date")).click();

    // check if correct
    let value = driver2.findElement(By.id("ageOutput")).getText();
    value.then(function(result){
        if (result == "Lemme guess, your age is..."){
            // console.log(result);
            points = points + 1;
            console.log(points);
            // printPoints(points);
        }
    })

    // driver2.quit();
};


// function to test birthday field prompt when date entered
async function testEnterBirthday(){

    // open html
    let driver3 = new Builder().forBrowser("chrome").build();
    await driver3.get("D:\\Projects\\Selenium\\Test\\index.html");

    // var webdriver = require('selenium-webdriver');
    // let driver3 = new Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
    // await driver3.get("D:\\Projects\\Selenium\\Test\\index.html");

    // type birthday
    let birthdayBox =  driver3.findElement(By.id("date"));
    birthdayBox.sendKeys("08142001");

    // blur
    driver3.findElement(By.id("right")).click();

    // check if correct
    let value = driver3.findElement(By.id("ageOutput")).getText();
    value.then(function(result){
        if (result == "Your age is 20 years old!"){
            // console.log(result);
            points = points + 1;
            console.log(points);
            // printPoints(points);
        }
    })

    // driver3.quit();

};


// function to test birthday field prompt when date not entered
async function testNoEnterBirthday(){ 
    // open html
    let driver4 = new Builder().forBrowser("chrome").build();
    await driver4.get("D:\\Projects\\Selenium\\Test\\index.html");

    // click birthday box
    driver4.findElement(By.id("date")).click();

    // blur
    driver4.findElement(By.id("right")).click();

    // check if correct
    let value = driver4.findElement(By.id("ageOutput")).getText();
    value.then(function(result){
        if (result == "Would you mind entering your birthday?"){
            // console.log(result);
            points = points + 1;
            console.log(points);
            // printPoints(points);
        }
    })

    // driver4.close();

};


function printPoints(points){
    console.log(points);
}



// testHtmlOpen();
testBirthdayClick();
testEnterBirthday();
testNoEnterBirthday();



