module.exports = {
  removeSystemAttributes: function(node) {
    node.removeAttribute('data-dataid');
    node.removeAttribute('data-reactid');
    if (node.className === 'edit-mode') node.removeAttribute('class');
    for (var i = 0, len = node.children.length; i < len; i++) {
      this.removeSystemAttributes(node.children[i]);
    }
  },
  isEmpty: function(str) {
    return typeof(str) === 'undefined' || str === null || str === '';
  }
};
