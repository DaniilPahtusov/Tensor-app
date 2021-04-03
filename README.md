# Мессенджер "Fruktogram"
Проект выполнен в рамках курса "Управление разработкой програмного обеспечения"

Данный мессенджер позволяет вести переписку с пользователями в режиме реального времени. Есть возможность зарегестрироваться, авторизоваться, добавить новый диалог с пользователем мессенджера и обмениваться сообщениями.

Команда: Пахтусов Даниил, Тихомиров Евгений, Торлина Анна

# Установка

Перед установкой проекта необходимо самостоятельно установить:
```
python:v3.0+ 
nodejs:latest
```

Установку и запуск front-end и back-end необходимо производить в двух разных терминалах
# Установка Back-end
```
cd api
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
$env:FLASK_APP = "api.py"
```

# Запуск Back-end
```
flask run
```

# Установка Front-end
```
cd &{PROJECT_APP}
npm install
```

# Запуск Front-end
```
npm start
```
