
chrome.commands.onCommand.addListener((command) => {
    getCurrentTab();
    if (command === 'next') {
        console.log("Started Next");
        getCurrentTab(next)
    }
    else if (command === 'previous') {
        console.log("Started Previous");
        getCurrentTab(previous)
    }
});

async function getCurrentTab(myCallBackFunction) {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    const newUrl = tab.url;
    const finalUrl = newUrl.split("episode-");
    let animeLink = finalUrl[0] + "episode-";
    let episodeNumber = parseInt(finalUrl[1], 10)
    myCallBackFunction(animeLink,episodeNumber)
    

}
function next(animeLink,episodeNumber) {

    let ultraMaxProFinalLink = animeLink + (episodeNumber + 1);
    console.log(ultraMaxProFinalLink)
    chrome.tabs.update({ active: true, url: ultraMaxProFinalLink });

}
function previous(animeLink,episodeNumber) {
    let ultraMaxProFinalLink = animeLink + (episodeNumber - 1);
    console.log(ultraMaxProFinalLink)
    chrome.tabs.update({ active: true, url: ultraMaxProFinalLink });

}