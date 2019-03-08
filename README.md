# Черный список слов

Простой способ добавить слово в черный список

# Установка и запуск

* [Node.js](https://nodejs.org/en/)
* [Git](https://git-scm.com/downloads)

```
git clone https://github.com/Arestik/BlacklistingWords.git
cd BlacklistingWords
npm install
node index.js
```

## Конфигурационный файл

```JSON
{
    "prefix": "префикс", 
    "token": "Токен бота"
}
```
## Команды

```
(Префикс)blacklist - узнать все команды
(Префикс)blacklist add [СЛово] - добавить слово в черный список
(Префикс)blacklist del [index] - удалить слово из черного списка 
(Префикс)blacklist list - узнать слова в черном списке (и index слова)
(Префикс)blacklist status on/off - включить и выключить черный список слов
```
