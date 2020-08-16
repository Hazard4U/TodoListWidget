import { css } from "uebersicht";
import styles from "../styles.mjs";
import {Task} from "../components/Task.jsx";

const {text} = styles;

export const ListContainer = ({reminders, done, sentences:{plural, singular}, color, dispatch}) => {
    return (
        <div>
            <p className={`${css({margin: "10px 0", fontSize: "11px"})} ${text}`}>
                {reminders.length > 1 ?
                `${reminders.length} ${plural}` :   
                `${reminders.length} ${singular}`
                }
            </p>
            <div className={`${css({marginLeft: "10px"})}`}>
            {reminders.map((reminder,index) => (
                <Task
                    done={done}
                    dispatch={dispatch}
                    key={index}
                    id={index}
                    color={color}
                >
                    {reminder}
                </Task>
            ))}
            </div>
        </div>
    )
}