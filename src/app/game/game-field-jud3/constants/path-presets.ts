export const PATH_PRESETS = {
  charters: {
    warrior: {
      diagDown: 'assets/topdown_shooter/characters/3_diagdown.png',
      diagUp: 'assets/topdown_shooter/characters/3_diagup.png',
      up: 'assets/topdown_shooter/characters/3_north.png',
      side: 'assets/topdown_shooter/characters/3_side.png',
      down: 'assets/topdown_shooter/characters/3_south.png',
    },
  },

  cursors: ['src/assets/topdown_shooter/cursors/6crosshair.png'],

  guns: {
    canonGun: {
      diagDown: 'assets/topdown_shooter/guns/cannon/cannon_diagdown.png',
      diagUp: 'assets/topdown_shooter/guns/cannon/cannon_diagup.png',
      down: 'assets/topdown_shooter/guns/cannon/cannon_down.png',
      side: 'assets/topdown_shooter/guns/cannon/cannon_side.png',
      up: 'assets/topdown_shooter/guns/cannon/cannon_up.png',
    },
  },

  bullets: {
    cat: 'assets/topdown_shooter/other/cat.png',
    tomato: 'assets/topdown_shooter/other/bullet_tomato.png',
    catScratch: 'assets/topdown_shooter/other/catscratch.png',
  },
};

export const BASE_PRESETS = {
  hpBar: [
    'assets/Kit/Base/Life Bar Animated 1.png',
    'assets/Kit/Base/Life Bar Animated 2.png',
    'assets/Kit/Base/Life Bar Animated 3.png',
    'assets/Kit/Base/Life Bar Animated 4.png',
    'assets/Kit/Base/Life Bar Animated 5.png',
    'assets/Kit/Base/Life Bar Animated 6.png',
    'assets/Kit/Base/Life Bar Animated 7.png',
    'assets/Kit/Base/Life Bar Animated 8.png',
    'assets/Kit/Base/Life Bar Animated 9.png',
  ],
};

export const MOBS = {
  slime: {
    side: 'assets/topdown_shooter/monster/slime1_side.png',
    up: 'assets/topdown_shooter/monster/slime1_front.png',
    down: 'assets/topdown_shooter/monster/slime1_back.png',
    die: 'assets/topdown_shooter/monster/slime_explode.png',
  },
};

export const MENU = {
  buttons: {
    single: {
      default: 'assets/interface/single.png',
      hover: 'assets/interface/hover_single.png',
      active: 'assets/interface/active_single.png',
    },
    online: {
      default: 'assets/interface/online.png',
      hover: 'assets/interface/hover_online.png',
      active: 'assets/interface/active_online.png',
    },
    settings: {
      default: 'assets/interface/settings.png',
      hover: 'assets/interface/hover_settings.png',
      active: 'assets/interface/active_settings.png',
    },
  },
  interface: {
    panel: 'assets/interface/panel.png',
    mode: 'assets/interface/DialogueBox.png',
  },

  cancel: {
    default: 'assets/interface/restor/cancel.png',
    hover: 'assets/interface/restor/active_cancel.png',
    active: 'assets/interface/restor/active_cancel.png',
  },

  ready: {
    default: 'assets/interface/restor/play.png',
    hover: 'assets/interface/restor/active_play.png',
    active: 'assets/interface/restor/active_play.png',
  },

  single: {
    modes: {
      defence: 'assets/interface/restor/save_base.png',
      infinity: 'assets/interface/restor/infinity.png',
      arena: 'assets/interface/restor/arena.png',
    },
  },
  logo: 'assets/background/logo.png',
  background: {
    cloud: {
      src: 'assets/background/PNG/background_plains-Sheet1.png',
      speed: {
        x: 0,
        y: 0,
      },
      size: {
        w: window.innerWidth / 3,
        h: 400,
      },
      position: {
        x: 0,
        y: 0,
      },
    },

    mountain: {
      src: 'assets/background/PNG/background_plains-Sheet2.png',
      speed: {
        x: -0.03,
        y: 0,
      },
      size: {
        w: window.innerWidth / 3,
        h: 700,
      },
      position: {
        x: 0,
        y: window.innerHeight - 1300,
      },
    },

    terra1: {
      src: 'assets/background/PNG/background_plains-Sheet4.png',
      speed: {
        x: -0.05,
        y: 0,
      },
      size: {
        w: window.innerWidth / 3,
        h: 1000,
      },
      position: {
        x: 0,
        y: window.innerHeight - 1300,
      },
    },
    terra2: {
      src: 'assets/background/PNG/background_plains-Sheet3.png',
      speed: {
        x: -0.1,
        y: 0,
      },
      size: {
        w: window.innerWidth / 3,
        h: 900,
      },
      position: {
        x: 0,
        y: window.innerHeight - 800,
      },
    },

    grass: {
      src: 'assets/background/PNG/background_plains-Sheet5.png',
      speed: {
        x: -0.3,
        y: 0,
      },
      size: {
        w: window.innerWidth / 3,
        h: 300,
      },
      position: {
        x: 0,
        y: window.innerHeight - 300,
      },
    },
  },
};
