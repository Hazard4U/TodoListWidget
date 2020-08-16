import { css } from "uebersicht";
import dispatchers from "./dispatchers.mjs";
import actions from "./actions.mjs";
import config from "./ressources/config.json";
import styles from "./styles.mjs";
import { Weather } from "./components/Weather.jsx";
import { ListContainer } from "./components/ListContainer.jsx";

const {
  Header,
  Title,
  Main,
  DateContainer,
  ToDoContainer,
  AddReminder,
  text} = styles;


export const className = `
    @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@100&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap');
    left: 20px;
    top: 20px;
    width: 238px;
    height: 570px;
    border-radius: 20px;
    overflow: hidden;
`

export const initialState = {
    name: "inconnu",
    time: undefined,
    weather: undefined,
    reminders:{
      todo:[],
      done:[]
    }
}

export const init = (dispatch) => {
  actions.setCurrentPath().then(()=>{
    dispatchers.setWeather(dispatch);
    dispatchers.setName(dispatch);
    dispatchers.setHours(dispatch);
    dispatchers.setReminders(dispatch);
  })
}

let current_background = "./TodoListWidget/pictures/backgrounds/day.png";
let current_activeColor = "#2B91E3";
const updateStyle = (sunrise, sunset) => {
  const now = Date.now();
  const hours = 1000 * 60 * 60;
  sunrise *= 1000;
  sunset *= 1000;
  if(now >= sunset || now < sunrise){
    current_background = config.styles.backgroundSunset;
    current_activeColor = "#6A46A8";
  }else if((now >= sunrise && now < sunrise + 2*hours) || now >= sunset - 2*hours){
    current_background = config.styles.backgroundSunrise;
    current_activeColor = "#65E4DD";
  }else{
    current_background = config.styles.backgroundDay;
    current_activeColor = "#2B91E3";
  }
}

export const updateState = (event, previousState) => {
    switch(event.type) {
      case 'TIME': return {...previousState, time: event.data}
      case 'NAME': return {...previousState, name: event.data};
      case 'UPDATE_REMINDERS':{
        let newState = {...previousState}
        return {...newState, reminders: {done: event.data.done, todo: event.data.todo}};
      }
      case 'CHANGE_REMINDER_STATUS':{
        const reminder = event.data;
        let newState = {...previousState}
        let listWhereFilter = reminder.done ? newState.reminders.done : newState.reminders.todo;
        let listWherePush = reminder.done ? newState.reminders.todo : newState.reminders.done;
        listWhereFilter = listWhereFilter.filter((_, index) => reminder.id != index);
        listWherePush.push(reminder.name)
        newState.reminders.todo = reminder.done ? listWherePush : listWhereFilter;
        newState.reminders.done = reminder.done ? listWhereFilter : listWherePush;
        return {...newState};
      }
      case 'WEATHER':
        if(!event.data.weather)
          return previousState;
        updateStyle(event.data.sys.sunrise,event.data.sys.sunset);
        return {...previousState, weather: {
          icon: event.data.weather[0].icon,
          description: event.data.weather[0].description,
          temp: event.data.main.temp,
          temp_felt: event.data.main.feels_like,
        }};
      default: {
        return previousState;
      }
    }
}

const addReminderHandler = (dispatch)=>{
  actions.createReminder().then(() =>{
    dispatchers.setReminders(dispatch)
  });
}

export const render = ({name, weather, time, reminders}, dispatch) => {
  return (
    <div className={css({height: "100%", padding: "5px",display:"flex", flexDirection: "column", backgroundImage: `url("${current_background}")`, backgroundSize: "cover"})}>
      <Header>
        <Title>{config.title}<br/>{name}</Title>
        <Weather weather={weather}/>
      </Header>
      <Main>
        <DateContainer>
          <p className={`${css({marginTop: "4px"})} ${text}`}>{actions.getDate()}</p>
          <p className={`${text}`}>{weather ? weather.description : "inconnu"}</p>
          <p className={`${css({margin: "4px 0", fontWeight: 500, fontSize: "19px"})} ${text}`}>{time}</p>
        </DateContainer>
        <ToDoContainer>
          <AddReminder onClick={addReminderHandler.bind(this,dispatch)}>
            <svg fill={current_activeColor} height="10px" viewBox="0 0 448 448" width="10px" xmlns="http://www.w3.org/2000/svg">
              <path d="m272 184c-4.417969 0-8-3.582031-8-8v-176h-80v176c0 4.417969-3.582031 8-8 8h-176v80h176c4.417969 0 8 3.582031 8 8v176h80v-176c0-4.417969 3.582031-8 8-8h176v-80zm0 0"/>
            </svg>
          </AddReminder>
          <ListContainer
            dispatch={dispatch}
            reminders={reminders.todo}
            done={false}
            sentences={{plural: config.todo.uncompletedTasksTitle, singular: config.todo.uncompletedTaskTitle}}
            color={current_activeColor}
          />
          <ListContainer
            dispatch={dispatch}
            reminders={reminders.done}
            done={true}
            sentences={{plural: config.todo.completedTasksTitle, singular: config.todo.completedTaskTitle}}
            color={current_activeColor}
          />
        </ToDoContainer>
      </Main>
    </div>
  )
}
