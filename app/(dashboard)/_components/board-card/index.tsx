"use client";

import Link from "next/link";
import Image from "next/image";
import { MoreHorizontal } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns";

import { api } from "@/convex/_generated/api";
import { Actions } from "@/components/actions";
import { Skeleton } from "@/components/ui/skeleton";
import { useApiMutation } from "@/hooks/use-api-mutation";

import { Overlay } from "./overlay";
import { Footer } from "./footer";
import { toast } from "sonner";

interface BoardCardProps {
  id: string;
  title: string;
  authorName: string;
  authorId: string;
  createdAt: number;
  imageUrl: string;
  orgId: string;
  isFavorite: boolean;
}

export const BoardCard = ({
  id,
  title,
  authorId,
  authorName,
  createdAt,
  imageUrl,
  orgId,
  isFavorite,
}: BoardCardProps) => {
  const { userId } = useAuth();
  const authorLabel = userId === authorId ? "You" : authorName;
  const createdAtLabel = formatDistanceToNow(createdAt, {
    addSuffix: true,
  });

  const { mutate: onFavorite, pending: pendingFavorite } = useApiMutation(
    api.board.favorite,
  );
  const { mutate: onUnfavorite, pending: pendingUnfavorite } = useApiMutation(
    api.board.unfavorite,
  );

  const toggleFavorite = () => {
    if (isFavorite) {
      onUnfavorite({ id }).catch(() => toast.error("Failed to unfavorite"));
    } else {
      onFavorite({ id, orgId }).catch(() => toast.error("Failed to favorite"));
    }
  };

  return (
    <Link href={`/board/${id}`}>
      <div className="group aspect-[100/127] border rounded-xl flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 bg-white">
        <div className="relative flex-1 bg-amber-50 dark:bg-zinc-800/50">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          />
          <Overlay />
          <Actions id={id} title={title} side="right">
            <button className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-2 outline-none rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm z-10">
              <MoreHorizontal className="text-white w-4 h-4 opacity-75 hover:opacity-100 transition-opacity" />
            </button>
          </Actions>
        </div>
        <Footer
          isFavorite={isFavorite}
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          onClick={toggleFavorite}
          disabled={pendingFavorite || pendingUnfavorite}
        />
      </div>
    </Link>
  );
};

BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className="group aspect-[100/127] rounded-xl overflow-hidden">
      <Skeleton className="h-full w-full" />
    </div>
  );
};
