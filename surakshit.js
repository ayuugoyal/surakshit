// match pattern for the URLs to redirect
let pattern = "<all_urls>";
const backendUrl = "http://localhost:8000/predict";

/**
* @type {(url: string) => Promise<string>}
**/
async function send_request(url) {
    try {
        const res = await fetch(backendUrl, { method: "POST", body: JSON.stringify({ "url": url }) })
            .then((res) => res.json()).then((j) => j.predicted_class);
        return res;
    } catch (e) {
        return "safe";
    }
}

// cancel function returns an object
// which contains a property `cancel` set to `true`
async function cancel(requestDetails) {
    console.log(`Cancel1ing: ${requestDetails.url}`);
    if (await send_request(requestDetails.url) != "safe") {
        return { cancel: true };
    }
    return { cancel: false };
}

// add the listener,
// passing the filter argument and "blocking"
browser.webRequest.onBeforeRequest.addListener(
    cancel,
    { urls: [pattern] },
    ["blocking"],
);
