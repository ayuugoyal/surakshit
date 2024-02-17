// match pattern for the URLs to redirect
const backendUrl = "http://localhost:8000/predict";

/**
 * @type {(url: string) => Promise<string>}
 **/
async function send_request(url) {
  try {
    const res = await fetch(backendUrl, {
      method: "POST",
      body: JSON.stringify({ url: url }),
    })
      .then((res) => res.json())
      .then((j) => j.predicted_class);
    return res;
  } catch (e) {
    return "safe";
  }
}

// cancel function returns an object
// which contains a property `cancel` set to `true`
async function cancel(requestDetails) {
  console.log(`Cancel1ing: ${requestDetails.url}`);
  if ((await send_request(requestDetails.url)) != "safe") {
    return { cancel: true };
  }
  return { cancel: false };
}

// add listener to the onBeforeRequest event
const myElement = document.getElementById("demo");

const urllink = document.getElementById("links");

document.getElementById("myBtn").addEventListener("click", function () {
  alert(urllink.value);

  const data = fetch(backendUrl, {
    method: "POST",
    body: JSON.stringify({ url: urllink.value }),
  })
    .then((res) => res.json())
    .then((j) => j.predicted_class);

  myElement.innerHTML = data;
});

// const response = "unsafe";

myElement.innerHTML = response;
