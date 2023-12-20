Example 1

Input:

```js
const puzzle = '2001\n0..0\n1000\n0..0'
const words = ['casa', 'alan', 'ciao', 'anta']
```

Output:
```
casa
i..l
anta
o..n
```

Example 2

Input:
```js
const puzzle = `...1...........
..1000001000...
...0....0......
.1......0...1..
.0....100000000
100000..0...0..
.0.....1001000.
.0.1....0.0....
.10000000.0....
.0.0......0....
.0.0.....100...
...0......0....
..........0....`
const words = [
  'sun',
  'sunglasses',
  'suncream',
  'swimming',
  'bikini',
  'beach',
  'icecream',
  'tan',
  'deckchair',
  'sand',
  'seaside',
  'sandals',
]
```

Output:
```
...s...........
..sunglasses...
...n....u......
.s......n...s..
.w....deckchair
bikini..r...n..
.m.....seaside.
.m.b....a.a....
.icecream.n....
.n.a......d....
.g.c.....tan...
...h......l....
..........s....
```

Example 3:

Input:
```js
const puzzle = `..1.1..1...
10000..1000
..0.0..0...
..1000000..
..0.0..0...
1000..10000
..0.1..0...
....0..0...
..100000...
....0..0...
....0......`
const words = [
  'popcorn',
  'fruit',
  'flour',
  'chicken',
  'eggs',
  'vegetables',
  'pasta',
  'pork',
  'steak',
  'cheese',
]
```

Output:
```
..p.f..v...
flour..eggs
..p.u..g...
..chicken..
..o.t..t...
pork..pasta
..n.s..b...
....t..l...
..cheese...
....a..s...
....k......
```

Example 4:
```js
const puzzle = `...1...........
..1000001000...
...0....0......
.1......0...1..
.0....100000000
100000..0...0..
.0.....1001000.
.0.1....0.0....
.10000000.0....
.0.0......0....
.0.0.....100...
...0......0....
..........0....`
const words = [
  'sun',
  'sunglasses',
  'suncream',
  'swimming',
  'bikini',
  'beach',
  'icecream',
  'tan',
  'deckchair',
  'sand',
  'seaside',
  'sandals',
]
```

Output:
```
...s...........
..sunglasses...
...n....u......
.s......n...s..
.w....deckchair
bikini..r...n..
.m.....seaside.
.m.b....a.a....
.icecream.n....
.n.a......d....
.g.c.....tan...
...h......l....
..........s....
```

Example 5:
```js
const puzzle = '2001\n0..0\n2000\n0..0'
const words = ['casa', 'alan', 'ciao', 'anta']
```

Output:
```
Error not enough words
```

Example 6:
```js
const puzzle = '0001\n0..0\n3000\n0..0'
const words = ['casa', 'alan', 'ciao', 'anta']
```

Output:
```
Error not valid crossword
```

Example 7:
```js
const puzzle = '2001\n0..0\n1000\n0..0'
const words = ['casa', 'casa', 'ciao', 'anta']
```

Output:
```
Error wordds not unique
```

Example 8:
```js
const puzzle = ''
const words = ['casa', 'alan', 'ciao', 'anta']
```

Output:
```
Error not valid crossword
```

Example 9:
```js
const puzzle = 123
const words = ['casa', 'alan', 'ciao', 'anta']
```

Output:
```
Error not valid input
```

Example 10:
```js
const puzzle = ''
const words = 123
```

Output:
```
Error not valid input
```

Example 11:
```js
const puzzle = '2000\n0...\n0...\n0...'
const words = ['abba', 'assa']
```

Output:
```
Error multiple solutions
```

Example 12:
```js
const puzzle = '2001\n0..0\n1000\n0..0'
const words = ['aaab', 'aaac', 'aaad', 'aaae']
```

Output:
```
Error no solution
```
