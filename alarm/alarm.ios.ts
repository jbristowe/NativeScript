var alarmId = 0;
var alarms = {};

export function add(fireDate: Date, message: string): number {
    alarmId++;

    var localNotification = UILocalNotification.new();
    localNotification.fireDate = NSDate.dateWithTimeIntervalSince1970(fireDate.getTime() / 1000);
    localNotification.alertBody = message;
    localNotification.soundName = UILocalNotificationDefaultSoundName;
    localNotification.applicationIconBadgeNumber = 1;
    UIApplication.sharedApplication().scheduleLocalNotification(localNotification);

    if (!alarms[alarmId]) {
        alarms[alarmId] = localNotification;
    }

    return alarmId;
}

export function remove(id: number): void {
    if (alarms[id] instanceof UILocalNotification) {
        UIApplication.sharedApplication().cancelLocalNotification(alarms[id]);
        delete alarms[id];
    }
}