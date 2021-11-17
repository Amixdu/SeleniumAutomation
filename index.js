// ADD FILE LOCATION OF THE FILE TO BE TESTED BELOW
const FILE_PATH = "D:\\Projects\\Selenium\\Test_Chrome\\index2.html";

const {Builder, Key, By} = require("selenium-webdriver");

const { Options: ChromeOptions } = require('selenium-webdriver/chrome');
const webdriver = require('selenium-webdriver');
var points = 0;
var errorLog = [];


// to remove cluttering
const chromeOptions = new ChromeOptions();
chromeOptions.excludeSwitches('enable-logging');

// open html
let driver = new webdriver.Builder()
    .forBrowser("chrome")
    .setChromeOptions(chromeOptions)
    .build();

driver.get(FILE_PATH);


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
        points = points + 1;
    }
    else{
        errorLog.push("Initial prompt is not displayed when age box clicked (onfocus event)");
    }

    // click birthday box
    driver.findElement(By.id("date")).click();
    // blur
    driver.findElement(By.css("body")).click();
    // get text on input box
    let reqPrompt = await driver.findElement(By.id("ageOutput")).getText();

    // check if blurring triggers a new message on text box
    if ((reqPrompt != initial) && (reqPrompt != prompt)){
        points = points + 1;
    }
    else{
        errorLog.push("The request prompt when user places cursor outside the date box (onblur event) while its empty is not displayed");
    }


    // type birthday (the testing date is 20 years ago of the current day + 1)
    // If today is November 17th 2021, the DOB entered for testing is November 18th 2001
    // Which should result in an age of 19 years old (since the person would be 20 only on the 18th)
    let today = new Date(Date.now() + (3600 * 1000 * 24));
    let year = today.getFullYear() - 20;
    let month = today.getMonth() + 1;
    let day = today.getDate()

    let yearStr = year.toString();
    let monthStr = month.toString();
    let dayStr = day.toString();
    
    let testDate = monthStr + dayStr + yearStr;

    // sending the test date to the date input box
    let birthdayBox =  driver.findElement(By.id("date"));
    birthdayBox.sendKeys(testDate);

    // calculaating the correct age
    let correctAge = computeAge(new Date(year, month, day), new Date());


    // blur
    driver.findElement(By.css("body")).click();
    // obtain the age display message (the output message)
    let nameOutput = await driver.findElement(By.id("ageOutput")).getText();

    var ageGotten = nameOutput.match(/(\d+)/);

    
    // compare correct age with displayed age

    var stat = false;

    for (let i = 0; i < ageGotten.length; i++) {
        if (stat == false && ageGotten[i] == correctAge) {
            stat = true
        }
    }
    

    if (stat){
        points = points + 1;
    }
    else {
        errorLog.push("Age is not displayed correctly");
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
        points = points + 1;
        // printPoints(points);
    }
    else{
        errorLog.push("Initial prompt when name box is clicked (onfocus event) is not displayed");
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
        points = points + 1;
    }
    else{
        errorLog.push("The request prompt when user places cursor outside the name box (onblur event) while its empty is not displayed");
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
        points = points + 1;
    }
    else{
        errorLog.push("Greeting with name not displayed correctly");
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
    }
    else{
        errorLog.push("Message indicating that dark mode was selected is not displayed properly");
    }
    
    // test display colour when changing to dark mode
    if (displayColour != initialColour){
        points = points + 1;
    }
    else{
        errorLog.push("Background colour doesnt change when dark mode selected");
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
    }
    else{
        errorLog.push("Message indicating that light mode was selected is not displayed properly");
    }
   
    // test display colour when changing to light mode
    displayColour = await driver.findElement(By.id("nameOutput")).getCssValue("background-color");

    if (displayColour != initialColour){
        points = points + 1;
    }
    else{
        errorLog.push("Background colour doesnt change when light mode selected");
    }
    
}


// await driver.findElement(By.id(id))
async function hover(button, side){

    // pre hover colour
    let preHover = await button.getCssValue("background-color");

    // move mouse over button
    // let html = driver.findElement(By.id(id));
    const actions = driver.actions({ bridge: true });
    await actions.move({duration: 200, origin: button}).perform();

    // get colour while mouse is hovering
    let postHover = await button.getCssValue("background-color");

    // move mouse away
    // let right = driver.findElement(By.id("nameOutput"));
    // actions.move({duration: 100, origin: right}).perform();
    await driver.findElement(By.css("body")).click();

    // get colour again after moving mouse
    let postHoverTwo = await button.getCssValue("background-color");

    // check if colours change correctly
    // initial colour should be different to colour when mouse is hovering
    // colour should be same as initial colour when mouse moved away
    if (preHover == postHoverTwo && postHover != preHover){
        return true
    }
    else{
        errorLog.push("The colour of " + await button.getText() + " button is not changed on mouse hover when the button is on the " + side);
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


async function moveRight(id, leftCount, rightCount, handle){
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
        errorLog.push(id + " button not moved to right side");
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
        errorLog.push(id + " button not removed from left side");
    }

    return (left.length == leftCount && right.length == rightCount && foundRight && foundLeft == false);
}


async function moveLeft(button, id, leftCount, rightCount, handle){

    // click button
    await button.click();

    // get skills on both sides
    let right = await getRightSkills();
    let left = await getLeftSkills(handle);

    // checking if button moved to right side
    let foundLeft = false;
    for (let i = 0; i < left.length; i ++){
        let res = (await left[i].getText()).toLowerCase();
        if (res.includes(id)){
            foundLeft = true;
        }
    }

    if (foundLeft == false){
        errorLog.push(id + " button not moved to left side");
    }

    // checking if button removed from right side
    let foundRight = false;
    for (let i = 0; i < right.length; i ++){
        let res = await right[i].getText();
        if (res.includes(id)){
            foundRight = true;
        }
    }

    if (foundRight){
        errorLog.push(id + " button not removed from right side");
    }

    return (left.length == leftCount && right.length == rightCount && foundLeft && foundRight == false);
}



async function testSkills(){

    let left = "left";
    let right = "right;"

    // testing hover
    let htmlButton = await driver.findElement(By.id("html"));
    let htmlCorrect = await hover(htmlButton, left);

    let cssButton = await driver.findElement(By.id("css"));
    let cssCorect = await hover(cssButton, left);

    let jsButton = await driver.findElement(By.id("javascript"));
    let jsCorrect = await hover(jsButton, left);

    if (htmlCorrect && cssCorect && jsCorrect){
        points = points + 1;
    }
    

    // testing moving to right from left

    // obtain left side buttons handle using html button and use this handle for tracking all three buttons on the left
    let element = await driver.findElement(By.id("html"));
    let parent = await element.findElement(By.xpath("./.."));
    if ((await moveRight("html", 3, 1, parent)) && (await moveRight("javascript", 2, 2, parent)) && (await moveRight("css", 1, 3, parent))){
        points = points + 1;
    }


    let skillsOnRight = await getRightSkills();
    
    // testing hover on right side
    let allHoverCorrect = true;
    for (let i = 0; i < skillsOnRight.length; i++){
        if (await hover(skillsOnRight[i], right) == false){
            allHoverCorrect = false;
        }
    }

    if (allHoverCorrect){
        points = points + 1;
    }


    // testing moving to left from right
    let leftC = 1;
    let rightC = 3;
    let allCorrect = true;
    for (let i = 0; i < skillsOnRight.length; i++){
        let buttonName = (await skillsOnRight[i].getText()).toLowerCase();
        if (await moveLeft(skillsOnRight[i], buttonName, (leftC + (i + 1)), (rightC - (i + 1)), parent) == false){
            allCorrect = false;
        }
    }

    if (allCorrect){
        points = points + 1;
    }

}


async function main(){
    await testBirthday();
    await testName();
    await testTheme();
    await testSkills();
    driver.quit();

    if (errorLog.length == 0){
        console.log("Final Score: " + points + " (Full Points)");
    }
    else{
        console.log("\nFinal Score: " + points);
        console.log("\nError Log: ");
        for (let i = 0; i < errorLog.length; i++){
            console.log(errorLog[i]);
        }
        console.log("\n");
    }
    
    
}


main();


