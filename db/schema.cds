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
    Analyst : String;
    Media : Association to one Media;
}

entity Media
{
    key ID : String;
    url : String;
    type: String;
    AITranscript : String;
}
