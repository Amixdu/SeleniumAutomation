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

driver.get("file:///C:/Users/Methma Wijerathna/Desktop/Methma Wijerathna/Projects/Web Projects/SeleniumAutomation/index.html");


/**
    * The function computes the age of the person based on the date of birth entered and the current date
    * @param {Date of Birth of Person} dateBirth 
    * @param {Current Date} dateNow 
    * @returns Age of the person
*/
function computeAge(dateBirth, dateNow) {
    let age = dateNow.getFullYear() - dateBirth.getFullYear();
        
    if (dateBirth.getMonth() > dateNow.getMonth()) {
            age -= 1;
    } else if (dateBirth.getMonth() === dateNow.getMonth()){
        if (dateBirth.getDate() > dateNow.getDate()) {
            age -= 1; 
        }
    }
        return age;
}


async function testBirthday(){

    // get text before click
    let initial = driver.findElement(By.id("ageOutput")).getText();
    // clicking birthday
    await driver.findElement(By.id("date")).click();
    // obtain the value displayed on the right side
    let prompt = await driver.findElement(By.id("ageOutput")).getText();


    // check if text has been changed due to click
    if (prompt != initial){
        console.log("Age click prompt : correct")
        points = points + 1;
        console.log(points);
    }
    else{
        console.log("Check prompt when age box is clicked")
    }

    // click birthday box
    driver.findElement(By.id("date")).click();
    // blur
    driver.findElement(By.css("body")).click();
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

    // type birthday
    let birthdayBox =  driver.findElement(By.id("date"));
    birthdayBox.sendKeys("08142001");
    let correctAge = computeAge(new Date(2001, 08, 14), new Date());
    // blur
    driver.findElement(By.css("body")).click();
    // obtain the age display message (the output message)
    let nameOutput = await driver.findElement(By.id("ageOutput")).getText();

    // check if correct age is displayed (the age should be 20 for entered date)
    if (nameOutput.includes(correctAge)){
        console.log("Age display : correct")
        points = points + 1;
        console.log(points);
    }
    else {
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
    driver.findElement(By.css("body")).click();

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
    driver.findElement(By.css("body")).click();

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

    // DARK MODE

    // get text before click
    let initial = driver.findElement(By.id("themeOutput")).getText();

    // get theme colour before click (parent of parent of themeOutput)
    let theme =  await driver.findElement(By.id("themeOutput"));
    let parent = await theme.findElement(By.xpath("./.."));
    let initialColour = await parent.findElement(By.xpath("./..")).getCssValue("background-color");

    // test click to dark mode
    await driver.findElement(By.id("dark")).click();

    // obtain the value displayed on the right side
    let message = await driver.findElement(By.id("themeOutput")).getText();

    // get colour after the click
    let displayColour = await parent.findElement(By.xpath("./..")).getCssValue("background-color");
    
    // check if text has the word 'Dark'
    if ((message != initial) && (message.includes("Dark"))){
        points = points + 1;
        console.log("Dark Mode selection : message is correct");
        console.log(points);
    }
    else{
        console.log("Check message when dark mode selected");
    }
    
    // test display colour when changing to dark mode
    if (displayColour != initialColour){
        points = points + 1;
        console.log("Dark Mode selection : colour is correct");
        console.log(points);
    }
    else{
        console.log("Check colour when dark mode selected");
    }
        
    // LIGHT MODE
    
    // get text before click
    initial = driver.findElement(By.id("themeOutput")).getText();

    // get theme colour before click (parent of parent of themeOutput)
    theme =  await driver.findElement(By.id("themeOutput"));
    parent = await theme.findElement(By.xpath("./.."));
    initialColour = await parent.findElement(By.xpath("./..")).getCssValue("background-color");

    // click light mode button
    await driver.findElement(By.id("light")).click();


    // obtain the value displayed on the right side
    message = await driver.findElement(By.id("themeOutput")).getText();

    // get colour after the click
    displayColour = await parent.findElement(By.xpath("./..")).getCssValue("background-color");
        
    // check if text has the word 'Light'
    if ((message != initial) && (message.includes("Light"))){
        points = points + 1;
        console.log("Dark Mode selection : message is correct");
        console.log(points);
    }
    else{
        console.log("Check message when dark mode selected");
    }
   
    // test display colour when changing to light mode
    displayColour = await driver.findElement(By.id("nameOutput")).getCssValue("background-color");

    if (displayColour != initialColour){
        points = points + 1;
        console.log("Light Mode selection : colour is correct");
        console.log(points);
    }
    else{
        console.log("Check colour when light mode selected");
    }
    
}

async function hover(id){

    // pre hover colour
    let preHover = await driver.findElement(By.id(id)).getCssValue("background-color");

    // move mouse over button
    let html = driver.findElement(By.id(id));
    const actions = driver.actions({ bridge: true });
    actions.move({duration: 100, origin: html}).perform();

    // get colour while mouse is hovering
    let postHover = await driver.findElement(By.id(id)).getCssValue("background-color");

    // move mouse away
    // let right = driver.findElement(By.id("nameOutput"));
    // actions.move({duration: 100, origin: right}).perform();
    driver.findElement(By.css("body")).click();

    // get colour again after moving mouse
    let postHoverTwo = await driver.findElement(By.id(id)).getCssValue("background-color");

    // check if colours change correctly
    // initial colour should be different to colour when mouse is hovering
    // colour should be same as initial colour when mouse moved away
    if (preHover == postHoverTwo && postHover != preHover){
        return true
    }
}

async function getRightSkills(){
    let skills = await driver.findElement(By.id('skillsOutput'));
    let skillsArray = await skills.findElements(By.xpath(".//*"));
    return skillsArray;
}

async function getLeftSkills(handle){
    let leftSkillsArray = await handle.findElements(By.xpath(".//*"));
    return leftSkillsArray;
}


async function move(id, leftCount, rightCount, handle){
    let button = await driver.findElement(By.id(id));

    // click button
    await button.click();

    // get skills on both sides
    let right = await getRightSkills();
    let left = await getLeftSkills(handle);

    // checking if button moved to right side
    let foundRight = false;
    for (let i = 0; i < right.length; i ++){
        let res = (await right[i].getText()).toLowerCase();
        if (res.includes(id)){
            foundRight = true;
        }
    }

    if (foundRight == false){
        console.log(id + " button not moved to right side")
    }

    // checking if button removed from left side
    let foundLeft = false;
    for (let i = 0; i < left.length; i ++){
        let res = await left[i].getText();
        if (res.includes(id)){
            foundLeft = true;
        }
    }

    if (foundLeft){
        console.log(id + " button not removed from left side")
    }

    let valid = false;
    if (left.length == leftCount && right.length == rightCount && foundRight && foundLeft == false){
        valid = true;
        return true
    }
    else{
        console.log(left.length)
        console.log(right.length)
        return false
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

    // obtain left side buttons handle using html button and use this handle for tracking all three buttons on the left
    let element =  await driver.findElement(By.id("html"));
    let parent = await element.findElement(By.xpath("./.."));
    if ((await move("html", 3, 1, parent)) && (await move("javascript", 2, 2, parent)) && (await move("css", 1, 3, parent))){
        points = points + 1;
        console.log("Button moving : correct");
        console.log(points)
    }
    else{
        console.log("Problem")
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
