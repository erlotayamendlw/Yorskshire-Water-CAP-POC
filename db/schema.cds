namespace YorkshireWater;

entity Books {
  key ID : Integer;
  title  : String;
  Date  : Date;
  Location : String;
  Latitude : String;
  Longitude : String;
}

entity Notifications {
  key ID : String;
  Title : String;
  Date : Date;
  Location : String;
  Lat : String;
  Long: String;
  MalfunctionStartTime : Timestamp;
  MalfunctionEndTime : Timestamp;
  AttachmentsURL : String;
  VideoURL : String; 
}
