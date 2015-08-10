var alarmId = 0;
var alarms = {};

var settings: UIUserNotificationSettings
var app = UIApplication.sharedApplication();

export function add(fireDate: Date, message: string): number {
    alarmId++;

    if (!settings && app.registerUserNotificationSettings) {
        settings = UIUserNotificationSettings.settingsForTypesCategories(UIUserNotificationType.UIUserNotificationTypeAlert |
            UIUserNotificationType.UIUserNotificationTypeSound | UIUserNotificationType.UIUserNotificationTypeBadge, null);
        app.registerUserNotificationSettings(settings);
    }

    var localNotification = UILocalNotification.new();
    localNotification.fireDate = NSDate.dateWithTimeIntervalSince1970(fireDate.getTime() / 1000);
    localNotification.alertBody = message;
    localNotification.soundName = UILocalNotificationDefaultSoundName;
    localNotification.applicationIconBadgeNumber = 1;
    app.scheduleLocalNotification(localNotification);

    if (!alarms[alarmId]) {
        alarms[alarmId] = localNotification;
    }

    return alarmId;
}

export function remove(id: number): void {
    if (alarms[id] instanceof UILocalNotification) {
        app.cancelLocalNotification(alarms[id]);
        delete alarms[id];
    }
}