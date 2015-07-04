var React = require('react');
var Component = require('./component');

var FormText = React.createClass({
  statics: {
    editors: {
      name: true,
      label: false,
      size: true,
      align: false,
      color: false
      option: false,
      rowSize: false,
      table: false
    },
    minSize: 4,
    maxSize: 12
  },
  mixins: [Component],
  render: function() {
    var color = this.props.cell.color;
    if (color == 'danger') color = 'error';
    var componentClassName = "epd-component" + (this.props.selected ? " selected" : "") + ' has-' + color;
    var sizeClassName = "col-md-" + this.props.size;
    return (
      <div key={this.props.cell.dataid} className={componentClassName} onClick={this.onComponentSelect} data-dataid={this.props.cell.dataid}>
        <div className={sizeClassName}>
        <div>
          <ul className="nav nav-tabs">
            <li className="active"><a href="#home" data-toggle="tab">Home</a></li>
          </ul>
          <div className="tab-content">
            <div role="tabpanel" className="tab-pane active" id="home">
              <Grid rows={rows}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = FormText;
