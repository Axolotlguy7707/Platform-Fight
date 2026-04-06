export function randomize(min: number, max: number)
{
    const value = Math.floor(Math.random() * max) + min;
    return value;
}