

using from './water-ui/annotations';

using from './water-overview/annotations';

using from './water-ui-v2/annotations';
annotate CatalogService.Notification with @(
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Value : ID,
            Label : 'Notification ID',
        },
        {
            $Type : 'UI.DataField',
            Value : Title,
            Label : 'Title',
        },
        {
            $Type : 'UI.DataField',
            Value : Location,
            Label : 'Location',
        },
        {
            $Type : 'UI.DataField',
            Value : Date,
            Label : 'Date',
        },
    ]
);

