
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { type ScheduledPost } from "@/types/post";

interface CalendarViewProps {
  posts: ScheduledPost[];
}

const CalendarView = ({ posts }: CalendarViewProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  
  const getDatesWithPosts = posts.map(post => post.scheduledDate);
  
  const postsForSelectedDate = selectedDate
    ? posts.filter(
        post =>
          format(post.scheduledDate, "yyyy-MM-dd") ===
          format(selectedDate, "yyyy-MM-dd")
      )
    : [];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6 text-white">Scheduled Posts Calendar</h2>
      <div className="flex justify-center">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-xl border border-purple-400/20 bg-gray-800/50 p-4 shadow-xl backdrop-blur-lg transition-all hover:shadow-purple-500/10"
          modifiers={{
            booked: getDatesWithPosts,
          }}
          modifiersStyles={{
            booked: {
              backgroundColor: "rgba(139, 92, 246, 0.2)",
              color: "#fff",
              fontWeight: "bold",
            },
          }}
        />
      </div>

      <Dialog open={!!selectedDate} onOpenChange={() => setSelectedDate(undefined)}>
        <DialogContent className="max-w-md bg-gray-800/95 backdrop-blur-xl border border-purple-400/20">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">
              Posts for {selectedDate ? format(selectedDate, "MMMM d, yyyy") : ""}
            </h3>
            {postsForSelectedDate.length === 0 ? (
              <p className="text-gray-400">No posts scheduled for this date.</p>
            ) : (
              postsForSelectedDate.map((post) => (
                <Card key={post.id} className="p-4 bg-gray-700/50 border-purple-400/20 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
                  <p className="text-gray-200 mb-2">{post.content}</p>
                  <div className="flex gap-2">
                    {post.platforms.map((platform) => (
                      <span
                        key={platform}
                        className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm capitalize hover:bg-purple-500/30 transition-colors"
                      >
                        {platform}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-400 mt-2">
                    Scheduled for: {format(post.scheduledDate, "p")}
                  </p>
                </Card>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CalendarView;
