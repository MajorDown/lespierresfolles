import React from "react";

export default function Post({ post }) {
  return (
    <artice className="post">
      <p>Posté par {post.poster} :</p>
      <p>"{post.message}"</p>
    </artice>
  );
}
