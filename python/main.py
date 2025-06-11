import sqlite3
from bottle import Bottle, run, request, static_file

app = Bottle()

# Создание и подключение к базе данных
def get_db_connection():
    conn = sqlite3.connect('users.db')  # Файл базы данных
    conn.row_factory = sqlite3.Row       # Для получения данных как словари
    return conn

# Главная страница с формой
@app.route('/')
def index():
    return static_file('index.html', root='.')

# Обработка данных с формы
@app.route('/submit', method='POST')
def submit():
    name = request.forms.get('name')

    # Сохранение имени в базу данных
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT)')
    cursor.execute('INSERT INTO users (name) VALUES (?)', (name,))
    conn.commit()
    conn.close()

    return f"Thank you, {name}! Your name has been saved to the database."

# Статический маршрут для файлов CSS, JS и изображений
@app.route('/static/<filepath:path>')
def send_static(filepath):
    return static_file(filepath, root='./')

# Запуск сервера
if __name__ == '__main__':
    run(app, host='localhost', port=8080)