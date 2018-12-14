import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { database, firebaseStorage, storageRef } from "../firebase";
import { connect } from "react-redux";
import {
  Button,
  FormText,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
  Progress
} from "reactstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

class CreatePost extends Component {
  state = {
    title: "",
    brand: "",
    model: "",
    engene: "",
    year: "",
    city: "",
    price: "",
    description: "",
    imgURL: "",
    isOpenAlert: false,
    file: null,
    isLoading: false,
    loadProgress: 0
  };

  hendlerSubmitForm = (e) => {
    e.preventDefault();
    const {
      title,
      brand,
      model,
      engene,
      year,
      city,
      price,
      description,
      imgURL
    } = this.state;

    const createdAt = +new Date();

    const post = {
      title,
      brand,
      model,
      engene,
      year,
      city,
      price,
      description,
      imgURL,
      createdAt
    };

    database
      .push(post)
      .then((res) => {
        console.log(res);
        this.setState({
          isOpenAlert: true,
          title: "",
          brand: "",
          model: "",
          engene: "",
          year: "",
          city: "",
          price: "",
          description: "",
          imgURL: "",
          file: null,
          isLoading: false,
          loadProgress: 0
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          isOpenAlert: true
        });
      });
  };

  hendlerInputTitle = (e) => {
    const { value } = e.target;
    this.setState({
      title: value,
      isOpenAlert: false
    });
  };

  hendlerInputDescription = (e) => {
    const { value } = e.target;
    this.setState({
      description: value,
      isOpenAlert: false
    });
  };

  hendlerPostImage = (e) => {
    const { files } = e.target;

    this.setState({
      file: files[0]
    });
  };

  hendlerLoadButton = () => {
    const { file } = this.state;
    if (file === null) return;

    this.setState({
      isLoading: true,
      file: null
    });

    // Create the file metadata
    const metadata = {
      contentType: file.type
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    const uploadTask = storageRef
      .child("images/posts/" + new Date())
      .put(file, metadata);

    const self = this;
    // Listen htmlFor state changes, errors, and completion of the upload.
    uploadTask.on(
      firebaseStorage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      function(snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        self.setState({
          loadProgress: progress
        });
      },
      function(error) {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;
          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
          default:
            break;
        }
      },
      function() {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          console.log("File available at", downloadURL);
          self.setState({
            isLoading: false,
            loadProgress: 0,
            imgURL: downloadURL
          });
        });
      }
    );
  };

  onDismiss = () => {
    this.setState({
      isOpenAlert: false
    });
  };

  render() {
    const { user } = this.props;
    if (!user) {
      return <Redirect to="/" />;
    }

    return (
      <div className="row p-3 bg-light d-flex justify-content-center">
        <Form onSubmit={this.hendlerSubmitForm}>
          <Alert
            isOpen={this.state.isOpenAlert}
            color="success"
            toggle={this.onDismiss}
          >
            Объявление успешно опубликованно!
          </Alert>

          <FormGroup>
            <Label htmlFor="inputPostTitle">Заголовок</Label>
            <Input
              id="inputPostTitle"
              type="text"
              name="title"
              placeholder="Заголовок"
              value={this.state.title}
              onChange={this.hendlerInputTitle}
            />
          </FormGroup>

          <div className="form-row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="">Макрка авто:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  value={this.state.brand}
                  onChange={(e) => {
                    this.setState({ brand: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label htmlFor="">Модель авто:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  value={this.state.model}
                  onChange={(e) => {
                    this.setState({ model: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label htmlFor="">Двигатель:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  value={this.state.engene}
                  onChange={(e) => {
                    this.setState({ engene: e.target.value });
                  }}
                />
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="">Год выпуска:</label>
                <input
                  type="number"
                  min="1970"
                  className="form-control"
                  value={this.state.year}
                  onChange={(e) => {
                    this.setState({ year: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label htmlFor="">Ваш город:</label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.city}
                  onChange={(e) => {
                    this.setState({ city: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label htmlFor="">Цена:</label>
                <input
                  type="number"
                  min="0"
                  className="form-control"
                  placeholder="$"
                  value={this.state.price}
                  onChange={(e) => {
                    this.setState({ price: e.target.value });
                  }}
                />
              </div>
            </div>
          </div>

          <div class="form-row">
            <div class="col">
              <div class="form-group">
                <label htmlFor="">Описание</label>
                <textarea
                  class="form-control"
                  rows="3"
                  placeholder="Описание"
                  value={this.state.description}
                  onChange={(e) => {
                    this.setState({ description: e.target.value });
                  }}
                />
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="col">
              <FormGroup>
                <Label htmlFor="inputPostImage">Файл</Label>
                <Input
                  type="file"
                  name="file"
                  id="inputPostImage"
                  onChange={this.hendlerPostImage}
                />
                <FormText color="muted">
                  Выберите изображение для объявления
                </FormText>

                {this.state.isLoading ? (
                  <Progress
                    animated
                    color="success"
                    value={this.state.loadProgress}
                  />
                ) : null}

                {this.state.file ? (
                  <Button color="success mt-2" onClick={this.hendlerLoadButton}>
                    Загрузить файл
                  </Button>
                ) : null}
              </FormGroup>
            </div>
          </div>

          {this.state.title && this.state.description ? (
            <Button color="primary">Подать объявление</Button>
          ) : null}
        </Form>
      </div>
    );
  }
}

CreatePost.modules = {
  toolbar: [
    [{ header: "2" }, { header: "3" }, { header: "4" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
    ["clean"],
    ["code-block"]
  ]
};

CreatePost.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  "code-block"
];

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(
  mapStateToProps,
  {}
)(CreatePost);
