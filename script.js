
let bombBlocks = [], numberOfBlocks = 100, nonBombBlocks, blockNum;

getDiv = (value) => document.querySelector(`.div${value}`);

function creatStar(){
    elem = document.createElement('div');
    elem.className = 'star';
    document.body.querySelector('.stars').appendChild(elem);
    return elem;
}
function randomStars(numberOfStars=20) {
    for (let i = 0; i < numberOfStars; i++) {
        x = Math.random()*99;
        y = Math.random()*99;
        star = creatStar();
        star.style.left = x+'%';
        star.style.top = y+'%';
    }
    console.log('Stars made successfully');
}
randomStars();
function colorBoxes(){
    for (let i = 1; i < numberOfBlocks+1; i++) {
        rowNumber = Math.ceil(i/10)
        isRowNumberEven = (rowNumber%2==0)
        if (isRowNumberEven) {
            if (i%2==0) {
                document.querySelector(`.div${i}`).className = `div${i} alternate-block`;
            }
        }
        else if(!isRowNumberEven){
            if (!(i%2==0)) {
                document.querySelector(`.div${i}`).className = `div${i} alternate-block`;
            }
        }
    }
}
colorBoxes();

randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

function createBombBlocks(){
    while(bombBlocks.length < 12) {
        num = randomInt(1, numberOfBlocks);
        e = getDiv(num);
        if (e && !(bombBlocks.includes(e))) {
            e.classList.add('bomb');
            bombBlocks.push(e)
        }
    }
}
function getNearbyBlocks(block){
    nearbyBlocks = [block-1, block+1, block-9, block-10, block-11, block+9, block+10, block+11];

    nearbyBlocks = nearbyBlocks.filter(e=>e>0); //Remove -ve intergers
    nearbyBlocks = nearbyBlocks.filter(e=>e<=numberOfBlocks); //Remove integers greater than numberOfBlocks

    if (block%10==1) {
        removedBlocks = [block-1, block-11, block+9]
        nearbyBlocks = nearbyBlocks.filter(n => !removedBlocks.includes(n));
    } else if(block%10==0){
        removedBlocks = [block+1, block+11, block-9]
        nearbyBlocks = nearbyBlocks.filter(n => !removedBlocks.includes(n));
    }

    nearbyBlocks = [...new Set(nearbyBlocks)];
    nearbyBlocks = nearbyBlocks.map(e => getDiv(e));
    return nearbyBlocks;
}


function getBlockDigits() {
    nonBombBlocks = document.querySelector('.main-game').querySelectorAll('div:not(.bomb)')
    nonBombBlocks.forEach(e => {
        blockIndex = parseInt(e.getAttribute('data-sno'));
        nBlocks = getNearbyBlocks(blockIndex);
        blockNum = 0;
        nBlocks.forEach(h => {
            if (!!h) {
                if (h.classList.contains('bomb')) {
                    blockNum++;
                }
            }
        })
        e.setAttribute('data-val', blockNum);
    });
    showDigits()
}

function showDigits() {
    nonBombBlocks.forEach(e => {
        elemValue = e.getAttribute('data-val');
        if (elemValue!="0") {
            e.innerText = elemValue;            
        }
    });
}


createBombBlocks();
getBlockDigits();
