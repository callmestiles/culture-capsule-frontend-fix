import Navbar from "@/components/Navbar";
import { eventData } from "@/lib/data";
import { Calendar, Clock, MapPin, ArrowLeft, Share2 } from "lucide-react";
import { useParams } from "react-router-dom";

const EventDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const eventId = Number.parseInt(id);
  const event = eventData.find((e) => e.id === eventId);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <a
          href="/"
          className="mb-6 inline-flex items-center text-[rgb(82,104,45)] hover:underline"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Events
        </a>

        <div className="overflow-hidden rounded-xl bg-white shadow-md">
          <div className="relative h-[300px] w-full md:h-[400px]">
            <img
              src={
                event.image ||
                `/placeholder.svg?height=800&width=1200&text=${encodeURIComponent(
                  event.title
                )}`
              }
              alt={event.title}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="p-6 md:p-8">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="mb-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800">
                  {event.category}
                </div>
                <h1 className="text-2xl font-bold text-gray-800 md:text-3xl lg:text-4xl">
                  {event.title}
                </h1>
              </div>

              <button className="flex items-center rounded-full bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </button>
            </div>

            <div className="mb-8 grid grid-cols-1 gap-4 rounded-lg bg-gray-50 p-4 md:grid-cols-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(82,104,45,0.1)]">
                  <Calendar className="h-5 w-5 text-[rgb(82,104,45)]" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">{formatDate(event.date)}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(82,104,45,0.1)]">
                  <Clock className="h-5 w-5 text-[rgb(82,104,45)]" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Time</p>
                  <p className="font-medium">{event.time}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(82,104,45,0.1)]">
                  <MapPin className="h-5 w-5 text-[rgb(82,104,45)]" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">{event.location}</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="mb-4 text-xl font-bold text-gray-800">
                About This Event
              </h2>
              <div className="prose max-w-none text-gray-600">
                <p className="mb-4">{event.description}</p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  euismod, urna eu tincidunt consectetur, nisi nunc pretium
                  nunc, eget tincidunt nisl nunc eget nunc. Sed euismod, urna eu
                  tincidunt consectetur, nisi nunc pretium nunc, eget tincidunt
                  nisl nunc eget nunc.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <button className="flex-1 rounded-full bg-[rgb(82,104,45)] px-6 py-3 font-semibold text-white transition-colors hover:bg-[rgb(65,85,35)]">
                Register for Event
              </button>
              <button className="flex-1 rounded-full border-2 border-[rgb(82,104,45)] px-6 py-3 font-semibold text-[rgb(82,104,45)] transition-colors hover:bg-[rgba(82,104,45,0.1)]">
                Add to Calendar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
