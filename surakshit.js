// match pattern for the URLs to redirect
let pattern = "https://developer.mozilla.org/*";

// cancel function returns an object
// which contains a property `cancel` set to `true`
function cancel(requestDetails) {
    console.log(`Canceling: ${requestDetails.url}`);
    return { cancel: true };
}

// add the listener,
// passing the filter argument and "blocking"
browser.webRequest.onBeforeRequest.addListener(
    cancel,
    { urls: [pattern], types: ["image"] },
    ["blocking"],
);
