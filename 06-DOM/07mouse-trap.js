// //Q6 DOM Mouse Trap

export function createCircle() {
  document.addEventListener('mousedown', (event) => {
    const newCirc = document.createElement('div');
    newCirc.setAttribute('class', 'circle');
    newCirc.setAttribute('id', 'Tester');
    let x = event.clientX - 25;
    let y = event.clientY - 25;
    newCirc.setAttribute(
      'style',
      'left: ' +
        x.toString() +
        'px; top: ' +
        y.toString() +
        'px; background: white;'
    );
    // const currentDiv = document.getElementById("div1");
    document.body.appendChild(newCirc);
  });
}

export function moveCircle() {
  // const lastCircle = document.querySelector('div:last-child')

  document.addEventListener('mousemove', (event) => {
    const lastCircle = document.querySelector('div:last-child');
    lastCircle.style.left = `${event.clientX - 25}px`;
    lastCircle.style.top = `${event.clientY - 25}px`;
    document.body.append(lastCircle);
    let midBox = document.querySelector('div.box');
    let dims = midBox.getBoundingClientRect();
    // console.log('Properties')
    // console.log(dims.left)
    // console.log(lastCircle.style.left)
    // console.log(dims.right)
    // console.log(dims.top)
    // console.log(lastCircle.style.top)
    // console.log(dims.bottom)

    if (lastCircle.getAttribute('class') !== 'box') {
      if (
        +lastCircle.style.left.replace('px', '') > dims.x &&
        +lastCircle.style.left.replace('px', '') < dims.right - 50 &&
        +lastCircle.style.top.replace('px', '') > dims.top &&
        +lastCircle.style.top.replace('px', '') < dims.bottom - 50
      ) {
        lastCircle.style.background = 'var(--purple)';
      }
    }

    if (
      event.clientX - 25 < dims.x &&
      lastCircle.style.background === 'var(--purple)'
    ) {
      console.log(lastCircle.style.left);
      lastCircle.style.left = dims.x.toString() + 'px';

      if (event.clientY - 25 < dims.top) {
        lastCircle.style.top = dims.y.toString() + 'px';
      }
      console.log(event.clientY - 25);
      console.log(dims.bottom);

      if (event.clientY - 25 > dims.bottom - 50) {
        lastCircle.style.top = (dims.bottom - 50).toString() + 'px';
      }
    } else if (
      event.clientX - 25 > dims.right - 50 &&
      lastCircle.style.background === 'var(--purple)'
    ) {
      lastCircle.style.left = (dims.right - 50).toString() + 'px';

      if (event.clientY - 25 < dims.top) {
        lastCircle.style.top = dims.y.toString() + 'px';
      }
      console.log(event.clientY - 25);
      console.log(dims.bottom);

      if (event.clientY - 25 > dims.bottom - 50) {
        lastCircle.style.top = (dims.bottom - 50).toString() + 'px';
      }
    } else if (
      event.clientY - 25 > dims.bottom - 50 &&
      lastCircle.style.background === 'var(--purple)'
    ) {
      lastCircle.style.top = (dims.bottom - 50).toString() + 'px';
    } else if (
      event.clientY - 25 < dims.top &&
      lastCircle.style.background === 'var(--purple)'
    ) {
      lastCircle.style.top = dims.top.toString() + 'px';
    }
  });

  // const curr = document.querySelector('div:last-child')
  // console.log('latCircle: ' + curr)
  // let midBox = document.querySelector('div.box')
  // let dims = midBox.getBoundingClientRect()
  // console.log(midBox)
  // console.log(dims)
  // console.log(curr.style.left)
  // if (((curr.style.left.replace('px', '') > dims.x) && (curr.style.left.replace('px', '') > dims.right)) && ((curr.style.top.replace('px', '') > dims.top) && (curr.style.top.replace('px', '') < dims.bottom))) {
  //     console.log('-----------------------------------------------------------')
  // }
}

export function setBox() {
  const centerBox = document.createElement('div');
  centerBox.setAttribute('class', 'box');
  document.body.append(centerBox);
}

// var circles = [];
// var box;
// class Circle {
//   // Creates an instance of a circle
//   constructor(x, y) {
//     this.x = x;
//     this.y = y;
//     this.diameter = 50;
//     this.isTrapped = false;
//     this.HTML = null;
//     this.draw();
//     circles.push(this);
//   }
//   // "Draws" the circle by creating a div and appending it to the body
//   draw() {
//     this.HTML = document.createElement('div');
//     this.HTML.classList.add('circle');
//     this.HTML.style.position = 'absolute';
//     this.HTML.style.top = this.y + 'px';
//     this.HTML.style.left = this.x + 'px';
//     this.HTML.style.background = 'white';
//     this.trapped();
//     document.body.appendChild(this.HTML);
//   }
//   // Moves the circle to the given x and y coordinates
//   move(x, y) {
//     this.trapped();
//     if (!this.isTrapped) {
//       this.x = x;
//       this.y = y;
//       this.HTML.style.top = this.y + 'px';
//       this.HTML.style.left = this.x + 'px';
//     } else {
//       if (this.inReactangle(x, y)) {
//         this.x = x;
//         this.y = y;
//         this.HTML.style.top = this.y + 'px';
//         this.HTML.style.left = this.x + 'px';
//       } else {
//         if (this.inReactangle(x, this.y)) {
//           this.x = x;
//           this.HTML.style.left = this.x + 'px';
//         } else if (this.inReactangle(this.x, y)) {
//           this.y = y;
//           this.HTML.style.top = this.y + 'px';
//         }
//       }
//     }
//   }
//   // Checks if the circle is inside the box
//   trapped() {
//     if (
//       this.x > box.x &&
//       this.x + this.diameter < box.x + box.width &&
//       this.y > box.y &&
//       this.y + this.diameter < box.y + box.height
//     ) {
//       this.isTrapped = true;
//       this.HTML.style.background = 'var(--purple)';
//     } else {
//       this.isTrapped = false;
//       this.HTML.style.background = 'white';
//     }
//   }
//   // Checks if the given x and y coordinates for the circle are inside the box
//   inReactangle(x, y) {
//     if (
//       x > box.x &&
//       x + this.diameter < box.x + box.width &&
//       y > box.y &&
//       y + this.diameter < box.y + box.height
//     ) {
//       return true;
//     } else {
//       return false;
//     }
//   }
// }

// class Box {
//   constructor() {
//     this.HTML = document.createElement('div');
//     this.HTML.classList.add('box');
//     this.HTML.style.position = 'absolute';
//     this.HTML.style.top = '50%';
//     this.HTML.style.left = '50%';
//     this.HTML.style.transform = 'translate(-50%, -50%)';
//     document.body.appendChild(this.HTML);
//     this.x = this.HTML.offsetLeft - this.HTML.offsetWidth / 2 - 1; // -1 to account for the border
//     this.y = this.HTML.offsetTop - this.HTML.offsetHeight / 2 - 1;
//     this.width = this.HTML.offsetWidth + 1; // +1 to account for the border
//     this.height = this.HTML.offsetHeight + 1;
//   }
// }

// document.body.addEventListener('click', (e) => {
//   createCircle(e);
// });

// document.body.addEventListener('mousemove', (e) => {
//   moveCircle(e);
// });

// function createCircle(e) {
//   if (e === undefined) return;
//   new Circle(e.clientX - 25, e.clientY - 25);
// }

// function moveCircle(e) {
//   if (e === undefined || circles.length === 0) return;
//   circles[circles.length - 1].move(e.clientX - 25, e.clientY - 25);
// }

// function setBox() {
//   box = new Box();
// }

// export { createCircle, moveCircle, setBox };
