var EPD = window.EPD;
var React = EPD.React;
var Component = EPD.Component;
var ToolboxAction = EPD.ToolboxAction;
var Dropdown = React.createClass({
  statics: {
    editors: {
      name: true,
      toggleLabel: false,
      label: false,
      size: true,
      align: false,
      color: false,
      option: false,
      rowSize: false,
      table: false
    },
    minSize: 1
  },
  mixins: [Component],
  render: function() {
    var componentClassName = "epd-component" + (this.props.selected ? " selected" : "");
    var sizeClassName = PageStore.getCellType() + '-' + this.calcSizeClassName();
    var className = 'btn btn-block btn-' + this.props.cell.color;
    return (
      <div key={this.props.cell.dataid} className={componentClassName} onClick={this.onComponentSelect} data-dataid={this.props.cell.dataid}>
        <div className={sizeClassName}>
          <div className="dropdown">
            <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown">
              Dropdown
              <span className="caret"></span>
            </button>
            <ul className="dropdown-menu">
              <li><a href="#">Action</a></li>
              <li><a href="#">Another action</a></li>
              <li><a href="#">Something else here</a></li>
              <li><a href="#">Separated link</a></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
});
var components = [
  {
    label: 'addon',
    components: [
      { alias: 'Dropdown', constructor: Dropdown}
    ]
  }
];

ToolboxAction.addComponents(components);
