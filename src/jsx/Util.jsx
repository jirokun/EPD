module.exports = {
  removeSystemAttributes: function(node) {
    node.removeAttribute('data-dataid');
    node.removeAttribute('data-reactid');
    node.removeAttribute('contenteditable');
    if (node.className === 'edit-mode') node.removeAttribute('class');
    for (var i = 0, len = node.children.length; i < len; i++) {
      this.removeSystemAttributes(node.children[i]);
    }
  },
  nl2br: function(str) {
    return str.replace(/\n/g, "<br/>");
  },
  isEmpty: function(str) {
    return typeof(str) === 'undefined' || str === null || str === '';
  }
};
