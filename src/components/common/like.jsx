import React from "react";

const Like = ({ isLike, onLike }) => {
  return (
    <span>
      {isLike ? (
        <i className="fa fa-heart" onClick={onLike} />
      ) : (
        <i className="fa fa-heart-o" onClick={onLike} />
      )}
    </span>
  );
};

export default Like;
