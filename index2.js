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
            console.log("Age click prompt : correct")
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
            console.log("Request age when input is empty : correct")
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
            console.log("Age display : correct")
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
            console.log("Name click prompt : correct")
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
            console.log("Ask for name when input is empty : correct")
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
            console.log("Name display : correct")
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

async function hover(id){
    // to remove cluttering
    const chromeOptions = new ChromeOptions();
    chromeOptions.excludeSwitches('enable-logging');

    // open html
    let driver = await new webdriver.Builder()
        .forBrowser("chrome")
        .setChromeOptions(chromeOptions)
        .build();
    await driver.get("D:\\Projects\\Selenium\\\Test_Chrome\\index.html");

    // testing hover

    // pre
    let preHover = await driver.findElement(By.id(id)).getCssValue("background-color");
    // console.log(preHover)


    let html = driver.findElement(By.id(id));
    const actions = driver.actions({ bridge: true });
    actions.move({duration: 100, origin: html}).perform();

    // post
    let postHover = await driver.findElement(By.id(id)).getCssValue("background-color");
    // console.log(postHover)

    // move mouse away
    let right = driver.findElement(By.id("right"));
    actions.move({duration: 100, origin: right}).perform();

    let postHoverTwo = await driver.findElement(By.id(id)).getCssValue("background-color");

    // check if colours change correctly
    if (preHover == postHoverTwo && postHover == "rgba(200, 35, 51, 1)"){
        // points = points + 1
        // console.log("Colour change on hover : works")
        // console.log(points)
        return true
    }
}






async function testSkills(){
    // to remove cluttering
    const chromeOptions = new ChromeOptions();
    chromeOptions.excludeSwitches('enable-logging');

    // open html
    let driver = await new webdriver.Builder()
        .forBrowser("chrome")
        .setChromeOptions(chromeOptions)
        .build();
    await driver.get("D:\\Projects\\Selenium\\\Test_Chrome\\index.html");

    // testing hover
    if (hover("html") && hover("css") && hover("javascript")){
        points = points + 1;
        console.log("Colour change on skill buttons hover : correct")
        console.log(points);
    }
    else{
        console.log("Check colour changes on skill button hover")
    }



}




function later(delay) {
    return new Promise(function(resolve) {
        setTimeout(resolve, delay);
    });
}

async function main(){
    await testBirthday();
    await testName();
    await testTheme();
    testSkills();
    // await later(10);
    // console.log("final: " + points);
}


main();
