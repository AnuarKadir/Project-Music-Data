import assert from "node:assert";
import test from "node:test";

import { longestSongStreak, isFridayNight } from "./common.mjs";

test("longest song streak", () => {
  const events = [
    { song_id: "song-1" },
    { song_id: "song-1" },
    { song_id: "song-2" },
    { song_id: "song-1" },
  ];

  const result = longestSongStreak(events);

  assert.equal(result.songId, "song-1");
  assert.equal(result.length, 2);
});

test("Friday night", () => {
  const friday = { timestamp: "2024-08-02T20:00:00" };
  const saturdayNight = { timestamp: "2024-08-03T02:00:00" };
  const saturdayDay = { timestamp: "2024-08-03T12:00:00" };

  assert.equal(isFridayNight(friday), true);
  assert.equal(isFridayNight(saturdayNight), true);
  assert.equal(isFridayNight(saturdayDay), false);
});
