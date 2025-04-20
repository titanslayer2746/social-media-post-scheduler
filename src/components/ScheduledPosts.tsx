
import { Card } from "@/components/ui/card";
import { type ScheduledPost } from "@/types/post";
import { format } from "date-fns";

interface ScheduledPostsProps {
  posts: ScheduledPost[];
}

const ScheduledPosts = ({ posts }: ScheduledPostsProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Scheduled Posts</h2>
      {posts.length === 0 ? (
        <Card className="p-6 text-center text-gray-500">
          No posts scheduled yet
        </Card>
      ) : (
        posts.map((post) => (
          <Card key={post.id} className="p-4 hover:shadow-lg transition-shadow">
            <p className="text-gray-600 mb-2">{post.content}</p>
            <div className="flex justify-between items-center mt-4">
              <div className="flex gap-2">
                {post.platforms.map((platform) => (
                  <span
                    key={platform}
                    className="px-2 py-1 bg-purple-100 text-purple-600 rounded-full text-sm capitalize"
                  >
                    {platform}
                  </span>
                ))}
              </div>
              <span className="text-sm text-gray-500">
                {format(post.scheduledDate, "PPP 'at' p")}
              </span>
            </div>
          </Card>
        ))
      )}
    </div>
  );
};

export default ScheduledPosts;
