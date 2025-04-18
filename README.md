# What Type of Punk Are You? — A Personality Quiz

This project is an interactive personality quiz built using p5.js, HTML, CSS, and vanilla JavaScript. It asks users a series of 8 questions to determine which punk subculture best matches their personality: Hardcore Punk, Riot Grrrl, Crust Punk, or Pop Punk.

---

## Design Process

The goal was to create a fun and expressive experience that reflects the values and aesthetics of punk subcultures. I focused on keeping the layout minimal while using interactive visuals to reflect the gritty and rebellious nature of punk.

The quiz follows a simple structure:
- A start screen to welcome users
- Eight multiple-choice questions with hover effects
- A final result screen that displays a matching punk archetype and description

All visuals are rendered in a p5.js canvas to allow full creative control over layout and interaction. Buttons and text elements are positioned manually, and states (like the start screen or results screen) are handled using conditional logic within the draw loop.

---

## Inspiration and References

This quiz draws inspiration from:
- Classic online personality quizzes
- Punk zine design and DIY aesthetics
- The core values of punk music and its many subgenres

Key references included:
- The p5.js documentation and examples
- Mood boards featuring punk poster art, album covers, and hand-drawn typography
- Articles on the history and culture of punk music

---

## Challenges Faced

Several technical and design challenges came up during development:

- Managing the transitions between quiz states (start screen, question view, results)
- Debugging result output issues due to inconsistent type strings (e.g., "Riot Grrrl" vs "Riot Girl")
- Handling user interaction precisely with custom buttons and hitboxes
- Keeping the code modular and readable without using libraries or frameworks
- Implementing `localStorage` to persist the final result across pages (for a future feature)

---

## Next Steps and Version 2 Plans

If given more time, the project could be extended in several creative and technical ways:

- Add animated or Perlin noise backgrounds to enhance the visual experience
- Include punk-themed audio for added immersion
- Display image collages or playlists with each result for a richer outcome
- Improve mobile responsiveness and accessibility
- Add a question progress indicator or animated transitions
- Allow users to restart the quiz or share their results
- Use local storage to build a recap page or allow users to revisit their result later


