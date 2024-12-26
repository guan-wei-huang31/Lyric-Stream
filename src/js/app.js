
// All of our data is available on the global `window` object.
// Create local variables to work with it in this file.
const { artists, songs } = window;

// For debugging, display all of our data in the console. You can remove this later.
console.log({ artists, songs }, "App Data");

let navMenu = document.querySelector("#menu");
let selectedArtistTitle = document.querySelector("#selected-artist");
let cardsContainer = document.querySelector(".cards");

//Clear current song list
function clearSongs() {
  cardsContainer.innerHTML = "";
}

// second to mm:ss
function formatLength(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
}

//Converts language codes
const displayNames = new Intl.DisplayNames(["en"], { type: "language" });
function getLanguageName(code) {
  return displayNames.of(code);
}

// SongCard function
function createSongCard(song) {
  const cardLink = document.createElement("a");
  cardLink.href = song.link;
  cardLink.target = "_blank";
  cardLink.classList.add("card-link");

  // Create a <div> to hold the card
  const card = document.createElement("div");
  // Add the .card class to the <div>
  card.classList.add("card");

  // Create a song image, use the .card-image class
  const songImg = document.createElement("img");
  songImg.src = song.imageUrl;
  songImg.alt = song.title;
  songImg.classList.add("card-image");
  card.appendChild(songImg);

  // ... rest of your card building code here
  const songName = document.createElement("h3");
  songName.classList.add("songName");
  songName.textContent = song.title;
  card.appendChild(songName);

  const content = document.createElement("div");
  content.classList.add("content");

  const langCell = document.createElement("span");
  langCell.textContent = song.lang.map(getLanguageName).join(", ");
  content.appendChild(langCell);

  const released = document.createElement("time");
  released.dateTime = song.year;
  released.textContent = `Year: ${song.year}`;
  content.appendChild(released);

  const duration = document.createElement("span");
  duration.textContent = `Duration: ${formatLength(song.length)}`;
  content.appendChild(duration);

  card.appendChild(content);
  cardLink.appendChild(card);
  // Return the card’s <div> element to the caller
  return cardLink;
}

// Function to display the selected artist's information and songs
function displayArtist(artist) {
  selectedArtistTitle.innerHTML = artist.name + " (";
  artist.links.forEach((link, index) => {
    const webArtist = document.createElement("a");
    webArtist.textContent = link.displayName;
    webArtist.href = link.url;
    webArtist.target = "_blank";
    selectedArtistTitle.appendChild(webArtist);
    if (index < artist.links.length - 1) {
      selectedArtistTitle.appendChild(document.createTextNode(", "));
    }
  });
  selectedArtistTitle.appendChild(document.createTextNode(")"));

  // Clear song
  clearSongs();

  // Filter the songs for the selected artist
  const artistSongs = songs.filter((song) => song.artistId === artist.artistId && !song.explicit);

  artistSongs.forEach((song) => {
    const songCard = createSongCard(song);
    cardsContainer.appendChild(songCard);
  });
}

// Event listener to ensure the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  artists.forEach((artist, index) => {
    const navArtist = document.createElement("button");
    navArtist.textContent = artist.name;
    navMenu.appendChild(navArtist);

    navArtist.addEventListener("click", () => displayArtist(artist));

    if (index === 0) {
      displayArtist(artist);
    }
  });
});
