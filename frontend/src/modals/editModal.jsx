"use client";

import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Button, Modal, Label, TextInput, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
const EditModal = ({ openModal, setOpenModal, getBlogs, id, title, content}) => {
  const supabase = useSupabaseClient();
  const [blogData, setBlogData] = useState({
    title: title,
    content: content,
  });
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      // console.log(session.access_token);
    });
  })

  function onCloseModal() {
    setOpenModal(false);
    setBlogData({ title: title, content: content });
  }
  const handleEdit = async () => {
    const response = await fetch("https://blog-website-ss4m.onrender.com/api/blogs/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session.access_token}`
      },
      body: JSON.stringify(blogData),
    });

    const data = await response.json();
    // console.log(data);
    onCloseModal();
    setBlogData({ title: blogData.title, content: blogData.content });
    getBlogs();
  };
  return (
    <>
      <Modal show={openModal} size="3xl"  onClose={onCloseModal} popup>
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
                rows={10}
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
