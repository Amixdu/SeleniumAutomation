const {Builder, Key, By} = require("selenium-webdriver");

const { Options: ChromeOptions } = require('selenium-webdriver/chrome');
const webdriver = require('selenium-webdriver');
var points = 0;


async function testHtmlOpen (){ 
    let driver = new Builder().forBrowser("chrome").build();
    await driver.get("D:\\Projects\\Selenium\\\Test_Chrome\\index.html");
    // await driver.findElement(By.name("q")).sendKeys("Hello", Key.RETURN);
};


// function to test initial birthday prompt
async function testBirthdayClick (){ 
    // disable cluttering
    const chromeOptions = new ChromeOptions();
    chromeOptions.excludeSwitches('enable-logging');

    // open html
    let driver = await new webdriver.Builder()
        .forBrowser("chrome")
        .setChromeOptions(chromeOptions)
        .build();

    await driver.get("D:\\Projects\\Selenium\\\Test_Chrome\\index.html");

    await driver.findElement(By.id("date")).click();

    // check if correct
    let value = driver.findElement(By.id("ageOutput")).getText();
    value.then(function(result){
        if (result == "Lemme guess, your age is..."){
            // console.log(result);
            points = points + 1;
            // console.log(points);
            // printPoints(points);
        }
    })

    // driver2.quit();
    testEnterBirthday();
};


// function to test birthday field prompt when date entered
async function testEnterBirthday(){

    // disable cluttering
    const chromeOptions = new ChromeOptions();
    chromeOptions.excludeSwitches('enable-logging');

    // open html
    let driver = await new webdriver.Builder()
        .forBrowser("chrome")
        .setChromeOptions(chromeOptions)
        .build();

    await driver.get("D:\\Projects\\Selenium\\\Test_Chrome\\index.html");


    // var webdriver = require('selenium-webdriver');
    // let driver3 = new Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
    // await driver3.get("D:\\Projects\\Selenium\\Test\\index.html");

    // type birthday
    let birthdayBox =  driver.findElement(By.id("date"));
    birthdayBox.sendKeys("08142001");

    // blur
    driver.findElement(By.id("right")).click();

    // check if correct
    let value = driver.findElement(By.id("ageOutput")).getText();
    value.then(function(result){
        if (result == "Your age is 20 years old!"){
            // console.log(result);
            points = points + 1;
            // console.log(points);
            // printPoints(points);
        }
    })

    // driver3.quit();
    testNoEnterBirthday();

};


// function to test birthday field prompt when date not entered
async function testNoEnterBirthday(){ 

    // disable cluttering
    const chromeOptions = new ChromeOptions();
    chromeOptions.excludeSwitches('enable-logging');

    // open html
    let driver = await new webdriver.Builder()
        .forBrowser("chrome")
        .setChromeOptions(chromeOptions)
        .build();

    await driver.get("D:\\Projects\\Selenium\\\Test_Chrome\\index.html");

    // click birthday box
    driver.findElement(By.id("date")).click();

    // blur
    driver.findElement(By.id("right")).click();

    // check if correct
    let value = driver.findElement(By.id("ageOutput")).getText();
    value.then(function(result){
        if (result == "Would you mind entering your birthday?"){
            // console.log(result);
            points = points + 1;
            console.log(points);
            // printPoints(points);
        }
    })

    // driver.close();

};


async function testBirthday(){

    // to remove cluttering
    const chromeOptions = new ChromeOptions();
    chromeOptions.excludeSwitches('enable-logging');

    // open html
    let driver = await new webdriver.Builder()
        .forBrowser("chrome")
        .setChromeOptions(chromeOptions)
        .build();

    await driver.get("D:\\Projects\\Selenium\\\Test_Chrome\\index.html");

    // test click
    await driver.findElement(By.id("date")).click();

    // check if correct
    let value = driver.findElement(By.id("ageOutput")).getText();
    value.then(function(result){
        if (result == "Lemme guess, your age is..."){
            // console.log(result);
            points = points + 1;
            // console.log(points);
            // printPoints(points);
        }
    })



    // test no input and unfocus
    // click birthday box
    driver.findElement(By.id("date")).click();

    // blur
    driver.findElement(By.id("right")).click();

    // check if correct
    value = driver.findElement(By.id("ageOutput")).getText();
    value.then(function(result){
        if (result == "Would you mind entering your birthday?"){
            // console.log(result);
            points = points + 1;
            // console.log(points);
            // printPoints(points);
        }
    })


    

    // test enter and unfocus
    // type birthday
    let birthdayBox =  driver.findElement(By.id("date"));
    birthdayBox.sendKeys("08142001");

    // blur
    driver.findElement(By.id("right")).click();

    // check if correct
    value = driver.findElement(By.id("ageOutput")).getText();
    value.then(function(result){
        if (result == "Your age is 20 years old!"){
            // console.log(result);
            points = points + 1;
            console.log(points);
            // printPoints(points);
        }
    })


    
}

function printPoints(points){
    console.log(points);
}



// testHtmlOpen();
testBirthday();
// testBirthdayClick();
// testEnterBirthday();
// testNoEnterBirthday();



