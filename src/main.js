const folders = [
    {
      type: 'dir',
      name: 'app',
      children: [
        {
          type: 'file',
          name: 'index.html'
        },
        {
          type: 'dir',
          name: 'js',
          children: [
            {
              type: 'file',
              name: 'main.js'
            },
            {
              type: 'file',
              name: 'app.js'
            },
            {
              type: 'file',
              name: 'misc.js'
            },
            {
              type: 'dir',
              name: 'vendor',
              children: [
                {
                  type: 'file',
                  name: 'jquery.js'
                },
                {
                  type: 'file',
                  name: 'underscore.js'
                }
              ]
            }
          ]
        },
        {
          type: 'dir',
          name: 'css',
          children: [
            {
              type: 'file',
              name: 'reset.css'
            },
            {
              type: 'file',
              name: 'main.css'
            }
          ]
        }
      ]
    }
  ];

let index=0;
var FolderContainer=React.createClass({
  renderChildren(children){
    return(
        <li className='folder-wrapper' key={index++}>
          <FolderContainer data={children} key={index++}/>
        </li>
    );
  },
  render: function () {
    let output=[];
    let items=this.props.data;
    for (var key in items)
    {
      if(items[key].type== 'dir'){
        output.push(<FolderItem name={items[key].name} key={index++}/>);
      }
      else if(items[key].type== 'file'){
        output.push(<FileItem name={items[key].name} key={index++} />);
      }
      if (items[key].children){
        output.push(
            this.renderChildren(items[key].children)
        );
      }
    }
    return(
        <ul className='folder-container' key={index++}>
          {output}
        </ul>
    );
  }
});

var FolderItem=React.createClass({
  render: function () {
    return(
        <li className='folder-item'>
          {this.props.name}
        </li>
    );
  }
});

var FileItem=React.createClass({
  render: function () {
    return(
        <li className='file-item'>
          {this.props.name}
        </li>
    );
  }
});

var Input=React.createClass({

  render: function () {
    return(
        <div className="widget" onChange={this.props.handleInput}>
          <input placeholder="filter..." type="text"/>
        </div>
    );
  }
});

var Container=React.createClass({

  render: function () {
    return(
        <div className='widget'>
          <Input handleInput={this.props.handleInputChange}/>
          <FolderContainer data={this.props.data}/>
        </div>
    );
  }
});


var App=React.createClass({
  transformJSON: function(data, value){
    let newObj=[];

    (function filterJSON(obj, searchValue)
    {
      if(obj.name && (obj.name.indexOf(searchValue) >-1)){
        newObj.push(obj);
        return
      }
      for (var key in obj)
      {
        if (typeof obj[key] == "object" && obj[key] !== null){
          filterJSON(obj[key],searchValue);
        }
      }
    })(data, value);
    return newObj;
  },
  handleInputChange: function(e) {
    this.setState({dataMap: this.state.dataMap.set('current', this.transformJSON(this.props.data,e.target.value)).set('value', e.target.value)});
  },
  getInitialState: function () {
    let dataMap=Immutable.Map({original: this.props.data, current: this.props.data, value: ""});
    return{dataMap: dataMap};
  },
  render: function () {

    return(
      <Container data={this.state.dataMap.get("current")} handleInputChange={this.handleInputChange}/>
    );
  }
});
ReactDOM.render( <App data={folders}/>, document.getElementById('container'));