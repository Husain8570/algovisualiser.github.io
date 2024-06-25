function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function findAllPaths(sr, sc, r, c, arr,dr,dc) {
    arr[sr * c + sc].style.backgroundColor = 'red';
    await delay(500);

    if (sr === dr && sc === dc) {
        await delay(500);
    } else {
        if (sc + 1 < c) {
            await findAllPaths(sr, sc + 1, r, c, arr,dr,dc);
        }
        if (sr + 1 < r) {
            await findAllPaths(sr + 1, sc, r, c, arr,dr,dc);
        }
    }

    arr[sr * c + sc].style.backgroundColor = 'blue';
    await delay(500);
}

let display = document.querySelector("#display");
document.querySelector("form").addEventListener('submit', async (e) => {
    e.preventDefault();
    let r = parseInt(document.getElementById('row').value);
    let c = parseInt(document.getElementById('col').value);
    let sr=Number(document.getElementById('sr').value);
    let sc=Number(document.getElementById('sc').value);
    let dr=Number(document.getElementById('dr').value);
    let dc=Number(document.getElementById('dc').value);
    display.innerHTML = '';
    display.style.gridTemplateRows = `repeat(${r}, 1fr)`;
    display.style.gridTemplateColumns = `repeat(${c}, 1fr)`;

    for (let i = 0; i < r * c; i++) {
        let div = document.createElement('div');
        div.className = "item";
        display.appendChild(div);
    }
    let arr = document.getElementsByClassName('item');
    arr[(dr-1)*c+dc-1].innerHTML="D"
    await findAllPaths(sr-1,sc-1, r, c, arr,dr-1,dc-1);
});