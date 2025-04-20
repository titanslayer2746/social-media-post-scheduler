
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { type SocialPlatform, type ScheduledPost } from "@/types/post";

interface CreatePostFormProps {
  onPostScheduled: (post: ScheduledPost) => void;
}

const CreatePostForm = ({ onPostScheduled }: CreatePostFormProps) => {
  const [content, setContent] = useState("");
  const [date, setDate] = useState<Date>();
  const [platforms, setPlatforms] = useState<SocialPlatform[]>([]);
  const [time, setTime] = useState("12:00");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content || !date || platforms.length === 0) {
      toast.error("Please fill in all required fields");
      return;
    }

    const [hours, minutes] = time.split(":").map(Number);
    const scheduledDate = new Date(date);
    scheduledDate.setHours(hours, minutes);

    const newPost: ScheduledPost = {
      id: Math.random().toString(36).substring(7),
      content,
      scheduledDate,
      platforms,
    };

    onPostScheduled(newPost);
    setContent("");
    setDate(undefined);
    setPlatforms([]);
    setTime("12:00");
    toast.success("Post scheduled successfully!");
  };

  const togglePlatform = (platform: SocialPlatform) => {
    setPlatforms(prev =>
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium">Post Content</label>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What would you like to share?"
            className="min-h-[100px]"
          />
        </div>

        <div className="flex flex-wrap gap-4">
          <label className="block text-sm font-medium w-full">Select Platforms</label>
          {(['twitter', 'facebook', 'instagram', 'linkedin'] as SocialPlatform[]).map((platform) => (
            <Button
              key={platform}
              type="button"
              variant={platforms.includes(platform) ? "default" : "outline"}
              onClick={() => togglePlatform(platform)}
              className="capitalize"
            >
              {platform}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Time</label>
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              <Input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="flex-1"
              />
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full">
          Schedule Post
        </Button>
      </form>
    </Card>
  );
};

export default CreatePostForm;
