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
var UP_TEXT_X = 180;
var UP_TEXT_Y = 30;


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

  return 'hsl(' + HUE + ', ' + SATURATE + ', ' + LIGHTNESS + ')';
};

var renderText = function (ctx, text, x, y) {
  ctx.font = '16px PT Mono';
  ctx.fillStyle = 'black';
  ctx.fillText(text, x, y);
};

var renderBar = function (ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  var maxTime = getMaxElement(times);

  renderText(ctx, 'Ура, вы победили!', UP_TEXT_X, UP_TEXT_Y);
  renderText(ctx, 'Список результатов:', UP_TEXT_X, UP_TEXT_Y + 20);

  for (var i = 0; i < players.length; i++) {
    renderText(ctx, players[i], TEXT_X + (BAR_GAP + BAR_WIDTH) * i, TEXT_Y);
    renderText(ctx, Math.round(times[i]), TEXT_X + (BAR_GAP + BAR_WIDTH) * i, TEXT_Y - GAP * 3 - ((150 * times[i]) / maxTime));

    var BAR_X = TEXT_X + (BAR_GAP + BAR_WIDTH) * i;
    var BAR_Y = TEXT_Y - GAP * 2 - (MAX_BAR_HEIGHT * times[i]) / maxTime;

    if (players[i] === 'Вы') {
      renderBar(ctx, BAR_X, BAR_Y, 40, (MAX_BAR_HEIGHT * times[i]) / maxTime, 'rgba(255, 0, 0, 1)');
    } else {
      renderBar(ctx, BAR_X, BAR_Y, 40, (MAX_BAR_HEIGHT * times[i]) / maxTime, getHSLColor());
    }
  }
};
