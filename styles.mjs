const { styled, css } = require("uebersicht");
import config from "./ressources/config.json";

export default { 
    Header: styled("div")`
        display: flex;
        flex-direction: column;
        height: 25%;  
    `,

    Title: styled("h1")`
        font-family: 'Raleway';
        font-size: 28px;
        margin: 2px 0 0 4px;
        font-weight: 100;
        color: #ffffff99;
    `,

    WeatherContainer: styled("div")`
        display: flex;
        justify-content: center;
        align-items: center;
        height: max-content;
    `,

    Temperature: styled("h2")`
        font-family: Roboto;
        font-size: 40px;
        height: 40px;
        font-weight: 500;
        color: white;
    `,

    Main: styled("div")`
        display: flex;
        width: calc(100% + 10px);
        position: relative;
        left: -5px;
        flex-direction: column;
        flex: 1;
        background-color: ${config.styles.backgroundColor};
    `,

    DateContainer: styled("div")`
        display: flex;
        flex-direction: column;
        align-items: center;
    `,

    ToDoContainer: styled("div")`
        display: flex;
        flex: 1;
        flex-direction: column;
        background-color: ${config.styles.backgroundColor};
        position: relative;
    `,

    AddReminder: styled("button")`
        width: 18px;
        height: 18px;
        border-radius: 9px;
        border: none;
        position: absolute;
        right: 5px;
        top: 5px;
        background-color: white;
        margin:0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        &:active{
        transform: scale(0.98);
        opacity: 0.9;
        }
    `,

    text: css({
        fontFamily: "Roboto",
        fontSize: "14px",
        fontWeight: 200,
        color: "white",
        margin: 0,
        textAlign: "center"
    })
}