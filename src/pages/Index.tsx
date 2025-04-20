
import { useState } from "react";
import CreatePostForm from "@/components/CreatePostForm";
import ScheduledPosts from "@/components/ScheduledPosts";
import { type ScheduledPost } from "@/types/post";

const Index = () => {
  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([]);

  const handlePostScheduled = (post: ScheduledPost) => {
    setScheduledPosts(prev => [...prev, post].sort((a, b) => 
      a.scheduledDate.getTime() - b.scheduledDate.getTime()
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-purple-600">
          Social Media Scheduler
        </h1>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Create New Post</h2>
            <CreatePostForm onPostScheduled={handlePostScheduled} />
          </div>
          <div>
            <ScheduledPosts posts={scheduledPosts} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
