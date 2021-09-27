import { DefaultTheme, css } from "styled-components";

export const colors = {
  // yellow
  yellow100: "#fff5cc",
  yellow300: "#FFE9B7",
  yellow400: "#ffd029",
  // blue
  blue150: "#D6FAFF",
  blue300: "#02a0fc",
  blue400: "#4339f2",
  // orange
  orange100: "#ffe5d3",
  orange400: "#FF8540",
  // green
  green100: "#e2fbd7",
  green400: "#34b53a",
  green600: "#00AEAE",
  // purple
  purple100: "#e7edff",
  purple150: "#F1F0FF",
  purple200: "#dad7fe",
  purple400: "#9b51e0",
  // gray
  gray100: "#f8f8f8",
  gray150: "#f2f2f2",
  gray180: "#c6c6c6",
  gray200: "#ccc",
  gray300: "#999",
  gray350: "#919191",
  gray400: "#828282",
  // red
  red100: "#ffe5d3",
  red200: "#FFCCCC",
  red300: "#eb5757",
  red400: "#ff3a29",
  // pink
  pink100: "#FFDEF0",
  pink400: "#FE008B",
  // other
  white: "#fff",
  black: "#000",
};

export const templates = {
  absolute: css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  `,
  centerContent: css`
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  centerItems: css`
    display: flex;
    align-items: center;
  `,
  hoverEffect: css`
    &:hover {
      opacity: 0.5;
      transition: opacity 0.3s ease;
    }
  `,
  shadow: css`
    box-shadow: 0 4px 32px 0 rgba(232, 232, 235, 0.6);
  `,
  ellipsis: css`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
};

export const theme: DefaultTheme = {
  colors,
  templates,
};
