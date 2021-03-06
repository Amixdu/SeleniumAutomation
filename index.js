// ENTER FILE LOCATION OF THE FILE TO BE TESTED BELOW:
const FILE_PATH = "D:\\Projects\\Selenium\\Test_Chrome\\index.html";
const FILE_PATH2 = "file:///C:/Users/Methma Wijerathna/Desktop/Methma Wijerathna/Projects/Web Projects/SeleniumAutomation/index.html";

const {Builder, Key, By, until} = require("selenium-webdriver");

const { Options: ChromeOptions } = require('selenium-webdriver/chrome');
const webdriver = require('selenium-webdriver');
var points = 0;
var errorLog = [];


// to remove log cluttering
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


/**
    * This function ensures that the features ascociated with the age section 
    * of the challenge works properly.
    * Features tested: 
    * 1. displaying prompt when input box clicked
    * 2. displaying a request prompt when user clicks away when input box is empty
    * 3. displaying correct age when user clicks away when input box is non-empty
*/
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
    let ageOutput = await driver.findElement(By.id("ageOutput")).getText();

    var ageGotten = ageOutput.match(/(\d+)/);

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

/**
    * This function ensures that the features ascociated with the name section 
    * of the challenge works properly.
    * Features tested: 
    * 1. displaying prompt when input box clicked
    * 2. displaying a request prompt when user clicks away when input box is empty
    * 3. displaying a greeting with name when user clicks away when input box is non-empty
*/
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


/**
    * This function ensures that the features ascociated with the theme section 
    * of the challenge works properly for a given mode.
    * Features tested: 
    * 1. displaying message when dark mode selected
    * 2. changing background colour when dark mode selected
    * 3. changing text colour when dark mode selected
    * @param {The Id of the mode button ('dark' or 'light')} mode 
*/
async function testMode(mode){
    // get text before click
    let initial = await driver.findElement(By.id("themeOutput")).getText();

    // get theme background colour before click (parent of parent of themeOutput)
    let theme =  await driver.findElement(By.id("themeOutput"));
    let parent = await theme.findElement(By.xpath("./.."));
    let initialColour = await parent.findElement(By.xpath("./..")).getCssValue("background-color");
    let parentCopy = parent;

    // this is an additional measure to obtain background colour, if the challenger has added extra divs to the starter index.html file,
    // the loop bypasses these transparent divs, so as long as the background colour of main container div changes, the point is given
    while (initialColour == "rgba(0, 0, 0, 0)"){
        parentCopy = await parentCopy.findElement(By.xpath("./.."));
        initialColour = await parentCopy.getCssValue("background-color");
    }

    // get theme text colour before click
    let initialTextColour = await parent.findElement(By.xpath("./..")).getCssValue("color");

    // test click to dark mode
    await driver.findElement(By.id(mode)).click();

    // obtain the value displayed on the right side
    let message = await driver.findElement(By.id("themeOutput")).getText();

    // get colour after the click
    let displayColour = await parent.findElement(By.xpath("./..")).getCssValue("background-color");
    parentCopy = parent;
    while (displayColour == "rgba(0, 0, 0, 0)"){
        parentCopy = await parentCopy.findElement(By.xpath("./.."));
        displayColour = await parentCopy.getCssValue("background-color");
    }
    let displayTextColour = await parent.findElement(By.xpath("./..")).getCssValue("color");
    
    // check if text has the word 'light'/'dark'
    if ((message != initial) && ((message.toLowerCase()).includes(mode))){
        points = points + 1;
        
    }
    else{
        errorLog.push("Message indicating that " + mode + " mode was selected is not displayed properly");
    }
    
    // test display background colour when changing to dark mode
    if (displayColour != initialColour){
        points = points + 1;
    }
    else{
        errorLog.push("Background colour doesnt change when " + mode + " mode selected");
    }

    // test display text colour when changing to dark mode
    if (displayTextColour != initialTextColour){
        points = points + 1;
    }
    else{
        errorLog.push("Text colour doesnt change when " + mode + " mode selected");
    }
}


/**
    * This function ensures that the features ascociated with the theme section 
    * of the challenge works properly for both modes.
*/
async function testTheme(){
    await testMode("dark");
    await testMode("light");
}


/**
    * This function ensures that the colour change of the button when 
    * hovering over the provided skill button is correct.
    * @param {The html element that represents the button to be tested} button 
    * @param {A string representing left or right side} side 
    * @returns A boolean value indicating if test passed for the provided button
*/
async function hover(button, side){

    // pre hover colour
    let preHover = await button.getCssValue("background-color");

    // move mouse over button
    const actions = driver.actions({ bridge: true });
    await actions.move({origin: button}).perform();

    // get colour while mouse is hovering
    let duringHover = await button.getCssValue("background-color");

    // move mouse away
    await driver.findElement(By.css("body")).click();

    // time buffer to ensure colour change has completed before getting post hover colour
    let away = await driver.findElement(By.id("themeOutput"));
    await actions.move({duration: 200, origin: away}).perform();

    // get colour again after moving mouse
    let postHover = await button.getCssValue("background-color");

    // check if colours change correctly
    // initial colour should be different to colour when mouse is hovering
    // colour should be same as initial colour when mouse moved away
    if (preHover == postHover && duringHover != preHover){
        return true
    }
    else{
        errorLog.push("The colour of " + await button.getText() + " button is not changed on mouse hover when the button is on the " + side);
    }
}

  

/**
    * This function obtains the current skill buttons present on the right side div
    * @returns An array of button elements
*/
async function getRightSkills(){
    let skills = await driver.findElement(By.id('skillsOutput'));
    let skillsArray = await skills.findElements(By.xpath(".//*"));
    return skillsArray;
}

/**
    * This function obtains the current skill buttons present on the left side div
    * @returns An array of button elements
*/
async function getLeftSkills(handle){
    let leftSkillsArray = await handle.findElements(By.xpath(".//*"));
    return leftSkillsArray;
}


/**
    * This function checks if the movement of skill buttons from left to right
    * when clicked works correctly.
    * @param {The id of the button to be moved} id 
    * @param {Number of elements that should remain on the left after moving} leftCount 
    * @param {Number of elements that should remain on the right after moving} rightCount 
    * @param {Html element that is used to obtain the element count} handle 
    * @returns A boolean value indicating if the provided button was successfully moved
*/
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

    // if button not moved to right side, consequently points will be reduced for hovering on right side and moving back to left
    if (foundRight == false){
        errorLog.push(id + " button not moved to right side");
        errorLog.push("The colour of " + id + " button is not changed on mouse hover when the button is on the right");
        errorLog.push(id + " button not moved to left side");
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


/**
    * This function checks if the movement of skill buttons from right to left
    * when clicked works correctly.
    * @param {The button element to be moved} button 
    * @param {The id of the button to be moved} id 
    * @param {Number of elements that should remain on the left after moving} leftCount 
    * @param {Number of elements that should remain on the right after moving} rightCount 
    * @param {Html element that is used to obtain the element count} handle 
    * @returns A boolean value indicating if the provided button was successfully moved
*/
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



/**
    * This function ensures that the features ascociated with the skills section 
    * of the challenge works properly.
    * Features tested (done seperately for each button): 
    * 1. changing button colour on mouse hover
    * 2. moving buttons to right side on click
    * 3. changing button colour on mouse hover from the right side
    * 4. moving buttons back to left on click
*/
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

    if (htmlCorrect){
        points = points + 1;
    } 
    
    if (cssCorect){
        points = points + 1;
    } 
    
    if (jsCorrect){
        points = points + 1;
    } 
    
    // testing moving to right from left
    // obtain left side buttons handle using html button and use this handle for tracking all three buttons on the left
    let element = await driver.findElement(By.id("html"));
    let parent = await element.findElement(By.xpath("./.."));
    let nLeftElems = (await getLeftSkills(parent)).length;
    let nRightElems = (await getRightSkills()).length;
    let moved = 1;
    if (await moveRight("html", nLeftElems - moved, nRightElems + moved, parent)){
        points = points + 1;
        moved = moved + 1;
    }
   
    if (await moveRight("javascript", nLeftElems - moved, nRightElems + moved, parent)){
        points = points + 1;
        moved = moved + 1;
    }
    
    if (await moveRight("css", nLeftElems - moved, nRightElems + moved, parent)){
        points = points + 1;
        moved = moved + 1;
    }
    
    let skillsOnRight = await getRightSkills();
    
    // testing hover on right side
    for (let i = 0; i < skillsOnRight.length; i++){
        if (await hover(skillsOnRight[i], right)){
            points = points + 1;
        }
    }

    // testing moving to left from right
    let leftC = (await getLeftSkills(parent)).length;
    let rightC = (await getRightSkills()).length;
    for (let i = 0; i < skillsOnRight.length; i++){
        let buttonName = (await skillsOnRight[i].getText()).toLowerCase();
        if (await moveLeft(skillsOnRight[i], buttonName, (leftC + (i + 1)), (rightC - (i + 1)), parent)){
            points = points + 1;
        }
    }
}


/**
    * function to ensure that the id's of the provided starter code html is unchanged 
    * (These ids are used by selenium driver to locate elements)
    * @returns A boolean value indicating whether the provided input file is valid for automated testing
*/
async function validateFile(){
    try{
        await driver.findElement(By.id("html"));
        await driver.findElement(By.id("css"));
        await driver.findElement(By.id("javascript"));
        await driver.findElement(By.id("name"));
        await driver.findElement(By.id("date"));
        await driver.findElement(By.id("light"));
        await driver.findElement(By.id("dark"));
        await driver.findElement(By.id("nameOutput"));
        await driver.findElement(By.id("ageOutput"));
        await driver.findElement(By.id("themeOutput"));
        await driver.findElement(By.id("skillsOutput"));
        return true;
    }
    catch{
        return false;
    }
}


/**
    * This is the main function that invokes the validation function and the testing functions
*/
async function main(){
    if (await validateFile() == true){
        await testBirthday();
        await testName();
        await testTheme();
        await testSkills();
        driver.quit();

        if (errorLog.length == 0){
            console.log("Final Score: " + points + "/24 (Full Points)");
        }
        else{
            console.log("\nFinal Score: " + points + "/24");
            console.log("\nError Log: ");
            for (let i = 0; i < errorLog.length; i++){
                console.log(errorLog[i]);
            }
            console.log("\n");
        }
    }
    else{
        driver.quit();
        console.log("\nAn Id of an element in the original starter HTML code file has been removed or changed\n");
    }
}

main();


