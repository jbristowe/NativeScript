var alarmId = 0;
var alarms = {};

var app = UIApplication.sharedApplication();

if (app.registerUserNotificationSettings && app.currentUserNotificationSettings &&
    !(app.currentUserNotificationSettings().types & UIUserNotificationType.UIUserNotificationTypeSound & UIUserNotificationType.UIUserNotificationTypeAlert)) {
    app.registerUserNotificationSettings(UIUserNotificationSettings.settingsForTypesCategories(UIUserNotificationType.UIUserNotificationTypeAlert |
        UIUserNotificationType.UIUserNotificationTypeSound | UIUserNotificationType.UIUserNotificationTypeBadge, null));
}

export function add(fireDate: Date, message: string): number {
    alarmId++;

    var localNotification = UILocalNotification.new();
    (<any>localNotification).fireDate = fireDate;
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