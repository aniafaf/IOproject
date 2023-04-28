# Wymagania niefunkcjonalne

## Przenośność
* dostępna na chrome v. 112.0.561 oraz firefox v 112.0
* przenośność między różnymi urządzeniami i systemami operacyjnymi bez wpływu na doświadczenie użytkownika,

## Dostępność
* dostępna >90% czasu przez co najmniej rok (heroku dostępne >99%)
* ograniczone <10% czasu na przerwy techniczne, awarie serwera

## Bezpieczeństwo
* mechanizmy uwierzytelniania i autoryzacji oraz stosowanie odpowiednich technik szyfrowania danych: “Django uses the PBKDF2 algorithm with a SHA256 hash, a password stretching mechanism recommended by NIST”

## Wydajność
* użytkownicy mogą pochodzić z dowolnej lokalizacji,
* obsługa jednocześnie 20 użytkowników,
* odpowiedź na żądanie użytkownika w ciągu <5s maksymalnie