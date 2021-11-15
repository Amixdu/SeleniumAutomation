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
            console.log("Age click prompt works")
            console.log(points);
            // printPoints(points);
        }
        else{
            console.log("Check prompt when age box is clicked")
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
            console.log("Request age when input is empty : works")
            points = points + 1;
            console.log(points);
            // printPoints(points);
        }
        else{
            console.log("Check request when date box is empty")
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
            console.log("Age display works")
            points = points + 1;
            console.log(points);
            // printPoints(points);
        }
        else{
            console.log("Check age display")
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
            console.log("Name click prompt : works")
            points = points + 1;
            console.log(points);
            // printPoints(points);
        }
        else{
            console.log("Check name prompt")
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
            console.log("Ask for name when input is empty : works")
            points = points + 1;
            console.log(points);
            // printPoints(points);
        }
        else{
            console.log("Check name request message for empty input")
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
            console.log("Name display works")
            points = points + 1;
            console.log(points);
            // printPoints(points);
        }
        else{
            console.log("Check name display")
        }
    })
}


async function testTheme(){

    // to remove cluttering
    const chromeOptions = new ChromeOptions();
    chromeOptions.excludeSwitches('enable-logging');

    // open html
    let driver = await new webdriver.Builder()
        .forBrowser("chrome")
        .setChromeOptions(chromeOptions)
        .build();
    await driver.get("D:\\Projects\\Selenium\\\Test_Chrome\\index.html");


    // test click to dark mode
    await driver.findElement(By.id("dark")).click();

    
    // check if message is correct
    let value = driver.findElement(By.id("themeOutput")).getText();
    value.then(function(result){
        if (result == "You chose Dark mode!"){
            points = points + 1;
            console.log("Dark Mode selection : message is correct");
            console.log(points);
        }
        else{
            console.log("Check message when dark mode selected");
        }
    })


    // test display colour when changing to dark mode
    let displayColour = driver.findElement(By.id("right")).getCssValue("background-color");
    displayColour.then(function(result){
        if (result == "rgba(52, 58, 64, 1)"){
            points = points + 1;
            console.log("Dark Mode selection : colour is correct");
            console.log(points);
        }
        else{
            console.log("Check colour when dark mode selected");
        }
        
    })
    


    // test click to light mode
    await driver.findElement(By.id("light")).click();


    // check if message is correct
    value = driver.findElement(By.id("themeOutput")).getText();
    value.then(function(result){
        if (result == "You chose Light mode!"){
            points = points + 1;
            console.log("Light Mode selection : message is correct");
            console.log(points);
        }
        else{
            console.log("Check message when light mode selected");
        }
    })

    // test display colour when changing to light mode
    displayColour = driver.findElement(By.id("right")).getCssValue("background-color");
    displayColour.then(function(result){
        if (result == "rgba(248, 249, 250, 1)"){
            points = points + 1;
            console.log("Light Mode selection : colour is correct");
            console.log(points);
        }
        else{
            console.log("Check colour when light mode selected");
        }
        
    })

    
}

async function main(){
    await testBirthday();
    await testName();
    testTheme();
    // console.log(points);
}


main();
