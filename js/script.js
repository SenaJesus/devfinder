function select(selector) {
    return document.querySelector(selector)
}

const selectors = [
    "body",
    "iconMode",
    "search",
    "textSearch",
    "userInfo",
    "userReputation",
    "locIcon",
    "siteIcon",
    "twitterIcon",
    "jobIcon"
]

const textLightColor = { H1: "#2B3442", H2: "#2B3442", H4: "#4B6A9B" }

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

let textElements = document.querySelectorAll("h1, h2, h4")

let elements = document.querySelectorAll(
    selectors.map(selector => `.${selector}Light`).join(", ")
)

let colorMode = "Light"
let textMode = document.querySelector(".textMode")

function changeMode() {
    selectors.forEach((selector, index) => {
        elements[index].classList.toggle(`${selector}Light`)
        elements[index].classList.toggle(`${selector}Dark`)
    })

    colorMode = colorMode === "Light" ? "Dark" : "Light"

    if (colorMode === "Dark") {
        textElements.forEach((element) => {
            element.style.color = "#FFFFFF"
            textMode.textContent = "LIGHT"
        })
    } else
        textElements.forEach((element) => {
            element.style.color = textLightColor[element.tagName]
            textMode.textContent = "DARK"
        })
}


let userPhoto = select(".userPhoto")
let user = select(".user")
let perfilAge = select(".perfilAge")
let userRepos = select(".userRepos")
let userFollowers = select(".userFollowers")
let userFollowing = select(".userFollowing")
let userBio = select(".userBio")
let unknownUser = select(".unknownUser")
let userName = select(".userInitial h1")
let textSearch = select(".search input")

let userDetailsData = ["location", "hireable", "twitter_username", "company"]
let userDetailsElements = ["loc", "site", "twitter", "job"]

let userDetailsInfo = document.querySelectorAll(
    userDetailsElements.map((element) => `.${element}Info`).join(", ")
)

let userDetailsIcon = document.querySelectorAll(
    userDetailsElements.map((element) => `.${element}Icon${colorMode}`).join(", ")
)


const getUserData = function (userName) {
    const userData = fetch(`https://api.github.com/users/${userName}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('User not found!')
            }
            unknownUser.style.display = "none"
            buttonSearch.style.opacity = "1"
            return response.json()
        })
        .catch(() => {
            if (window.innerWidth > 420)
                unknownUser.style.display = "initial"
            buttonSearch.style.opacity = "0.7"
        })
    return userData
}

function changeUserDetails(userData) {
    userDetailsInfo.forEach((element, index) => {
        if (userData[userDetailsData[index]] == null) {
            element.textContent = "Not Available"
            element.style.opacity = "0.7"
            element.parentNode.style.userSelect = "none"
            userDetailsIcon[index].style.opacity = "0.7"
        } else {
            element.textContent = userData[userDetailsData[index]]
            element.style.opacity = "1"
            element.parentNode.style.userSelect = "initial"
            userDetailsIcon[index].style.opacity = "1"
        }
    })
}

async function changeUser(user_id) {
    let userData = await getUserData(user_id)
    let perfilDate = new Date(userData['created_at'])

    userPhoto.style.backgroundImage = `url(${userData['avatar_url']})`

    userName.textContent = userData['name']
    user.textContent = "@" + userData['login'].toLowerCase()
    perfilAge.textContent = `Joined ${perfilDate.getDate()} ${months[perfilDate.getMonth()]} ${perfilDate.getFullYear()}`

    userFollowers.textContent = userData['followers']
    userFollowing.textContent = userData['following']
    userRepos.textContent = userData['public_repos']

    userBio.textContent = userData['bio'] == null ? "This profile has no bio" : userData['bio']

    changeUserDetails(userData)
}

changeUser("senajesus")

let searchUserSection = select(".searchUser")

searchUserSection.addEventListener("click", () => {
    textSearch.focus()
})

let buttonSearch = select(".buttonSearch")

buttonSearch.addEventListener("click", () => {
    if ((textSearch.value !== "") && ((textSearch.value !== user.textContent.split("@")[1])))
        changeUser(textSearch.value)
})

textSearch.addEventListener("keydown", (event) => {
    if ((event.keyCode === 13) && (textSearch.value !== "") && ((textSearch.value !== user.textContent.split("@")[1]))) {
        changeUser(textSearch.value)
    }
})

textSearch.addEventListener("input", () => {
    buttonSearch.style.cursor = textSearch.value !== "" ? "pointer" : "initial"
    unknownUser.style.display = "none"
    buttonSearch.style.opacity = "1"
})


let twitterInfo = select(".twitterInfo")
let siteInfo = select(".siteInfo")

const handleMouseOver = (element) => {
    if (element.textContent !== "Not Available") {
        element.style.cursor = "pointer"
        element.style.textDecoration = "underline"
    }
}
const handleMouseOut = (element) => {
    if (element.textContent !== "Not Available") {
        element.style.cursor = "initial"
        element.style.textDecoration = "none"
    }
}

twitterInfo.addEventListener("click", () => {
    if (twitterInfo.textContent !== "Not Available")
        window.open(`https://twitter.com/${twitterInfo.textContent}`)
})

twitterInfo.addEventListener("mouseover", () => handleMouseOver(twitterInfo))

twitterInfo.addEventListener("mouseout", () => handleMouseOut(twitterInfo))

siteInfo.addEventListener("mouseover", () => handleMouseOver(siteInfo))

siteInfo.addEventListener("mouseout", () => handleMouseOut(siteInfo))


let iconMode = select(".changeMode div")

let changMode = select(".changeMode")

changMode.addEventListener("mouseover", () => {
    if (colorMode === "Dark") {
        iconMode.style.backgroundImage = "url(../assets/icon-sun-hover.svg)"
        textMode.style.color = "#90A4D4"
    } else {
        iconMode.style.backgroundImage = "url(../assets/icon-moon-hover.svg)"
        textMode.style.color = "#222731"
    }
})

changMode.addEventListener("mouseout", () => {
    if (colorMode === "Dark") {
        iconMode.style.backgroundImage = "url(../assets/icon-sun.svg)"
        textMode.style.color = "#FFFFFF"
    } else {
        iconMode.style.backgroundImage = "url(../assets/icon-moon.svg)"
        textMode.style.color = "#697C9A"
    }
})

changMode.addEventListener("click", () => {
    if (colorMode === "Dark") {
        iconMode.style.backgroundImage = "url(../assets/icon-sun.svg)"
        textMode.style.color = "#FFFFFF"
    } else {
        iconMode.style.backgroundImage = "url(../assets/icon-moon.svg)"
        textMode.style.color = "#697C9A"
    }
})

let authorName = select(".author span")

authorName.addEventListener("click", () => {
    window.open("https://www.linkedin.com/in/jesus-sena-a838b9262/")
})

let siteTitle = select("nav h1")

siteTitle.addEventListener("click", () => {
    window.open("https://senajesus.github.io/devfinder/", "_self")
})