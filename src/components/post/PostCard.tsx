"use client";

import { useEffect, useState } from "react";
import { getAllComment, getCommentByPostId, getUserDetail } from "@/api/api";
import { IComment, IPost, IUser } from "../../type/type";

interface PostProps {
  post: IPost;
}

const PostCard: React.FC<PostProps> = ({ post }) => {
  const [comment, setcomments] = useState<IComment[]>([]);
  const [isClick, setIsClick] = useState<boolean>(false);
  const [ownerName, setOwnerName] = useState<string>("");

  useEffect(() => {
    (async () => {
      const resComment = await getCommentByPostId(post.id);
      const resUser: IUser = await getUserDetail(post.user_id);
      setcomments(resComment);
      setOwnerName(resUser.name || "Anonymous");
    })();
  }, [post]);
  return (
    <div>
      <div
        key={post.id}
        className="p-4 bg-white shadow-lg rounded-md mb-5 items-center"
      >
        <p className="italic text-gray-600 text-sm">#{post.id}</p>
        <p className="text-sm mb-2 font-bold w-full flex items-center justify-between">
          {ownerName}
          <span className="font-normal italic text-xs text-right">
            id: {post.user_id}
          </span>
        </p>
        <p className="text-xl font-bold mb-2 border-b text-blue-600">
          {post.title}
        </p>
        <p className="text-xs text-justify">{post.body}</p>
        <div className="my-3 ">
          <div>
            <button
              className="font-bold text-xs"
              type="button"
              onClick={() => setIsClick(!isClick)}
            >
              Comment {comment.length}
            </button>
            {isClick ? (
              comment?.length !== 0 ? (
                comment?.map((komen) => {
                  return (
                    <div className="px-2 my-3" key={komen.id}>
                      <div className=" bg-slate-200 px-3 py-2 rounded-md">
                        <p className="text-xs font-bold text-blue-600">
                          {komen.name}
                        </p>
                        <p className="text-xs">{komen.body}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="w-full text-center text-xs my-3 text-gray-500">
                  No Comment
                </p>
              )
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
