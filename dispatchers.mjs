const actions = require("./actions.mjs").default;

const setWeather = (dispatch) => {
    actions.getWeather().then( data => {
      dispatch({type: "WEATHER", data});
      
    });
    setInterval(() => {
        actions.getWeather().then( data => {
        dispatch({type: "WEATHER", data});
      });
    }, 3600000);
  }
  
  const setName = (dispatch) => {
    actions.getName().then((res,err) => {
      if(err)
          console.error(err);
      dispatch({type: 'NAME', data: res || "inconnu" });
    });
  }  

  const setHours = (dispatch) => {
    dispatch({type: "TIME", data: actions.getHours()});
    setTimeout(() => {
      dispatch({type: "TIME", data: actions.getHours()});
      setInterval(() => {
        dispatch({type: "TIME", data: actions.getHours()})
      }, 60000);
    },60000-(Date.now()%60000));
  }

  const setReminders = async (dispatch) => {
    const [todo, done] = await Promise.all([actions.getRemindersNotDone(), actions.getRemindersDone()]);
    dispatch({type: 'UPDATE_REMINDERS', data: {todo, done} || [] });
  }

  const changeReminderStatus = (dispatch, reminder) => {
    dispatch({type: 'CHANGE_REMINDER_STATUS', data: reminder || {} });
    if(reminder.done){
      actions.uncompleteReminder(reminder.name);
    }else{
      actions.completeReminder(reminder.name);
    }
    setReminders(dispatch);
  }


  export default { setName, setWeather, setHours, setReminders, changeReminderStatus }