# TESTING.md

## Website functionality & rubric testing

Dropdown with 4 users:

- manual test: I loaded the page and confirmed the dropdown contains User 1, User 2, User 3, and User 4.

Selecting a user displays relevant answers:

- manual test: I selected each user and verified that all calculated answers match the expected results table.

User 4 edge-case (no data):

- manual test: I selected User 4 and confirmed it displays "This user didn't listen to any songs." and hides all result containers.

Hiding inapplicable questions:

- manual test: I selected User 3 and confirmed that questions without data (Friday night song and Every day songs) are completely hidden.

Dynamic genre labeling:

- manual test: I selected User 2 and confirmed the label dynamically changes to "Top genre:" instead of "Top 3 genres".

Unit tests for non-trivial logic:

- Unit tests are in common.test.mjs. They check that longestSongStreak() calculates consecutive song plays correctly and isFridayNight() accurately identifies Friday night hours without timezone issues.

Accessibility:

- manual test: I ran Chrome Lighthouse Snapshot mode on all views (default, User 1, User 3, and User 4) and confirmed a 100% accessibility score across all of them.

Deployment:

- manual test: I confirmed the website is deployed online and updates automatically when changes are merged into GitHub.
