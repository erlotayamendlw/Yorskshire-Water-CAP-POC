using from './water-ui-v2/annotations';
annotate CatalogService.Notification with @(
    UI.SelectionFields: [ MaintenanceNotification, FunctionalLocation, MalfunctionStartDate],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Value : MaintenanceNotification,
            Label : 'Notification ID',
        },
        {
            $Type : 'UI.DataField',
            Value : NotificationText,
            Label : 'Title',
        },
        {
            $Type : 'UI.DataField',
            Value : FunctionalLocation,
            Label : 'Location',
        },
        {
            $Type : 'UI.DataField',
            Value : MalfunctionStartDate,
            Label : 'Date',
        },
        {
            $Type : 'UI.DataField',
            Value : MalfunctionStartTime,
            Label : 'Time',
        },
        {
            $Type : 'UI.DataField',
            Value : Analyst,
            Label : 'Analyst',
        },
        {
            $Type : 'UI.DataField',
            Value : MaintPriority,
            Criticality: MaintPriority,
            Label : 'Maintenance Priority',
        },
    ]
    
);

