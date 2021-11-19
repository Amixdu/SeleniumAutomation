window.onload = function(){
    
    // Input Boxes Initialisation
    let name = document.querySelector('#name');
    let date = document.querySelector('#date');
    let light = document.querySelector("#light");
    let dark = document.querySelector("#dark");
    let backGround = document.querySelector("#themeOutput").parentNode.parentNode;
    let html = document.querySelector('#html');
    let css = document.querySelector("#css");
    let javascript = document.querySelector("#javascript");
    let skills = document.querySelector("#html").parentNode;

    // Output Boxes Initialisation
    let nameOutput = document.querySelector('#nameOutput');
    let ageOutput = document.querySelector('#ageOutput');
    let themeOutput =  document.querySelector("#themeOutput");
    let skillsOutput = document.querySelector("#skillsOutput");
    
    // Setting Initial Values
    name.value = "";
    date.value = "";
    backGround.classList.remove("bg-dark", "text-white"); // Initially light mode
    backGround.classList.add("bg-light", "text-black");
    light.checked = true;
    dark.checked = false;
    


    // ######################################
    //          Name Functionality
    // ######################################

    // Detect change on name field
    name.onblur = nameBlur;
    name.onfocus = nameFocus;

    /**
     * The function is activated when the user moves the cursor away from name input box.
     */
    function nameBlur() {
        nameOutput.innerHTML = "Focus has been lost";
        let nameEntered = name.value;
        if (nameEntered === "") {
            nameOutput.innerHTML = "Hello there! Please enter your name?";
        } else {
            nameOutput.innerHTML = "Hi, " + nameEntered  + "!";
        }
    }

     /**
     * The function is activated when the user moves the cursor to the name input box and focuses on it.
     */
    function nameFocus() {
        if (name.value === '') {
            nameOutput.innerHTML = "Hello there! What's your name?";
        }
    }



    // ######################################
    //          Age Functionality
    // ######################################
 
    // Detect change on date field
    date.onblur = dateBlur;
    date.onfocus = dateFocus;

    /**
     * The function is activated when the user moves the cursor away from date input box.
     */
    function dateBlur(){
        if (date.value === "") {
           
            ageOutput.innerHTML = "Would you mind entering your birthday?";
        
        } else{
            
            let dateBirth = new Date(date.value);
            let dateNow = new Date();
            let age = computeAge(dateBirth, dateNow)
            
           
            if (age > 0) {
                ageOutput.innerHTML = "Your age is " + age + " years old!"; 
            } else {
                ageOutput.innerHTML = "Invalid Age!";
            }
        
        }
    }

    /**
     * The function is activated when the user moves the cursor to the date input box and focuses on it.
     */
    function dateFocus(){
        if (date.value === "") {
            ageOutput.innerHTML = "Lemme guess, your age is...";
        }
    }

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



    // ######################################
    //        BackGround Functionality
    // ######################################

    // Detect change on radio button
    light.onchange = lightMode;
    dark.onchange = darkMode;

    /**
     * Sets the output box the light mode with grey background and black letters when activated
     */
    function lightMode(){
        backGround.classList.remove("bg-dark", "text-white");
        backGround.classList.add("bg-light", "text-black");
        themeOutput.innerHTML = "You chose Light Mode!";
    }        

    /**
     * Sets the output box the dark mode with black background and white letters when activated
     */
    function darkMode() {
        backGround.classList.remove("bg-light", "text-black");
        backGround.classList.add("bg-dark", "text-white");
        themeOutput.innerHTML = "You chose Dark Mode!";
    };



    // ######################################
    //         Button Functionality
    // ######################################

    // Trigger the skill button functionality
    for(let skillBtn of [html, css, javascript]) {
        
        // Triggered if mouse is over button
        skillBtn.onmouseover = function(){
            buttonFocus(skillBtn)
        };

        // Triggered when mouse is moved away from button
        skillBtn.onmouseout = function(){
            buttonBlur(skillBtn)
        };

        // Triggered on click of button
        skillBtn.onclick = function(){
            buttonClick(skillBtn)
        };
    }
    
    /**
     * The function changes colour of button if the button is in output view
     * @param {Button which is in focus} btn 
     */
    function buttonFocus(btn){
        // if (btn.parentNode === skillsOutput){
        //     btn.classList.remove("btn-success");
        //     btn.classList.add("btn-danger");
        // }
        btn.classList.remove("btn-success");
        btn.classList.add("btn-danger");
    }

    /**
     * The function changes colour of button to original colour when mouse is moved away if the button is in output view
     * @param {Button which is removed from focus} btn 
     */
    function buttonBlur(btn){
        // if (btn.parentNode === skillsOutput){
        //     btn.classList.remove("btn-danger");
        //     btn.classList.add("btn-success");
        // }
        btn.classList.remove("btn-danger");
        btn.classList.add("btn-success");
    }

    /**
     * Changes the position of button from input to output and vice versa based on the current position of button
     * @param {Button which is clicked} btn 
     */
    function buttonClick(btn){
        if (btn.parentNode === skills) {
            skillsOutput.appendChild(btn);
            btn.classList.add("mr-1");
        } else if (btn.parentNode === skillsOutput) {
            skills.appendChild(btn);
            btn.classList.remove("btn-danger");
            btn.classList.add("btn-success");
            btn.classList.add("mr-1");
        }
    }
}
