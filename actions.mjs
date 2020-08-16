const { run } = require("uebersicht");
const config = require("./ressources/config.json");

let PATH = undefined;

const getName = () => {
    return run("id -F");
}

const setCurrentPath = async () => {
    const path = await run("pwd");
    PATH = (path.substring(0,path.length-1) + "/TodoListWidget");
}

const getWeather = async () => {
    if(config.apis.OPEN_WEATHER.city){
        return fetch(`${config.apis.OPEN_WEATHER.url_base}units=${config.apis.OPEN_WEATHER.units}&lang=${config.apis.OPEN_WEATHER.lang}&q=${config.apis.OPEN_WEATHER.city}&appid=${config.apis.OPEN_WEATHER.key}`)
        .then(res => res.json())
    }else{
        return fetch(`${config.apis.OPEN_WEATHER.url_base}units=${config.apis.OPEN_WEATHER.units}&lang=${config.apis.OPEN_WEATHER.lang}&lat=${config.apis.OPEN_WEATHER.lat}&lon=${config.apis.OPEN_WEATHER.long}&appid=${config.apis.OPEN_WEATHER.key}`)
        .then(res => res.json())
    }
}

const getHours = () => {
    const date = new Date(Date.now());
    return ("0"+date.getHours()).slice(-2) + " : " + ("0"+date.getMinutes()).slice(-2);
}

const getDate = () => {
    const date = new Date(Date.now());
    const days = config.days;
    const months = config.months;
    return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}`
}

const getRemindersDone = async () => {
    let stdout;
    try{
        stdout = await run(`automator "${PATH}/automator/get_reminders_done.app"`);
    }catch(e){
        stdout = e.message;
    }
    const matches = [...stdout.matchAll(/Summary:\s*(.*)\n/g)];
    return matches.map(group => group[1])
}

const getRemindersNotDone = async () => {
    let stdout;
    try{
        stdout = await run(`automator "${PATH}/automator/get_reminders_not_done.app"`);
    }catch(e){
        stdout = e.message;
    }
    const matches = [...stdout.matchAll(/Summary:\s*(.*)\n/g)];
    return matches.map(group => group[1])
}

const createReminder = async () => {
    return run(`osascript "${PATH}/automator/create_reminder.scpt"`);
}

const completeReminder = (name) => {
    try{
        run(`osascript "${PATH}/automator/complete_reminder.scpt" "${name}"`);
    }catch(e){
        console.error(e);
    }
}

const uncompleteReminder = (name) => {
    try{
        run(`osascript "${PATH}/automator/uncomplete_reminder.scpt" "${name}"`);
    }catch(e){
        console.error(e);
    }
}

export default { setCurrentPath, getName, getWeather, getHours, getDate, getRemindersDone, getRemindersNotDone, createReminder, completeReminder, uncompleteReminder }