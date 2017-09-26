define(
  'ephox.boss.api.DomUniverse',

  [
    'ephox.boss.common.TagBoundaries',
    'ephox.katamari.api.Arr',
    'ephox.katamari.api.Fun',
    'ephox.sugar.api.properties.Attr',
    'ephox.sugar.api.dom.Compare',
    'ephox.sugar.api.properties.Css',
    'ephox.sugar.api.node.Element',
    'ephox.sugar.api.dom.Insert',
    'ephox.sugar.api.dom.InsertAll',
    'ephox.sugar.api.node.Node',
    'ephox.sugar.api.search.PredicateFilter',
    'ephox.sugar.api.search.PredicateFind',
    'ephox.sugar.api.dom.Remove',
    'ephox.sugar.api.search.SelectorFilter',
    'ephox.sugar.api.search.SelectorFind',
    'ephox.sugar.api.node.Text',
    'ephox.sugar.api.search.Traverse'
  ],

  function (TagBoundaries, Arr, Fun, Attr, Compare, Css, Element, Insert, InsertAll, Node, PredicateFilter, PredicateFind, Remove, SelectorFilter, SelectorFind, Text, Traverse) {
    return function () {
      var clone = function (element) {
        return Element.fromDom(element.dom().cloneNode(false));
      };

      var isBoundary = function (element) {
        if (!Node.isElement(element)) return false;
        if (Node.name(element) === 'body') return true;
        return Arr.contains(TagBoundaries, Node.name(element));
      };

      var isEmptyTag = function (element) {
        if (!Node.isElement(element)) return false;
        return Arr.contains(['br', 'img', 'hr', 'input'], Node.name(element));
      };

      var comparePosition = function (element, other) {
        return element.dom().compareDocumentPosition(other.dom());
      };

      var copyAttributesTo = function (source, destination) {
        var as = Attr.clone(source);
        Attr.setAll(destination, as);
      };

      return {
        up: Fun.constant({
          selector: SelectorFind.ancestor,
          closest: SelectorFind.closest,
          predicate: PredicateFind.ancestor,
          all: Traverse.parents
        }),
        down: Fun.constant({
          selector: SelectorFilter.descendants,
          predicate: PredicateFilter.descendants
        }),
        styles: Fun.constant({
          get: Css.get,
          getRaw: Css.getRaw,
          set: Css.set,
          remove: Css.remove
        }),
        attrs: Fun.constant({
          get: Attr.get,
          set: Attr.set,
          remove: Attr.remove,
          copyTo: copyAttributesTo
        }),
        insert: Fun.constant({
          before: Insert.before,
          after: Insert.after,
          afterAll: InsertAll.after,
          append: Insert.append,
          appendAll: InsertAll.append,
          prepend: Insert.prepend,
          wrap: Insert.wrap
        }),
        remove: Fun.constant({
          unwrap: Remove.unwrap,
          remove: Remove.remove
        }),
        create: Fun.constant({
          nu: Element.fromTag,
          clone: clone,
          text: Element.fromText
        }),
        query: Fun.constant({
          comparePosition: comparePosition,
          prevSibling: Traverse.prevSibling,
          nextSibling: Traverse.nextSibling
        }),
        property: Fun.constant({
          children: Traverse.children,
          name: Node.name,
          parent: Traverse.parent,
          isText: Node.isText,
          isComment: Node.isComment,
          isElement: Node.isElement,
          getText: Text.get,
          setText: Text.set,
          isBoundary: isBoundary,
          isEmptyTag: isEmptyTag
        }),
        eq: Compare.eq,
        is: Compare.is
      };
    };
  }
);