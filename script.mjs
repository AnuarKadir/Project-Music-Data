import { getUserIDs, getListenEvents, getSong } from "./data.mjs";

import {
  mostListenedSong,
  mostListenedArtist,
  mostListenedSongByTime,
  mostListenedArtistByTime,
  fridayNightSong,
  fridayNightSongByTime,
  songsListenedEveryDay,
  longestSongStreak,
  topGenres,
} from "./common.mjs";

const userIDs = getUserIDs();
const userSelect = document.getElementById("user-select");
const resultsContainer = document.getElementById("results-container");
const promptMessage = document.getElementById("prompt-message");

// Populate the user dropdown with options
function populateUserDropdown() {
  for (const user of userIDs) {
    const option = document.createElement("option");
    option.value = user;
    option.textContent = `User ${user}`;
    userSelect.append(option);
  }
}

window.onload = function () {
  populateUserDropdown();
  userSelect.addEventListener("change", handleUserChange);
};

// Handle user selection change
function handleUserChange(event) {
  const userId = event.target.value;

  if (!userId) {
    document.getElementById("title").textContent = "Music Data Dashboard";
    resultsContainer.hidden = true;
    if (promptMessage) promptMessage.hidden = false;
    return;
  }

  const events = getListenEvents(userId);

  if (!events || events.length === 0) {
    document.getElementById("title").textContent =
      "This user didn't listen to any songs.";
    resultsContainer.hidden = true;
    promptMessage.hidden = true;
    return;
  }

  promptMessage.hidden = true;
  resultsContainer.hidden = false;
  resultsContainer.querySelectorAll("p").forEach((p) => (p.hidden = false));

  const topSong = mostListenedSong(events);
  const topArtist = mostListenedArtist(events);
  const topSongTime = mostListenedSongByTime(events);
  const topArtistTime = mostListenedArtistByTime(events);
  const topGenresList = topGenres(events);
  const streak = longestSongStreak(events);
  const fridaySong = fridayNightSong(events);
  const fridaySongTime = fridayNightSongByTime(events);
  const everyDaySongs = songsListenedEveryDay(events);

  document.getElementById("title").textContent = `User ${userId} Analysis`;

  document.getElementById("top-song").textContent =
    `${topSong.song.artist} - ${topSong.song.title}`;

  document.getElementById("top-song-time").textContent =
    `${topSongTime.song.artist} - ${topSongTime.song.title}`;

  document.getElementById("top-artist").textContent = topArtist;
  document.getElementById("top-artist-time").textContent = topArtistTime;

  document.getElementById("top-genres").textContent = topGenresList.join(", ");
  const genresLabel = document.getElementById("genres-label");
  if (topGenresList.length === 1) {
    genresLabel.textContent = "Top genre:";
  } else if (topGenresList.length === 2) {
    genresLabel.textContent = "Top 2 genres:";
  } else {
    genresLabel.textContent = "Top 3 genres:";
  }

  if (streak) {
    const streakSong = getSong(streak.songId);
    document.getElementById("streak").textContent =
      `${streakSong.artist} - ${streakSong.title} (length: ${streak.length})`;
  }

  const fridayCountRow = document.getElementById("friday-count-row");

  if (fridaySong) {
    fridayCountRow.hidden = false;
    document.getElementById("friday-song").textContent =
      `${fridaySong.song.artist} - ${fridaySong.song.title}`;
  } else {
    fridayCountRow.hidden = true;
  }

  const fridayTimeRow = document.getElementById("friday-time-row");

  if (fridaySongTime) {
    fridayTimeRow.hidden = false;
    document.getElementById("friday-song-time").textContent =
      `${fridaySongTime.song.artist} - ${fridaySongTime.song.title}`;
  } else {
    fridayTimeRow.hidden = true;
  }

  const everyDayRow = document.getElementById("every-day-row");

  if (everyDaySongs.length > 0) {
    everyDayRow.hidden = false;
    document.getElementById("every-day-songs").textContent = everyDaySongs
      .map((id) => {
        const song = getSong(id);
        return `${song.artist} - ${song.title}`;
      })
      .join(", ");
  } else {
    everyDayRow.hidden = true;
  }
}
