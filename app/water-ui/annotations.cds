using CatalogService as service from '../../srv/cat-service';
annotate service.Books with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'ID',
                Value : ID,
            },
            {
                $Type : 'UI.DataField',
                Label : 'title',
                Value : title,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Date',
                Value : Date,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Location',
                Value : Location,
            },
            {
                $Type: 'UI.DataField',
                Label : 'Latitude',
                Value : Latitude,
            },
            {
                $Type: 'UI.DataField',
                Label : 'Longitude',
                Value : Longitude,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'ID',
            Value : ID,
        },
        {
            $Type : 'UI.DataField',
            Label : 'title',
            Value : title,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Date',
            Value : Date,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Location',
            Value : Location,
        },
        {
            $Type: 'UI.DataField',
            Label : 'Latitude',
            Value : Latitude,
        },
        {
            $Type: 'UI.DataField',
            Label : 'Longitude',
            Value : Longitude,
        },
    ],
);

