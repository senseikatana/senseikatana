# 🎨 Color Compass: LCH vs HSL Playground

An interactive, visual, and educational tool designed to help developers and designers understand the differences between the traditional HSL color model and the modern, perceptually uniform OKLCH color space.

If you've ever been confused by why a 50% lightness in HSL looks completely different depending on the hue, or why the oklch() hue angles seem "rotated" compared to HSL, this tool is for you.

> Dial Preview(Note: Replace this image with an actual GIF or screenshot of the tool in action)

## 🚀 Features

* Interactive 360° Dial: A draggable dial that synchronizes the Hue for both HSL and OKLCH simultaneously.
* Dual Color Rings: The dial features two concentric rings. The outer ring shows the perfect 60° divisions of HSL, while the inner ring shows the physically accurate, deformed divisions of OKLCH.
* Independent Sliders: Separate controls for Lightness, Saturation/Chroma, and Alpha for both models, allowing you to see how the same numeric values produce different visual results.
* Dynamic Slider Tracks: The background of every slider updates in real-time, acting as a mini color-picker to show exactly what values you are traversing.
* Real-time CSS Code Output: Instantly generates the exact hsl() and oklch() CSS strings, ready to copy to your clipboard.
* Zero Dependencies: Built with pure HTML, CSS, and Vanilla JavaScript. No frameworks, no build steps.

## 🧠 The Core Concept: Why OKLCH?

HSL (Hue, Saturation, Lightness) was designed to be easy for humans to understand. However, it is mathematically flawed when it comes to how screens emit light and how our eyes perceive it.

- HSL is not perceptually uniform: A Yellow at 50% Lightness appears blindingly bright to the human eye, while a Blue at 50% Lightness appears quite dark.
- OKLCH is perceptually uniform: If you set an OKLCH Lightness to 60%, a Red, a Green, and a Blue will all visually appear to have the exact same brightness. This makes creating balanced color palettes and accessible UI components infinitely easier.
- The Hue Shift: Because OKLCH maps to human vision rather than screen RGB primaries, the color wheel is slightly rotated and asymmetrical. Pure red in HSL is 0°, but in OKLCH it is ~29°.

---

## 🧪 The "Aha!" Experiment

To see the power of OKLCH in action, try this in the playground:

1. Set the HSL Hue to 49° (a bright yellow) and OKLCH Hue to 85° (its equivalent).
2. Set Lightness to 50% and Saturation/Chroma to 100% in both panels.
3. Look at the large color displays. Notice how HSL yellow is blindingly bright, while OKLCH yellow is balanced.
4. Now, drop the Lightness to 20% in both panels.
5. Notice how the HSL yellow becomes a dark olive/brown, while the OKLCH yellow gracefully darkens into a rich, recognizable gold.

---

## 🛠️ How to Use
No installation required.

1. Clone the repository:

`git clone https://github.com/your-username/oklch-dial-lab.git`

2. Navigate to the folder:

```bash 
cd oklch-dial-lab
```

3. Open index.html in your favorite web browser. That's it!

---

## ⚙️ The Math: Hue Interpolation
Because the OKLCH color space is not a perfect circle, transitioning from HSL to OKLCH requires a custom linear interpolation. This tool uses a mapping array of the primary and secondary colors to calculate the exact degree translation:


```JavaScript
const map = [
  [0, 29],   // Red
  [60, 90],  // Yellow
  [120, 142], // Green
  [180, 195], // Cyan
  [240, 264], // Blue
  [300, 360]  // Magenta
];
```

When you drag the HSL dial, the tool calculates the percentage of the segment you are in and applies that same percentage to the equivalent OKLCH segment.

🧩 Tech Stack
HTML5: Semantic structure and native range inputs.
CSS3: conic-gradient for color wheels, CSS mask-image for ring shaping, and linear-gradient for dynamic slider tracks.
Vanilla JS: DOM manipulation, touch/mouse drag events, and mathematical interpolation.
📄 License
This project is open source and available under the MIT License.

