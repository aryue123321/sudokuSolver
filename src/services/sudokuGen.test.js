import {  expect,  } from '@jest/globals'

import * as sg from './sudokuGen'

test('getEmptyCell with all empty cells', () => {
    const b = sg.getEmptyBoard()
    expect(b).toHaveLength(9)
  });

test('get empty cells', ()=>{
  const b = [
    [8, null, 1, 2, 9, 6, null, null, null],
    [3, null, null, null, 8, 1, 7, null, 6],
    [2, null, null, null, null, null, null, 9, null],
    [1, null, 2, null, 6, 5, 4, 7, 9],
    [null, null, null, 1, null, 9, null, 3, null],
    [5, 9, null, 3, null, null, null, 6, 2],
    [4, null, null, null, null, null, null, 1, 3],
    [9, 1, null, null, null, null, 6, 8, 7],
    [null, 8, null, null, null, 7, null, 5, null]
  ]
  const e = sg.getEmptyCells(b);
  const res = [
    [ 3, 1 ], [ 3, 3 ], [ 0, 1 ], [ 0, 6 ],
    [ 0, 7 ], [ 0, 8 ], [ 1, 1 ], [ 1, 2 ],
    [ 1, 3 ], [ 1, 7 ], [ 5, 2 ], [ 5, 4 ],
    [ 5, 5 ], [ 5, 6 ], [ 7, 2 ], [ 7, 3 ],
    [ 7, 4 ], [ 7, 5 ], [ 4, 0 ], [ 4, 1 ],
    [ 4, 2 ], [ 4, 4 ], [ 4, 6 ], [ 4, 8 ],
    [ 6, 1 ], [ 6, 2 ], [ 6, 3 ], [ 6, 4 ],
    [ 6, 5 ], [ 6, 6 ], [ 8, 0 ], [ 8, 2 ],
    [ 8, 3 ], [ 8, 4 ], [ 8, 6 ], [ 8, 8 ],
    [ 2, 1 ], [ 2, 2 ], [ 2, 3 ], [ 2, 4 ],
    [ 2, 5 ], [ 2, 6 ], [ 2, 8 ]
  ]
  expect(e).toEqual(res);
})

test('solver an example with no error', () => {

  const b = [
    [8, null, 1, 2, 9, 6, null, null, null],
    [3, null, null, null, 8, 1, 7, null, 6],
    [2, null, null, null, null, null, null, 9, null],
    [1, null, 2, null, 6, 5, 4, 7, 9],
    [null, null, null, 1, null, 9, null, 3, null],
    [5, 9, null, 3, null, null, null, 6, 2],
    [4, null, null, null, null, null, null, 1, 3],
    [9, 1, null, null, null, null, 6, 8, 7],
    [null, 8, null, null, null, 7, null, 5, null]
  ]

  const res = sg.solver(b);
  const expected = [
    [
      8, 7, 1, 2, 9,
      6, 3, 4, 5
    ],
    [
      3, 4, 9, 5, 8,
      1, 7, 2, 6
    ],
    [
      2, 5, 6, 7, 4,
      3, 8, 9, 1
    ],
    [
      1, 3, 2, 8, 6,
      5, 4, 7, 9
    ],
    [
      7, 6, 4, 1, 2,
      9, 5, 3, 8
    ],
    [
      5, 9, 8, 3, 7,
      4, 1, 6, 2
    ],
    [
      4, 2, 7, 6, 5,
      8, 9, 1, 3
    ],
    [
      9, 1, 5, 4, 3,
      2, 6, 8, 7
    ],
    [
      6, 8, 3, 9, 1,
      7, 2, 5, 4
    ]
  ]

  expect(res).toEqual(expected)
});

test('genartor Test', () => {

  const b = [
    [8, null, 1, 2, 9, 6, null, null, null],
    [3, null, null, null, 8, 1, 7, null, 6],
    [2, null, null, null, null, null, null, 9, null],
    [1, null, 2, null, 6, 5, 4, 7, 9],
    [null, null, null, 1, null, 9, null, 3, null],
    [5, 9, null, 3, null, null, null, 6, 2],
    [4, null, null, null, null, null, null, 1, 3],
    [9, 1, null, null, null, null, 6, 8, 7],
    [null, 8, null, null, null, 7, null, 5, null]
  ]

  const generator = sg.solverGenerator(b);
  let next = null;
  do{
    next = generator.next();
  }
  while(!next.done)
});

test('getNumberCellsCount', () => {

  const b = [
    [8, null, 1, 2, 9, 6, null, null, null],
    [3, null, null, null, 8, 1, 7, null, 6],
    [2, null, null, null, null, null, null, 9, null],
    [1, null, 2, null, 6, 5, 4, 7, 9],
    [null, null, null, 1, null, 9, null, 3, null],
    [5, 9, null, 3, null, null, null, 6, 2],
    [4, null, null, null, null, null, null, 1, 3],
    [9, 1, null, null, null, null, 6, 8, 7],
    [null, 8, null, null, null, 7, null, 5, null]
  ]

  const res =  sg.getNumberCellsCount(b)
  expect(res).toBe(38)
  
});

test('getNumberCellsCount with empty board', () => {

  const b = sg.getEmptyBoard()

  const res =  sg.getNumberCellsCount(b)
  expect(res).toBe(0)
  
});

test('genartor2 Test', () => {

  const b = [
    [8, null, 1, 2, 9, 6, null, null, null],
    [3, null, null, null, 8, 1, 7, null, 6],
    [2, null, null, null, null, null, null, 9, null],
    [1, null, 2, null, 6, 5, 4, 7, 9],
    [null, null, null, 1, null, 9, null, 3, null],
    [5, 9, null, 3, null, null, null, 6, 2],
    [4, null, null, null, null, null, null, 1, 3],
    [9, 1, null, null, null, null, 6, 8, 7],
    [null, 8, null, null, null, 7, null, 5, null]
  ]

  const generator = sg.solver2Generator(b);
  let next = null;
  do{
    next = generator.next();
  }
  while(!next.done)
});