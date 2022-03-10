import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";

const PostButton = () => {
  return (
    <Link href="/postform" passHref>
      <div className="postButton" style={{ zIndex: 2 }}>
        <a>
          <EditIcon
            sx={{
              width: { xs: 50, md: 60, lg: 65 },
              height: { xs: 50, md: 60, lg: 65 },
            }}
          />
        </a>
      </div>
    </Link>
  );
};

export default PostButton;
