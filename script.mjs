import { getUserIDs, getListenEvents, getSong } from "./data.mjs";

document.addEventListener("DOMContentLoaded", () => {
  const userSelect = document.getElementById("user-select");
  const resultsContainer = document.getElementById("results-container");
  const userIDs = getUserIDs();

  userIDs.forEach((id) => {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = `User ${id}`;
    userSelect.appendChild(option);
  });

  userSelect.addEventListener("change", (event) => {
    const selectedUserId = event.target.value;
    displayUserStats(selectedUserId);
  });

  function displayUserStats(userID) {
    const events = getListenEvents(userID);
    if (!events || events.length === 0) {
      resultsContainer.innerHTML =
        "<p>This user didn't listen to any songs.</p>";
      return;
    }
    resultsContainer.innerHTML = `<p>Data loaded for User ${userID}. Total listens: ${events.length}</p>`;
  }
});
