using YorkshireWater as my from '../db/schema';

service CatalogService {
    // @readonly entity Books as projection on my.Books;
    @readonly entity Notification as projection on my.Notification;
    @readonly entity NotificationDetail as projection on my.NotificationDetail
}
