import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import {connect} from 'react-redux';

import 'isomorphic-fetch';

export class HomePage extends Component {
  constructor(props){
    super(props);

    this.handleUpload = this.handleUpload.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSend = this.handleSend.bind(this);

    this.state = {
      files: []
    };
  }

  componentWillMount() {

  }

  handleUpload(files){
    const fileList = _.concat(this.state.files, files);


    this.setState({
      files: fileList
    });
  }

  handleDelete(e, index){
    e.preventDefault();

    const fileList = _.assign(this.state.files);

    _.remove(fileList, function(file, i){
      return i === index;
    });

    this.setState({
      files: fileList
    });
  }

  handleSend(e){
    e.preventDefault();

    const data = new FormData();
    this.state.files.forEach(function(file){
      data.append('files', file);
    });

    /*fetch('//localhost:8080/upload', {
      method: 'POST',
      body: data
    }).then(function(response){
     console.log(response);
    })*/

    //Fetch doesn't expose XHR so this is custom to access onprogress.
    function futch(url, opts={}, onProgress) {
      return new Promise( (res, rej) => {
        var xhr = new XMLHttpRequest();
        xhr.open(opts.method || 'get', url);
        for (var k in opts.headers||{})
          xhr.setRequestHeader(k, opts.headers[k]);
        xhr.onload = e => res(e.target.responseText);
        xhr.onerror = rej;
        if (xhr.upload && onProgress)
          xhr.upload.onprogress = onProgress; // event.loaded / event.total * 100 ; //event.lengthComputable
        xhr.send(opts.body);
      });
    }

    //futch('/upload', {method: 'post', body: data}, function(progress){
    //futch('/multiparty', {method: 'post', body: data}, function(progress){
    futch('/formidable', {method: 'post', body: data}, function(progress){
      console.log(progress.loaded / progress.total * 100);
    }).then(function(res){
      console.log(res);
    }).catch(function(err){
      console.log(err);
    });
  }

  render() {
    return (
      <div className="homepage-container">
        <Dropzone onDrop={this.handleUpload}>
          <div>Drop something here.</div>
        </Dropzone>
        <p><a href="#" onClick={this.handleSend} >Send</a></p>
        { this.state.files.map( (file, index) => {
          console.log(file);
          return (
              <div key={index} className="file" style={{marginBottom: "15px"}} >
                <p>{file.name}</p>
                <img src={file.preview} style={{height: 100}} />
                <p><a href="#" onClick={(e) => this.handleDelete(e, index) } >Delete</a></p>
              </div>);
        })}
      </div>
    );
  }
}

HomePage.propTypes = {};

// Which props do we want to inject, given the global state?
function mapStateToProps(state) {
  return state;
}

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(HomePage);
