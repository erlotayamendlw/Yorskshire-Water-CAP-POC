namespace YorkshireWater;

entity Notification
{
    key MaintenanceNotification : String;
    MaintenanceOrder : String;
    NotificationText : String;
    MaintPriority : String;
    NotificationType : String;
    CreationDate : Date;
    CreationTime : Time;
    MalfunctionEffect : String;
    MalfunctionEffectText : String;
    MalfunctionStartDate : Date;
    MalfunctionStartTime : Time;
    MalfunctionStartDateTime : String;
    MalfunctionEndDate : Date;
    MalfunctionEndTime : Time;
    MalfunctionEndDateTime : String;
    MaintNotifRqdStartDateTime: String;
    MaintNotificationCatalog : String;
    MaintNotificationCodeGroup : String;
    MaintNotificationCode : String;
    NotificationCompletionDate : Date;
    CompletionTime : Time;
    TechnicalObject : String;
    TechnicalObjectLabel : String;
    FunctionalLocation : String;
    Latitude : String; //Asset Location
    Longitude : String; //Asset Location
    AttachmentsURL : String;
    VideoURL : String;
    Analyst : String;
    AssetLocation : String;
    LocationName : String;
    Thumbnail : String;
    TechObjIsEquipOrFuncnlLoc: String;
    PlantName: String;
    FunctionalLocationLabelName: String;
    TechnicalObjectDescription: String;
    NotificationCreationDateTime: String;
    Asset: String;
    NoOfRelatedIndicents: String;
    PrevCRMComplaints: String;
    NotificationMedia : Association to many NotificationMedia on MaintenanceNotification;
}


entity NotificationMedia
{
    key MaintenanceNotification : String;
    key ID : String;
    Type : String;
    Title : String;
    Description : String;
    Transcript : String;
    URL : String;
    EncodingID : String;
    Thumbnail : String;
}
