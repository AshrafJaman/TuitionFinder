import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../Context/Sign_In_Context';
import { TeacherContext } from '../Context/TeacherList_Context';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { storage } from '../FirebaseConfig';
import { API_URL } from '../../constants';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const BlogPost = () => {
  const { register, handleSubmit, watch, errors, reset } = useForm();
  const [teacher, setTeacher] = useContext(TeacherContext);
  const [user, setUser] = useContext(UserContext);
  const [wait, setWait] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [snack, setSnack] = useState(false);
  const [image, setImage] = useState(null);
  const onSubmit = (data) => {
    const newArr = teacher.find((x) => x.personal.email === user.email);
    data.authorId = newArr._id;
    data.postBy = newArr.personal.fullName;
    console.log(data);
    setWait(true);
    const uploadImg = storage.ref(`images/${image.name}`).put(image);
    uploadImg.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        console.log(error.message);
      },
      () => {
        //complete function
        storage
          .ref('images')
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            data.img = url;
            fetch(`${API_URL}/blog/post`, {
              method: 'POST',
              body: JSON.stringify(data),
              headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
            })
              .then((response) => response.text())
              .then((json) => {
                setWait(false);
                setOpen(true);
                handleSnack("Your Blog is posted Successfully. It's now under review by the admin");
                reset();
              });
          });
      }
    );
  };

  const handleSnack = (msg) => {
    setOpen(true);
    setSnack(msg);
  };
  const handleSnackClose = () => {
    setSnack(false);
  };

  const handleFile = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  return (
    <div className="blogPost">
      <h3>Create a Blog post</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input ref={register} type="text" name="title" placeholder="Title" required />
        <input ref={register} type="text" name="subTitle" placeholder="Sub Title" required />
        <label htmlFor="img">Add Image</label>
        <input ref={register} type="file" placeholder="Add Image" required onChange={handleFile} />
        <textarea
          ref={register}
          name="article"
          id=""
          cols="30"
          rows="10"
          required
          placeholder="Write Something ....."
        ></textarea>
        <button type="submit" disabled={wait} className={wait && 'wait'}>
          Submit
        </button>
      </form>
      <Snackbar open={snack} autoHideDuration={4000} onClose={handleSnackClose}>
        <Alert severity="success" onClose={handleSnackClose}>
          {snack}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default BlogPost;
