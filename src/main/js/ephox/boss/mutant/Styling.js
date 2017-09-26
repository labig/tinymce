define(
  'ephox.boss.mutant.Styling',

  [
    'ephox.katamari.api.Merger',
    'ephox.katamari.api.Option'
  ],

  function (Merger, Option) {
    var set = function (item, property, value) {
      var r = {};
      r[property] = value;
      item.css = Merger.merge(item.css !== undefined ? item.css : {}, r);
    };

    var get = function (item, property) {
      return item.css !== undefined && item.css[property] !== undefined ? item.css[property] : 0;
    };

    var getRaw = function (item, property) {
      return item.css !== undefined && item.css[property] !== undefined ? Option.some(item.css[property]) : Option.none();
    };

    var remove = function (item, property) {
      var rest = Merger.merge({}, item.css);
      delete rest[property];
      item.css = rest;
    };

    return {
      get: get,
      getRaw: getRaw,
      set: set,
      remove: remove
    };
  }
);