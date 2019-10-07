'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var MAX_BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var TEXT_X = 130;
var TEXT_Y = 270;
var BAR_GAP = 50;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var getRandomInt = function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getHSLColor = function () {
  var HSL_BLUE = 240;
  var HUE = HSL_BLUE;
  var SATURATE = getRandomInt(0, 100) + '%';
  var LIGHTNESS = '50%';

  return 'hsl(' + HUE + ',' + SATURATE + ', ' + LIGHTNESS + ')';
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';

  var maxTime = getMaxElement(times);

  ctx.fillStyle = 'black';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура, вы победили!', 180, 30);
  ctx.fillText('Список результатов:', 180, 50);

  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = 'black';
    ctx.fillText(players[i], TEXT_X + (BAR_GAP + BAR_WIDTH) * i, TEXT_Y);
    ctx.fillStyle = 'black';
    ctx.fillText(Math.round(times[i]), TEXT_X + (BAR_GAP + BAR_WIDTH) * i, TEXT_Y - GAP * 3 - ((150 * times[i]) / maxTime));
    var color1 = getHSLColor();

    ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    ctx.fillRect(TEXT_X + (BAR_GAP + BAR_WIDTH) * i, TEXT_Y - GAP * 2 - (MAX_BAR_HEIGHT * times[i]) / maxTime, 40, (MAX_BAR_HEIGHT * times[i]) / maxTime);
    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      ctx.fillRect(TEXT_X + (BAR_GAP + BAR_WIDTH) * i, TEXT_Y - GAP * 2 - (MAX_BAR_HEIGHT * times[i]) / maxTime, 40, (MAX_BAR_HEIGHT * times[i]) / maxTime);
    } else {
      ctx.fillStyle = color1;
      ctx.fillRect(TEXT_X + (BAR_GAP + BAR_WIDTH) * i, TEXT_Y - GAP * 2 - (MAX_BAR_HEIGHT * times[i]) / maxTime, 40, (MAX_BAR_HEIGHT * times[i]) / maxTime);
    }
  }
};
