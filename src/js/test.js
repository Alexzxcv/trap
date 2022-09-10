let draw_fn = (function () {
    let PI = Math.PI;
  
    let wid = 120, hei = 120;
    let x = 10, y = 10; // отступ от верхнего левого угла canvas
    let r = 10; // border-radius
  
    let side_x = wid - 2 * r;
    let side_y = hei - 2 * r;
    let arc_length = (PI * r) / 2; // (длина окружности / 4)
  
    let perimeter = 2 * (side_x + side_y) + (2 * PI * r);
  
    // Рубрика «Хрень с координатами»
    let func_list = [
      // Массив функций, которые должны вызываться для последовательной
      // отрисовки всех восьми компонентов фигуры.
      // _p { от 0 до 1 }: Какую часть компонента надо нарисовать.
      
      (_p) => line( // верхняя сторона
        x + r,
        y,
        x + r + _p * side_x,
        y
      ),
      (_p) => arc( // угол - верх - право
        x + r + side_x,
        y + r,
        r,
        1.5 * PI,
        (1.5 + 0.5 * _p) * PI
      ),
  
      (_p) => line( // правая сторона
        x + wid,
        y + r,
        x + wid,
        y + r + _p * side_y
      ),
      (_p) => arc( // угол - вниз - право
        x + r + side_x,
        y + r + side_y,
        r,
        0,
        (0.5 * _p) * PI
      ),
  
      (_p) => line( // нижняя сторона
        x + r + side_x,
        y + hei,
        x + r + (1 - _p) * side_x,
        y + hei
      ),
      (_p) => arc( // угол - вниз - лево
        x + r,
        y + r + side_y,
        r,
        0.5 * PI,
        (0.5 + 0.5 * _p) * PI
      ),
  
      (_p) => line( // левая сторона
        x,
        y + r + side_y,
        x,
        y + r + (1 - _p) * side_y
      ),
      (_p) => arc( // угол - верх - лево
        x + r,
        y + r,
        r,
        PI,
        (1 + 0.5 * _p) * PI
      ),
    ];
  
    let line_list = [
      // Список длин всех компонентов.
      side_x, arc_length,
      side_y, arc_length,
      side_x, arc_length,
      side_y, arc_length,
    ];
  
    let ctx = null;
  
    return function (cnv_context, progress) {
      ctx = cnv_context;
  
      let total_length = 0; // Длина всей линии, которую надо сейчас нарисовать.
      let draw_index = 0; // Сколько функций из массива необходимо вызвать.
      let last_component_progress = 1;
      // Реально надо посчитать только прогресс последнего компонента.    
      // Прогресс всех предыдущих будет 1.
  
      for (let line_length of line_list) {
        total_length += line_length;
  
        /*
          Допустим, длина первого куска = 0.2 часть всего периметра,
          второго = 0.05 часть всего,
  
          прилетел progress = 0.24
  
          Надо нарисовать первый кусок полностью,
          и 0.04 / 0.05 = 0.8 часть второго куска
        */
        let total_part = total_length / perimeter;
  
        if (total_part >= progress) {
          //     0.05
          let curr_part = line_length / perimeter;
  
          //     0.04           0.24   - (   0.25    -   0.05   )
          let progress_part = progress - (total_part - curr_part);
  
          last_component_progress = progress_part / curr_part;
          break;
        }
  
        draw_index++;
      }
  
      for (let i = 0; i < draw_index; i++) {
        // Все куски рисуем целиком
        func_list[i](1);
      }
  
      // И необходимую часть последнего куска.
      func_list[draw_index](last_component_progress);
    }
  
    /***/
  
    function line(x1, y1, x2, y2) {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
  
    function arc(cx, cy, r, start, end) {
      ctx.beginPath();
      ctx.arc(cx, cy, r, start, end);
      ctx.stroke();
    }
  })();
  
  /*** Ваш код ниже почти не трогал. Только две строчки */
  let can = document.getElementById('can');
  let ctx = can.getContext('2d');
  
  animate({
    duration: 3000,
    timing(timeFraction) {
      return timeFraction;
    },
    draw: draw_fn,
  });
  
  // Функция плавного рисования
  function animate({ timing, draw, duration }) {
    let start = performance.now();
  
    requestAnimationFrame(function animate(time) {
      let timeFraction = (time - start) / duration;
  
      if (timeFraction > 1) timeFraction = 1;
  
      let progress = timing(timeFraction);
  
      ctx.clearRect(0, 0, can.width, can.height); // <--
      draw(ctx, progress); // <--
  
      if (timeFraction < 1) {
        requestAnimationFrame(animate);
      }
    });
  }