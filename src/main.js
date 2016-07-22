const folders = {
  directories: [
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
  ]
};

var FolderContainer=React.createClass({

  renderChildren(children){
    return(
        <li className='folder-wrapper'>
            <FolderContainer data={children}/>
        </li>
    );
  },
  render: function () {
    let output=[];
    let items=this.props.data;
    for (var key in items)
    {
      if(items[key].type== 'dir'){
        output.push(<FolderItem name={items[key].name} />);
      }
      else if(items[key].type== 'file'){
        output.push(<FileItem name={items[key].name} />);
      }
      if (items[key].children){
        output.push(
            this.renderChildren(items[key].children)
        );
      }
    }
    return(
        <ul className='folder-container'>
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
    this.setState({data: this.transformJSON(this.props.data,e.target.value)});
  },
  getInitialState: function () {
    return {data: this.props.data};
  },

  render: function () {
    return(
        <div className='widget'>
          <Input handleInput={this.handleInputChange}/>
          <FolderContainer data={this.state.data}/>
        </div>
    );
  }
});

ReactDOM.render( <Container data={folders.directories}/>, document.getElementById('container'));