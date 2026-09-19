import { BriefcaseBusiness, CircleCheck, MoreHorizontal,Heart,Send,MessageCircle,Bookmark } from "lucide-react";
import Avatar from "../Avatar/Avatar";
import PostAction from "../PostAction/PostAction";

const posts = [
  {
    initials: "MK",
    name: "Mudreh Kumbirai",
    username: "@mudreh.k",
    time: "1h",
    verified: true,
    text: "Sharing my latest revenue management case study — exploring how hotels can improve ADR without compromising guest satisfaction.",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    likes: 58,
    comments: 12,
  },
  {
    initials: "RM",
    name: "Rohan Mehta",
    username: "@rohan.mehta",
    time: "3h",
    verified: false,
    text: "Completed my front office rotation this week. Worked extensively with Opera PMS and guest-relations operations. Now actively looking for placement opportunities.",
    image: null,
    likes: 24,
    comments: 5,
    opportunity: "Open to opportunities",
  },
  {
    initials: "PC",
    name: "IHM Pune Placement Cell",
    username: "@ihmpune",
    time: "5h",
    verified: true,
    text: "Regal Grand Pune is hiring Front Office Trainees. Students with strong communication skills and guest-facing experience are encouraged to apply.",
    image:
      "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80",
    likes: 76,
    comments: 18,
    opportunity: "Hiring",
  },
];

function PostCard({
  post,
}: {
  post: (typeof posts)[number];
}) {
  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-surface">
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex gap-3">
            <Avatar initials={post.initials} />

            <div>
              <div className="flex items-center gap-1.5">
                <p className="text-sm font-semibold">
                  {post.name}
                </p>

                {post.verified && (
                  <CircleCheck
                    size={14}
                    className="fill-primary text-background"
                  />
                )}
              </div>

              <p className="mt-0.5 text-[11px] text-text-subtle">
                {post.username} · {post.time}
              </p>
            </div>
          </div>

          <button className="rounded-lg p-1.5 text-text-subtle hover:bg-surface-2 hover:text-text-primary">
            <MoreHorizontal size={18} />
          </button>
        </div>

        <p className="mt-4 text-sm leading-6 text-text-secondary">
          {post.text}
        </p>

        {post.opportunity && (
          <div className="mt-4 inline-flex items-center gap-2 rounded-lg border border-primary-border bg-primary-soft px-3 py-2 text-xs font-medium text-primary">
            <BriefcaseBusiness size={13} />
            {post.opportunity}
          </div>
        )}
      </div>

      {post.image && (
        <div className="relative aspect-[16/9] overflow-hidden bg-surface-dark">
          <img
            src={post.image}
            alt=""
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-overlay" />
        </div>
      )}

      <div className="px-4 py-3">
        <div className="flex items-center justify-between text-[11px] text-text-subtle">
          <span>{post.likes} likes</span>
          <span>{post.comments} comments</span>
        </div>

        <div className="mt-3 flex items-center border-t border-border pt-2">
          <PostAction icon={Heart} text="Like" />
          <PostAction icon={MessageCircle} text="Comment" />
          <PostAction icon={Send} text="Share" />
          <PostAction icon={Bookmark} text="Save" />
        </div>
      </div>
    </article>
  );
}

export default PostCard;