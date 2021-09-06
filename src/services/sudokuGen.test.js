import { describe, expect, it } from '@jest/globals'

import * as sg from './sudokuGen'

test('getEmptyCell with all empty cells', () => {
    const length = 9
    const b = sg.getEmptyBoard()
    expect(b).toHaveLength(9)
  });

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