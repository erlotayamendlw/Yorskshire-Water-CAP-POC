using YorkshireWater as my from '../db/schema';

service CatalogService {
    // @readonly entity Books as projection on my.Books;
    entity Notification as projection on my.Notification{ 
        *,
        NotificationMedia
    };
    entity NotificationMedia as projection on my.NotificationMedia;
}
