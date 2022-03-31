
chrome.webNavigation.onCompleted.addListener(function () {
    console.log("Ready!!!")
    chrome.commands.onCommand.addListener((command) => {
        if (command === 'next') {
            getCurrentTab(next)
        }
        else if (command === 'previous') {
            getCurrentTab(previous)
        }
    });
    async function getCurrentTab(myCallBackFunction) {
        let finalUrl, animeLink, episodeNumber, rest, tRest;
        let queryOptions = { active: true, currentWindow: true };

        let [tab] = await chrome.tabs.query(queryOptions);
        const newUrl = tab.url;


        if (newUrl.includes("animeheaven.online")) {
            finalUrl = newUrl.split("/");
            episodeNumber = parseInt(finalUrl[finalUrl.length - 1])
            animeLink = finalUrl[0];
            for (let i = 1; i < (finalUrl.length - 1); i++) {
                animeLink = animeLink + finalUrl[i] + "/"
            }
        }
        // https://kissanime.com.ru/Anime/Naruto-Shippuuden.41646/Episode-494?id=134730
        else if(newUrl.includes("kissanime.com.ru")){
            finalUrl = newUrl.split("Episode-");
            animeLink = finalUrl[0] + "Episode-";
            episodeAndId=finalUrl[1].split("?id=");
            episodeNumber = parseInt(episodeAndId[0], 10)
            let id = parseInt(episodeAndId[1], 10);
            rest = "?id="+(++id);

        }
        else {
            finalUrl = newUrl.split("episode-");
            animeLink = finalUrl[0] + "episode-";
            episodeNumber = parseInt(finalUrl[1], 10)
            tRest = finalUrl[1].split(episodeNumber)
            rest = tRest[1]
        }
        console.log("\nanimeLink: " + animeLink + "\nepisodeNumber: " + episodeNumber + "\nrest: " + rest)
        myCallBackFunction(animeLink, episodeNumber, rest)
    }
    function next(animeLink, episodeNumber, rest) {
        let ultraMaxProFinalLink;
        if (rest) {
            ultraMaxProFinalLink = animeLink + (episodeNumber + 1) + rest;
        }
        else {
            ultraMaxProFinalLink = animeLink + (episodeNumber + 1);
        }
        console.log(ultraMaxProFinalLink)
        chrome.tabs.update({ active: true, url: ultraMaxProFinalLink });

    }
    function previous(animeLink, episodeNumber, rest) {
        let ultraMaxProFinalLink;
        if (episodeNumber <= 1) {
            return;
        }
        if (rest) {
            ultraMaxProFinalLink = animeLink + (episodeNumber - 1) + rest;
        }
        else {
            ultraMaxProFinalLink = animeLink + (episodeNumber - 1);
        }
        console.log(ultraMaxProFinalLink)
        chrome.tabs.update({ active: true, url: ultraMaxProFinalLink });

    }


}, { url: [{ hostSuffix: "animeheaven.pro" }, { hostSuffix: "animeland.tv" }, { hostContains: "animeheaven.online" }, { hostContains: "kissanime.com.ru" }] });
