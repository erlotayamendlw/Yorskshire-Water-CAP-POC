namespace YorkshireWater;

entity Notification
{
    key ID : String;
    Title : String;
    Date : Date;
    Location : String;
    Lat : String;
    Long : String;
    MalfunctionStartTime : Timestamp;
    MalfunctionEndTime : Timestamp;
    AttachmentsURL : String;
    VideoURL : String;
    genAIResponse : Association to one NotificationDetail;
}

entity NotificationDetail
{
    key ID : UUID;
    AIDescription : String;
    AITranscript : String;
    VideoId : String;
}
