var React = require('react');
var Component = require('../component');
var PageStore = require('../../../stores/PageStore');

var MasterSearchBox = React.createClass({
  statics: {
    editors: {
      name: true,
      toggleLabel: false,
      showLabel: false,
      label: false,
      size: true,
      align: false,
      color: [ 'default', 'warning', 'error', 'success' ],
      option: false,
      rowSize: false,
      table: false
    },
    minSize: 1,
    maxSize: 12
  },
  mixins: [Component],
  render: function() {
    var color = this.props.cell.color;
    if (color == 'danger') color = 'error';
    var componentClassName = "epd-component" + (this.props.selected ? " selected" : "") + ' has-' + color;
    return (
      <div key={this.props.cell.dataid} className={componentClassName} onClick={this.onComponentSelect} data-dataid={this.props.cell.dataid}>
        <div className={PageStore.getCellType() + "-" + this.calcSizeClassName()}>
          <div className="input-group">
            <input type="text" className="form-control" />
            <span className="input-group-btn">
              <button className="btn btn-default"><span className="glyphicon glyphicon-search"></span></button>
            </span>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = MasterSearchBox;