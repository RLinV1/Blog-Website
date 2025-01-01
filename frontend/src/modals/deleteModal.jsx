"use client";

import { Button, Modal } from "flowbite-react";

const deleteModal = ({ openModal, setOpenModal, getBlogs, id}) => {
 

  function onCloseModal() {
    setOpenModal(false);
  }
  const handleDelete = async () => {
    const response =  await fetch("http://localhost:5000/api/blogs/" + id, {
       method: "DELETE",
     });
 
     const data = await response.json();
     console.log(data);
 
     getBlogs();
   }
  return (
    <>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white ">
                Delete this blog?
            </h3>
            <div className="flex gap-4">
                <Button onClick={handleDelete} className="w-full bg-red-700 text-white" color="red" >Yes I'm Sure</Button>
                <Button onClick={onCloseModal} className="w-full"color="gray" >No</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default deleteModal;
