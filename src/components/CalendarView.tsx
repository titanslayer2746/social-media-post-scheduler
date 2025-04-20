
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
      <h2 className="text-2xl font-bold mb-6 text-black">Scheduled Posts Calendar</h2>
      <div className="flex justify-center">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-xl border border-black/10 bg-white/50 p-4 shadow-xl backdrop-blur-lg transition-all hover:shadow-black/10"
          modifiers={{
            booked: getDatesWithPosts,
          }}
          modifiersStyles={{
            booked: {
              backgroundColor: "rgba(0, 0, 0, 0.1)",
              color: "#000",
              fontWeight: "bold",
            },
          }}
        />
      </div>

      <Dialog open={!!selectedDate} onOpenChange={() => setSelectedDate(undefined)}>
        <DialogContent className="max-w-md bg-white/95 backdrop-blur-xl border border-black/10">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-black">
              Posts for {selectedDate ? format(selectedDate, "MMMM d, yyyy") : ""}
            </h3>
            {postsForSelectedDate.length === 0 ? (
              <p className="text-gray-500">No posts scheduled for this date.</p>
            ) : (
              postsForSelectedDate.map((post) => (
                <Card key={post.id} className="p-4 bg-gray-50/50 border-black/10 hover:shadow-lg hover:shadow-black/10 transition-all duration-300">
                  <p className="text-black mb-2">{post.content}</p>
                  <div className="flex gap-2">
                    {post.platforms.map((platform) => (
                      <span
                        key={platform}
                        className="px-3 py-1 bg-black/10 text-black rounded-full text-sm capitalize hover:bg-black/20 transition-colors"
                      >
                        {platform}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
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
