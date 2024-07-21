
interface blogTileProps{
  name: string,
  date: string,
  title: string,
  content: string
}

function BlogTile({ name, date, title, content }: blogTileProps) {
  return (
    <div className="flex flex-col space-y-2 py-3">
      {/* metadata for blog - Avatar, authorName, date */}
      <div className="flex space-x-1 items-center text-sm">
        {/* Avatar Photo */}
        <div className="bg-gray-500 rounded-full w-6 h-6 flex flex-col items-center justify-center p-3 mr-1 text-white">
          {name[0].toUpperCase()}
        </div>
        {/* Name of Author */}
        <div>
          <p>{name}</p>
        </div>
        {/* Dot */}
        <div className="border border-gray-500 rounded-full w-0.5 h-0.5 bg-gray-500"></div>
        {/* Date */}
        <div>
          <p className="text-gray-500">{date}</p>
        </div>
      </div>
      {/* Title and description */}
      <div className="space-y-2">
        <h2 className="font-bold text-3xl">{title}</h2>
        <p className="text-gray-600">{content.length > 150 ? content.slice(0, 150) + "..." : content}</p>
      </div>
      {/* metadata - 3 min read */}
      <div className="flex justify-between py-5">
        <div>
          <p className="text-gray-500">
            {Math.ceil(content.split(" ").length / 50)} min Read
          </p>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default BlogTile;
