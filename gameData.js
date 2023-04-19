export const gameData = {
  scale: 3,
  camera: {
    x: 0,
    y: 0,
  },
};

export const keys = {
  w: false,
  s: false,
  a: false,
  d: false,
  space: false,
  escape: false,
  mouse: {
    click: false,
    executeOnceFlag: true,
    x: 0,
    y: 0,
  },
};

export const spriteSheetData = {
  purpleKnight: {
    name: "Purple Knight",
    idle: {
      x: 0,
      y: 11,
      w: 16,
      h: 22,
      frames: 4,
    },
    run: {
      x: 64,
      y: 11,
      w: 16,
      h: 22,
      frames: 4,
    },
  },
  skeleton: {
    name: "Skeleton",
    idle: {
      x: 0,
      y: 206,
      w: 16,
      h: 18,
      frames: 4,
    },
    run: {
      x: 64,
      y: 206,
      w: 16,
      h: 18,
      frames: 4,
    },
  },
};
