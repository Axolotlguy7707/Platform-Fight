//import Phaser from "phaser";
import { game } from "./main";

// Game Over

const RetryButton = document.getElementById('retry-btn');
const mainMenuButton = document.getElementById('menu-btn');

const gameOverUI = document.getElementById('gameover-ui');


RetryButton?.addEventListener('click', Retry);
mainMenuButton?.addEventListener('click', ExitToMenu);


function Retry()
{
    game.scene.stop('CombatLevel');
    game.scene.start('NormalLevel');
    gameOverUI?.classList.add("hidden");
}

function ExitToMenu()
{
    window.location.href = 'index.html';
}