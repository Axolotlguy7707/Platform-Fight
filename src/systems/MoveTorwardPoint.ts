export function moveTowardPoint(sprite: Phaser.Physics.Arcade.Sprite, targetX: number, targetY: number, speed: number)
{
    const dx = targetX - sprite.x;
    const dy = targetY - sprite.y;

    const len = Math.hypot(dx, dy);
    if (len === 0) return;

    sprite.setVelocity((dx / len) * speed, (dy / len) * speed);
}
