// SVG (если используешь как ReactComponent)
export { default as dark } from "./dark.svg";
export { default as facebook } from "./facebook.svg";
export { default as github } from "./github.svg";
export { default as google } from "./google.svg";
export { default as main } from "./main.svg";
export { default as vimeo } from "./vimeo.svg";
export { default as x } from "./x.svg";

// PNG — импортируем в переменные (как StaticImageData)
import discord from "./discord.png";
import instagram from "./instagram.png";
import telegram from "./telegram.png";

// Собираем логотипы в объект
export const logos = {
  discord,
  telegram,
  instagram,
};
