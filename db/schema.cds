namespace YorkshireWater;

entity Notification
{
    key MaintenanceNotification : String;
        NotificationText : String;
        MaintPriority : String;
        NotificationType : String;
        CreationDate : Date;
        CreationTime : Time;
        MalfunctionEffect : String;
        MalfunctionEffectText : String;
        MalfunctionStartDate : Date;
        MalfunctionStartTime : Time;
        MalfunctionEndDate : Date;
        MalfunctionEndTime : Time;
        TechnicalObject : Integer;
        TechnicalObjectLabel : String;
        FunctionalLocation : String;
        Latitude : Decimal;
        Longitude : Decimal;
        Analyst : String;
        MalfunctionStartDateTime : DateTime;
        MalfunctionEndDateTime : DateTime;
        MaintenanceOrder : String;
        MaintNotifRqdStartDateTime : DateTime;
        MaintNotificationCatalog : String;
        TaskCodeGroup : String;
        TaskCode : String;
        ActivityCodeGroup : String;
        ActivityCode : String;
        NotificationCompletionDate : Date;
        CompletionTime : Time;
        AssetLocation : String;
        LocationName : String;
        TechObjIsEquipOrFuncnlLoc : String;
        PlantName : String;
        FunctionalLocationLabelName : String;
        TechnicalObjectDescription : String;
        NotificationCreationDateTime : DateTime;
        Asset : String;
        NoOfRelatedIndicents : Integer;
        PrevCRMComplaints : Integer;
        Internal : Boolean;
        UPRN : String;
        Malfunction : String;
        AssetCause : String;
        AssetOwned : Boolean;
        AssetCondition : String;
        RainfallOccurence : String;
        NoOfRelatedIncidents : Integer;
        RelatedCustomerComplaints : Integer;
        PreviousFlooding : Integer;
        AnalysisOfCause : String;
        Categorisation : String;
        Severity : String;
        CustomerPropertyType : String;
        UpstreamSystemBehaviour : String;
        Description : String;
        AIConfidence : String;
        Liability : Decimal;
        ConfidenceScoreOfLiability : Decimal;
        UserConfirmedLiability : Decimal;
        UserComments : Decimal;
        NotificationMedia : Association to many NotificationMedia on MaintenanceNotification;
}


entity NotificationMedia
{
    key MaintenanceNotification : String;
    key ID : String;
        GenAIAnalysisOverview : String;
        GenAIAnalysisOfCause : String;
        GenAICategorisation : String;
        GenAISeverity : Integer;
        GenAIconfidence : Decimal;
        Type : String;
        Title : String;
        Transcript : String;
        URL : String;
        EncodingID : String;
        Thumbnail : String;
}
