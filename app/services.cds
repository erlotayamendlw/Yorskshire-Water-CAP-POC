

using from './water-ui/annotations';

using from './water-overview/annotations';

using from './water-ui-v2/annotations';
annotate CatalogService.Notification with @(
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
    ]
);

