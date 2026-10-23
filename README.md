# Masaj salonu sitesi, G · Net

Rakip analizine göre önerilen tasarım. Ziyaretçinin dört sorusunu ilk ekranda yanıtlar (ne var, kaç para, şu an açık mı, nasıl ulaşırım), güven kurallarını açıkça yazar ve her adımda WhatsApp'a ya da aramaya yönlendirir. "Hangi masaj size uygun?" seçicisi JavaScript gerektirmez (CSS `:has`). Lexend, açık ve koyu tema.

Demo: https://anbarci.github.io/masaj-salonu-g-net/

Bütün yönlerin karşılaştırması: https://anbarci.github.io/masaj-salonu-demolar/

Tek sayfa, statik HTML. İşlevler:

- WhatsApp ve telefonla arama düğmeleri; telefonda altta sabit çubuk
- Her masaj için hazır WhatsApp mesajı
- Randevu mesajı hazırlayıcı (masaj, gün, saat seçimi WhatsApp mesajına yazılır)
- İstanbul saatine göre "Şu an açık / kapalı" bilgisi
- Yerel SEO şeması (HealthAndBeautyBusiness, fiyat kataloğu, çalışma saatleri, harita bağlantısı)

Dosyalar: `index.html` (sayfa ve stil), `ortak.js` (randevu mesajı, açık/kapalı, alt çubuk).

Salon adı, telefon, adres, fiyatlar ve metinler örnektir. Fotoğraflar Unsplash'ten (Unsplash Lisansı) geçici olarak bağlanmıştır. Demo sayfası arama motorlarına kapalıdır (`noindex`).
