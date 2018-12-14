import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { firebaseDB, firebaseStorage, storageRef } from "../firebase";
import { getPost } from "../actions/postActions";
import { connect } from "react-redux";
import {
  Button,
  FormText,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Alert,
  Progress
} from "reactstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

class EditPost extends Component {
  state = {
    title: "",
    description: "",
    body: "",
    imgURL: "",
    isOpenAlert: false,
    file: null,
    isLoading: false,
    loadProgress: 0
  };

  hendlerSubmitForm = (e) => {
    e.preventDefault();
    const { title, body, description, imgURL } = this.state;
    const updatedAt = +new Date();

    const { serverKey } = this.props.editPost;
    const post = { title, description, body, imgURL, updatedAt };
    const self = this;

    firebaseDB.ref("posts/" + serverKey).update(post, function(error) {
      if (error) {
        // The write failed...
        alert(error);
        self.setState({
          isOpenAlert: true
        });
      } else {
        // Data saved successfully!
        self.setState({
          isOpenAlert: true
        });
      }
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

  hendlerInputBody = (e) => {
    const { value } = e.target;
    this.setState({
      body: value,
      isOpenAlert: false
    });
  };

  hendlerPostImage = (e) => {
    const { files } = e.target;

    console.log(files);

    this.setState({
      file: files[0]
    });
    console.log(this.state);
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
    // Listen for state changes, errors, and completion of the upload.
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

  componentDidMount() {
    if (this.props.editPost) {
      const { title, description, body, imgURL } = this.props.editPost;

      this.setState({
        title,
        description,
        body,
        imgURL
      });
    } else {
      const { match } = this.props;
      const postId = match.params.id;
      this.props.getPost(postId);
    }
  }

  render() {
    const { user, editPost } = this.props;
    if (!user) {
      return <Redirect to="/" />;
    }

    if (!editPost) {
      return (
        <div className="container pt-3">
          <h3>Loading ...</h3>
        </div>
      );
    }

    return (
      <div className="container pt-3">
        <Form onSubmit={this.hendlerSubmitForm}>
          <Row>
            <Col md="8">
              <Alert
                isOpen={this.state.isOpenAlert}
                color="success"
                toggle={this.onDismiss}
              >
                Post successfully updated!
              </Alert>

              <FormGroup>
                <Label for="inputPostTitle">Title</Label>
                <Input
                  id="inputPostTitle"
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={this.state.title}
                  onChange={this.hendlerInputTitle}
                />
              </FormGroup>

              <FormGroup>
                <Label for="inputPostDescription">Description</Label>
                <Input
                  id="inputPostDescription"
                  name="description"
                  type="textarea"
                  row="2"
                  placeholder="Entry short post description"
                  value={this.state.description}
                  onChange={this.hendlerInputDescription}
                />
              </FormGroup>

              <FormGroup>
                <Label>Body</Label>
                <ReactQuill
                  modules={EditPost.modules}
                  formats={EditPost.formats}
                  placeholder="Body"
                  value={this.state.body}
                  onChange={(value) => {
                    this.setState({ body: value });
                  }}
                />
              </FormGroup>

              <FormGroup>
                <Label for="inputPostImage">File</Label>
                <Input
                  type="file"
                  name="file"
                  id="inputPostImage"
                  onChange={this.hendlerPostImage}
                />
                <FormText color="muted">Please select image for post</FormText>

                {this.state.isLoading ? (
                  <Progress
                    animated
                    color="success"
                    value={this.state.loadProgress}
                  />
                ) : null}

                {this.state.file ? (
                  <Button color="success mt-2" onClick={this.hendlerLoadButton}>
                    Load File
                  </Button>
                ) : null}
              </FormGroup>

              {this.state.title && this.state.body ? (
                <Button color="primary">Update post</Button>
              ) : null}
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

EditPost.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { header: "3" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
    ["clean"],
    ["code-block"]
  ]
};

EditPost.formats = [
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
  const { user, editPost } = state;
  return {
    user,
    editPost
  };
}

export default connect(
  mapStateToProps,
  { getPost }
)(EditPost);
