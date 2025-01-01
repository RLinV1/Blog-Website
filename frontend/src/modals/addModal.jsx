"use client";

import { Button, Label, Modal, TextInput, Textarea, FileInput} from "flowbite-react";
import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { v4 as uuidv4 } from 'uuid';

const addModal = ({ openModal, setOpenModal, getBlogs }) => {

  const supabase = useSupabaseClient();

  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
    image: "",
  });

  async function uploadImage(e) {
    let file = e.target.files[0];

    const filePath = uuidv4();
      const { data, error } = await supabase.storage
    .from('BlogImages')
    .upload(filePath, file);



    console.log(data);
    if(error){
      console.log(error);
    }

    const {data: url} = await supabase.storage
    .from('BlogImages')
    .getPublicUrl(filePath);

    console.log(url.publicUrl);

    setBlogData({ ...blogData, image: url.publicUrl });

  }

  function onCloseModal() {
    setOpenModal(false);
    setBlogData({ title: "", content: "", image: "" });
  }
  const handleAdd = () => {

    if (blogData.content === "" || blogData.title === "") {
      return;      
    }
    fetch("http://localhost:5000/api/blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blogData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        getBlogs();
        onCloseModal();
      });
  };
  return (
    <>
      <Modal show={openModal} size="3xl" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Create A Blog
            </h3>
            <div>
              <div className="mb-3 block">
                <Label htmlFor="title" value="Your Title" />
              </div>
              <TextInput
                id="title"
                placeholder="My New Blog"
                value={blogData.title}
                onChange={(event) =>
                  setBlogData({ ...blogData, title: event.target.value })
                }
                required
              />
            </div>
            <div>
              <div className="mb-3 block">
                <Label htmlFor="content" value="Content" />
              </div>

              <Textarea
                id="content"
                placeholder="Set Blog Content..."
                required
                rows={4}
                defaultValue={blogData.content}
                onChange={(event) => {
                  setBlogData({ ...blogData, content: event.target.value });
                }}
              />
            </div>
            <div>
              <div>
                <div className="mb-3">
                  <Label
                    htmlFor="file-upload-helper-text"
                    value="Upload Image File"
                  />
                </div>
                <FileInput
                  id="file-upload-helper-text"
                  helperText="PNG, JPG, JPEG."
                  onChange={(e) =>
                    uploadImage(e)
                  }
                />
              </div>
            </div>
            <div>
              <Button onClick={handleAdd} className="w-full">
                Add
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default addModal;
