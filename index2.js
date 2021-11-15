const {Builder, Key, By} = require("selenium-webdriver");

const { Options: ChromeOptions } = require('selenium-webdriver/chrome');
const webdriver = require('selenium-webdriver');
var points = 0;

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


async function testName(){

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
    await driver.findElement(By.id("name")).click();

    // check if correct
    let value = driver.findElement(By.id("nameOutput")).getText();
    value.then(function(result){
        if (result == "Hello there! What is your name?"){
            // console.log(result);
            points = points + 1;
            // console.log(points);
            // printPoints(points);
        }
    })



    // test no input and unfocus
    // click name box
    driver.findElement(By.id("name")).click();

    // blur
    driver.findElement(By.id("right")).click();

    // check if correct
    value = driver.findElement(By.id("nameOutput")).getText();
    value.then(function(result){
        if (result == "Would you mind entering your name?"){
            // console.log(result);
            points = points + 1;
            // console.log(points);
            // printPoints(points);
        }
    })


    

    // test input and unfocus
    // type birthday
    let birthdayBox =  driver.findElement(By.id("name"));
    birthdayBox.sendKeys("TestName");

    // blur
    driver.findElement(By.id("right")).click();

    // check if correct
    value = driver.findElement(By.id("nameOutput")).getText();
    value.then(function(result){
        if (result == "Hi, TestName!"){
            // console.log(result);
            points = points + 1;
            console.log(points);
            // printPoints(points);
        }
    })
}



testBirthday();
testName();
