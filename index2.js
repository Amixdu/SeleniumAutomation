const {Builder, Key, By} = require("selenium-webdriver");

const { Options: ChromeOptions } = require('selenium-webdriver/chrome');
const webdriver = require('selenium-webdriver');
var points = 0;


// to remove cluttering
const chromeOptions = new ChromeOptions();
chromeOptions.excludeSwitches('enable-logging');

// open html
let driver = new webdriver.Builder()
    .forBrowser("chrome")
    .setChromeOptions(chromeOptions)
    .build();

driver.get("D:\\Projects\\Selenium\\\Test_Chrome\\index.html");

async function testBirthday(){

    // test click

    // get text before click
    let initial = driver.findElement(By.id("ageOutput")).getText();

    // clicking birthday
    await driver.findElement(By.id("date")).click();

    // check if correct

    // obtain the value displayed on the right side
    let prompt = await driver.findElement(By.id("ageOutput")).getText();


    // check if text has been changed due to click
    if (prompt != initial){
        console.log("Age click prompt : correct")
        points = points + 1;
        console.log(points);
        // printPoints(points);
    }
    else{
        console.log("Check prompt when age box is clicked")
    }



    // test no input and unfocus
    // click birthday box
    driver.findElement(By.id("date")).click();

    // blur
    driver.findElement(By.id("right")).click();

    // get text on input box
    let reqPrompt = await driver.findElement(By.id("ageOutput")).getText();


    // check if blurring triggers a new message on text box
    if ((reqPrompt != initial) && (reqPrompt != prompt)){
        console.log("Request age when input is empty : correct")
        points = points + 1;
        console.log(points);
    }
    else{
        console.log("Check request when date box is empty")
    }


    // test enter and unfocus
    // type birthday
    let birthdayBox =  driver.findElement(By.id("date"));
    birthdayBox.sendKeys("08142001");

    // blur
    driver.findElement(By.id("right")).click();

    // obtain the age display message (the output message)
    let nameOutput = await driver.findElement(By.id("ageOutput")).getText();

    // check if correct age is displayed (the age should be 20 for entered date)
    if (nameOutput.includes("20")){
        console.log("Age display : correct")
        points = points + 1;
        console.log(points);
    }
    else{
        console.log("Check age display")
    }

}


async function testName(){
    // test click

    // get text before click
    let initial = driver.findElement(By.id("nameOutput")).getText();

    // clicking name
    await driver.findElement(By.id("name")).click();

    // check if correct

    // obtain the value displayed on the right side
    let prompt = await driver.findElement(By.id("nameOutput")).getText();
   
    // check if text has been changed due to click
    if (prompt != initial){
        console.log("Name click prompt : correct")
        points = points + 1;
        console.log(points);
        // printPoints(points);
    }
    else{
        console.log("Check name prompt")
    }
    

    // test no input and unfocus
    // click name box
    driver.findElement(By.id("name")).click();

    // blur
    driver.findElement(By.id("right")).click();

    // get text on input box
    let reqPrompt = await driver.findElement(By.id("nameOutput")).getText();

    // check if blurring triggers a new message on text box
    if ((reqPrompt != initial) && (reqPrompt != prompt)){
        console.log("Ask for name when input is empty : correct")
        points = points + 1;
        console.log(points);
    }
    else{
        console.log("Check name request message for empty input")
    }


    // test input and unfocus
    // type name
    let nameBox =  driver.findElement(By.id("name"));
    nameBox.sendKeys("TestName");

    // blur
    driver.findElement(By.id("right")).click();

    // obtain the greeting message (the output message)
    let nameOutput = await driver.findElement(By.id("nameOutput")).getText();

    // check if output message includes the entered name ('TestName' was entered to the input so the same name should be included in greeting)
    if (nameOutput.includes("TestName")){
        console.log("Name display : correct")
        points = points + 1;
        console.log(points);
    }
    else{
        console.log("Check name display")
    }

}


async function testTheme(){

    // get text before click
    let initial = driver.findElement(By.id("skillsOutput")).getText();

    // test click to dark mode
    await driver.findElement(By.id("dark")).click();

    // obtain the value displayed on the right side
    let message = await driver.findElement(By.id("skillsOutput")).getText();
    
    // check if text has the word 'Dark'
    if ((message != initial) && (message.includes("Dark"))){
        points = points + 1;
        console.log("Dark Mode selection : message is correct");
        console.log(points);
    }
    else{
        console.log("Check message when dark mode selected");
        console.log(message)
    }
    


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

async function getRightSkills(){
    let skills = await driver.findElement(By.id('skillsOutput'));
    let skillsArray = await skills.findElements(By.xpath(".//*"));
    return skillsArray;
}

async function getLeftSkills(){
    let leftSkills = await driver.findElement(By.id('left'));
    let leftSkillsArray = await leftSkills.findElements(By.xpath(".//*"));
    return leftSkillsArray;
}

async function testMove(){
    // let right = await driver.findElement(By.id("right"));
    // let left = await driver.findElement(By.id("left"));

    let html = await driver.findElement(By.id('html'));
    

    let js = await driver.findElement(By.id('javascript'));
    let css = await driver.findElement(By.id('css'));

    // check if html button moves correctly

    // click button
    await html.click();

    // get skills on both sides
    let right = await getRightSkills();
    let left = await getLeftSkills();

    // checking if button moved to right side
    let foundRight = false;
    for (let i = 0; i < right.length; i ++){
        let res = await right[i].getText();
        if (res == "HTML"){
            foundRight = true;
        }
    }

    if (foundRight == false){
        console.log("HTML button not moved to right side")
    }

    // checking if button removed from left side
    let foundLeft = false;
    for (let i = 0; i < left.length; i ++){
        let res = await left[i].getText();
        if (res == "HTML"){
            foundLeft = true;
        }
    }

    if (foundLeft){
        console.log("HTML button not removed from left side")
    }

    let htmlCorrect = false;
    if (left.length == 3 && right.length == 1 && foundRight && foundLeft == false){
        htmlCorrect = true;
    }

    // if (htmlCorrect){
    //     console.log("html works");
    // }


    // check if js button moves correctly

    // click button
    await js.click();

    // get skills on both sides
    right = await getRightSkills();
    left = await getLeftSkills();

    // checking if button moved to right side
    foundRight = false;
    for (let i = 0; i < right.length; i ++){
        let res = await right[i].getText();
        if (res == "JavaScript"){
            foundRight = true;
        }
    }

    if (foundRight == false){
        console.log("JS button not moved to right side")
    }

    // checking if button removed from left side
    foundLeft = false;
    for (let i = 0; i < left.length; i ++){
        let res = await left[i].getText();
        if (res == "JavaScript"){
            foundLeft = true;
        }
    }

    if (foundLeft){
        console.log("JS button not removed from left side")
    }

    let jsCorrect = false;
    if (left.length == 2 && right.length == 2 && foundRight && foundLeft == false){
        jsCorrect = true;
    }

    // if (jsCorrect){
    //     console.log("js works");
    // }




    // check if html button moves correctly

    // click button
    await css.click();

    // get skills on both sides
    right = await getRightSkills();
    left = await getLeftSkills();

    // checking if button moved to right side
    foundRight = false;
    for (let i = 0; i < right.length; i ++){
        let res = await right[i].getText();
        if (res == "CSS"){
            foundRight = true;
        }
    }

    if (foundRight == false){
        console.log("CSS button not moved to right side")
    }

    // checking if button removed from left side
    foundLeft = false;
    for (let i = 0; i < left.length; i ++){
        let res = await left[i].getText();
        if (res == "CSS"){
            foundLeft = true;
        }
    }

    if (foundLeft){
        console.log("CSS button not removed from left side")
    }

    let cssCorrect = false;
    if (left.length == 1 && right.length == 3 && foundRight && foundLeft == false){
        cssCorrect = true;
    }

    // if (cssCorrect){
    //     console.log("css works");
    // }

    if (htmlCorrect && jsCorrect && cssCorrect){
        return true;
    }
    else{
        return false;
    }

}






async function testSkills(){

    // testing hover
    if (await hover("html") && await hover("css") && await hover("javascript")){
        points = points + 1;
        console.log("Colour change on skill buttons hover : correct")
        console.log(points);
    }
    else{
        console.log("Check colour changes on skill button hover")
    }

    // testing moving
    if (await testMove()){
        points = points + 1;
        console.log("Button moving : correct");
        console.log(points)
    }
}



async function main(){
    await testBirthday();
    await testName();
    await testTheme();
    testSkills();
    // console.log("final: " + points);
}


main();
