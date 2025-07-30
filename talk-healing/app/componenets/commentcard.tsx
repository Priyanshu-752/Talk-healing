import React from 'react';

type CommentProps = {
  user?: {
    name?: string;
    avatar?: string;
  };
  content: string;
  date: string;
};

const CommentCard: React.FC<CommentProps> = ({ user, content, date }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex items-start gap-4">
      <img
        src={user?.avatar || '/default-avatar.png'}
        alt="User Avatar"
        className="w-10 h-10 rounded-full object-cover"
      />
      <div>
        <div className="flex items-center gap-2">
          <h4 className="font-semibold text-gray-800">
            {user?.name || 'john doe'}
          </h4>
          <span className="text-sm text-gray-500">{date}</span>
        </div>
        <p className="text-gray-700 mt-1">{content}</p>
      </div>
    </div>
  );
};

export default CommentCard;
