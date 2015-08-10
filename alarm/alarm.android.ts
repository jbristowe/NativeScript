import utils = require("utils/utils");

var context = utils.ad.getApplicationContext();

var alarmId = 0;
var alarms = {};

class AlarmReceiver extends android.content.BroadcastReceiver {
    private _message: string;

    constructor() {
        super();

        return global.__native(this);
    }

    onReceive(context: android.content.Context, intent: android.content.Intent) {
        android.widget.Toast.makeText(context, this._message, android.widget.Toast.LENGTH_LONG).show();
    }
}

export function add(fireDate: Date, message: string): number {
    alarmId++;

    var alarmManager = <android.app.AlarmManager>context.getSystemService(android.content.Context.ALARM_SERVICE);
    
    var pendingIntent = android.app.PendingIntent.getBroadcast(context, 0, new android.content.Intent(context, AlarmReceiver.class), 0);

    alarmManager.set(android.app.AlarmManager.RTC_WAKEUP, fireDate.getTime(), pendingIntent);

    if (!alarms[alarmId]) {
        alarms[alarmId] = pendingIntent;
    }

    return alarmId;
}

export function remove(id: number): void {
    if (alarms[id] instanceof UILocalNotification) {
        var alarmManager = <android.app.AlarmManager>context.getSystemService(android.content.Context.ALARM_SERVICE);
        alarmManager.cancel(alarms[id]);
        delete alarms[id];
    }
}