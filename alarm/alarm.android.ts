import utils = require("utils/utils");

var MESSAGE = "message"
var context = utils.ad.getApplicationContext();

var alarmId = 0;
var alarms = {};

class AlarmReceiver extends android.content.BroadcastReceiver {
    onReceive(context: android.content.Context, intent: android.content.Intent) {
        android.widget.Toast.makeText(context, intent.getExtras().getString(MESSAGE), android.widget.Toast.LENGTH_LONG).show();
    }
}

export function add(fireDate: Date, message: string): number {
    alarmId++;

    var alarmManager = <android.app.AlarmManager>context.getSystemService(android.content.Context.ALARM_SERVICE);

    var intent = new android.content.Intent(context, AlarmReceiver.class);
    intent.putExtra(MESSAGE, message);

    var pendingIntent = android.app.PendingIntent.getBroadcast(context, 0, intent, 0);

    alarmManager.set(android.app.AlarmManager.RTC_WAKEUP, fireDate.getTime(), pendingIntent);

    if (!alarms[alarmId]) {
        alarms[alarmId] = pendingIntent;
    }

    return alarmId;
}

export function remove(id: number): void {
    if (alarms[id] instanceof android.app.PendingIntent) {
        var alarmManager = <android.app.AlarmManager>context.getSystemService(android.content.Context.ALARM_SERVICE);
        alarmManager.cancel(alarms[id]);
        delete alarms[id];
    }
}