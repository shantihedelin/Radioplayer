// Steg 1. Gör en fetch till 'https://api.sr.se/api/v2/channels/?format=json'

// Steg 2. loopa med tex forEach över data.channels - ta ut data och visa på html-sidan.

// Steg 3. ta ut liveaudio.url från varje kanal och lägg i en audio tagg.
// <audio controls>
//   <source src="" type="audio/mpeg" />
// </audio>

async function getData() {
  try {
    // Hämta datan.
    const response = await fetch(
      "https://api.sr.se/api/v2/channels/?format=json"
    );
    const data = await response.json();

    // Skapa en div för datan att bo i.
    const dataContainer = document.createElement("div");
    dataContainer.classList.add("data-container");

  // Loopa igenom varje kanal och skapa ett element för varje.
data.channels.forEach((channels) => {
    const channelEl = document.createElement("div");
  
    // Skapa wrapper-div för p och audio
    const textWrapper = document.createElement("div");
    textWrapper.classList.add("text-wrapper");
  
    // Lägga till datan från kanalen till elementet.
    // / Bygga upp datan och välja ut vad som ska visas.
    textWrapper.innerHTML = `
      <p>${channels.name}</p>
      <audio controls> 
        <source src="${channels.liveaudio.url}" type="audio/mpeg">
        Your browser does not support the audio element.
      </audio>
    `;
  
    // Lägg till bilden och textWrapper i channelEl
    channelEl.appendChild(document.createElement("img")).src = channels.image;
    channelEl.appendChild(textWrapper);
  
    // Lägg till datan i containern som vi skapade tidigare.
    dataContainer.appendChild(channelEl);
  });

    document.body.appendChild(dataContainer);
  } catch (error) {
    //Om det blir nåt nätverksfel så körs detta (error) istället.
    console.error("Error fetching data:", error);
  }
}
getData();
