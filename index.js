const container = document.querySelector(".container");
const slider = document.querySelector(".slider");
const sliderTextElement = document.querySelector(".slider-text");
let isMousePressed = false;

const getRandomRGB = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r},${g}, ${b}, 0.1)`;
}

const createGrid = (amount) => {
    const sliderText = sliderTextElement.textContent;
    const sliderTextNew = `${sliderText.split(":")[0]}: ${amount}x${amount}`
    sliderTextElement.textContent = sliderTextNew;
    container.innerHTML = " ";
    for(let i=0;i<amount;i++)
    {
        const line = document.createElement("div");
        line.classList.add("line");
        for(let j=0;j<amount;j++)
        {
            const square = document.createElement("div");
            square.style.width = square.style.height = `${700/amount}px`; 
            square.addEventListener("mouseover", () => colorSquare(square));
            square.classList.add("square");
            line.appendChild(square);
        }
        container.appendChild(line)
    }
}

const colorSquare = (square) => {
    if(!isMousePressed) return;
    let color = square.style.backgroundColor

    //If already colored
    if(color) {
        const [r, g, b, a] = color.match(/[\d.]+/g).map(Number);
        const newOpacity = Math.min(a + 0.1, 1.0);
        return square.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${newOpacity.toFixed(1)})`;
    }
    square.style.backgroundColor = getRandomRGB();
}

const startUpdatingMouseState = () => {
    document.body.addEventListener("mousedown",() => isMousePressed = true);
    document.body.addEventListener("mouseup", () => isMousePressed = false);
}

createGrid(slider.value);
startUpdatingMouseState();
slider.addEventListener("change", () => {createGrid(slider.value)});