import { css } from "uebersicht";
import styles from "../styles.mjs";
import config from "../ressources/config.json";

const {WeatherContainer, Temperature} = styles;

export const Weather = ({weather}) => {
    if(!weather)
      return (
        <WeatherContainer>
          <img src={config.apis.OPEN_WEATHER.url_icon.replace("ICON_ID", "03d")} className={css({height: "80px"})}></img>
          <Temperature>~°</Temperature>
        </WeatherContainer>
      );
    const temp = Math.round(weather.temp);
    return (
      <WeatherContainer>
        <img src={config.apis.OPEN_WEATHER.url_icon.replace("ICON_ID", weather.icon)} className={css({height: "80px"})}></img>
        <Temperature>{temp}°</Temperature>
      </WeatherContainer>
    )
  }