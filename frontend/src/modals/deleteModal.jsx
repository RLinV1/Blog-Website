"use client";

import { useUser } from "@supabase/auth-helpers-react";
import { Button, Modal } from "flowbite-react";
import { useState, useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const deleteModal = ({ openModal, setOpenModal, getBlogs, id }) => {
  const user = useUser();
  const [session, setSession] = useState(null);
  const supabase = useSupabaseClient();

  function onCloseModal() {
    setOpenModal(false);
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      // console.log(session.access_token);
    });
  }, [user]);

  const handleDelete = async () => {
    // console.log(session.access_token)
    const response = await fetch("https://blog-website-ss4m.onrender.com/api/blogs/" + id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    });

    const data = await response.json();
    // console.log(data);

    getBlogs();
    onCloseModal();
  };
  return (
    <>
      <Modal show={openModal} size="lg" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="flex flex-col justify-between min-h-28">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white ">
              Delete this blog?
            </h3>
            <div className="flex gap-4">
              <Button
                onClick={handleDelete}
                className="w-full bg-red-700 text-white"
                color="red"
              >
                Yes I'm Sure
              </Button>
              <Button onClick={onCloseModal} className="w-full" color="gray">
                No
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default deleteModal;
