const $ = (x) => {
    return document.getElementById(x)
}

let output = ''




window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
let finalTranscript = '';
let recognition = new window.SpeechRecognition();
recognition.interimResults = true;
recognition.maxAlternatives = 10;
recognition.continuous = true;
recognition.onresult = (event) => {
  let interimTranscript = '';
  for (let i = event.resultIndex, len = event.results.length; i < len; i++) {
    let transcript = event.results[i][0].transcript;
    if (event.results[i].isFinal) {
      finalTranscript += transcript;
    } else {
      interimTranscript += transcript;
    }
  }
  $('voiceIn').textContent = finalTranscript;
  output = finalTranscript
}
recognition.start();


async function spot(){
    let res = await fetch(`https://api.spotify.com/v1/search?type=album%2Cartist%2Ctrack&q=${output}`,
    {"headers":{"authorization":"Bearer BQAEs12YeLimDiKr5ctXrFoxxSfbIg4K9ymofH3DABlDkpgOIe8ZtzlCIXhTgeTKvXwk4SKS0a3lHXRWQ9oXziXBmaOIAB6m63-cs_3MZiPI90MeyhoRsQwUEgU43EpuBD97tpjQzspXZwTmCf2G0_36iZeHon-jSAklTmYJ7JRy3azdYI4b8J1UzGwpDmlebMBdpOrEqyjJsx8nyk0KuZz7Jb6j266ClaQ_KjxHCMVSpflLyHU7cvzj1wPZVJDYMpPI5gdr7ePj14yDc3oddMQqXA"},
    "referrer":"http://localhost:5500","referrerPolicy":"no-referrer-when-downgrade","body":null,"method":"GET","mode":"cors"});
    let data = await res.json()
    let tracks = await data.tracks.items
    let tracknames = []
    tracks.forEach(el => tracknames.push(el.name))
    console.log(tracknames)
}