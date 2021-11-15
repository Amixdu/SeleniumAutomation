// for unobtrusive js
document.addEventListener("DOMContentLoaded", function(event) {
    // handling name events
    var name = document.getElementById("name")
    name.addEventListener("focus", greetWithName)
    name.addEventListener("blur", namePrompt)

    // handling date events
    var date = document.getElementById("date")
    date.addEventListener("focus", ageGuess)
    date.addEventListener("blur", agePrompt)

    // handling theme change
    var light = document.getElementById("light")
    light.addEventListener("click", lightMode)
    
    var dark = document.getElementById("dark")
    dark.addEventListener("click", darkMode)

    // handling HTML events
    const htmlButton = document.getElementById("html")
    htmlButton.addEventListener("click", moveHTML)
    htmlButton.addEventListener("mouseover", function(){
        changeColour(htmlButton)
    })
    htmlButton.addEventListener("mouseout", function(){
        changeColourBack(htmlButton)
    })

    // handling CSS events
    const cssButton = document.getElementById("css")
    cssButton.addEventListener("click", moveCSS)
    cssButton.addEventListener("mouseover", function(){
        changeColour(cssButton)
    })
    cssButton.addEventListener("mouseout", function(){
        changeColourBack(cssButton)
    })

    // handling JavaScript events
    const jsButton = document.getElementById("javascript")
    jsButton.addEventListener("click", moveJS)
    jsButton.addEventListener("mouseover", function(){
        changeColour(jsButton)
    })
    jsButton.addEventListener("mouseout", function(){
        changeColourBack(jsButton)
    })
})



// display a greeting with/without name
function greetWithName(){
    const name = document.getElementById("name")
    if (name.value == ""){
        document.getElementById("nameOutput").innerHTML = "Hello there! What is your name?"
    }
    
}

function namePrompt(){
    const name = document.getElementById("name")
    if (name.value == ""){
        document.getElementById("nameOutput").innerHTML = "Would you mind entering your name?"
    }
    else{
        nameOutput()
    }
}

function nameOutput(){
    const nameOutput = document.getElementById("nameOutput")
    const name = document.getElementById("name")
    document.getElementById("nameOutput").innerHTML = "Hi, " + name.value + "!"

}

// age guess message when on focus
function ageGuess(){
    const date = document.getElementById("date")
    if (date.value == ""){
        document.getElementById("ageOutput").innerHTML = "Lemme guess, your age is..."
    }
    
}

// age prompt message when blurred
function agePrompt(){
    const date = document.getElementById("date")
    if (date.value == ""){
        document.getElementById("ageOutput").innerHTML = "Would you mind entering your birthday?"
    }
    // if value is there, invoke ageOutput() function
    else{
        ageOutput()
    }
}

// calculate and display age
function ageOutput(){
    const dateOutput = document.getElementById("ageOutput")
    const date = document.getElementById("date").value
    // new date object from users DOB
    const dateString = date.toString()
    const birthday = new Date(dateString)
    // number of milliseconds elapsed since January 1, 1970 00:00:00 UTC
    const millisecondsToday = Date.now()
    // creating a new date from the difference in milliseconds
    const diff = millisecondsToday - birthday.getTime()
    const ageFromDiff = new Date(diff)
    // since the milliseconds for new date is counted from 1970, subtract 1970 to get age
    dateOutput.innerHTML = "Your age is " + (ageFromDiff.getUTCFullYear() - 1970) + " years old!"
}



// change to dark mode
function darkMode(){
    const right = document.getElementById("right")
    const theme = document.getElementById("themeOutput")
    right.classList.remove("bg-light")
    right.classList.remove("text-dark")
    right.classList.add("bg-dark")
    right.classList.add("text-white")
    theme.innerHTML = "You chose Dark mode!"
}

// change to light mode
function lightMode(){
    const right = document.getElementById("right")
    const theme = document.getElementById("themeOutput")
    right.classList.remove("bg-dark")
    right.classList.remove("text-white")
    right.classList.add("bg-light")
    right.classList.add("text-dark")
    theme.innerHTML = "You chose Light mode!"
}

// move HTML button
function moveHTML(){
    const button = document.createElement('button');
    button.className += "btn btn-success btn-sm"
    button.innerHTML = "HTML"
    button.id = "htmlNew"
    button.setAttribute("onClick", "moveHTMLBack()")
    button.setAttribute("onmouseover", "changeColour(document.getElementById('htmlNew'))")
    button.setAttribute("onmouseout", "changeColourBack(document.getElementById('htmlNew'))")
    button.style.marginRight = "2.5px"
    document.getElementById("skillsOutput").appendChild(button)
    // removing from left
    document.getElementById("html").remove()
}

// move CSS button
function moveCSS(){
    const button = document.createElement('button');
    button.className += "btn btn-success btn-sm"
    button.innerHTML = "CSS"
    button.id = "cssNew"
    button.setAttribute("onClick", "moveCSSBack()")
    button.setAttribute("onmouseover", "changeColour(document.getElementById('cssNew'))")
    button.setAttribute("onmouseout", "changeColourBack(document.getElementById('cssNew'))")
    button.style.marginRight = "2.5px"
    document.getElementById("skillsOutput").appendChild(button)
    // removing from left
    document.getElementById("css").remove()
}

// move JavaScript button
function moveJS(){
    const button = document.createElement('button');
    button.className += "btn btn-success btn-sm"
    button.innerHTML = "JavaScript"
    button.id = "jsNew"
    button.setAttribute("onClick", "moveJSBack()")
    button.setAttribute("onmouseover", "changeColour(document.getElementById('jsNew'))")
    button.setAttribute("onmouseout", "changeColourBack(document.getElementById('jsNew'))")
    button.style.marginRight = "2.5px"
    document.getElementById("skillsOutput").appendChild(button)
    // removing from left
    document.getElementById("javascript").remove()
}

// move HTML button back
function moveHTMLBack(){
    const button = document.createElement('button');
    button.className += "btn btn-success btn-sm"
    button.innerHTML = "HTML"
    button.id = "html"
    button.setAttribute("onClick", "moveHTML()")
    button.setAttribute("onmouseover", "changeColour(document.getElementById('html'))")
    button.setAttribute("onmouseout", "changeColourBack(document.getElementById('html'))")
    button.style.marginRight = "2.5px"
    button.style.marginLeft = "2.5px"
    document.getElementById("skills").after(button)
    // removing from right
    document.getElementById("htmlNew").remove()
}

// move CSS button back
function moveCSSBack(){
    const button = document.createElement('button');
    button.className += "btn btn-success btn-sm"
    button.innerHTML = "CSS"
    button.id = "css"
    button.setAttribute("onClick", "moveCSS()")
    button.setAttribute("onmouseover", "changeColour(document.getElementById('css'))")
    button.setAttribute("onmouseout", "changeColourBack(document.getElementById('css'))")
    button.style.marginRight = "2.5px"
    button.style.marginLeft = "2.5px"
    // if HTML button exists, move the button after it
    try{
        document.getElementById("html").after(button)
    }
    catch{
        document.getElementById("skills").after(button)
    }
        
    // removing from right
    document.getElementById("cssNew").remove()
}

// move JavaScript button
function moveJSBack(){
    const button = document.createElement('button');
    button.className += "btn btn-success btn-sm"
    button.innerHTML = "JavaScript"
    button.id = "javascript"
    button.setAttribute("onClick", "moveJS()")
    button.setAttribute("onmouseover", "changeColour(document.getElementById('javascript'))")
    button.setAttribute("onmouseout", "changeColourBack(document.getElementById('javascript'))")
    button.style.marginRight = "2.5px"
    button.style.marginLeft = "2.5px"
    // if CSS button exists, move the button after it
    try{
        document.getElementById("css").after(button)
    }
    catch{
        document.getElementById("skills").after(button)
    }
    // removing from right
    document.getElementById("jsNew").remove()
}

// change button colour
function changeColour(button){
    button.classList.remove("btn-success")
    button.classList.add("btn-danger")
}

// change it back
function changeColourBack(button){
    button.classList.remove("btn-danger")
    button.classList.add("btn-success")
}