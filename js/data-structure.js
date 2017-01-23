var KAIJU = KAIJU || {};
    KAIJU.els_ = {};

KAIJU.state_ = {
  eggs: [],
  monsters: [
    {
      'type': 'reptile',
      'id': '9218734',
      'good': 0,
      'evil': 0,
      'direction': 1,
      'clicks': 0
    },
    {
      'type': 'reptile',
      'id': '9218735',
      'good': 20,
      'evil': 0,
      'direction': 1,
      'clicks': 0
    },
  ]
};

KAIJU.kaijuData_ = {
  'reptile': {
    'speed': 12,
    'evolvePoint': 20
  },
  'darkRaptor': {
    'speed': 4,
    'evolvePoint': -1
  }
}
