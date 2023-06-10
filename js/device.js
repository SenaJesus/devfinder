function select(selector) {
    return document.querySelector(selector)
}

let sectionUserDesc = select(".userDesc")

let divPhoto = select(".photo")

let sectionUserBasic = select(".userDesc .userBasic")

let divUserInitial = select(".userBasic .userInitial")

let divUserInitialDesc = select(".userBasic .userInitialDesc")

let sectionUserReputation = colorMode === "Light" ? select(".userDesc .userReputationLight") : select(".userDesc .userReputationDark")




if (window.innerWidth <= 820) {
    divUserInitialDesc.appendChild(userPhoto)
    divUserInitial.insertBefore(user, perfilAge)
    sectionUserBasic.insertBefore(divUserInitialDesc, divUserInitial)
    sectionUserDesc.appendChild(userBio)
    sectionUserDesc.insertBefore(userBio, sectionUserReputation)
} else {
    divPhoto.appendChild(userPhoto)
    divUserInitialDesc.appendChild(userBio)
    divUserInitialDesc.insertBefore(user, userBio)
    sectionUserBasic.insertBefore(divUserInitial, divUserInitialDesc)
}