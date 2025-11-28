var KEYBOARDTELEOP = KEYBOARDTELEOP || {
  REVISION : '0.4.0-SNAPSHOT'
};

KEYBOARDTELEOP.Teleop = function(options) {
  var that = this;
  options = options || {};
  var ros = options.ros;
  var topic = options.topic || '/cmd_vel';
  var throttle = options.throttle || 1.0;

  this.scale = 1.0;

  var x = 0, y = 0, z = 0; // текущие команды движения

  var cmdVel = new ROSLIB.Topic({
    ros : ros,
    name : topic,
    messageType : 'geometry_msgs/msg/Twist',
    queue_length: 10
  });

  // Обработчик нажатий клавиш
  var keys = {};
  var handleKeyDown = function(e) { keys[e.keyCode] = true; }
  var handleKeyUp   = function(e) { keys[e.keyCode] = false; }

  document.body.addEventListener('keydown', handleKeyDown, false);
  document.body.addEventListener('keyup', handleKeyUp, false);

  // Функция обновления команд движения
  var updateCmd = function() {
    var speed = throttle * that.scale;
    x = 0; y = 0; z = 0;

    if(keys[87]) { x = 0.8 * speed; }     // W - вперед
    if(keys[83]) { x = -0.8 * speed; }    // S - назад
    if(keys[65]) { z = 1.5 * speed; }     // A - влево
    if(keys[68]) { z = -1.5 * speed; }    // D - вправо
  };

  // Таймер публикации 200 Гц (каждые 5 мс)
  setInterval(function() {
    updateCmd();
    var twist = new ROSLIB.Message({
      linear:  { x:x, y:y, z:0 },
      angular: { x:0, y:0, z:z }
    });
    cmdVel.publish(twist);
  }, 5);
};

KEYBOARDTELEOP.Teleop.prototype.__proto__ = EventEmitter2.prototype;
