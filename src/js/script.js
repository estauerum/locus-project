	let messages = {
    loading: 'Loading...',
    succses: 'Thanks, we will contact with you soon',
    error: 'Something wrong...'
};

let form = document.querySelector('.form'),
    input = form.querySelectorAll('input'),
    statusMessage = document.createElement('div');

    statusMessage.classList.add('status');

    form.addEventListener('submit', function (event) {
        event.preventDefault();//сбрасывает перезагрузку браузера
        form.appendChild(statusMessage);//добавляет в форму статус заказа

        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');//метод и файл пхп
        request.setRequestHeader ('Content-Type', 'application/json; charset=utf-8');
        let formData = new FormData(form);//чтобы получить все данные из инпутов, внутрь формдаты помещают что заполнил пользователь

        let obj = {};

        formData.forEach(function(value, key) {
            obj[key] = value;
        });

        let json = JSON.stringify(obj);//переводит в формат json

        request.send(json);//отправляет на сервер



        request.addEventListener('readystatechange', function() {//наблюдает за изменением 
            if (request.readyState < 4) {
                statusMessage.innerHTML = messages.loading;//если сервер тупит 
} else if (request.readyState == 4 && request.status == 200) {//если запрос отправился
                statusMessage.innerHTML = messages.succses;
            } else {//если пошла ошибка
                statusMessage.innerHTML = messages.error;
            }
        });

        input.forEach(function(item) {//очищает все инпуты после отправки
            item.value = '';
        });
    });
