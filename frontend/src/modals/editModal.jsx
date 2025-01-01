"use client";

import { Button, Modal, Label, TextInput, Textarea } from "flowbite-react";
import { useState } from "react";
const EditModal = ({ openModal, setOpenModal, getBlogs, id, title, content}) => {
  const [blogData, setBlogData] = useState({
    title: title,
    content: content,
  });

  function onCloseModal() {
    setOpenModal(false);
    setBlogData({ title: title, content: content });
  }
  const handleEdit = async () => {
    const response = await fetch("http://localhost:5000/api/blogs/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blogData),
    });

    const data = await response.json();
    console.log(data);
    onCloseModal();
    setBlogData({ title: blogData.title, content: blogData.content });
    getBlogs();
  };
  return (
    <>
      <Modal show={openModal} size="lg" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white ">
              Editing this blog
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
                onChange={(event) => {
                  setBlogData({ ...blogData, content: event.target.value });
                }}
                value={blogData.content}
              />
            </div>
            <div className="flex gap-4">
              <Button onClick={handleEdit} className="w-full text-white">
                Edit
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditModal;
