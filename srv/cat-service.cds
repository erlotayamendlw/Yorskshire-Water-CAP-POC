using YorkshireWater as my from '../db/schema';

service CatalogService {
    // @readonly entity Books as projection on my.Books;
    @readonly entity Notification as projection on my.Notification{ 
        *,
        NotificationMedia
    };
    @readonly entity NotificationMedia as projection on my.NotificationMedia;
}
