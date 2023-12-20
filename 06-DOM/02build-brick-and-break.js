// Q6 DOM Build Brick and Break
function build(n) {
  let body = document.getElementsByTagName('body')[0];
  let bricks = 1;
  let interval = setInterval(() => {
    let brick = document.createElement('div');
    brick.setAttribute('id', 'brick-' + bricks);
    bricks % 3 === 2 ? (brick.dataset.foundation = true) : null;
    body.appendChild(brick);
    bricks++;
    if (bricks > n) {
      clearInterval(interval);
    }
  }, 100);
}

function repair(...ids) {
  ids.forEach((id) => {
    let brick = document.getElementById(id);
    brick.getAttribute('foundation')
      ? (brick.dataset.repaired = 'in progress')
      : (brick.dataset.repaired = true);
  });
}

function destroy() {
  let bricks = document.getElementsByTagName('div');
  bricks[bricks.length - 1].remove();
}

export { build, repair, destroy };

// export function build(){
//   let i = 1;
//   let block = '';
//   let counterFoundations = 2;
//   let interval = setInterval(function() {
//     block = deocument.createElement('div');
//     document.body.appendChild(block);
//     block.innerHTML = i;
//     block.id = 'brick-' + i;
//     ++i;
//     if (counterFoundation === 3){
//       block.dataset.foundation = true;
//       counterFoundation = 0;
//     }
//     ++counterFoundation;
//     console.log(block);
//     if (i === x+1){
//       clearInterval(interval);
//     }
//   }, 100, i);
//   return block;
// };
// export function repair(...repairs) {
//   for (let i = 0; i < repairs.length; i++) {
//     let elem = document.getElementById(repairs[i]);
//     // console.log(elem.getAttribute('foundation'));
//     let n = repairs[i].replace('brick-', '');
//     if (n % 3 === 2) {
//       elem.setAttribute('data-repaired', 'in progress');
//     } else {
//       elem.setAttribute('data-repaired', 'true');
//       elem.innerHTML = n;
//     }
//     // console.log(Number(repairs[i]));
//   }
// }
// export function destroy(){
//   let elements = document.querySelectorAll('div[id^="brick"]');
//   elements[elements.length-1].remove();
// };