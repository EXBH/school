const canvas1 = document.getElementById('gameCanvas_1');
const canvas2 = document.getElementById('gameCanvas_2');
const ctx1 = canvas1.getContext('2d');
const ctx2 = canvas2.getContext('2d');
const h1_1 = document.getElementById('h1_1'); 
const h_1 = document.getElementById('h_1'); 
const h1_2 = document.getElementById("h1_2")
canvas1.width = 1540;
canvas1.height = 600;

canvas2.width = 1540;
canvas2.height = 600;

const squareSize1 = 10;
let x1 = canvas1.width / 400 - squareSize1 / 2;
let y1 = canvas1.height / 500 - squareSize1 / 2;
const speed1 = 10;

let squareSize2 = 10;
let x2 = canvas2.width / 400 - squareSize2 / 2;
let y2 = canvas2.height / 500 - squareSize2 / 2;
let speed2 = 10;

let obstacles1_1 = [{ x1: 800, y1: 300, size: 400 }];
let obstacles1_2 = [{ x1: 300, y1: 0, size: 450 }];

const greenArea1 = { x1: 1445, y1: 500, width: 100, height: 100 };

// Функция рисования квадрата
function drawSquare_1() {
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);

    ctx1.fillStyle = 'black';
    ctx1.fillRect(x1, y1, squareSize1, squareSize1);

    // Рисуем препятствия
    ctx1.fillStyle = 'red';
    for (let i = 0; i < obstacles1_1.length; i++) {
        const obs = obstacles1_1[i];
        ctx1.fillRect(obs.x1, obs.y1, obs.size, obs.size);
    }
    
    ctx1.fillStyle = 'red';
    for (let i = 0; i < obstacles1_2.length; i++) {
        const obs = obstacles1_2[i];
        ctx1.fillRect(obs.x1, obs.y1, obs.size, obs.size);
    }

    // Рисуем зелёный участок
    ctx1.fillStyle = 'green';
    ctx1.fillRect(greenArea1.x1, greenArea1.y1, greenArea1.width, greenArea1.height);
}
// Функция для проверки столкновения с препятствием
function checkCollision1_1() {
    for (let i = 0; i < obstacles1_1.length; i++) {
        const obs1 = obstacles1_1[i];
        if (
            x1 < obs1.x1 + obs1.size &&
            x1 + squareSize1 > obs1.x1 &&
            y1 < obs1.y1 + obs1.size &&
            y1 + squareSize1 > obs1.y1
        ) {
            // Столкновение с препятствием, сброс на начальную позицию
            x1 = 0;
            y1 = 0;
        }
    }
}
function checkCollision1_2() {
    for (let i = 0; i < obstacles1_2.length; i++) {
        const obs1 = obstacles1_2[i];
        if (
            x1 < obs1.x1 + obs1.size &&
            x1 + squareSize1 > obs1.x1 &&
            y1 < obs1.y1 + obs1.size &&
            y1 + squareSize1 > obs1.y1
        ) {
            // Столкновение с препятствием, сброс на начальную позицию
            x1 = 0;
            y1 = 0;
        }
    }
}
function checkGreenArea_1() {
    if (
        x1 < greenArea1.x1 + greenArea1.width &&
        x1 + squareSize1 > greenArea1.x1 &&
        y1 < greenArea1.y1 + greenArea1.height &&
        y1 + squareSize1 > greenArea1.y1
    ) {
        // Касание с зелёной зоной, переход на следующий уровень
        next_level_1()
        x1 = 0; // Начальная позиция квадрата
        y1 = 0;
    }
}
// Обработчик нажатий клавиш
document.addEventListener('keydown', (event) => {
    if (event.key === 'a' || event.key === 'ф') {
        x1 -= speed1; // Двигаем квадрат влево
    } else if (event.key === 'd' || event.key === 'в') {
        x1 += speed1; // Двигаем квадрат вправо
    } else if (event.key === 'w' || event.key === 'ц') {
        y1 -= speed1; // Двигаем квадрат вверх
    } else if (event.key === 's' || event.key === 'ы') {
        y1 += speed1; // Двигаем квадрат вниз
    }

    // Ограничиваем движение квадрата, чтобы он не выходил за границы экрана
    if (x1 < 0) x1 = 0;
    if (x1 > canvas1.width - squareSize1) x1 = canvas1.width - squareSize1;
    if (y1 < 0) y1 = 0;
    if (y1 > canvas1.height - squareSize1) y1 = canvas1.height - squareSize1;
    checkCollision1_1(); // Проверка столкновения с препятствиями
    checkCollision1_2();
     // Проверка столкновения с препятствиями
    checkGreenArea_1(); // Проверка касания зелёного участка

    drawSquare_1(); // Перерисовываем квадрат, препятствия и зелёную зону
});

let hasTakenBlueCube = false;  // Флаг для отслеживания, был ли синий куб взят

// Обновление функции для перехода на второй уровень
function next_level_1() {
    let canvasHeight = canvas1.height;  // Начальная высота первого канваса

    // Анимация сужения первого канваса
    const animationInterval = setInterval(() => {
        if (canvasHeight > 0) {
            canvasHeight -= 5;  // Уменьшаем высоту канваса
            canvas1.height = canvasHeight;  // Обновляем высоту только первого канваса
        } else {
            // Когда высота первого канваса становится 0, скрываем его и показываем второй канвас
            clearInterval(animationInterval);
            canvas1.style.display = 'none';  // Скрываем первый канвас
            canvas2.style.display = 'block'; // Показываем второй канвас
            h1_1.style.display = "none";
            h_1.style.display = "none";
            
            // Сброс позиции игрока во втором канвасе (появление на спавне)
            x2 = 50;  // Начальная позиция на спавне
            y2 = 50;
            // Появление синего куба сразу, как только начался второй уровень
            // Сброс скорости до нормальной (при переходе на второй уровень)
        }
    }, 10);  // Интервал анимации (меньше значение — плавнее анимация)

    // Сброс начальных позиций для первого уровня
    x1 = 0;
    y1 = 0;
}




// _______________________________________________--




let obstacles2_1 = [{ x2: 40, y2: 0, size: 20 }];
let obstacles2_2 = [{ x2: 40, y2: 20, size: 20 }];
let obstacles2_3 = [{ x2: 40, y2: 40, size: 20 }];
let obstacles2_4 = [{ x2: 0, y2: 19, size: 5 }];
let obstacles2_5 = [{ x2: 0, y2: 90, size: 25 }];


const greenArea2 = { x2: 1445, y2: 500, width: 100, height: 100 };
// Функция рисования квадрата
function drawSquare_2() {
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

    ctx2.fillStyle = 'black';
    ctx2.fillRect(x2, y2, squareSize2, squareSize2);

    // Рисуем препятствия
    ctx2.fillStyle = 'red';
    for (let i = 0; i < obstacles2_1.length; i++) {
        const obs = obstacles2_1[i];
        ctx2.fillRect(obs.x2, obs.y2, obs.size, obs.size);
    }
    
    ctx2.fillStyle = 'red';
    for (let i = 0; i < obstacles2_2.length; i++) {
        const obs = obstacles2_2[i];
        ctx2.fillRect(obs.x2, obs.y2, obs.size, obs.size);
    }

    ctx2.fillStyle = 'red';
    for (let i = 0; i < obstacles2_3.length; i++) {
        const obs = obstacles2_3[i];
        ctx2.fillRect(obs.x2, obs.y2, obs.size, obs.size);
    }

    ctx2.fillStyle = 'chartreuse';
    for (let i = 0; i < obstacles2_4.length; i++) {  // Используйте obstacles2_4
        const obs = obstacles2_4[i];
        ctx2.fillRect(obs.x2, obs.y2, obs.size, obs.size);
    }    
    
    ctx2.fillStyle = 'red';
    for (let i = 0; i < obstacles2_5.length; i++) {
        const obs = obstacles2_5[i];
        ctx2.fillRect(obs.x2, obs.y2, obs.size, obs.size);
    }

    // Рисуем зелёный участок
    ctx2.fillStyle = 'green';
    ctx2.fillRect(greenArea2.x2, greenArea2.y2, greenArea2.width, greenArea2.height);
}
// Функция для проверки столкновения с препятствием
function checkCollision2_1() {
    for (let i = 0; i < obstacles2_1.length; i++) {
        const obs2 = obstacles2_1[i];
        if (
            x2 < obs2.x2 + obs2.size &&
            x2 + squareSize2 > obs2.x2 &&
            y2 < obs2.y2 + obs2.size &&
            y2 + squareSize2 > obs2.y2
        ) {
            // Столкновение с препятствием, сброс на начальную позицию
            x2 = 0;
            y2 = 0;
        }
    }
}
function checkCollision2_2() {
    for (let i = 0; i < obstacles2_2.length; i++) {
        const obs = obstacles2_2[i];
        if (
            x2 < obs.x2 + obs.size &&
            x2 + squareSize1 > obs.x2 &&
            y2 < obs.y2 + obs.size &&
            y2 + squareSize1 > obs.y2
        ) {
            // Столкновение с препятствием, сброс на начальную позицию
            x2 = 0;
            y2 = 0;
        }
    }
}
function checkCollision2_3() {
    for (let i = 0; i < obstacles2_3.length; i++) {
        const obs = obstacles2_3[i];
        if (
            x2 < obs.x2 + obs.size &&
            x2 + squareSize1 > obs.x2 &&
            y2 < obs.y2 + obs.size &&
            y2 + squareSize1 > obs.y2
        ) {
            // Столкновение с препятствием, сброс на начальную позицию
            x2 = 0;
            y2 = 0;
        }
    }
}

function checkCollision2_4() {
    // for (let i = 0; i < obstacles2_4.length; i++) {
    //     const obs = obstacles2_4[i];
        if (
            x2 < obs.x2 + obs.size &&
            x2 + squareSize2 > obs.x2 &&
            y2 < obs.y2 + obs.size &&
            y2 + squareSize2 > obs.y2
        ) {
            squareSize2 = 20; // Увеличение размера квадрата (убедитесь, что это правильно)
        }
    }
// }


function checkCollision2_5() {
    for (let i = 0; i < obstacles2_5.length; i++) {
        const obs = obstacles2_5[i];
        if (
            x2 < obs.x2 + obs.size &&
            x2 + squareSize1 > obs.x2 &&
            y2 < obs.y2 + obs.size &&
            y2 + squareSize1 > obs.y2
        ) {
            // Столкновение с препятствием, сброс на начальную позицию
            x2 = 0;
            y2 = 0;
        }
    }
}

function checkGreenArea_2() {
    if (
        x2 < greenArea2.x2 + greenArea2.width &&
        x2 + squareSize2 > greenArea2.x2 &&
        y2 < greenArea2.y2 + greenArea2.height &&
        y2 + squareSize2 > greenArea2.y2
    ) {
        // Касание с зелёной зоной, переход на следующий уровень
        x2 = 0; // Начальная позиция квадрата
        y2 = 0;
        next_level_2()
    }
}
// Обработчик нажатий клавиш для второго уровня
document.addEventListener('keydown', (event) => {
    if (event.key === 'a' || event.key === 'ф') {
        x2 -= speed2; // Двигаем квадрат влево
    } else if (event.key === 'd' || event.key === 'в') {
        x2 += speed2; // Двигаем квадрат вправо
    } else if (event.key === 'w' || event.key === 'ц') {
        y2 -= speed2; // Двигаем квадрат вверх
    } else if (event.key === 's' || event.key === 'ы') {
        y2 += speed2; // Двигаем квадрат вниз
    }

    // Ограничиваем движение квадрата, чтобы он не выходил за границы экрана
    if (x2 < 0) x2 = 0;
    if (x2 > canvas2.width - squareSize2) x2 = canvas2.width - squareSize2;
    if (y2 < 0) y2 = 0;
    if (y2 > canvas2.height - squareSize2) y2 = canvas2.height - squareSize2;
    checkCollision2_1(); // Проверка столкновения с препятствиями
    checkCollision2_2();
    checkCollision2_3();
    checkCollision2_4();
    checkCollision2_5();
    // Проверка столкновения с препятствиями
    checkGreenArea_2(); // Проверка касания зелёного участка

    drawSquare_2(); // Перерисовываем квадрат, препятствия и зелёную зону
});
function next_level_2() {

}

