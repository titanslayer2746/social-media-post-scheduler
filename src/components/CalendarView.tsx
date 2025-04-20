
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
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Scheduled Posts Calendar</h2>
      <div className="flex justify-center">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-md border p-3 pointer-events-auto"
          modifiers={{
            booked: getDatesWithPosts,
          }}
          modifiersStyles={{
            booked: {
              backgroundColor: "#D3E4FD",
              color: "#1e40af",
              fontWeight: "bold",
            },
          }}
        />
      </div>

      <Dialog open={!!selectedDate} onOpenChange={() => setSelectedDate(undefined)}>
        <DialogContent className="max-w-md">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              Posts for {selectedDate ? format(selectedDate, "MMMM d, yyyy") : ""}
            </h3>
            {postsForSelectedDate.length === 0 ? (
              <p className="text-gray-500">No posts scheduled for this date.</p>
            ) : (
              postsForSelectedDate.map((post) => (
                <Card key={post.id} className="p-4">
                  <p className="text-gray-600 mb-2">{post.content}</p>
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
