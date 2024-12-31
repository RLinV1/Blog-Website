"use client";

import { Button, Label, Modal, TextInput, Textarea } from "flowbite-react";
import { useState } from "react";

const addModal = ({ openModal, setOpenModal, getBlogs}) => {
  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
  });

  function onCloseModal() {
    setOpenModal(false);
    setBlogData({ title: "",
      content: ""
    });
  }
  const handleAdd = () => {
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
        setOpenModal(false);
      });
  };
  return (
    <>
      <Modal show={openModal} size="lg" onClose={onCloseModal} popup>
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
               placeholder="Set Blog Content..." required rows={4} 
                onChange={(event) => {
                    setBlogData({ ...blogData, content: event.target.value });
                }}
                />

            </div>
            <div>
                <Button onClick={handleAdd} className="w-full">Add</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default addModal;
