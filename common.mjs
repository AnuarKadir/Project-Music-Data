import { getSong } from "./data.mjs";

function countBy(items, keyFn) {
  const counts = new Map();
  for (const item of items) {
    const key = keyFn(item);
    counts.set(key, (counts.get(key) || 0) + 1);
  }
  return counts;
}

export function mostListenedSong(events) {
  if (events.length === 0) return null;
  const counts = countBy(events, (e) => e.song_id);
  const [songId] = [...counts.entries()].sort((a, b) => b[1] - a[1])[0];
  return {
    song: getSong(songId),
    listens: counts.get(songId),
  };
}

export function mostListenedArtist(events) {
  if (events.length === 0) return null;
  const counts = countBy(events, (e) => getSong(e.song_id).artist);
  const [artist] = [...counts.entries()].sort((a, b) => b[1] - a[1])[0];
  return artist;
}

export function mostListenedSongByTime(events) {
  if (events.length === 0) return null;

  const totals = new Map();
  for (const event of events) {
    const song = getSong(event.song_id);
    totals.set(song.id, (totals.get(song.id) || 0) + song.duration_seconds);
  }
  const [songId, seconds] = [...totals.entries()].sort(
    (a, b) => b[1] - a[1],
  )[0];
  return {
    song: getSong(songId),
    seconds,
  };
}

export function mostListenedArtistByTime(events) {
  if (events.length === 0) return null;

  const totals = new Map();
  for (const event of events) {
    const song = getSong(event.song_id);
    totals.set(
      song.artist,
      (totals.get(song.artist) || 0) + song.duration_seconds,
    );
  }

  const [artist] = [...totals.entries()].sort((a, b) => b[1] - a[1])[0];
  return artist;
}

export function isFridayNight(event) {
  const date = new Date(event.timestamp);
  const day = date.getDay();
  const hour = date.getHours();

  return (day === 5 && hour >= 17) || (day === 6 && hour < 4);
}

//
export function fridayNightSong(events) {
  const fridayEvents = events.filter(isFridayNight);
  if (fridayEvents.length === 0) return null;
  return mostListenedSong(fridayEvents);
}

//
export function fridayNightSongByTime(events) {
  const fridayEvents = events.filter(isFridayNight);
  if (fridayEvents.length === 0) return null;
  return mostListenedSongByTime(fridayEvents);
}

export function songsListenedEveryDay(events) {
  const allDays = new Set();
  const songDays = new Map();

  for (const event of events) {
    const day = event.timestamp.slice(0, 10);
    allDays.add(day);

    if (!songDays.has(event.song_id)) {
      songDays.set(event.song_id, new Set());
    }
    songDays.get(event.song_id).add(day);
  }

  return [...songDays.entries()]
    .filter(([, days]) => days.size === allDays.size)
    .map(([songId]) => songId);
}

export function longestSongStreak(events) {
  if (events.length === 0) return null;
  let currentSong = events[0].song_id;
  let currentLength = 1;
  let bestSong = currentSong;
  let bestLength = 1;

  for (let i = 1; i < events.length; i++) {
    const song = events[i].song_id;

    if (song === currentSong) {
      currentLength++;
    } else {
      currentSong = song;
      currentLength = 1;
    }

    if (currentLength > bestLength) {
      bestLength = currentLength;
      bestSong = currentSong;
    }
  }

  return {
    songId: bestSong,
    length: bestLength,
  };
}

export function topGenres(events) {
  const counts = countBy(events, (e) => getSong(e.song_id).genre);

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([genre]) => genre);
}
