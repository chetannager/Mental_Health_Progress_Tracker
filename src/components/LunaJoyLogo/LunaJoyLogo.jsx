import LogoLight from "../../assets/logo-light.png";
import LogoDark from "../../assets/logo-dark.png";
import { useThemeContext } from "../../contexts/ThemeContext";

function LunaJoyLogo(props) {
  const { theme, ...other } = props;
  const { themeMode, toggleTheme } = useThemeContext();

  return themeMode === "dark" ? (
    <img src={LogoLight} {...other} />
  ) : (
    <img src={LogoDark} {...other} />
  );
}

export default LunaJoyLogo;
