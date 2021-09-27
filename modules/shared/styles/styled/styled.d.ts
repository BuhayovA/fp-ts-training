import "styled-components";
import { colors, templates } from "./theme";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: typeof colors;
    templates: typeof templates;
  }
}
