import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";

const PostButton = () => {
  return (
    <Link href="/postform" passHref>
      <div className="postButton" style={{ zIndex: 2 }}>
        <a>
          <EditIcon
            sx={{
              width: 65,
              height: 65,
            }}
            fontSize="large"
          />
        </a>
      </div>
    </Link>
  );
};

export default PostButton;
