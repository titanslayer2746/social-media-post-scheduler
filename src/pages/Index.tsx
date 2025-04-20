
import { useState } from "react";
import CreatePostForm from "@/components/CreatePostForm";
import CalendarView from "@/components/CalendarView";
import { type ScheduledPost } from "@/types/post";

const Index = () => {
  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([]);

  const handlePostScheduled = (post: ScheduledPost) => {
    setScheduledPosts(prev => [...prev, post].sort((a, b) => 
      a.scheduledDate.getTime() - b.scheduledDate.getTime()
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/40">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-accent via-accent/80 to-accent/60 text-transparent bg-clip-text transition-all">
          Social Media Scheduler
        </h1>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="glass-panel">
            <h2 className="text-2xl font-bold mb-6 text-primary-foreground">Create New Post</h2>
            <CreatePostForm onPostScheduled={handlePostScheduled} />
          </div>
          <div className="glass-panel">
            <CalendarView posts={scheduledPosts} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
