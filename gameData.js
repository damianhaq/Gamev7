export const gameData = {
  scale: 3,
  showHitBox: false,
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
    executeOnceFlag: false,
    x: 0,
    y: 0,
  },
};

export const variables = {
  characterGroups: {
    ally: "ally",
    enemy: "enemy",
  },
  tasks: {
    idle: "idle",
    chase: "chase",
    attack: "attack",
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
  orcInMask: {
    name: "Orc in mask",
    idle: {
      x: 0,
      y: 1134,
      w: 16,
      h: 18,
      frames: 4,
    },
    run: {
      x: 64,
      y: 1134,
      w: 16,
      h: 18,
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
  items: {
    weapons: {
      silverSword: {
        name: "Silver Sword",
        x: 195,
        y: 882,
        w: 10,
        h: 29,
      },
      heavyMace: {
        name: "Heavy Mace",
        x: 195,
        y: 823,
        w: 10,
        h: 24,
      },
      spear: {
        name: "Spear",
        x: 149,
        y: 945,
        w: 6,
        h: 30,
      },
    },
  },
};

export const weapons = {
  silverSword: {
    rotate180WhileHolding: false,
    sprite: spriteSheetData.items.weapons.silverSword,
    name: "Silver Sword",
    dmg: 10,
    attackSpeed: 5,
  },
  heavyMace: {
    rotate180WhileHolding: true,
    sprite: spriteSheetData.items.weapons.heavyMace,
    name: "Heavy Mace",
    dmg: 20,
    attackSpeed: 3,
  },
  spear: {
    rotate180WhileHolding: true,
    sprite: spriteSheetData.items.weapons.spear,
    name: "Spear",
    dmg: 20,
    attackSpeed: 3,
  },
};

export const map = {
  loadComplete: false,
  idTilesWithCollision: [
    1897, 1898, 1899, 1900, 1901, 1902, 1930, 1931, 1932, 1963, 1964, 1965, 1966, 1967, 1968, 2032,
    2066, 2067, 2129, 2130, 2164, 2165, 2195, 2196, 2221, 2359, 2360, 2361, 2362, 2363, 2364,
  ],
  data: null,
};
