import React from "react";
import Slider from "react-slider";
import "./MoodRatingSlider.css";

const moodImages = [
  {
    src: "https://emojiisland.com/cdn/shop/products/Very_sad_emoji_icon_png_large.png?v=1571606089",
    label: "Very Sad",
    rating: 0,
  },
  {
    src: "https://emojiisland.com/cdn/shop/products/Emoji_Icon_-_Sad_Emoji_large.png?v=1571606093",
    label: "Sad",
    rating: 1,
  },
  {
    src: "https://emojiisland.com/cdn/shop/products/Neutral_Face_Emoji_large.png?v=1571606037",
    label: "Neutral",
    rating: 2,
  },
  {
    src: "https://emojiisland.com/cdn/shop/products/Happy_Emoji_Icon_5c9b7b25-b215-4457-922d-fef519a08b06_large.png?v=1571606090",
    label: "Happy",
    rating: 3,
  },
  {
    src: "https://emojiisland.com/cdn/shop/products/Emoji_Icon_-_Happy_large.png?v=1571606093",
    label: "Very Happy",
    rating: 4,
  },
];

const MoodRatingSlider = ({ value, onChange }) => {
  return (
    <Slider
      className="mood-slider"
      value={value}
      onChange={onChange}
      min={0}
      max={4}
      marks
      step={1}
      renderThumb={(props, state) => (
        <img
          {...props}
          className="mood-thumb"
          src={moodImages[state.value].src}
          alt={moodImages[state.value].label}
        />
      )}
      renderMark={(props) => (
        <img
          {...props}
          className="mood-mark"
          src={moodImages[props.key].src}
          alt={moodImages[props.key].label}
        />
      )}
    />
  );
};

export default MoodRatingSlider;
