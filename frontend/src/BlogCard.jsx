import { Button, Card } from "flowbite-react";
import { MdDelete } from "react-icons/md";
import DeleteModal from "./modals/deleteModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import EditModal from "./modals/editModal";
const BlogCard = ({ title, content, id, getBlogs, image, isGallery }) => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  return (
    <Card className="max-w-sm">
      <div className="flex justify-between gap-2">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white truncate max-h-10 overflow-hidden">
          {title}
        </h5>
        {isGallery && (
          <div className="flex text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            <FaEdit
              onClick={() => setOpenEditModal(true)}
              size={30}
              className="cursor-pointer"
            />
            <MdDelete
              onClick={() => setOpenModal(true)}
              size={33}
              color="red"
              className="cursor-pointer"
            />
            <DeleteModal
              openModal={openModal}
              setOpenModal={setOpenModal}
              getBlogs={getBlogs}
              id={id}
            />
            <EditModal
              openModal={openEditModal}
              setOpenModal={setOpenEditModal}
              getBlogs={getBlogs}
              id={id}
              content={content}
              title={title}
            />
          </div>
        )}
      </div>
      {image && (
        <div>
          <img src={image} alt="blog" className="w-full h-48 object-cover" />
        </div>
      )}

      <p className="font-normal text-gray-700 dark:text-gray-400 truncate max-h-12 overflow-hidden">
        {content}
      </p>
      <Button onClick={() => navigate(`/blog/${id}`)}>
        Read more
        <svg
          className="-mr-1 ml-2 h-4 w-4"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </Button>
    </Card>
  );
};

export default BlogCard;
